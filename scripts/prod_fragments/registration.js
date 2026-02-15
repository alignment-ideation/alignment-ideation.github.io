/* ---- Registration ---- */
const REG_STORAGE_KEY = 'reg_prod_' + EVAL_ID;

function hashEmail(email) {
    let hash = 5381;
    for (let i = 0; i < email.length; i++) {
        hash = ((hash << 5) + hash) + email.charCodeAt(i);
        hash = hash & hash; // Convert to 32-bit int
    }
    return Math.abs(hash).toString(36);
}

function getRegistration() {
    try {
        const saved = localStorage.getItem(REG_STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch(e) { return null; }
}

function saveRegistration(data) {
    try {
        localStorage.setItem(REG_STORAGE_KEY, JSON.stringify(data));
    } catch(e) {}
}

function handleRegistration(event) {
    event.preventDefault();
    const reg = {
        name: document.getElementById('reg-name').value.trim(),
        email: document.getElementById('reg-email').value.trim(),
        google_scholar: document.getElementById('reg-scholar').value.trim() || null,
        experience: document.querySelector('input[name="experience"]:checked').value,
        commitment: document.querySelector('input[name="commitment"]:checked').value,
        registered_at: new Date().toISOString(),
    };
    saveRegistration(reg);

    // Update storage key to be namespaced by rater
    STORAGE_KEY = 'rankings_prod_' + EVAL_ID + '_' + hashEmail(reg.email);
    loadFromLocalStorage();

    // Transition: hide registration, show onboarding (or eval if onboarding done)
    document.getElementById('registration-screen').classList.add('hidden');
    const onboardingDone = localStorage.getItem('onboarding_prod_' + EVAL_ID + '_' + hashEmail(reg.email));
    if (onboardingDone) {
        document.getElementById('onboarding-screen').classList.add('hidden');
        document.getElementById('eval-screen').classList.remove('hidden');
        showQuestion();
    } else {
        document.getElementById('onboarding-screen').classList.remove('hidden');
    }
}

function initRegistrationScreen() {
    const existing = getRegistration();
    if (existing) {
        // Already registered — skip to onboarding/eval
        STORAGE_KEY = 'rankings_prod_' + EVAL_ID + '_' + hashEmail(existing.email);
        loadFromLocalStorage();
        document.getElementById('registration-screen').classList.add('hidden');

        const onboardingDone = localStorage.getItem('onboarding_prod_' + EVAL_ID + '_' + hashEmail(existing.email));
        if (onboardingDone) {
            document.getElementById('onboarding-screen').classList.add('hidden');
            document.getElementById('eval-screen').classList.remove('hidden');
            showQuestion();
        } else {
            document.getElementById('onboarding-screen').classList.remove('hidden');
        }
    } else {
        // Show registration, hide everything else
        document.getElementById('registration-screen').classList.remove('hidden');
        document.getElementById('onboarding-screen').classList.add('hidden');
        document.getElementById('eval-screen').classList.add('hidden');
        document.getElementById('summary-screen').classList.add('hidden');
    }
}
