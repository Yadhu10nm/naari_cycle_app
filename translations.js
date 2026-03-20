/**
 * NAARI CYCLE — translations.js
 * Full UI translations: English, Hindi, Malayalam, Kannada
 */

const TRANSLATIONS = {

  en: {
    // App-wide
    appName: 'Naari Cycle',
    appTagline: 'Your Cycle Care Companion',
    trackLine: 'Track · Understand · Support · Act',

    // Auth
    welcomeBack: 'Welcome Back',
    signInSub: 'Sign in to continue your care journey',
    createAccount: 'Create Account',
    createSub: 'Start your cycle care journey today',
    signIn: 'Sign In',
    yourName: 'Your Name',
    namePlaceholder: 'e.g. Priya Sharma',
    emailAddress: 'Email Address',
    password: 'Password',
    createPassword: 'Create a password',
    yourPassword: 'Your password',
    dataPrivate: 'Your data is private and secure 🔒',

    // Onboarding
    ob1Title: 'Tell us about yourself',
    ob1Sub: 'This helps personalise your experience',
    ob2Title: 'Your cycle details',
    ob2Sub: 'Helps us predict your cycle accurately',
    ob3Title: 'Your health profile',
    ob3Sub: 'One last step — you\'re almost there!',
    obContinue: 'Continue →',
    obFinish: '✓ Let\'s Start',
    obBack: 'Back',
    yourAge: 'Your Age',
    agePlaceholder: 'e.g. 24',
    prefLanguage: 'Preferred Language',
    healthGoal: 'Your Health Goal',
    lastPeriodDate: 'Last Period Start Date',
    avgCycleLen: 'Average Cycle Length',
    cycleHint: '(days between periods)',
    avgPeriodDur: 'Average Period Duration',
    days: 'days',
    doYouHave: 'Do you have any of these?',
    condHint: '(select all that apply)',
    typicalStress: 'Typical stress level in life',
    veryLow: 'Very low',
    veryHigh: 'Very high',
    obReadyMsg: 'You\'re all set! Your personalised cycle companion is ready.',

    // Goals
    goalTrack: '📅 Track my cycle',
    goalPCOS: '🔬 Manage PCOS',
    goalPain: '💊 Reduce pain',
    goalEmotional: '💜 Emotional support',

    // Conditions
    condPCOS: '🔬 PCOS',
    condThyroid: '🦋 Thyroid issues',
    condEndo: '🩸 Endometriosis',
    condAnemia: '💉 Anemia',
    condNone: '✅ None of these',

    // Nav
    navHome: 'Home',
    navTracker: 'Tracker',
    navInsights: 'Insights',
    navCompanion: 'Companion',
    navCare: 'Care',
    navAwareness: 'Awareness',
    navCalendar: 'Calendar',
    navProfile: 'Profile',
    signOut: 'Sign Out',

    // Header
    langBtn: '🌐',

    // Home
    greetMorning: 'Good morning,',
    greetAfternoon: 'Good afternoon,',
    greetEvening: 'Good evening,',
    dayOfCycle: 'Day of Cycle',
    nextPeriod: 'Next Period',
    daysAway: 'In {n} day(s)',
    today: 'Today!',
    cyclePhaseProgress: 'Cycle Phase Progress',
    phaseMenstrual: 'Menstrual',
    phaseFollicular: 'Follicular',
    phaseOvulation: 'Ovulation',
    phaseLuteal: 'Luteal',
    howFeelToday: 'How do you feel today?',
    energyLevel: 'Energy level',
    todaysInsight: 'Today\'s Insight',
    careTipsToday: 'Your care tips today',
    sleep: 'Sleep',
    water: 'Water',
    stress: 'Stress',
    flow: 'Flow',
    logToday: '📝 Log Today',
    talkCompanion: '💜 Talk to Companion',

    // Moods
    moodHappy: 'Happy',
    moodOkay: 'Okay',
    moodLow: 'Low',
    moodAnxious: 'Anxious',
    moodIrritable: 'Irritable',

    // Energy
    energyVeryLow: 'Very Low',
    energyLow: 'Low',
    energyModerate: 'Moderate',
    energyGood: 'Good',
    energyHigh: 'High',
    energyVeryHigh: 'Very High',

    // Tracker
    dailyTracker: 'Daily Tracker',
    periodStartedToday: 'Period started today?',
    periodStartSub: 'Tap to log period start',
    flowIntensity: 'Flow Intensity',
    flowNone: '⬜ None',
    flowSpotting: '🔴 Spotting',
    flowLight: '🩸 Light',
    flowMedium: '🩸🩸 Medium',
    flowHeavy: '🩸🩸🩸 Heavy',
    painLevel: 'Pain Level',
    noPain: 'No pain',
    unbearable: 'Unbearable',
    symptomsToday: 'Symptoms Today',
    mood: 'Mood',
    lifestyleSignals: 'Lifestyle Signals',
    sleepHrs: '😴 Sleep (hrs)',
    waterGlasses: '💧 Water (glasses)',
    stressScale: '🧘 Stress (1–10)',
    activity: '🏃 Activity',
    actNone: 'None',
    actWalk: 'Walk',
    actExercise: 'Exercise',
    actYoga: 'Yoga',
    productivityImpact: 'Productivity Impact Today',
    saveTodayLog: '💾 Save Today\'s Log',
    logSaved: '✅ Log saved successfully!',

    // Symptoms
    symCramps: 'Cramps',
    symHeadache: 'Headache',
    symFatigue: 'Fatigue',
    symBloating: 'Bloating',
    symAcne: 'Acne',
    symCravings: 'Cravings',
    symNausea: 'Nausea',
    symBackPain: 'Back pain',
    symBreast: 'Breast tenderness',
    symMoodSwings: 'Mood swings',

    // Productivity
    prodLowFocus: '📉 Low focus',
    prodSkipped: '🏠 Skipped work/class',
    prodLowEnergy: '🔋 Low energy',
    prodSocial: '🚪 Social withdrawal',

    // Insights
    yourInsights: 'Your Insights',
    insightsSub: 'Based on your logged data',
    cycleLengthTrend: 'Cycle Length Trend',
    moodPattern: 'Mood Pattern (Last 7 Days)',
    painHistory: 'Pain History',
    whatToDoNext: 'What to do next',

    // Companion
    compName: 'Naari Companion',
    compStatus: '💚 Safe & Private',
    iFeelLabel: 'I feel...',
    feelStressed: '😰 Stressed',
    feelCramps: '😣 Bad cramps',
    feelAnxious: '😟 Anxious',
    feelUnfocused: '😶 Unfocused',
    feelLow: '😔 Very low',
    feelMotivation: '💪 Need motivation',
    chatPlaceholder: 'Type how you feel...',

    // Care
    careHub: 'Care Hub',
    careHubSub: 'From awareness to action',
    exportReport: '📄 Export Health Report',
    doctorConnect: '🩺 Doctor Connect',
    consultGyn: 'Consult a Gynaecologist',
    consultSub: 'Get help for irregular cycles, PCOS, pain',
    symptomSummary: 'Symptom Summary',
    symptomSummarySub: 'Auto-generated, doctor-ready report',
    communitySupport: '🌸 Community Support',
    supportSpace: 'Women\'s Support Space',
    supportSub: 'Anonymous · Moderated · Safe to share',
    periodReminders: '📱 Period Reminders',

    // Awareness tabs
    awPcos: 'PCOS',
    awTips: 'Health Tips',
    awMyths: 'Myths vs Facts',
    awFood: 'Indian Foods',
    awHormones: 'Hormones',
    awTitle: 'Awareness & Learn',
    awSub: 'Know your body, own your health',

    // Calendar
    cycleCalendar: 'Cycle Calendar',
    legendPeriod: 'Period',
    legendFertile: 'Fertile',
    legendOvulation: 'Ovulation',
    legendPredicted: 'Predicted',
    noDataDay: 'No data logged for this day.',
    logDataLink: 'Log today\'s data →',

    // Profile
    yourProfile: 'Your Profile',
    healthProfile: 'Health Profile',
    editDetails: 'Edit Your Details',
    cycleLengthDays: 'Cycle Length (days)',
    periodDurationDays: 'Period Duration (days)',
    lastPeriodDateLbl: 'Last Period Date',
    saveChanges: 'Save Changes',
    profileUpdated: '✅ Profile updated!',
    dataManagement: 'Data Management',
    exportAllData: '📥 Export All My Data (CSV)',
    clearAllData: '🗑️ Clear All Data',
    clearConfirm: 'Are you sure? This will delete all your health logs and cannot be undone.',

    // Language picker modal
    chooseLang: 'Choose Your Language',
    langSubtext: 'Select the language for the full app experience',
    langEnglish: 'English',
    langHindi: 'हिन्दी (Hindi)',
    langMalayalam: 'മലയാളം (Malayalam)',
    langKannada: 'ಕನ್ನಡ (Kannada)',
  },

  hi: {
    appName: 'नारी सायकल',
    appTagline: 'आपकी माहवारी की देखभाल करने वाली साथी',
    trackLine: 'ट्रैक करें · समझें · सहयोग लें · कार्य करें',

    welcomeBack: 'वापसी पर स्वागत है',
    signInSub: 'अपनी देखभाल यात्रा जारी रखने के लिए साइन इन करें',
    createAccount: 'खाता बनाएं',
    createSub: 'आज ही अपनी माहवारी देखभाल यात्रा शुरू करें',
    signIn: 'साइन इन करें',
    yourName: 'आपका नाम',
    namePlaceholder: 'जैसे: प्रिया शर्मा',
    emailAddress: 'ईमेल पता',
    password: 'पासवर्ड',
    createPassword: 'एक पासवर्ड बनाएं',
    yourPassword: 'आपका पासवर्ड',
    dataPrivate: 'आपका डेटा निजी और सुरक्षित है 🔒',

    ob1Title: 'अपने बारे में बताएं',
    ob1Sub: 'यह आपके अनुभव को व्यक्तिगत बनाने में मदद करता है',
    ob2Title: 'आपके माहवारी की जानकारी',
    ob2Sub: 'यह हमें आपके चक्र का सटीक अनुमान लगाने में मदद करती है',
    ob3Title: 'आपकी स्वास्थ्य प्रोफ़ाइल',
    ob3Sub: 'बस एक और कदम — आप लगभग पहुँच गई हैं!',
    obContinue: 'आगे बढ़ें →',
    obFinish: '✓ शुरू करें',
    obBack: 'वापस',
    yourAge: 'आपकी उम्र',
    agePlaceholder: 'जैसे: 24',
    prefLanguage: 'पसंदीदा भाषा',
    healthGoal: 'आपका स्वास्थ्य लक्ष्य',
    lastPeriodDate: 'पिछली माहवारी की शुरुआत की तारीख',
    avgCycleLen: 'औसत चक्र की लंबाई',
    cycleHint: '(माहवारी के बीच के दिन)',
    avgPeriodDur: 'माहवारी की औसत अवधि',
    days: 'दिन',
    doYouHave: 'क्या आपको इनमें से कोई समस्या है?',
    condHint: '(सभी लागू विकल्प चुनें)',
    typicalStress: 'जीवन में सामान्य तनाव स्तर',
    veryLow: 'बहुत कम',
    veryHigh: 'बहुत अधिक',
    obReadyMsg: 'तैयार हैं! आपकी व्यक्तिगत साथी तैयार है।',

    goalTrack: '📅 मेरा चक्र ट्रैक करें',
    goalPCOS: '🔬 पीसीओएस प्रबंधित करें',
    goalPain: '💊 दर्द कम करें',
    goalEmotional: '💜 भावनात्मक सहायता',

    condPCOS: '🔬 पीसीओएस',
    condThyroid: '🦋 थायरॉइड समस्या',
    condEndo: '🩸 एंडोमेट्रियोसिस',
    condAnemia: '💉 एनीमिया',
    condNone: '✅ इनमें से कोई नहीं',

    navHome: 'होम',
    navTracker: 'ट्रैकर',
    navInsights: 'जानकारी',
    navCompanion: 'साथी',
    navCare: 'देखभाल',
    navAwareness: 'जागरूकता',
    navCalendar: 'कैलेंडर',
    navProfile: 'प्रोफ़ाइल',
    signOut: 'साइन आउट',
    langBtn: '🌐',

    greetMorning: 'सुप्रभात,',
    greetAfternoon: 'नमस्कार,',
    greetEvening: 'शुभ संध्या,',
    dayOfCycle: 'चक्र का दिन',
    nextPeriod: 'अगली माहवारी',
    daysAway: '{n} दिन में',
    today: 'आज!',
    cyclePhaseProgress: 'चक्र चरण प्रगति',
    phaseMenstrual: 'मासिक धर्म',
    phaseFollicular: 'फॉलिक्युलर',
    phaseOvulation: 'ओव्युलेशन',
    phaseLuteal: 'ल्यूटियल',
    howFeelToday: 'आज आप कैसा महसूस कर रही हैं?',
    energyLevel: 'ऊर्जा स्तर',
    todaysInsight: 'आज की जानकारी',
    careTipsToday: 'आज के देखभाल सुझाव',
    sleep: 'नींद',
    water: 'पानी',
    stress: 'तनाव',
    flow: 'प्रवाह',
    logToday: '📝 आज का लॉग',
    talkCompanion: '💜 साथी से बात करें',

    moodHappy: 'खुश',
    moodOkay: 'ठीक है',
    moodLow: 'उदास',
    moodAnxious: 'चिंतित',
    moodIrritable: 'चिड़चिड़ी',

    energyVeryLow: 'बहुत कम',
    energyLow: 'कम',
    energyModerate: 'सामान्य',
    energyGood: 'अच्छी',
    energyHigh: 'अधिक',
    energyVeryHigh: 'बहुत अधिक',

    dailyTracker: 'दैनिक ट्रैकर',
    periodStartedToday: 'क्या आज माहवारी शुरू हुई?',
    periodStartSub: 'माहवारी शुरू दर्ज करने के लिए टैप करें',
    flowIntensity: 'प्रवाह की तीव्रता',
    flowNone: '⬜ कोई नहीं',
    flowSpotting: '🔴 हल्के धब्बे',
    flowLight: '🩸 हल्का',
    flowMedium: '🩸🩸 मध्यम',
    flowHeavy: '🩸🩸🩸 भारी',
    painLevel: 'दर्द का स्तर',
    noPain: 'कोई दर्द नहीं',
    unbearable: 'असहनीय',
    symptomsToday: 'आज के लक्षण',
    mood: 'मनोदशा',
    lifestyleSignals: 'जीवनशैली संकेत',
    sleepHrs: '😴 नींद (घंटे)',
    waterGlasses: '💧 पानी (गिलास)',
    stressScale: '🧘 तनाव (1–10)',
    activity: '🏃 गतिविधि',
    actNone: 'कोई नहीं',
    actWalk: 'चलना',
    actExercise: 'व्यायाम',
    actYoga: 'योग',
    productivityImpact: 'आज का उत्पादकता प्रभाव',
    saveTodayLog: '💾 आज का लॉग सहेजें',
    logSaved: '✅ लॉग सफलतापूर्वक सहेजा गया!',

    symCramps: 'ऐंठन',
    symHeadache: 'सिरदर्द',
    symFatigue: 'थकान',
    symBloating: 'पेट फूलना',
    symAcne: 'मुंहासे',
    symCravings: 'खाने की इच्छा',
    symNausea: 'जी मिचलाना',
    symBackPain: 'पीठ दर्द',
    symBreast: 'स्तन कोमलता',
    symMoodSwings: 'मूड स्विंग',

    prodLowFocus: '📉 कम एकाग्रता',
    prodSkipped: '🏠 काम/कक्षा छोड़ी',
    prodLowEnergy: '🔋 कम ऊर्जा',
    prodSocial: '🚪 सामाजिक वापसी',

    yourInsights: 'आपकी जानकारी',
    insightsSub: 'आपके दर्ज डेटा के आधार पर',
    cycleLengthTrend: 'चक्र लंबाई प्रवृत्ति',
    moodPattern: 'मनोदशा पैटर्न (पिछले 7 दिन)',
    painHistory: 'दर्द इतिहास',
    whatToDoNext: 'आगे क्या करें',

    compName: 'नारी साथी',
    compStatus: '💚 सुरक्षित और निजी',
    iFeelLabel: 'मैं महसूस कर रही हूं...',
    feelStressed: '😰 तनाव में',
    feelCramps: '😣 तेज ऐंठन',
    feelAnxious: '😟 चिंतित',
    feelUnfocused: '😶 ध्यान नहीं',
    feelLow: '😔 बहुत उदास',
    feelMotivation: '💪 प्रेरणा चाहिए',
    chatPlaceholder: 'आप कैसा महसूस कर रही हैं...',

    careHub: 'देखभाल केंद्र',
    careHubSub: 'जागरूकता से कार्रवाई तक',
    exportReport: '📄 स्वास्थ्य रिपोर्ट निर्यात करें',
    doctorConnect: '🩺 डॉक्टर से संपर्क',
    consultGyn: 'स्त्री रोग विशेषज्ञ से परामर्श',
    consultSub: 'अनियमित चक्र, पीसीओएस, दर्द के लिए सहायता',
    symptomSummary: 'लक्षण सारांश',
    symptomSummarySub: 'स्वचालित, डॉक्टर-तैयार रिपोर्ट',
    communitySupport: '🌸 सामुदायिक सहायता',
    supportSpace: 'महिला सहायता स्थान',
    supportSub: 'गुमनाम · संचालित · साझा करने के लिए सुरक्षित',
    periodReminders: '📱 माहवारी अनुस्मारक',

    awPcos: 'पीसीओएस',
    awTips: 'स्वास्थ्य सुझाव',
    awMyths: 'मिथक बनाम तथ्य',
    awFood: 'भारतीय आहार',
    awHormones: 'हार्मोन',
    awTitle: 'जागरूकता और सीखें',
    awSub: 'अपने शरीर को जानें, अपने स्वास्थ्य का स्वामित्व लें',

    cycleCalendar: 'माहवारी कैलेंडर',
    legendPeriod: 'माहवारी',
    legendFertile: 'उपजाऊ',
    legendOvulation: 'ओव्युलेशन',
    legendPredicted: 'अनुमानित',
    noDataDay: 'इस दिन के लिए कोई डेटा दर्ज नहीं किया गया।',
    logDataLink: 'आज का डेटा दर्ज करें →',

    yourProfile: 'आपकी प्रोफ़ाइल',
    healthProfile: 'स्वास्थ्य प्रोफ़ाइल',
    editDetails: 'अपनी जानकारी संपादित करें',
    cycleLengthDays: 'चक्र की लंबाई (दिन)',
    periodDurationDays: 'माहवारी की अवधि (दिन)',
    lastPeriodDateLbl: 'पिछली माहवारी की तारीख',
    saveChanges: 'बदलाव सहेजें',
    profileUpdated: '✅ प्रोफ़ाइल अपडेट हो गई!',
    dataManagement: 'डेटा प्रबंधन',
    exportAllData: '📥 सभी डेटा निर्यात करें (CSV)',
    clearAllData: '🗑️ सभी डेटा हटाएं',
    clearConfirm: 'क्या आप सुनिश्चित हैं? यह आपके सभी स्वास्थ्य लॉग हटा देगा।',

    chooseLang: 'अपनी भाषा चुनें',
    langSubtext: 'पूर्ण ऐप अनुभव के लिए भाषा चुनें',
    langEnglish: 'English',
    langHindi: 'हिन्दी (Hindi)',
    langMalayalam: 'മലയാളം (Malayalam)',
    langKannada: 'ಕನ್ನಡ (Kannada)',
  },

  ml: {
    appName: 'നാരി സൈക്കിൾ',
    appTagline: 'നിങ്ങളുടെ ആർത്തവ പരിചരണ സഹചാരി',
    trackLine: 'ട്രാക്ക് · മനസ്സിലാക്കൂ · പിന്തുണ · പ്രവർത്തിക്കൂ',

    welcomeBack: 'തിരിച്ചു സ്വാഗതം',
    signInSub: 'നിങ്ങളുടെ ആരോഗ്യ യാത്ര തുടരാൻ സൈൻ ഇൻ ചെയ്യൂ',
    createAccount: 'അക്കൗണ്ട് ഉണ്ടാക്കൂ',
    createSub: 'ഇന്ന് നിങ്ങളുടെ ആർത്തവ ആരോഗ്യ യാത്ര ആരംഭിക്കൂ',
    signIn: 'സൈൻ ഇൻ',
    yourName: 'നിങ്ങളുടെ പേര്',
    namePlaceholder: 'ഉദാ: പ്രിയ ശർമ',
    emailAddress: 'ഇമെയിൽ വിലാസം',
    password: 'പാസ്‌വേഡ്',
    createPassword: 'ഒരു പാസ്‌വേഡ് ഉണ്ടാക്കൂ',
    yourPassword: 'നിങ്ങളുടെ പാസ്‌വേഡ്',
    dataPrivate: 'നിങ്ങളുടെ ഡേറ്റ സ്വകാര്യവും സുരക്ഷിതവുമാണ് 🔒',

    ob1Title: 'നിങ്ങളെക്കുറിച്ച് പറയൂ',
    ob1Sub: 'ഇത് നിങ്ങളുടെ അനുഭവം വ്യക്തിഗതമാക്കാൻ സഹായിക്കുന്നു',
    ob2Title: 'നിങ്ങളുടെ ആർത്തവ വിവരങ്ങൾ',
    ob2Sub: 'നിങ്ങളുടെ ചക്രം കൃത്യമായി പ്രവചിക്കാൻ ഇത് സഹായിക്കുന്നു',
    ob3Title: 'നിങ്ങളുടെ ആരോഗ്യ പ്രൊഫൈൽ',
    ob3Sub: 'ഒരു ചുവടുകൂടി — നിങ്ങൾ ഏതാണ്ട് എത്തി!',
    obContinue: 'തുടരൂ →',
    obFinish: '✓ ആരംഭിക്കൂ',
    obBack: 'തിരികെ',
    yourAge: 'നിങ്ങളുടെ പ്രായം',
    agePlaceholder: 'ഉദാ: 24',
    prefLanguage: 'ഇഷ്ടപ്പെട്ട ഭാഷ',
    healthGoal: 'നിങ്ങളുടെ ആരോഗ്യ ലക്ഷ്യം',
    lastPeriodDate: 'അവസാന ആർത്തവ ആരംഭ തീയതി',
    avgCycleLen: 'ശരാശരി ചക്ര ദൈർഘ്യം',
    cycleHint: '(ആർത്തവങ്ങൾ തമ്മിലുള്ള ദിവസങ്ങൾ)',
    avgPeriodDur: 'ശരാശരി ആർത്തവ ദൈർഘ്യം',
    days: 'ദിവസം',
    doYouHave: 'ഇവയിലേതെങ്കിലും നിങ്ങൾക്കുണ്ടോ?',
    condHint: '(ബാധകമായവ തിരഞ്ഞെടുക്കൂ)',
    typicalStress: 'ജീവിതത്തിലെ സാധാരണ സ്ട്രെസ് നില',
    veryLow: 'വളരെ കുറവ്',
    veryHigh: 'വളരെ കൂടുതൽ',
    obReadyMsg: 'തയ്യാർ! നിങ്ങളുടെ വ്യക്തിഗത ആർത്തവ സഹചാരി തയ്യാറാണ്.',

    goalTrack: '📅 എന്റെ ചക്രം ട്രാക്ക് ചെയ്യൂ',
    goalPCOS: '🔬 PCOS കൈകാര്യം ചെയ്യൂ',
    goalPain: '💊 വേദന കുറയ്ക്കൂ',
    goalEmotional: '💜 വൈകാരിക പിന്തുണ',

    condPCOS: '🔬 PCOS',
    condThyroid: '🦋 തൈറോയ്ഡ് പ്രശ്നങ്ങൾ',
    condEndo: '🩸 എൻഡോമെട്രിയോസിസ്',
    condAnemia: '💉 അനീമിയ',
    condNone: '✅ ഇവയൊന്നുമില്ല',

    navHome: 'ഹോം',
    navTracker: 'ട്രാക്കർ',
    navInsights: 'ഉൾക്കാഴ്ച',
    navCompanion: 'സഹചാരി',
    navCare: 'പരിചരണം',
    navAwareness: 'അവബോധം',
    navCalendar: 'കലണ്ടർ',
    navProfile: 'പ്രൊഫൈൽ',
    signOut: 'സൈൻ ഔട്ട്',
    langBtn: '🌐',

    greetMorning: 'സുപ്രഭാതം,',
    greetAfternoon: 'നമസ്കാരം,',
    greetEvening: 'ശുഭ സന്ധ്യ,',
    dayOfCycle: 'ചക്രത്തിന്റെ ദിവസം',
    nextPeriod: 'അടുത്ത ആർത്തവം',
    daysAway: '{n} ദിവസത്തിൽ',
    today: 'ഇന്ന്!',
    cyclePhaseProgress: 'ആർത്തവ ഘട്ട പുരോഗതി',
    phaseMenstrual: 'ആർത്തവം',
    phaseFollicular: 'ഫോളിക്കുലാർ',
    phaseOvulation: 'ഓവ്യൂലേഷൻ',
    phaseLuteal: 'ലൂട്ടിയൽ',
    howFeelToday: 'ഇന്ന് നിങ്ങൾക്ക് എങ്ങനെ തോന്നുന്നു?',
    energyLevel: 'ഊർജ്ജ നില',
    todaysInsight: 'ഇന്നത്തെ ഉൾക്കാഴ്ച',
    careTipsToday: 'ഇന്നത്തെ ആരോഗ്യ നുറുങ്ങുകൾ',
    sleep: 'ഉറക്കം',
    water: 'വെള്ളം',
    stress: 'സ്ട്രെസ്',
    flow: 'പ്രവാഹം',
    logToday: '📝 ഇന്ന് ലോഗ് ചെയ്യൂ',
    talkCompanion: '💜 സഹചാരിയോട് സംസാരിക്കൂ',

    moodHappy: 'സന്തോഷം',
    moodOkay: 'ശരിയാണ്',
    moodLow: 'ഉദാസീനത',
    moodAnxious: 'ഉത്കണ്ഠ',
    moodIrritable: 'ദേഷ്യം',

    energyVeryLow: 'വളരെ കുറവ്',
    energyLow: 'കുറവ്',
    energyModerate: 'മിതം',
    energyGood: 'നല്ലത്',
    energyHigh: 'കൂടുതൽ',
    energyVeryHigh: 'വളരെ കൂടുതൽ',

    dailyTracker: 'ദൈനംദിന ട്രാക്കർ',
    periodStartedToday: 'ഇന്ന് ആർത്തവം ആരംഭിച്ചോ?',
    periodStartSub: 'ആർത്തവ ആരംഭം ലോഗ് ചെയ്യാൻ ടാപ്പ് ചെയ്യൂ',
    flowIntensity: 'പ്രവാഹ തീവ്രത',
    flowNone: '⬜ ഒന്നുമില്ല',
    flowSpotting: '🔴 സ്പോട്ടിംഗ്',
    flowLight: '🩸 ഹൽക്ക',
    flowMedium: '🩸🩸 മിതം',
    flowHeavy: '🩸🩸🩸 കനത്ത',
    painLevel: 'വേദനയുടെ നില',
    noPain: 'വേദനയില്ല',
    unbearable: 'സഹിക്കാനാവാത്ത',
    symptomsToday: 'ഇന്നത്തെ ലക്ഷണങ്ങൾ',
    mood: 'മനോഭാവം',
    lifestyleSignals: 'ജീവിതശൈലി സൂചകങ്ങൾ',
    sleepHrs: '😴 ഉറക്കം (മണിക്കൂർ)',
    waterGlasses: '💧 വെള്ളം (ഗ്ലാസ്)',
    stressScale: '🧘 സ്ട്രെസ് (1–10)',
    activity: '🏃 പ്രവർത്തനം',
    actNone: 'ഒന്നുമില്ല',
    actWalk: 'നടക്കൂ',
    actExercise: 'വ്യായാമം',
    actYoga: 'യോഗ',
    productivityImpact: 'ഇന്നത്തെ ഉൽപ്പാദനക്ഷമത പ്രഭാവം',
    saveTodayLog: '💾 ഇന്നത്തെ ലോഗ് സേവ് ചെയ്യൂ',
    logSaved: '✅ ലോഗ് വിജയകരമായി സേവ് ചെയ്തു!',

    symCramps: 'വലിവ്',
    symHeadache: 'തലവേദന',
    symFatigue: 'ക്ഷീണം',
    symBloating: 'വയർ ഉബ്ബൽ',
    symAcne: 'മുഖക്കുരു',
    symCravings: 'ആഹാരമോഹം',
    symNausea: 'ഓക്കാനം',
    symBackPain: 'നടുവേദന',
    symBreast: 'മുലഞ്ഞരമ്പ് വേദന',
    symMoodSwings: 'മൂഡ് സ്വിംഗ്',

    prodLowFocus: '📉 ശ്രദ്ധക്കുറവ്',
    prodSkipped: '🏠 ജോലി/ക്ലാസ് ഒഴിവാക്കി',
    prodLowEnergy: '🔋 ഊർജ്ജക്കുറവ്',
    prodSocial: '🚪 സാമൂഹിക ഒറ്റപ്പെടൽ',

    yourInsights: 'നിങ്ങളുടെ ഉൾക്കാഴ്ചകൾ',
    insightsSub: 'നിങ്ങൾ ലോഗ് ചെയ്ത ഡേറ്റ അടിസ്ഥാനത്തിൽ',
    cycleLengthTrend: 'ആർത്തവ ചക്ര ദൈർഘ്യ പ്രവണത',
    moodPattern: 'മനോഭാവ പ്രതിരൂപം (കഴിഞ്ഞ 7 ദിവസം)',
    painHistory: 'വേദനയുടെ ചരിത്രം',
    whatToDoNext: 'അടുത്തതായി എന്ത് ചെയ്യണം',

    compName: 'നാരി സഹചാരി',
    compStatus: '💚 സുരക്ഷിതവും സ്വകാര്യവും',
    iFeelLabel: 'എനിക്ക് തോന്നുന്നത്...',
    feelStressed: '😰 സ്ട്രെസ്',
    feelCramps: '😣 കഠിന വലിവ്',
    feelAnxious: '😟 ഉത്കണ്ഠ',
    feelUnfocused: '😶 ശ്രദ്ധ ഇല്ല',
    feelLow: '😔 വളരെ ഉദാസീനത',
    feelMotivation: '💪 പ്രചോദനം വേണം',
    chatPlaceholder: 'നിങ്ങൾക്ക് എങ്ങനെ തോന്നുന്നു...',

    careHub: 'ആരോഗ്യ കേന്ദ്രം',
    careHubSub: 'അവബോധത്തിൽ നിന്ന് പ്രവർത്തനത്തിലേക്ക്',
    exportReport: '📄 ആരോഗ്യ റിപ്പോർട്ട് കയറ്റുമതി ചെയ്യൂ',
    doctorConnect: '🩺 ഡോക്ടർ ബന്ധം',
    consultGyn: 'ഗൈനക്കോളജിസ്റ്റിനെ കാണൂ',
    consultSub: 'അനിയന്ത്രിത ആർത്തവം, PCOS, വേദന എന്നിവയ്ക്ക്',
    symptomSummary: 'ലക്ഷണ സംഗ്രഹം',
    symptomSummarySub: 'ഡോക്ടർക്ക് തയ്യാറായ ഓട്ടോ-ജനറേറ്റഡ് റിപ്പോർട്ട്',
    communitySupport: '🌸 കമ്മ്യൂണിറ്റി പിന്തുണ',
    supportSpace: 'സ്ത്രീ പിന്തുണ ഇടം',
    supportSub: 'അജ്ഞാതം · നിയന്ത്രിതം · പങ്കുവെക്കാൻ സുരക്ഷിതം',
    periodReminders: '📱 ആർത്തവ ഓർമ്മിപ്പിക്കൽ',

    awPcos: 'PCOS',
    awTips: 'ആരോഗ്യ നുറുങ്ങുകൾ',
    awMyths: 'മിഥ്യ vs വസ്തുത',
    awFood: 'ഇന്ത്യൻ ഭക്ഷണം',
    awHormones: 'ഹോർമോണുകൾ',
    awTitle: 'അവബോധവും പഠനവും',
    awSub: 'നിങ്ങളുടെ ശരീരം അറിയൂ, ആരോഗ്യം നിയന്ത്രിക്കൂ',

    cycleCalendar: 'ആർത്തവ കലണ്ടർ',
    legendPeriod: 'ആർത്തവം',
    legendFertile: 'ഫലഭൂയിഷ്ഠം',
    legendOvulation: 'ഓവ്യൂലേഷൻ',
    legendPredicted: 'പ്രവചിക്കപ്പെട്ടത്',
    noDataDay: 'ഈ ദിവസത്തേക്ക് ഡേറ്റ ലോഗ് ചെയ്തിട്ടില്ല.',
    logDataLink: 'ഇന്നത്തെ ഡേറ്റ ലോഗ് ചെയ്യൂ →',

    yourProfile: 'നിങ്ങളുടെ പ്രൊഫൈൽ',
    healthProfile: 'ആരോഗ്യ പ്രൊഫൈൽ',
    editDetails: 'നിങ്ങളുടെ വിവരങ്ങൾ എഡിറ്റ് ചെയ്യൂ',
    cycleLengthDays: 'ആർത്തവ ചക്ര ദൈർഘ്യം (ദിവസം)',
    periodDurationDays: 'ആർത്തവ ദൈർഘ്യം (ദിവസം)',
    lastPeriodDateLbl: 'അവസാന ആർത്തവ തീയതി',
    saveChanges: 'മാറ്റങ്ങൾ സേവ് ചെയ്യൂ',
    profileUpdated: '✅ പ്രൊഫൈൽ അപ്ഡേറ്റ് ചെയ്തു!',
    dataManagement: 'ഡേറ്റ മാനേജ്മെന്റ്',
    exportAllData: '📥 എന്റെ എല്ലാ ഡേറ്റയും കയറ്റുമതി ചെയ്യൂ (CSV)',
    clearAllData: '🗑️ എല്ലാ ഡേറ്റയും മായ്ക്കൂ',
    clearConfirm: 'ഉറപ്പാണോ? ഇത് നിങ്ങളുടെ എല്ലാ ആരോഗ്യ ലോഗുകളും ഇല്ലാതാക്കും.',

    chooseLang: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കൂ',
    langSubtext: 'പൂർണ്ണ ആപ്പ് അനുഭവത്തിനായി ഭാഷ തിരഞ്ഞെടുക്കൂ',
    langEnglish: 'English',
    langHindi: 'हिन्दी (Hindi)',
    langMalayalam: 'മലയാളം (Malayalam)',
    langKannada: 'ಕನ್ನಡ (Kannada)',
  },

  kn: {
    appName: 'ನಾರಿ ಸೈಕಲ್',
    appTagline: 'ನಿಮ್ಮ ಮಾಸಿಕ ಆರೈಕೆ ಸಂಗಾತಿ',
    trackLine: 'ಟ್ರ್ಯಾಕ್ · ಅರ್ಥ · ಬೆಂಬಲ · ಕ್ರಿಯೆ',

    welcomeBack: 'ಮರಳಿ ಸ್ವಾಗತ',
    signInSub: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಯಾತ್ರೆ ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    createAccount: 'ಖಾತೆ ರಚಿಸಿ',
    createSub: 'ಇಂದೇ ನಿಮ್ಮ ಮಾಸಿಕ ಆರೋಗ್ಯ ಯಾತ್ರೆ ಪ್ರಾರಂಭಿಸಿ',
    signIn: 'ಸೈನ್ ಇನ್',
    yourName: 'ನಿಮ್ಮ ಹೆಸರು',
    namePlaceholder: 'ಉದಾ: ಪ್ರಿಯಾ ಶರ್ಮ',
    emailAddress: 'ಇಮೇಲ್ ವಿಳಾಸ',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    createPassword: 'ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ',
    yourPassword: 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್',
    dataPrivate: 'ನಿಮ್ಮ ಡೇಟಾ ಖಾಸಗಿ ಮತ್ತು ಸುರಕ್ಷಿತ 🔒',

    ob1Title: 'ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ',
    ob1Sub: 'ಇದು ನಿಮ್ಮ ಅನುಭವವನ್ನು ವ್ಯಕ್ತಿಗತಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ',
    ob2Title: 'ನಿಮ್ಮ ಮಾಸಿಕ ವಿವರಗಳು',
    ob2Sub: 'ನಿಮ್ಮ ಚಕ್ರವನ್ನು ನಿಖರವಾಗಿ ಊಹಿಸಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ',
    ob3Title: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಪ್ರೊಫೈಲ್',
    ob3Sub: 'ಇನ್ನೊಂದು ಹೆಜ್ಜೆ — ನೀವು ಬಹುತೇಕ ತಲುಪಿದ್ದೀರಿ!',
    obContinue: 'ಮುಂದುವರಿಯಿರಿ →',
    obFinish: '✓ ಆರಂಭಿಸೋಣ',
    obBack: 'ಹಿಂದೆ',
    yourAge: 'ನಿಮ್ಮ ವಯಸ್ಸು',
    agePlaceholder: 'ಉದಾ: 24',
    prefLanguage: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
    healthGoal: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಗುರಿ',
    lastPeriodDate: 'ಕೊನೆಯ ಮಾಸಿಕ ಪ್ರಾರಂಭ ದಿನಾಂಕ',
    avgCycleLen: 'ಸರಾಸರಿ ಚಕ್ರ ಅವಧಿ',
    cycleHint: '(ಮಾಸಿಕಗಳ ನಡುವಿನ ದಿನಗಳು)',
    avgPeriodDur: 'ಸರಾಸರಿ ಮಾಸಿಕ ಅವಧಿ',
    days: 'ದಿನಗಳು',
    doYouHave: 'ನಿಮಗೆ ಇವುಗಳಲ್ಲಿ ಯಾವುದಾದರೂ ಇದೆಯೇ?',
    condHint: '(ಅನ್ವಯಿಸುವ ಎಲ್ಲವನ್ನೂ ಆಯ್ಕೆ ಮಾಡಿ)',
    typicalStress: 'ಜೀವನದಲ್ಲಿ ಸಾಮಾನ್ಯ ಒತ್ತಡ ಮಟ್ಟ',
    veryLow: 'ತುಂಬಾ ಕಡಿಮೆ',
    veryHigh: 'ತುಂಬಾ ಹೆಚ್ಚು',
    obReadyMsg: 'ಸಿದ್ಧ! ನಿಮ್ಮ ವ್ಯಕ್ತಿಗತ ಮಾಸಿಕ ಸಂಗಾತಿ ಸಿದ್ಧವಾಗಿದೆ.',

    goalTrack: '📅 ನನ್ನ ಚಕ್ರ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    goalPCOS: '🔬 PCOS ನಿರ್ವಹಿಸಿ',
    goalPain: '💊 ನೋವು ಕಡಿಮೆ ಮಾಡಿ',
    goalEmotional: '💜 ಭಾವನಾತ್ಮಕ ಬೆಂಬಲ',

    condPCOS: '🔬 PCOS',
    condThyroid: '🦋 ಥೈರಾಯ್ಡ್ ಸಮಸ್ಯೆಗಳು',
    condEndo: '🩸 ಎಂಡೊಮೆಟ್ರಿಯೊಸಿಸ್',
    condAnemia: '💉 ರಕ್ತಹೀನತೆ',
    condNone: '✅ ಇವು ಯಾವುದೂ ಇಲ್ಲ',

    navHome: 'ಮುಖಪುಟ',
    navTracker: 'ಟ್ರ್ಯಾಕರ್',
    navInsights: 'ಒಳನೋಟ',
    navCompanion: 'ಸಂಗಾತಿ',
    navCare: 'ಆರೈಕೆ',
    navAwareness: 'ಜಾಗೃತಿ',
    navCalendar: 'ದಿನಚರಿ',
    navProfile: 'ಪ್ರೊಫೈಲ್',
    signOut: 'ಸೈನ್ ಔಟ್',
    langBtn: '🌐',

    greetMorning: 'ಶುಭೋದಯ,',
    greetAfternoon: 'ನಮಸ್ಕಾರ,',
    greetEvening: 'ಶುಭ ಸಂಜೆ,',
    dayOfCycle: 'ಚಕ್ರದ ದಿನ',
    nextPeriod: 'ಮುಂದಿನ ಮಾಸಿಕ',
    daysAway: '{n} ದಿನಗಳಲ್ಲಿ',
    today: 'ಇಂದು!',
    cyclePhaseProgress: 'ಚಕ್ರ ಹಂತ ಪ್ರಗತಿ',
    phaseMenstrual: 'ಮಾಸಿಕ',
    phaseFollicular: 'ಫೋಲಿಕ್ಯುಲರ್',
    phaseOvulation: 'ಅಂಡೋತ್ಸರ್ಜನ',
    phaseLuteal: 'ಲ್ಯೂಟಿಯಲ್',
    howFeelToday: 'ಇಂದು ನೀವು ಹೇಗೆ ಭಾವಿಸುತ್ತೀರಿ?',
    energyLevel: 'ಶಕ್ತಿ ಮಟ್ಟ',
    todaysInsight: 'ಇಂದಿನ ಒಳನೋಟ',
    careTipsToday: 'ಇಂದಿನ ಆರೈಕೆ ಸಲಹೆಗಳು',
    sleep: 'ನಿದ್ದೆ',
    water: 'ನೀರು',
    stress: 'ಒತ್ತಡ',
    flow: 'ಹರಿವು',
    logToday: '📝 ಇಂದು ಲಾಗ್ ಮಾಡಿ',
    talkCompanion: '💜 ಸಂಗಾತಿಯೊಂದಿಗೆ ಮಾತಾಡಿ',

    moodHappy: 'ಸಂತೋಷ',
    moodOkay: 'ಸರಿ',
    moodLow: 'ಉದಾಸ',
    moodAnxious: 'ಆತಂಕ',
    moodIrritable: 'ಕಿರಿಕಿರಿ',

    energyVeryLow: 'ತುಂಬಾ ಕಡಿಮೆ',
    energyLow: 'ಕಡಿಮೆ',
    energyModerate: 'ಮಧ್ಯಮ',
    energyGood: 'ಉತ್ತಮ',
    energyHigh: 'ಹೆಚ್ಚು',
    energyVeryHigh: 'ತುಂಬಾ ಹೆಚ್ಚು',

    dailyTracker: 'ದೈನಂದಿನ ಟ್ರ್ಯಾಕರ್',
    periodStartedToday: 'ಇಂದು ಮಾಸಿಕ ಪ್ರಾರಂಭವಾಯಿತೇ?',
    periodStartSub: 'ಮಾಸಿಕ ಪ್ರಾರಂಭ ಲಾಗ್ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
    flowIntensity: 'ಹರಿವಿನ ತೀವ್ರತೆ',
    flowNone: '⬜ ಏನೂ ಇಲ್ಲ',
    flowSpotting: '🔴 ಸ್ಪಾಟಿಂಗ್',
    flowLight: '🩸 ಹಗುರ',
    flowMedium: '🩸🩸 ಮಧ್ಯಮ',
    flowHeavy: '🩸🩸🩸 ಭಾರ',
    painLevel: 'ನೋವಿನ ಮಟ್ಟ',
    noPain: 'ನೋವಿಲ್ಲ',
    unbearable: 'ಸಹಿಸಲಾಗದ',
    symptomsToday: 'ಇಂದಿನ ಲಕ್ಷಣಗಳು',
    mood: 'ಮನಸ್ಥಿತಿ',
    lifestyleSignals: 'ಜೀವನಶೈಲಿ ಸಂಕೇತಗಳು',
    sleepHrs: '😴 ನಿದ್ದೆ (ಗಂಟೆ)',
    waterGlasses: '💧 ನೀರು (ಲೋಟ)',
    stressScale: '🧘 ಒತ್ತಡ (1–10)',
    activity: '🏃 ಚಟುವಟಿಕೆ',
    actNone: 'ಏನೂ ಇಲ್ಲ',
    actWalk: 'ನಡಿಗೆ',
    actExercise: 'ವ್ಯಾಯಾಮ',
    actYoga: 'ಯೋಗ',
    productivityImpact: 'ಇಂದಿನ ಉತ್ಪಾದಕತೆ ಪರಿಣಾಮ',
    saveTodayLog: '💾 ಇಂದಿನ ಲಾಗ್ ಉಳಿಸಿ',
    logSaved: '✅ ಲಾಗ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',

    symCramps: 'ಸೆಳೆತ',
    symHeadache: 'ತಲೆನೋವು',
    symFatigue: 'ಆಯಾಸ',
    symBloating: 'ಹೊಟ್ಟೆ ಉಬ್ಬರ',
    symAcne: 'ಮೊಡವೆ',
    symCravings: 'ತಿನ್ನಬೇಕೆನ್ನುವ ಬಯಕೆ',
    symNausea: 'ವಾಕರಿಕೆ',
    symBackPain: 'ಬೆನ್ನು ನೋವು',
    symBreast: 'ಎದೆ ಮೃದುತ್ವ',
    symMoodSwings: 'ಮನಸ್ಥಿತಿ ಬದಲಾವಣೆ',

    prodLowFocus: '📉 ಕಡಿಮೆ ಗಮನ',
    prodSkipped: '🏠 ಕೆಲಸ/ತರಗತಿ ತಪ್ಪಿಸಿದೆ',
    prodLowEnergy: '🔋 ಕಡಿಮೆ ಶಕ್ತಿ',
    prodSocial: '🚪 ಸಾಮಾಜಿಕ ಹಿಂತೆಗೆಯುವಿಕೆ',

    yourInsights: 'ನಿಮ್ಮ ಒಳನೋಟಗಳು',
    insightsSub: 'ನಿಮ್ಮ ಲಾಗ್ ಡೇಟಾ ಆಧಾರದ ಮೇಲೆ',
    cycleLengthTrend: 'ಚಕ್ರ ಅವಧಿ ಪ್ರವೃತ್ತಿ',
    moodPattern: 'ಮನಸ್ಥಿತಿ ಮಾದರಿ (ಕಳೆದ 7 ದಿನ)',
    painHistory: 'ನೋವಿನ ಇತಿಹಾಸ',
    whatToDoNext: 'ಮುಂದೇನು ಮಾಡಬೇಕು',

    compName: 'ನಾರಿ ಸಂಗಾತಿ',
    compStatus: '💚 ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ',
    iFeelLabel: 'ನನಗೆ ಅನಿಸುತ್ತಿದೆ...',
    feelStressed: '😰 ಒತ್ತಡ',
    feelCramps: '😣 ತೀವ್ರ ಸೆಳೆತ',
    feelAnxious: '😟 ಆತಂಕ',
    feelUnfocused: '😶 ಗಮನ ಇಲ್ಲ',
    feelLow: '😔 ತುಂಬಾ ಉದಾಸ',
    feelMotivation: '💪 ಪ್ರೇರಣೆ ಬೇಕು',
    chatPlaceholder: 'ನಿಮಗೆ ಹೇಗೆ ಅನಿಸುತ್ತಿದೆ...',

    careHub: 'ಆರೈಕೆ ಕೇಂದ್ರ',
    careHubSub: 'ಜಾಗೃತಿಯಿಂದ ಕ್ರಿಯೆಯವರೆಗೆ',
    exportReport: '📄 ಆರೋಗ್ಯ ವರದಿ ರಫ್ತು ಮಾಡಿ',
    doctorConnect: '🩺 ವೈದ್ಯರ ಸಂಪರ್ಕ',
    consultGyn: 'ಸ್ತ್ರೀರೋಗ ತಜ್ಞರನ್ನು ಭೇಟಿ ಮಾಡಿ',
    consultSub: 'ಅನಿಯಮಿತ ಚಕ್ರ, PCOS, ನೋವಿಗೆ ಸಹಾಯ',
    symptomSummary: 'ಲಕ್ಷಣ ಸಾರಾಂಶ',
    symptomSummarySub: 'ಸ್ವಯಂ-ರಚಿತ, ವೈದ್ಯರಿಗೆ ಸಿದ್ಧ ವರದಿ',
    communitySupport: '🌸 ಸಮುದಾಯ ಬೆಂಬಲ',
    supportSpace: 'ಮಹಿಳೆಯರ ಬೆಂಬಲ ಸ್ಥಳ',
    supportSub: 'ಅನಾಮಧೇಯ · ಮಧ್ಯಸ್ಥ · ಹಂಚಿಕೊಳ್ಳಲು ಸುರಕ್ಷಿತ',
    periodReminders: '📱 ಮಾಸಿಕ ಜ್ಞಾಪನೆಗಳು',

    awPcos: 'PCOS',
    awTips: 'ಆರೋಗ್ಯ ಸಲಹೆಗಳು',
    awMyths: 'ಮಿಥ್ಯ vs ವಾಸ್ತವ',
    awFood: 'ಭಾರತೀಯ ಆಹಾರ',
    awHormones: 'ಹಾರ್ಮೋನುಗಳು',
    awTitle: 'ಜಾಗೃತಿ ಮತ್ತು ಕಲಿಕೆ',
    awSub: 'ನಿಮ್ಮ ದೇಹ ತಿಳಿಯಿರಿ, ಆರೋಗ್ಯ ಸ್ವಾಮ್ಯ ಪಡೆಯಿರಿ',

    cycleCalendar: 'ಮಾಸಿಕ ದಿನಚರಿ',
    legendPeriod: 'ಮಾಸಿಕ',
    legendFertile: 'ಫಲವತ್ತಾದ',
    legendOvulation: 'ಅಂಡೋತ್ಸರ್ಜನ',
    legendPredicted: 'ಊಹಿಸಲಾದ',
    noDataDay: 'ಈ ದಿನಕ್ಕೆ ಡೇಟಾ ಲಾಗ್ ಮಾಡಿಲ್ಲ.',
    logDataLink: 'ಇಂದಿನ ಡೇಟಾ ಲಾಗ್ ಮಾಡಿ →',

    yourProfile: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್',
    healthProfile: 'ಆರೋಗ್ಯ ಪ್ರೊಫೈಲ್',
    editDetails: 'ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ',
    cycleLengthDays: 'ಚಕ್ರ ಅವಧಿ (ದಿನಗಳು)',
    periodDurationDays: 'ಮಾಸಿಕ ಅವಧಿ (ದಿನಗಳು)',
    lastPeriodDateLbl: 'ಕೊನೆಯ ಮಾಸಿಕ ದಿನಾಂಕ',
    saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
    profileUpdated: '✅ ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಲಾಗಿದೆ!',
    dataManagement: 'ಡೇಟಾ ನಿರ್ವಹಣೆ',
    exportAllData: '📥 ನನ್ನ ಎಲ್ಲ ಡೇಟಾ ರಫ್ತು ಮಾಡಿ (CSV)',
    clearAllData: '🗑️ ಎಲ್ಲ ಡೇಟಾ ತೆಗೆದುಹಾಕಿ',
    clearConfirm: 'ಖಚಿತವೇ? ಇದು ನಿಮ್ಮ ಎಲ್ಲ ಆರೋಗ್ಯ ಲಾಗ್‌ಗಳನ್ನು ಅಳಿಸುತ್ತದೆ.',

    chooseLang: 'ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ',
    langSubtext: 'ಪೂರ್ಣ ಆಪ್ ಅನುಭವಕ್ಕಾಗಿ ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ',
    langEnglish: 'English',
    langHindi: 'हिन्दी (Hindi)',
    langMalayalam: 'മലയാളം (Malayalam)',
    langKannada: 'ಕನ್ನಡ (Kannada)',
  }
};

