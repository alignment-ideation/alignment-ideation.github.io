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

    const ranked = results.ranked || 0;
    const total = results.total_prompts || 0;
    const raterName = reg.name.replace(/\s+/g, '_').toLowerCase();

    // Full base64 data URI for EmailJS "Variable Attachment"
    const fullJson = JSON.stringify(results, null, 2);
    const jsonBase64 = btoa(unescape(encodeURIComponent(fullJson)));
    const dataUri = 'data:application/json;base64,' + jsonBase64;

    const templateParams = {
        to_name: reg.name,
        to_email: reg.email,
        eval_id: EVAL_ID,
        summary: `${ranked} of ${total} prompts ranked`,
        results_json: dataUri,
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
        const reason = e.text || e.message || (typeof e === 'string' ? e : JSON.stringify(e));
        return { success: false, reason: reason };
    }
}
