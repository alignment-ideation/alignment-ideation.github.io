/* ---- Firebase ---- */
let _firestoreDb = null;

function getFirestore() {
    if (_firestoreDb) return _firestoreDb;
    if (typeof FIREBASE_CONFIG === 'undefined' || FIREBASE_CONFIG.apiKey === 'REPLACE_ME') {
        console.warn('Firebase not configured — submissions will only be saved locally');
        return null;
    }
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        _firestoreDb = firebase.firestore();
        return _firestoreDb;
    } catch(e) {
        console.error('Firebase init failed:', e);
        return null;
    }
}

async function submitToFirebase(results) {
    const db = getFirestore();
    if (!db) return { success: false, reason: 'not_configured' };

    const reg = getRegistration();
    const doc = {
        registration: reg,
        rankings: results,
        eval_id: EVAL_ID,
        submitted_at: firebase.firestore.FieldValue.serverTimestamp(),
        client_timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        page_url: window.location.href,
    };

    try {
        const ref = await db.collection('evaluations').doc(EVAL_ID)
            .collection('submissions').add(doc);
        console.log('Submitted to Firebase:', ref.id);
        return { success: true, id: ref.id };
    } catch(e) {
        console.error('Firebase submission failed:', e);
        return { success: false, reason: e.message };
    }
}