// Current language
let LANG = 'en';

function t(key) {
  return (TRANSLATIONS[LANG] && TRANSLATIONS[LANG][key]) || TRANSLATIONS.en[key] || key;
}

function applyLanguage(lang) {
  LANG = lang;
  DB.setMeta('appLang', lang);

  // App name & tagline
  document.querySelectorAll('.splash-logo h1').forEach(el => el.textContent = t('appName'));
  document.querySelectorAll('.splash-logo p').forEach(el => el.textContent = t('appTagline'));
  document.querySelectorAll('.splash-tagline').forEach(el => el.textContent = t('trackLine'));
  document.querySelectorAll('.header-brand').forEach(el => el.textContent = '🌸 ' + t('appName'));

  // Auth
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.dataset.t;
    if (el.tagName === 'INPUT') el.placeholder = t(key);
    else el.textContent = t(key);
  });

  // Nav labels
  document.querySelectorAll('.bn-item').forEach(btn => {
    const sec = btn.dataset.section;
    const map = { home:'navHome', tracker:'navTracker', insights:'navInsights', companion:'navCompanion', care:'navCare' };
    if (map[sec]) btn.querySelector('.bn-label').textContent = t(map[sec]);
  });
  document.querySelectorAll('.sb-link').forEach(link => {
    const sec = link.dataset.section;
    const map = { home:'navHome', tracker:'navTracker', insights:'navInsights', companion:'navCompanion', care:'navCare', awareness:'navAwareness', calendar:'navCalendar', profile:'navProfile' };
    const icons = { home:'🏠', tracker:'📅', insights:'✨', companion:'💜', care:'🩺', awareness:'📚', calendar:'🗓️', profile:'👤' };
    if (map[sec]) link.textContent = (icons[sec] || '') + ' ' + t(map[sec]);
  });
  document.querySelectorAll('.sb-logout').forEach(el => el.textContent = t('signOut'));

  // Re-render active sections with new language
  if (STATE?.currentUser) {
    renderHomeScreen();
    if (STATE.currentSection === 'tracker') updateTrackerLabels();
    if (STATE.currentSection === 'insights') renderInsights();
    if (STATE.currentSection === 'companion') updateCompanionLabels();
    if (STATE.currentSection === 'care') { renderReminders(); updateCareLabels(); }
    if (STATE.currentSection === 'awareness') updateAwarenessLabels();
    if (STATE.currentSection === 'calendar') updateCalendarLabels();
    if (STATE.currentSection === 'profile') updateProfileLabels();
  }

  // Update lang button display
  const langDisplayMap = { en: 'EN', hi: 'हि', ml: 'ML', kn: 'ಕ' };
  document.getElementById('curr-lang').textContent = langDisplayMap[lang] || 'EN';
}

