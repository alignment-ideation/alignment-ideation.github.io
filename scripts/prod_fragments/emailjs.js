/* ---- EmailJS ---- */
let _emailjsInitialized = false;

function initEmailJS() {
    if (_emailjsInitialized) return true;
    if (typeof EMAILJS_CONFIG === 'undefined' || EMAILJS_CONFIG.public_key === 'REPLACE_ME') {
        console.warn('EmailJS not configured — results will not be emailed');
        return false;
    }
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS SDK not loaded');
        return false;
    }
    try {
        emailjs.init(EMAILJS_CONFIG.public_key);
        _emailjsInitialized = true;
        return true;
    } catch(e) {
        console.error('EmailJS init failed:', e);
        return false;
    }
}

async function sendResultsEmail(results) {
    if (!initEmailJS()) return { success: false, reason: 'not_configured' };

    const reg = getRegistration();
    if (!reg || !reg.email) return { success: false, reason: 'no_registration' };

    // Build a brief summary
    const ranked = results.ranked || 0;
    const total = results.total_prompts || 0;

    const templateParams = {
        to_name: reg.name,
        to_email: reg.email,
        eval_id: EVAL_ID,
        summary: `${ranked} of ${total} prompts ranked`,
        results_json: JSON.stringify(results, null, 2),
    };

    try {
        await emailjs.send(
            EMAILJS_CONFIG.service_id,
            EMAILJS_CONFIG.template_id,
            templateParams
        );
        console.log('Results emailed to', reg.email);
        return { success: true };
    } catch(e) {
        console.error('Email send failed:', e);
        return { success: false, reason: e.message || String(e) };
    }
}
