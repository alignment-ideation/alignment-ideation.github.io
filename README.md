# Production Human Ranking UI

Serves ranking evals to external raters via GitHub Pages. Adds rater registration, Firebase persistence, and email delivery on top of the stage 5 UI.

## One-Time Setup

### 1. Firebase (~10 min)

1. Go to [Firebase Console](https://console.firebase.google.com/) → **Add project** → name it (e.g. `alignment-eval`)
2. **Firestore Database** → Create database → Start in **production mode**
3. Go to **Rules** tab in Firestore and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /evaluations/{evalId}/submissions/{subId} {
      allow create: if request.resource.data.keys().hasAll(['registration', 'rankings', 'eval_id'])
                    && request.resource.data.eval_id is string;
      allow read, update, delete: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> This allows anyone to **create** submissions (no auth needed) but blocks all reads/updates/deletes. You read data through the Firebase Console or Admin SDK.

4. **Project Settings** → **General** → scroll to "Your apps" → click **Web** (</>) → Register app (no hosting needed) → copy the config object
5. Paste into `config/firebase_config.json`:

```json
{
  "apiKey": "AIza...",
  "authDomain": "your-project.firebaseapp.com",
  "projectId": "your-project",
  "storageBucket": "your-project.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "1:123456789:web:abc123"
}
```

### 2. EmailJS (~5 min)

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. **Email Services** → Add service → connect your Gmail (or other)
3. **Email Templates** → Create → set:
   - **Subject**: `Your alignment eval rankings ({{eval_id}})`
   - **Body**:
   ```
   Hi {{to_name}},

   Thanks for completing the alignment research evaluation ({{eval_id}}).

   Summary: {{summary}}

   Your full results are below. Keep this for your records.

   {{results_json}}
   ```
   - **To Email**: `{{to_email}}`
4. Copy the service ID, template ID, and public key into `config/emailjs_config.json`:

```json
{
  "service_id": "service_xxx",
  "template_id": "template_xxx",
  "public_key": "user_xxx"
}
```

### 3. GitHub Pages (~2 min)

1. Push the repo to GitHub
2. **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)` → Save
3. Your evals will be at: `https://<user>.github.io/<repo>/8_human_ranking_ui_prod/<eval_id>/`

## Publishing an Eval

```bash
# 1. Generate the stage 5 UI as usual
python 5_human_ranking_ui/scripts/generate_ranking_ui_v3.py \
    --responses 4_brainstormed_idea_responses/YYYYMMDD_HHMMSS/responses.jsonl

# 2. Publish to prod (injects registration + Firebase + email)
python 8_human_ranking_ui_prod/scripts/publish_to_prod.py \
    --source 5_human_ranking_ui/YYYYMMDD_HHMMSS/ranking_ui.html

# 3. Deploy
git add 8_human_ranking_ui_prod/YYYYMMDD_HHMMSS/
git commit -m "Publish eval YYYYMMDD_HHMMSS"
git push
```

The eval is live at `https://<user>.github.io/<repo>/8_human_ranking_ui_prod/YYYYMMDD_HHMMSS/`

## Reading Submissions

Submissions appear in Firestore at `evaluations/{eval_id}/submissions/`. To view:

- **Firebase Console**: Firestore → evaluations → click the eval_id → submissions
- **Export script**: (TODO) `6_human_ranking_data/scripts/fetch_firebase_submissions.py`

Each submission document contains:

```json
{
  "registration": {
    "name": "...",
    "email": "...",
    "google_scholar": "...",
    "experience": "12_months",
    "commitment": "10_hours"
  },
  "rankings": { /* same format as v3 JSON export */ },
  "eval_id": "20260214_210428",
  "submitted_at": "<server timestamp>",
  "client_timestamp": "2026-02-15T...",
  "is_partial": false
}
```

## Directory Structure

```
8_human_ranking_ui_prod/
├── README.md
├── config/
│   ├── firebase_config.json          # Your Firebase config (fill in)
│   └── emailjs_config.json           # Your EmailJS config (fill in)
├── scripts/
│   ├── publish_to_prod.py            # Stage 5 HTML → prod HTML
│   └── prod_fragments/               # Injected code fragments
│       ├── registration.html
│       ├── registration.css
│       ├── registration.js
│       ├── firebase.js
│       ├── emailjs.js
│       └── prod_overrides.js
└── YYYYMMDD_HHMMSS/                  # Published evals
    ├── index.html                    # Self-contained prod UI
    └── config.json                   # Provenance
```