function updateTrackerLabels() {
  setTextById('section-tracker', '.section-header h2', t('dailyTracker'));
  setLabelText('tt-title', t('periodStartedToday'));
  setLabelText('tt-sub', t('periodStartSub'));
  // Symptoms
  const symMap = ['Cramps','Headache','Fatigue','Bloating','Acne','Cravings','Nausea','Back pain','Breast tenderness','Mood swings'];
  const symKeys = ['symCramps','symHeadache','symFatigue','symBloating','symAcne','symCravings','symNausea','symBackPain','symBreast','symMoodSwings'];
  document.querySelectorAll('#symptom-grid .s-chip').forEach((el, i) => { if (symKeys[i]) el.textContent = t(symKeys[i]); });
  document.querySelectorAll('#prod-grid .prod-chip').forEach((el, i) => {
    const pk = ['prodLowFocus','prodSkipped','prodLowEnergy','prodSocial'];
    if (pk[i]) el.textContent = t(pk[i]);
  });
  document.querySelector('.full-btn')?.textContent !== undefined && (document.querySelector('#section-tracker .full-btn').textContent = t('saveTodayLog'));
}

function updateCompanionLabels() {
  document.querySelector('.comp-name').textContent = t('compName');
  document.querySelector('.comp-status').textContent = t('compStatus');
  document.querySelector('.qf-label').textContent = t('iFeelLabel');
  document.getElementById('chat-input').placeholder = t('chatPlaceholder');
  const feelKeys = ['feelStressed','feelCramps','feelAnxious','feelUnfocused','feelLow','feelMotivation'];
  document.querySelectorAll('.qf-chip').forEach((el, i) => { if (feelKeys[i]) el.textContent = t(feelKeys[i]); });
}

