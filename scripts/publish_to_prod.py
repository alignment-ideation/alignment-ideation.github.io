"""
Publish a stage 5 ranking UI HTML to production.

Outputs two pages:
  {eval_id}/index.html  — Standalone registration form
  {eval_id}/eval/index.html — Eval UI (stage 5 HTML + Firebase + email)

Usage:
    python 8_human_ranking_ui_prod/scripts/publish_to_prod.py \
        --source 5_human_ranking_ui/20260214_210428/ranking_ui.html
"""

import argparse
import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROD_DIR = SCRIPT_DIR.parent
FRAGMENTS_DIR = SCRIPT_DIR / "prod_fragments"
CONFIG_DIR = PROD_DIR / "config"


def parse_args():
    p = argparse.ArgumentParser(description="Publish stage 5 UI to prod")
    p.add_argument("--source", required=True, type=Path,
                   help="Path to stage 5 ranking_ui.html")
    p.add_argument("--eval-id", default=None,
                   help="Eval identifier (defaults to source parent dir name)")
    p.add_argument("--firebase", type=Path, default=CONFIG_DIR / "firebase_config.json",
                   help="Path to firebase_config.json")
    p.add_argument("--emailjs", type=Path, default=CONFIG_DIR / "emailjs_config.json",
                   help="Path to emailjs_config.json")
    p.add_argument("--dry-run", action="store_true",
                   help="Check anchors without writing output")
    return p.parse_args()


def read_fragment(name):
    path = FRAGMENTS_DIR / name
    if not path.exists():
        print(f"ERROR: Fragment not found: {path}")
        sys.exit(1)
    return path.read_text()


def find_and_assert_anchor(html, anchor, name):
    count = html.count(anchor)
    if count == 0:
        print(f"ERROR: Anchor '{name}' not found in source HTML.")
        print(f"  Looking for: {anchor[:80]}...")
        sys.exit(1)
    if count > 1:
        print(f"ERROR: Anchor '{name}' found {count} times (expected 1).")
        print(f"  Looking for: {anchor[:80]}...")
        sys.exit(1)
    return html.index(anchor)


def build_registration_page(eval_id):
    """Build standalone registration page from template."""
    template = read_fragment("registration_page.html")
    return template.replace("{{EVAL_ID}}", eval_id)


def build_eval_page(source_html, eval_id, firebase_config, emailjs_config):
    """Inject Firebase/email/overrides into stage 5 HTML."""
    html = source_html

    firebase_js = read_fragment("firebase.js")
    emailjs_js = read_fragment("emailjs.js")
    eval_overrides_js = read_fragment("eval_overrides.js")

    # ---- Anchors ----
    anchors = {
        "marked_js": '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>',
        "style_close": '</style>',
        "storage_key": None,  # detected dynamically below
        "script_close_last": '</script>\n</body>',
        "download_btn_line": '<button class="btn btn-primary" id="submit-btn" onclick="downloadResults()">Download Rankings (JSON)</button>',
    }

    # Detect STORAGE_KEY version dynamically
    import re as _re
    sk_match = _re.search(r"const STORAGE_KEY = 'idea_rankings_v\d+';", html)
    if not sk_match:
        print("ERROR: Could not find STORAGE_KEY line in source HTML.")
        sys.exit(1)
    anchors["storage_key"] = sk_match.group(0)

    print("\n  Verifying anchors...")
    for name, anchor in anchors.items():
        pos = find_and_assert_anchor(html, anchor, name)
        print(f"    {name}: position {pos}")

    # 1. Favicon + CDN scripts after marked.js
    cdn_scripts = '''
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💡</text></svg>">
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>'''
    html = html.replace(anchors["marked_js"], anchors["marked_js"] + cdn_scripts, 1)

    # 2. Submission status CSS before </style>
    css_injection = """
/* ---- Prod: Submission Status ---- */
#submission-status {
    margin-top: 16px;
    padding: 12px 16px;
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.8;
}
"""
    html = html.replace(anchors["style_close"], css_injection + anchors["style_close"], 1)

    # 3. Replace download button + add status div
    html = html.replace(
        anchors["download_btn_line"],
        '<button class="btn btn-primary" onclick="downloadResults()">Submit &amp; Download Rankings</button>\n            <div id="submission-status" class="hidden"></div>',
        1
    )

    # 4. Replace STORAGE_KEY + inject constants
    constants_js = f"""let STORAGE_KEY = 'rankings_prod_{eval_id}_default';
const EVAL_ID = '{eval_id}';
const FIREBASE_CONFIG = {json.dumps(firebase_config)};
const EMAILJS_CONFIG = {json.dumps(emailjs_config)};"""
    html = html.replace(anchors["storage_key"], constants_js, 1)

    # 5. JS: Firebase + EmailJS + overrides before </script></body>
    all_js = f"""
/* ==== PROD INJECTIONS ==== */

{firebase_js}

{emailjs_js}

{eval_overrides_js}

/* ==== END PROD INJECTIONS ==== */
"""
    html = html.replace(anchors["script_close_last"], all_js + anchors["script_close_last"], 1)

    return html


def main():
    args = parse_args()

    if not args.source.exists():
        print(f"ERROR: Source file not found: {args.source}")
        sys.exit(1)

    eval_id = args.eval_id or args.source.parent.name
    print(f"Source: {args.source}")
    print(f"Eval ID: {eval_id}")

    source_html = args.source.read_text()
    print(f"Source HTML: {len(source_html):,} chars, {len(source_html.splitlines()):,} lines")

    firebase_config = json.loads(args.firebase.read_text()) if args.firebase.exists() else {}
    emailjs_config = json.loads(args.emailjs.read_text()) if args.emailjs.exists() else {}

    if args.dry_run:
        # Just check eval page anchors
        build_eval_page(source_html, eval_id, firebase_config, emailjs_config)
        print("\nDry run complete — all anchors found.")
        return

    # ---- Build pages ----
    print("\nBuilding registration page...")
    reg_html = build_registration_page(eval_id)

    print("Building eval page...")
    eval_html = build_eval_page(source_html, eval_id, firebase_config, emailjs_config)

    # ---- Write output ----
    out_dir = PROD_DIR / eval_id
    eval_dir = out_dir / "eval"
    out_dir.mkdir(parents=True, exist_ok=True)
    eval_dir.mkdir(parents=True, exist_ok=True)

    reg_path = out_dir / "index.html"
    reg_path.write_text(reg_html)
    print(f"\n  Registration: {reg_path} ({len(reg_html.splitlines())} lines)")

    eval_path = eval_dir / "index.html"
    eval_path.write_text(eval_html)
    print(f"  Eval:         {eval_path} ({len(eval_html.splitlines())} lines)")

    config = {
        "eval_id": eval_id,
        "source": str(args.source.resolve()),
        "firebase_project": firebase_config.get("projectId", "not_configured"),
        "emailjs_service": emailjs_config.get("service_id", "not_configured"),
    }
    config_path = out_dir / "config.json"
    config_path.write_text(json.dumps(config, indent=2) + "\n")

    print(f"  Config:       {config_path}")
    print(f"\n  URLs:")
    print(f"    Registration: .../{eval_id}/")
    print(f"    Eval:         .../{eval_id}/eval/")
    print(f"\n  To deploy: git add {out_dir} && git commit && git push")


if __name__ == "__main__":
    main()
