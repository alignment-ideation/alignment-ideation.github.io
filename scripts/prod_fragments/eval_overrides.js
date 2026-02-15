/* ---- Eval Page: Prod Overrides ---- */

// Registration guard — redirect to form if not registered
const REG_KEY = 'reg_prod_' + EVAL_ID;
const _regData = localStorage.getItem(REG_KEY);
if (!_regData) {
    window.location.href = '../';
}

function getRegistration() {
    try {
        const saved = localStorage.getItem(REG_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch(e) { return null; }
}

function hashEmail(email) {
    let hash = 5381;
    for (let i = 0; i < email.length; i++) {
        hash = ((hash << 5) + hash) + email.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

// Namespace localStorage by eval + rater
(function() {
    const reg = getRegistration();
    if (reg) {
        STORAGE_KEY = 'rankings_prod_' + EVAL_ID + '_' + hashEmail(reg.email);
        loadFromLocalStorage();
    }
})();

// Fix: mark onboarding done on startEval (base v3 never sets this)
const _originalStartEval = startEval;
startEval = function() {
    _originalStartEval();
    const reg = getRegistration();
    if (reg) {
        localStorage.setItem('onboarding_prod_' + EVAL_ID + '_' + hashEmail(reg.email), 'true');
    }
};

// Skip onboarding if already done
(function() {
    const reg = getRegistration();
    if (reg) {
        const done = localStorage.getItem('onboarding_prod_' + EVAL_ID + '_' + hashEmail(reg.email));
        if (done) {
            document.getElementById('onboarding-screen').classList.add('hidden');
            document.getElementById('eval-screen').classList.remove('hidden');
            showQuestion(currentIdx || 0);
        }
    }
})();

// Override downloadResults to also submit to Firebase + email
const _originalDownloadResults = downloadResults;
downloadResults = async function() {
    const output = {
        timestamp: new Date().toISOString(),
        eval_id: EVAL_ID,
        registration: getRegistration(),
        total_prompts: evalItems.length,
        ranked: Object.keys(rankings).length,
        rankings: evalItems.map(item => {
            const r = rankings[item.prompt_id];
            return r || { prompt_id: item.prompt_id, section: item.section, status: 'skipped' };
        }),
    };

    const statusEl = document.getElementById('submission-status');
    if (statusEl) {
        statusEl.innerHTML = '<span style="color:var(--text-secondary)">Submitting...</span>';
        statusEl.classList.remove('hidden');
    }

    // 1. Local download
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const reg = getRegistration();
    const raterName = reg ? reg.name.replace(/\s+/g, '_').toLowerCase() : 'anonymous';
    a.download = `rankings_v3_${new Date().toISOString().slice(0,19).replace(/[:-]/g,'')}_${raterName}.json`;
    a.click();
    URL.revokeObjectURL(url);

    // 2. Firebase
    const fbResult = await submitToFirebase(output);

    // 3. Email
    const emailResult = await sendResultsEmail(output);

    // 4. Status
    if (statusEl) {
        const parts = [];
        if (fbResult.success) {
            parts.push('<span style="color:#4A9B7F">&#10003; Saved to server</span>');
        } else if (fbResult.reason === 'not_configured') {
            parts.push('<span style="color:var(--text-secondary)">Server not configured</span>');
        } else {
            parts.push('<span style="color:var(--primary)">&#10007; Server save failed — your download has your data</span>');
        }
        if (emailResult.success) {
            parts.push('<span style="color:#4A9B7F">&#10003; Results emailed to ' + (reg ? reg.email : '?') + '</span>');
        } else if (emailResult.reason === 'not_configured') {
            parts.push('<span style="color:var(--text-secondary)">Email not configured</span>');
        } else {
            parts.push('<span style="color:var(--primary)">&#10007; Email failed — your download has your data</span>');
        }
        statusEl.innerHTML = parts.join('<br>');
    }
};

// Auto-save partial progress to Firebase (debounced)
let _autoSaveTimer = null;
const _originalSubmitAndNext = submitAndNext;
submitAndNext = function() {
    _originalSubmitAndNext();
    clearTimeout(_autoSaveTimer);
    _autoSaveTimer = setTimeout(async () => {
        const output = {
            timestamp: new Date().toISOString(),
            eval_id: EVAL_ID,
            registration: getRegistration(),
            total_prompts: evalItems.length,
            ranked: Object.keys(rankings).length,
            rankings: evalItems.map(item => {
                const r = rankings[item.prompt_id];
                return r || { prompt_id: item.prompt_id, section: item.section, status: 'skipped' };
            }),
            is_partial: true,
        };
        await submitToFirebase(output);
    }, 30000);
};