function updateCareLabels() {
  document.querySelector('#section-care .section-header h2').textContent = t('careHub');
  document.querySelector('#section-care .section-header p').textContent = t('careHubSub');
  document.querySelector('.report-btn').textContent = t('exportReport');
}

function updateAwarenessLabels() {
  document.querySelector('#section-awareness .section-header h2').textContent = t('awTitle');
  document.querySelector('#section-awareness .section-header p').textContent = t('awSub');
  const tabKeys = ['awPcos','awTips','awMyths','awFood','awHormones'];
  document.querySelectorAll('.aw-tab').forEach((el, i) => { if (tabKeys[i]) el.textContent = t(tabKeys[i]); });
}

function updateCalendarLabels() {
  document.querySelector('#section-calendar .section-header h2').textContent = t('cycleCalendar');
  const legendDots = document.querySelectorAll('.calendar-legend span');
  if (legendDots[0]) legendDots[0].innerHTML = `<span class="cl-dot" style="background:var(--rose)"></span> ${t('legendPeriod')}`;
  if (legendDots[1]) legendDots[1].innerHTML = `<span class="cl-dot" style="background:var(--teal)"></span> ${t('legendFertile')}`;
  if (legendDots[2]) legendDots[2].innerHTML = `<span class="cl-dot" style="background:#F4C842"></span> ${t('legendOvulation')}`;
  if (legendDots[3]) legendDots[3].innerHTML = `<span class="cl-dot" style="background:var(--lavender-dark)"></span> ${t('legendPredicted')}`;
}

function updateProfileLabels() {
  document.querySelector('#section-profile .section-header h2').textContent = t('yourProfile');
}

function setTextById(sectionId, selector, text) {
  const el = document.querySelector(`#${sectionId} ${selector}`);
  if (el) el.textContent = text;
}
function setLabelText(cls, text) {
  document.querySelectorAll(`.${cls}`).forEach(el => el.textContent = text);
}
