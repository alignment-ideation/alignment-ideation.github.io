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

function setScreenVisibility(screen) {
    // screen: 'registration', 'onboarding', 'eval', 'summary'
    const screens = ['registration-screen', 'onboarding-screen', 'eval-screen', 'summary-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const header = document.querySelector('.header');
    const footer = document.getElementById('criteria-footer');

    if (screen === 'registration') {
        document.getElementById('registration-screen').classList.remove('hidden');
        if (header) header.classList.add('hidden');
        if (footer) footer.classList.add('hidden');
    } else if (screen === 'onboarding') {
        document.getElementById('onboarding-screen').classList.remove('hidden');
        if (header) header.classList.add('hidden');
        if (footer) footer.classList.add('hidden');
    } else if (screen === 'eval') {
        document.getElementById('eval-screen').classList.remove('hidden');
        if (header) header.classList.remove('hidden');
        if (footer) footer.classList.remove('hidden');
        showQuestion();
    } else if (screen === 'summary') {
        document.getElementById('summary-screen').classList.remove('hidden');
        if (header) header.classList.remove('hidden');
        if (footer) footer.classList.add('hidden');
    }
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

    // Transition to onboarding (or eval if already done)
    const onboardingDone = localStorage.getItem('onboarding_prod_' + EVAL_ID + '_' + hashEmail(reg.email));
    setScreenVisibility(onboardingDone ? 'eval' : 'onboarding');
}

function initRegistrationScreen() {
    const existing = getRegistration();
    if (existing) {
        // Already registered — skip to onboarding/eval
        STORAGE_KEY = 'rankings_prod_' + EVAL_ID + '_' + hashEmail(existing.email);
        loadFromLocalStorage();

        const onboardingDone = localStorage.getItem('onboarding_prod_' + EVAL_ID + '_' + hashEmail(existing.email));
        setScreenVisibility(onboardingDone ? 'eval' : 'onboarding');
    } else {
        setScreenVisibility('registration');
    }
}
