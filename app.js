/**
 * NAARI CYCLE — app.js
 * Full application logic — Refactored & Production-Ready
 */

// ── STATE ─────────────────────────────────────────────────
let STATE = {
  currentUser: null,
  currentSection: 'home',
  trackerData: {
    periodStarted: false,
    flow: 'None',
    painLevel: 0,
    symptoms: [],
    mood: '',
    energyLevel: 5,
    sleep: 7,
    water: 6,
    stress: 5,
    activity: 'None',
    productivity: []
  },
  calendarDate: new Date(),
  obStep: 1,
  obData: {
    ageGroup: '',
    language: 'English',
    goals: [],
    cycleLength: 28,
    periodDuration: 5,
    conditions: [],
    stressLevel: 5,
    obRegularity: '',
    obTroubles: [],
    obPainLevel: '',
    obSleepQuality: '',
    obStressLevel: '',
    obActivityLevel: '',
    obFoodHabits: '',
    obFoodPref: '',
    obMovement: ''
  },
  langMode: 'EN',
  homeMood: '',
  homeEnergy: 5
};

const TODAY = new Date().toISOString().split('T')[0];

// ── BOOT ──────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  // Wait for splash to fade, then check auth
  setTimeout(async () => {
    const splashEl = document.getElementById('splash-screen');
    if (splashEl) splashEl.style.display = 'none';

    try {
      const savedUserId = await DB.getMeta('currentUserId');
      if (savedUserId) {
        const user = await DB.getUserById(savedUserId);
        if (user) {
          await loginSuccess(user);
          return;
        }
      }
    } catch (e) {
      console.warn('Boot auth check failed:', e);
    }
    showScreen('auth');
  }, 2600);

  // Load saved language
  try {
    const savedLang = await DB.getMeta('appLang') || 'en';
    if (savedLang && TRANSLATIONS && TRANSLATIONS[savedLang]) {
      applyLanguage(savedLang);
      const m = { en: 'EN', hi: 'हि', ml: 'ML', kn: 'ಕ' };
      const currLangEl = document.getElementById('curr-lang');
      if (currLangEl) currLangEl.textContent = m[savedLang] || 'EN';
    }
  } catch (e) {
    console.warn('Language load failed:', e);
  }

  const trackerDateEl = document.getElementById('tracker-date');
  if (trackerDateEl) trackerDateEl.textContent = formatDate(new Date());

  setDefaultDate();
});

function setDefaultDate() {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setDate(today.getDate() - 14);
  const lastPeriodInput = document.getElementById('ob-last-period');
  if (lastPeriodInput) lastPeriodInput.valueAsDate = lastMonth;
}

// ── SCREEN MANAGEMENT ─────────────────────────────────────
function showScreen(name) {
  ['splash-screen', 'auth-screen', 'onboarding-screen'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('active');
    el.style.display = '';
  });

  const mainApp = document.getElementById('main-app');
  if (mainApp) mainApp.classList.add('hidden');

  if (name === 'auth') {
    const el = document.getElementById('auth-screen');
    if (el) { el.style.display = 'flex'; el.classList.add('active'); }
  } else if (name === 'onboarding') {
    const el = document.getElementById('onboarding-screen');
    if (el) { el.style.display = 'flex'; el.classList.add('active'); }
  } else if (name === 'app') {
    if (mainApp) mainApp.classList.remove('hidden');
  }
}

// ── AUTH ──────────────────────────────────────────────────
let authMode = 'login';

function switchAuth(mode) {
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach((t, i) =>
    t.classList.toggle('active', (i === 0 && mode === 'login') || (i === 1 && mode === 'signup'))
  );

  const titleEl = document.getElementById('auth-title');
  const subEl = document.getElementById('auth-sub');
  const btnEl = document.getElementById('auth-btn-text');
  const pwdInput = document.getElementById('auth-password-group')?.querySelector('input');
  const nameParent = document.getElementById('auth-name')?.parentElement;
  const errEl = document.getElementById('auth-error');

  if (titleEl) titleEl.textContent = mode === 'login' ? 'Welcome Back' : 'Create Account';
  if (subEl) subEl.textContent = mode === 'login' ? 'Sign in to continue your care journey' : 'Start your cycle care journey today';
  if (btnEl) btnEl.textContent = mode === 'login' ? 'Sign In' : 'Create Account';
  if (pwdInput) pwdInput.placeholder = mode === 'login' ? 'Your password' : 'Create a password';
  if (nameParent) nameParent.style.display = '';
  if (errEl) errEl.textContent = '';
}

async function handleAuth() {
  const nameEl = document.getElementById('auth-name');
  const emailEl = document.getElementById('auth-email');
  const passwordEl = document.getElementById('auth-password');
  const errEl = document.getElementById('auth-error');

  const name = nameEl?.value?.trim() || '';
  const email = emailEl?.value?.trim() || '';
  const password = passwordEl?.value || '';

  if (!email || !password) {
    if (errEl) errEl.textContent = 'Please fill in all fields.';
    return;
  }

  let result;
  try {
    if (authMode === 'signup') {
      result = await DB.createUser(name, email, password);
    } else {
      result = await DB.loginUser(email, password);
    }
  } catch (e) {
    console.error('Auth error:', e);
    if (errEl) errEl.textContent = 'Something went wrong. Please try again.';
    return;
  }

  if (!result || result.error || !result.user) {
    if (errEl) errEl.textContent = result?.error || 'Something went wrong';
    return;
  }

  await loginSuccess(result.user, authMode === 'signup');
}

async function loginSuccess(user, isNew = false) {
  if (!user || !user.id) {
    console.error('Invalid user:', user);
    return;
  }

  STATE.currentUser = user;

  try {
    await DB.setMeta('currentUserId', user.id);
  } catch (e) {
    console.warn('Could not persist userId:', e);
  }

  updateHeaderUI(user);

  let profile = null;
  try {
    profile = await DB.getHealthProfile(user.id);
  } catch (e) {
    console.warn('Could not load health profile:', e);
  }

  if (!profile || !profile.completedOnboarding || isNew) {
    showScreen('onboarding');
  } else {
    await launchApp();
  }
}

function logout() {
  STATE.currentUser = null;
  try { DB.setMeta('currentUserId', null); } catch (e) { /* ignore */ }
  toggleSidebar(false);
  showScreen('auth');
  ['auth-name', 'auth-email', 'auth-password'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const errEl = document.getElementById('auth-error');
  if (errEl) errEl.textContent = '';
}

function updateHeaderUI(user) {
  if (!user || !user.name) return;
  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('user-avatar-header', initials);
  setEl('sb-avatar', initials);
  setEl('sb-name', user.name);
  setEl('sb-email', user.email || '');
  setEl('profile-avatar-lg', initials);
  setEl('profile-name-lg', user.name);
  setEl('profile-email-lg', user.email || '');
  setEl('greeting-name', (user.name.split(' ')[0] || user.name) + ' 🌸');
}

// ── ONBOARDING ────────────────────────────────────────────
async function obNext() {
  if (STATE.obStep === 1) {
    if (!STATE.obData.ageGroup) { showToast('Please select your age group'); return; }
    goToObStep(2);
  } else if (STATE.obStep === 2) {
    const lastPeriodEl = document.getElementById('ob-last-period');
    const lastPeriod = lastPeriodEl?.value;
    if (!lastPeriod) { showToast('Please enter your last period date'); return; }
    STATE.obData.lastPeriodDate = lastPeriod;
    goToObStep(3);
  } else if (STATE.obStep === 3) {
    goToObStep(4);
  } else if (STATE.obStep === 4) {
    goToObStep(5);
  } else if (STATE.obStep === 5) {
    if (!STATE.obData.goals || STATE.obData.goals.length === 0) {
      showToast('Please pick at least one goal');
      return;
    }
    goToObStep(6);
  } else if (STATE.obStep === 6) {
    STATE.obData.completedOnboarding = true;
    try {
      await DB.saveHealthProfile(STATE.currentUser.id, STATE.obData);
    } catch (e) {
      console.warn('Could not save onboarding profile:', e);
    }
    await launchApp();
  }
}

function obBack() {
  if (STATE.obStep > 1) goToObStep(STATE.obStep - 1);
}

function goToObStep(step) {
  const prevStep = document.getElementById(`ob-step-${STATE.obStep}`);
  const prevDot = document.getElementById(`step-dot-${STATE.obStep}`);
  if (prevStep) prevStep.classList.remove('active');
  if (prevDot) prevDot.classList.remove('active');

  STATE.obStep = step;

  const nextStep = document.getElementById(`ob-step-${step}`);
  const nextDot = document.getElementById(`step-dot-${step}`);
  if (nextStep) nextStep.classList.add('active');
  if (nextDot) nextDot.classList.add('active');

  const backBtn = document.getElementById('ob-back-btn');
  const nextBtn = document.getElementById('ob-next-btn');
  if (backBtn) backBtn.style.display = step > 1 ? '' : 'none';
  if (nextBtn) nextBtn.textContent = step === 6 ? "✓ Let's Start" : 'Continue →';

  const titles = [
    "What should we call you? 🌸",
    "Your cycle details 📅",
    "What troubles you most? 😮‍💨",
    "Sleep & stress check 😴",
    "What would help you most? 💜",
    "A few more details ✨"
  ];
  const subs = [
    "Your cycle buddy should know your name, right?",
    "Helps us predict your cycle accurately",
    "Tell us what usually makes you go uff",
    "Be honest — we won't judge! 😄",
    "Tell us your vibe, we'll guide you better",
    "Optional — skip what you're not comfortable with"
  ];
  const titleEl = document.getElementById('ob-title');
  const subEl = document.getElementById('ob-sub');
  if (titleEl) titleEl.textContent = titles[step - 1] || '';
  if (subEl) subEl.textContent = subs[step - 1] || '';
}

function selectLang(el) {
  document.querySelectorAll('.lang-chip').forEach(c => c.classList.remove('selected'));
  if (el) { el.classList.add('selected'); STATE.obData.language = el.dataset.val || 'English'; }
}

function selectGoal(el) {
  document.querySelectorAll('.goal-chip').forEach(c => c.classList.remove('selected'));
  if (el) { el.classList.add('selected'); STATE.obData.goal = el.dataset.val || 'Track cycle'; }
}

// Single-select chip for onboarding (generic)
function selectObChip(el, groupId, stateKey) {
  document.querySelectorAll(`#${groupId} .ob-option-chip`).forEach(c => c.classList.remove('selected'));
  if (el) {
    el.classList.add('selected');
    STATE.obData[stateKey] = el.dataset.val;
    // also write to profile-level state for profile page chips
    if (stateKey.startsWith('profile')) STATE[stateKey] = el.dataset.val;
  }
}

// Multi-select for troubles
function toggleMultiChip(el, stateKey) {
  if (!el) return;
  el.classList.toggle('selected');
  const container = el.closest('.condition-grid') || el.parentElement;
  STATE.obData[stateKey] = [...container.querySelectorAll('.cond-chip.selected')].map(c => c.dataset.val);
}

// Goal cards (multi-select)
function toggleObGoal(el) {
  if (!el) return;
  el.classList.toggle('selected');
  STATE.obData.goals = [...document.querySelectorAll('#goal-cards .ob-goal-card.selected')].map(c => c.dataset.val);
}

function toggleCond(el) {
  if (!el) return;
  if (el.dataset.val === 'None') {
    document.querySelectorAll('.cond-chip').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    STATE.obData.conditions = ['None'];
    return;
  }
  document.querySelector('.cond-chip[data-val="None"]')?.classList.remove('selected');
  el.classList.toggle('selected');
  STATE.obData.conditions = [...document.querySelectorAll('.cond-chip.selected')].map(c => c.dataset.val);
}

function adjustCycle(delta) {
  STATE.obData.cycleLength = Math.max(20, Math.min(60, (STATE.obData.cycleLength || 28) + delta));
  const el = document.getElementById('cycle-len-val');
  if (el) el.textContent = STATE.obData.cycleLength;
}

function adjustDuration(delta) {
  STATE.obData.periodDuration = Math.max(1, Math.min(10, (STATE.obData.periodDuration || 5) + delta));
  const el = document.getElementById('period-dur-val');
  if (el) el.textContent = STATE.obData.periodDuration;
}

function updateStressLabel(val) {
  const labels = ['', 'Very low (1)', 'Low (2)', 'Quite low (3)', 'Mild (4)', 'Moderate (5)',
    'Somewhat high (6)', 'High (7)', 'Very high (8)', 'Extremely high (9)', 'Overwhelming (10)'];
  const el = document.getElementById('stress-val-label');
  if (el) el.textContent = labels[val] || `Level ${val}`;
}

// ── LAUNCH APP ────────────────────────────────────────────
async function launchApp() {
  try {
    const savedLang = await DB.getMeta('appLang') || 'en';
    if (savedLang && TRANSLATIONS && TRANSLATIONS[savedLang]) applyLanguage(savedLang);
  } catch (e) { /* ignore */ }

  showScreen('app');
  showSection('home');

  // Run all renders — catch individually so one failure doesn't block others
  await safeRun(renderHomeScreen, 'renderHomeScreen');
  safeRun(renderCalendar, 'renderCalendar');
  safeRun(renderInsights, 'renderInsights');
  await safeRun(renderReminders, 'renderReminders');
  safeRun(loadProfileInfo, 'loadProfileInfo');
  await safeRun(initCompanion, 'initCompanion');
  await safeRun(loadTodayTrackerData, 'loadTodayTrackerData');

  try { DB.testConnection(); } catch (e) { /* ignore */ }
}

async function safeRun(fn, label) {
  try {
    await fn();
  } catch (e) {
    console.warn(`[${label}] failed:`, e);
  }
}

// ── SIDEBAR ───────────────────────────────────────────────
function toggleSidebar(forceClose = null) {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if (!sb || !ov) return;
  const isOpen = sb.classList.contains('open');
  const shouldOpen = forceClose === false ? false : forceClose === null ? !isOpen : !!forceClose;
  sb.classList.toggle('open', shouldOpen);
  ov.classList.toggle('active', shouldOpen);
}

// ── SECTION NAVIGATION ────────────────────────────────────
function showSection(name) {
  toggleSidebar(false);
  document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sb-link').forEach(l => l.classList.toggle('active', l.dataset.section === name));
  document.querySelectorAll('.bn-item').forEach(b => b.classList.toggle('active', b.dataset.section === name));
  const el = document.getElementById(`section-${name}`);
  if (el) el.classList.add('active');
  STATE.currentSection = name;

  if (name === 'insights') safeRun(renderInsights, 'renderInsights');
  if (name === 'calendar') safeRun(renderCalendar, 'renderCalendar');
  if (name === 'home') safeRun(renderHomeScreen, 'renderHomeScreen');
  if (name === 'profile') safeRun(loadProfileInfo, 'loadProfileInfo');
  if (name === 'care') safeRun(renderReminders, 'renderReminders');
}

// ── HOME SCREEN ───────────────────────────────────────────
async function renderHomeScreen() {
  if (!STATE.currentUser) return;

  let profile = null;
  try {
    profile = await DB.getHealthProfile(STATE.currentUser.id);
  } catch (e) {
    console.warn('renderHomeScreen: could not load profile:', e);
  }
  if (!profile) return;

  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good morning,' : hr < 17 ? 'Good afternoon,' : 'Good evening,';
  const greetEl = document.getElementById('greeting-text');
  if (greetEl) greetEl.textContent = greet;

  const cycleInfo = calculateCycleInfo(profile);

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  setEl('cycle-day-num', cycleInfo.dayOfCycle);
  setEl('greeting-phase', cycleInfo.phase);

  const nextPeriodStr = isValidDate(cycleInfo.nextPeriodDate)
    ? formatDate(new Date(cycleInfo.nextPeriodDate))
    : '–';
  setEl('next-period-date', nextPeriodStr);

  let daysUntil = 0;
  if (isValidDate(cycleInfo.nextPeriodDate)) {
    daysUntil = Math.max(0, Math.ceil((new Date(cycleInfo.nextPeriodDate) - new Date()) / 86400000));
  }
  setEl('np-days-badge', daysUntil === 0 ? 'Today!' : `In ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`);

  const phaseFill = document.getElementById('phase-fill-bar');
  if (phaseFill) phaseFill.style.width = `${cycleInfo.phaseProgress}%`;
  setEl('phase-note', cycleInfo.phaseNote);
  setEl('insight-text', cycleInfo.insight);

  const chips = document.getElementById('action-chips');
  if (chips) {
    chips.innerHTML = (cycleInfo.actionTips || []).map(t => `<div class="action-chip">${t}</div>`).join('');
  }

  await renderAlerts(profile, cycleInfo, daysUntil);

  let todayLog = null;
  try {
    todayLog = await DB.getDailyLog(STATE.currentUser.id, TODAY);
  } catch (e) { /* ignore */ }

  setEl('ms-sleep', todayLog?.sleep || '–');
  setEl('ms-water', todayLog?.water || '–');
  setEl('ms-stress', todayLog?.stress ? todayLog.stress + '/10' : '–');
  setEl('ms-flow', todayLog?.flow || '–');

  if (todayLog?.mood) {
    document.querySelectorAll('#home-mood-row .mood-chip').forEach(c => {
      const fnStr = c.getAttribute('onclick') || '';
      c.classList.toggle('selected', fnStr.includes(`'${todayLog.mood}'`));
    });
  }
}

function calculateCycleInfo(profile) {
  const cycleLen = Math.max(20, Math.min(60, parseInt(profile?.cycleLength) || 28));
  const periodDur = Math.max(1, Math.min(10, parseInt(profile?.periodDuration) || 5));

  if (!profile?.lastPeriodDate) return buildFallback(cycleLen);

  const lastPeriod = new Date(profile.lastPeriodDate);
  if (!isValidDate(lastPeriod)) return buildFallback(cycleLen);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  lastPeriod.setHours(0, 0, 0, 0);

  const daysSince = Math.floor((today - lastPeriod) / 86400000);

  let dayOfCycle;
  if (daysSince < 0) {
    dayOfCycle = Math.max(1, cycleLen + daysSince + 1);
  } else {
    dayOfCycle = (daysSince % cycleLen) + 1;
  }

  const periodsElapsed = daysSince < 0 ? 0 : Math.floor(daysSince / cycleLen);
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + (periodsElapsed + 1) * cycleLen);

  const phase = getPhase(dayOfCycle, cycleLen);
  const phaseInfo = getPhaseInfo(phase, dayOfCycle, daysUntilNextPeriod(nextPeriod));

  return {
    dayOfCycle,
    cycleLen,
    phase,
    phaseNote: phaseInfo.note,
    phaseProgress: Math.min(100, Math.round((dayOfCycle / cycleLen) * 100)),
    nextPeriodDate: nextPeriod.toISOString().split('T')[0],
    insight: phaseInfo.insight,
    actionTips: phaseInfo.tips
  };
}

function buildFallback(cycleLen = 28) {
  return {
    dayOfCycle: 1,
    cycleLen,
    phase: 'Unknown',
    phaseNote: 'Complete your profile to see cycle info',
    phaseProgress: 0,
    nextPeriodDate: new Date().toISOString().split('T')[0],
    insight: 'Add your last period date in Profile to unlock predictions',
    actionTips: ['Go to Profile', 'Complete your setup']
  };
}

function daysUntilNextPeriod(nextPeriodDate) {
  if (!isValidDate(nextPeriodDate)) return 0;
  return Math.max(0, Math.ceil((new Date(nextPeriodDate) - new Date()) / 86400000));
}

function getPhase(day, cycleLen = 28) {
  if (day <= 5) return 'Menstrual';
  if (day <= Math.round(cycleLen * 0.46)) return 'Follicular';
  if (day <= Math.round(cycleLen * 0.61)) return 'Ovulation';
  return 'Luteal';
}

function getPhaseInfo(phase, day, daysUntil) {
  const info = {
    Menstrual: {
      note: 'Rest and restore — your body is working hard',
      insight: 'Iron-rich foods and warmth help during menstruation',
      tips: ['Rest more today', 'Eat iron-rich foods', 'Use a heating pad']
    },
    Follicular: {
      note: 'Energy is rising — great time to start new things',
      insight: 'Oestrogen peaks in this phase — you may feel more motivated',
      tips: ['Start new projects', 'Exercise freely', 'Stay hydrated']
    },
    Ovulation: {
      note: 'Peak energy and communication — you\'re glowing!',
      insight: 'Ovulation window — energy and mood are typically at their best',
      tips: ['Connect with others', 'Tackle challenges', 'Track fertile signs']
    },
    Luteal: {
      note: daysUntil <= 7 ? 'PMS window — be gentle with yourself' : 'Wind-down phase — prioritise self-care',
      insight: 'Progesterone rises — cravings and mood shifts are normal',
      tips: ['Practice self-care', 'Limit caffeine', 'Prioritise sleep']
    },
    Unknown: {
      note: 'Complete your profile to see personalised insights',
      insight: 'Tracking helps improve cycle accuracy over time',
      tips: ['Log daily', 'Update profile', 'Stay hydrated']
    }
  };
  return info[phase] || info.Unknown;
}

function isValidDate(val) {
  if (!val) return false;
  const d = val instanceof Date ? val : new Date(val);
  return !isNaN(d.getTime());
}

async function renderAlerts(profile, cycleInfo, daysUntil) {
  const banner = document.getElementById('alerts-banner');
  if (!banner) return;

  const alerts = [];

  if (daysUntil <= 3 && daysUntil > 0) {
    alerts.push(`📅 Period expected in ${daysUntil} day${daysUntil !== 1 ? 's' : ''} — prepare your comfort kit!`);
  }
  if (daysUntil === 0) {
    alerts.push('🩸 Your period may start today. Track it in the Tracker!');
  }

  try {
    const todayLog = await DB.getDailyLog(STATE.currentUser.id, TODAY);
    if (!todayLog) alerts.push('📝 You haven\'t logged today yet — tap "Log Today" to track your health!');
  } catch (e) { /* ignore */ }

  try {
    const cycles = await DB.getCyclesForUser(STATE.currentUser.id);
    if (Array.isArray(cycles) && cycles.length >= 3) {
      const lengths = cycles.slice(0, 5).map(c => c.length).filter(Boolean);
      if (lengths.length >= 2) {
        const max = Math.max(...lengths), min = Math.min(...lengths);
        if (max - min > 7) {
          alerts.push('⚠️ Cycle irregularity detected across recent cycles. Check Insights for details.');
        }
      }
    }
  } catch (e) { /* ignore */ }

  banner.innerHTML = alerts.map(a => `<div class="alert-item">${a}</div>`).join('');
}

// ── TRACKER ───────────────────────────────────────────────
async function loadTodayTrackerData() {
  if (!STATE.currentUser) return;

  let log = null;
  try {
    log = await DB.getDailyLog(STATE.currentUser.id, TODAY);
  } catch (e) {
    console.warn('loadTodayTrackerData: could not load log:', e);
    return;
  }
  if (!log) return;

  const toggleEl = document.getElementById('period-toggle');
  if (log.periodStarted && toggleEl) toggleEl.checked = true;

  if (log.flow) selectFlowSilent(log.flow);

  const painSlider = document.getElementById('pain-slider');
  const painDisplay = document.getElementById('pain-val-display');
  if (log.painLevel !== undefined && painSlider) {
    painSlider.value = log.painLevel;
    if (painDisplay) painDisplay.textContent = log.painLevel;
  }

  if (Array.isArray(log.symptoms)) {
    log.symptoms.forEach(s => {
      document.querySelectorAll('#symptom-grid .s-chip').forEach(c => {
        if (c.dataset.val === s) c.classList.add('selected');
      });
    });
  }

  if (log.mood) {
    document.querySelectorAll('#tracker-mood-row .mood-chip').forEach(c => {
      const fnStr = c.getAttribute('onclick') || '';
      if (fnStr.includes(`'${log.mood}'`)) c.classList.add('selected');
    });
  }

  const energySlider = document.getElementById('energy-slider');
  const energyDisplay = document.getElementById('energy-val-display');
  if (log.energyLevel !== undefined && energySlider) {
    energySlider.value = log.energyLevel;
    if (energyDisplay) energyDisplay.textContent = log.energyLevel;
  }

  const sleepEl = document.getElementById('sleep-tracker');
  const sleepDisplay = document.getElementById('sleep-display');
  if (log.sleep !== undefined && sleepEl) {
    sleepEl.value = log.sleep;
    if (sleepDisplay) sleepDisplay.textContent = parseFloat(log.sleep).toFixed(1);
  }

  const waterEl = document.getElementById('water-tracker');
  const waterDisplay = document.getElementById('water-display');
  if (log.water !== undefined && waterEl) {
    waterEl.value = log.water;
    if (waterDisplay) waterDisplay.textContent = log.water;
  }

  const stressEl = document.getElementById('stress-tracker');
  const stressDisplay = document.getElementById('stress-display');
  if (log.stress !== undefined && stressEl) {
    stressEl.value = log.stress;
    if (stressDisplay) stressDisplay.textContent = log.stress;
  }

  if (log.activity) selectActivitySilent(log.activity);

  if (Array.isArray(log.productivity)) {
    log.productivity.forEach(p => {
      document.querySelectorAll('#prod-grid .prod-chip').forEach(c => {
        if (c.dataset.val === p) c.classList.add('selected');
      });
    });
  }
}

function togglePeriodStart() {
  const el = document.getElementById('period-toggle');
  STATE.trackerData.periodStarted = el ? el.checked : false;
}

function selectFlow(el, val) {
  document.querySelectorAll('.flow-btns:not(.small) .flow-btn').forEach(b => b.classList.remove('selected'));
  if (el) el.classList.add('selected');
  STATE.trackerData.flow = val || 'None';
}

function selectFlowSilent(val) {
  document.querySelectorAll('.flow-btns:not(.small) .flow-btn').forEach(b => {
    const fnStr = b.getAttribute('onclick') || '';
    b.classList.toggle('selected', fnStr.includes(`'${val}'`));
  });
  STATE.trackerData.flow = val || 'None';
}

function selectActivity(el, val) {
  document.querySelectorAll('.flow-btns.small .flow-btn').forEach(b => b.classList.remove('selected'));
  if (el) el.classList.add('selected');
  STATE.trackerData.activity = val || 'None';
}

function selectActivitySilent(val) {
  document.querySelectorAll('.flow-btns.small .flow-btn').forEach(b => {
    const fnStr = b.getAttribute('onclick') || '';
    b.classList.toggle('selected', fnStr.includes(`'${val}'`));
  });
  STATE.trackerData.activity = val || 'None';
}

function updatePainDisplay(val) {
  const el = document.getElementById('pain-val-display');
  if (el) el.textContent = val;
  STATE.trackerData.painLevel = parseInt(val) || 0;
}

function updateEnergyDisplay(val) {
  const el = document.getElementById('energy-val-display');
  if (el) el.textContent = val;
  STATE.trackerData.energyLevel = parseInt(val) || 5;
}

function toggleChip(el) {
  if (!el) return;
  el.classList.toggle('selected');
  const isSymptom = !!el.closest('#symptom-grid');
  if (isSymptom) {
    STATE.trackerData.symptoms = [...document.querySelectorAll('#symptom-grid .s-chip.selected')].map(c => c.dataset.val);
  } else {
    STATE.trackerData.productivity = [...document.querySelectorAll('#prod-grid .prod-chip.selected')].map(c => c.dataset.val);
  }
}

function selectTrackerMood(el, val) {
  document.querySelectorAll('#tracker-mood-row .mood-chip').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
  STATE.trackerData.mood = val || '';
}

async function selectHomeMood(el, val) {
  document.querySelectorAll('#home-mood-row .mood-chip').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
  STATE.homeMood = val || '';

  if (!STATE.currentUser) return;
  try {
    const existing = await DB.getDailyLog(STATE.currentUser.id, TODAY) || {};
    await DB.saveDailyLog(STATE.currentUser.id, TODAY, { ...existing, mood: val });
  } catch (e) {
    console.warn('selectHomeMood save failed:', e);
  }
}

async function updateHomeEnergy(val) {
  STATE.homeEnergy = parseInt(val) || 5;
  const labels = ['', 'Very Low', 'Very Low', 'Low', 'Low', 'Moderate', 'Moderate', 'Good', 'Good', 'High', 'Very High'];
  const energyLabel = document.getElementById('energy-label');
  if (energyLabel) energyLabel.textContent = labels[val] || val;

  if (!STATE.currentUser) return;
  try {
    const existing = await DB.getDailyLog(STATE.currentUser.id, TODAY) || {};
    await DB.saveDailyLog(STATE.currentUser.id, TODAY, { ...existing, energyLevel: parseInt(val) });
  } catch (e) {
    console.warn('updateHomeEnergy save failed:', e);
  }
}

async function saveTrackerLog() {
  if (!STATE.currentUser) return;

  const getValue = (id, fallback = null) => {
    const el = document.getElementById(id);
    return el ? el.value : fallback;
  };

  const moodSelected = [...document.querySelectorAll('#tracker-mood-row .mood-chip.selected')][0];
  const moodLabel = moodSelected?.querySelector('.mc-label')?.textContent || '';

  const data = {
    periodStarted: document.getElementById('period-toggle')?.checked || false,
    flow: STATE.trackerData.flow || 'None',
    painLevel: parseInt(getValue('pain-slider', 0)),
    symptoms: [...document.querySelectorAll('#symptom-grid .s-chip.selected')].map(c => c.dataset.val),
    mood: STATE.trackerData.mood || moodLabel,
    energyLevel: parseInt(getValue('energy-slider', 5)),
    sleep: parseFloat(getValue('sleep-tracker', 7)),
    water: parseInt(getValue('water-tracker', 6)),
    stress: parseInt(getValue('stress-tracker', 5)),
    activity: STATE.trackerData.activity || 'None',
    productivity: [...document.querySelectorAll('#prod-grid .prod-chip.selected')].map(c => c.dataset.val)
  };

  try {
    await DB.saveDailyLog(STATE.currentUser.id, TODAY, data);
  } catch (e) {
    console.warn('saveTrackerLog: save failed:', e);
    showToast('⚠️ Could not save log. Please try again.');
    return;
  }

  const savedMsg = document.getElementById('tracker-saved-msg');
  if (savedMsg) {
    savedMsg.classList.remove('hidden');
    setTimeout(() => savedMsg.classList.add('hidden'), 3000);
  }
  showToast('✅ Today\'s log saved!');
  await safeRun(renderHomeScreen, 'renderHomeScreen');
}

// ── INSIGHTS ──────────────────────────────────────────────
async function renderInsights() {
  if (!STATE.currentUser) return;

  let profile = null;
  let logs = [];
  let cycles = [];

  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }
  try { logs = await DB.getLogsForUser(STATE.currentUser.id, 90) || []; } catch (e) { /* ignore */ }
  try { cycles = await DB.getCyclesForUser(STATE.currentUser.id) || []; } catch (e) { /* ignore */ }

  const container = document.getElementById('insights-content');
  if (!container) return;

  const cycleLen = parseInt(profile?.cycleLength) || 28;
  const alerts = [];

  if (cycleLen < 21 || cycleLen > 35) {
    alerts.push({
      type: 'risk',
      title: 'Irregular cycle length detected',
      desc: `Your average cycle length of ${cycleLen} days falls outside the typical range (21–35 days). This may indicate a hormonal imbalance worth monitoring.`
    });
  }

  const recentLogs = logs.slice(0, 30);
  const highPainDays = recentLogs.filter(l => (l?.painLevel || 0) >= 7).length;
  if (highPainDays >= 3) {
    alerts.push({
      type: 'risk',
      title: 'High pain levels noted',
      desc: `You've logged severe pain (7+/10) on ${highPainDays} days in the past month. Severe pain consistently affecting your daily life deserves a doctor's evaluation.`
    });
  }

  const highStressDays = recentLogs.filter(l => (l?.stress || 0) >= 7).length;
  if (highStressDays >= 7) {
    alerts.push({
      type: 'warning',
      title: 'High stress pattern',
      desc: `Elevated stress logged on ${highStressDays} of the last 30 days. Chronic stress can significantly disrupt your menstrual cycle.`
    });
  }

  const poorSleepDays = recentLogs.filter(l => l?.sleep && l.sleep < 6).length;
  if (poorSleepDays >= 5) {
    alerts.push({
      type: 'warning',
      title: 'Poor sleep pattern',
      desc: `Sleep under 6 hours on ${poorSleepDays} days recently. Sleep deprivation is one of the most common causes of cycle irregularity.`
    });
  }

  if (cycles.length >= 3) {
    const lengths = cycles.slice(0, 5).map(c => c?.length).filter(Boolean);
    if (lengths.length >= 2) {
      const maxL = Math.max(...lengths), minL = Math.min(...lengths);
      if (maxL - minL > 7) {
        alerts.push({
          type: 'risk',
          title: 'Cycle length variation detected',
          desc: `Your cycles have varied by ${maxL - minL} days. Variation of more than 7 days across cycles is considered irregular and may warrant attention.`
        });
      }
    }
  }

  if (alerts.length === 0) {
    alerts.push({
      type: 'good',
      title: 'Your cycle looks healthy!',
      desc: 'Based on your logged data, your cycle patterns are within normal range. Keep tracking to maintain this insight.'
    });
  }

  container.innerHTML = alerts.map(a => `
    <div class="risk-alert ${a.type === 'good' ? 'good-alert' : ''}">
      <div class="ra-tag">${a.type === 'risk' ? '⚠ Risk Alert' : a.type === 'warning' ? '⚡ Notice' : '✅ All Clear'}</div>
      <div class="ra-title">${a.title}</div>
      <div class="ra-desc">${a.desc}</div>
    </div>
  `).join('');

  // Trend chart
  const trendChart = document.getElementById('trend-chart');
  if (trendChart) {
    const cycleData = cycles.slice(0, 8).reverse();
    if (cycleData.length > 0) {
      const maxLen = Math.max(...cycleData.map(c => c?.length || 0), 35);
      trendChart.innerHTML = cycleData.map(c => {
        const len = c?.length || 0;
        const h = Math.round((len / maxLen) * 100);
        const irregular = len < 21 || len > 35;
        return `<div class="trend-bar-item" style="height:${h}%; background:${irregular ? 'var(--rose)' : 'var(--plum)'}; opacity:0.8;">
          <div class="bar-label">${len}d</div>
        </div>`;
      }).join('');
    } else {
      trendChart.innerHTML = '<div style="font-size:13px; color:var(--ink-muted); padding:20px;">Log your period starts to see cycle trends</div>';
    }
  }

  // Mood history
  const moodMap = { Happy: '😊', Okay: '😐', Low: '😔', Anxious: '😟', Irritable: '😡' };
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    let dayLog = null;
    try { dayLog = await DB.getDailyLog(STATE.currentUser.id, dStr); } catch (e) { /* ignore */ }
    last7.push({ date: dStr, mood: dayLog?.mood || '', day: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d.getDay()] });
  }

  const moodHistory = document.getElementById('mood-history');
  if (moodHistory) {
    moodHistory.innerHTML = last7.map(d => `
      <div class="mh-day">
        <span class="mh-icon">${moodMap[d.mood] || '⬜'}</span>
        <span class="mh-label">${d.day}</span>
      </div>
    `).join('');
  }

  // Pain history
  const painData = [];
  for (const d of last7) {
    let l = null;
    try { l = await DB.getDailyLog(STATE.currentUser.id, d.date); } catch (e) { /* ignore */ }
    painData.push(l?.painLevel || 0);
  }

  const maxPain = Math.max(...painData, 1);
  const painHistory = document.getElementById('pain-history');
  if (painHistory) {
    painHistory.innerHTML = painData.map((p, i) => `
      <div class="ph-bar" style="height:${Math.max(5, (p / maxPain) * 100)}%; opacity:${0.4 + (p / maxPain) * 0.6};" title="Pain: ${p}/10 — ${last7[i]?.day || ''}"></div>
    `).join('');
  }

  // Recommendations
  const recos = [];
  if (highPainDays >= 3) recos.push({ icon: '🩺', text: 'Consider consulting a gynaecologist about your pain levels' });
  if (highStressDays >= 7) recos.push({ icon: '🧘', text: 'Try 10 minutes of daily meditation or yoga to reduce stress' });
  if (poorSleepDays >= 5) recos.push({ icon: '😴', text: 'Aim for 7–9 hours of sleep — set a consistent bedtime' });
  recos.push({ icon: '💧', text: 'Drink at least 8 glasses of water daily for hormonal balance' });
  recos.push({ icon: '🍃', text: 'Include iron-rich foods like spinach, dal, and jaggery in your diet' });

  const recoList = document.getElementById('reco-list');
  if (recoList) {
    recoList.innerHTML = recos.map(r => `
      <div class="reco-item"><div class="reco-icon">${r.icon}</div><div class="reco-text">${r.text}</div></div>
    `).join('');
  }
}

// ── COMPANION ─────────────────────────────────────────────
async function initCompanion() {
  if (!STATE.currentUser) return;
  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;

  let history = [];
  let profile = null;

  try { history = await DB.getChatHistory(STATE.currentUser.id) || []; } catch (e) { /* ignore */ }
  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }

  const cycleInfo = profile ? calculateCycleInfo(profile) : null;

  if (!history.length) {
    const firstName = STATE.currentUser.name?.split(' ')[0] || 'there';
    const greeting = `Hi ${firstName} 🌸 I'm your Naari Companion — a safe, private space to share how you feel. ${cycleInfo ? `I can see you're on Day ${cycleInfo.dayOfCycle} of your cycle (${cycleInfo.phase}). ` : ''}How are you doing today?`;
    appendMessage('ai', greeting, chatWindow);
    try { await DB.saveChatMessage(STATE.currentUser.id, 'ai', greeting); } catch (e) { /* ignore */ }
  } else {
    history.slice(-20).forEach(m => appendMessage(m.role, m.text, chatWindow, false));
  }
}

function appendMessage(role, text, chatWindow, save = false) {
  if (!chatWindow) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${time}</div>`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendFeel(text) {
  const input = document.getElementById('chat-input');
  if (input) input.value = text;
  sendChat();
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input?.value?.trim();
  if (!text) return;

  const chatWindow = document.getElementById('chat-window');
  appendMessage('user', text, chatWindow);
  if (input) input.value = '';

  try { await DB.saveChatMessage(STATE.currentUser.id, 'user', text); } catch (e) { /* ignore */ }

  setTimeout(async () => {
    const reply = await generateCompanionReply(text.toLowerCase());
    appendMessage('ai', reply, chatWindow);
    try { await DB.saveChatMessage(STATE.currentUser.id, 'ai', reply); } catch (e) { /* ignore */ }
  }, 800);
}

async function generateCompanionReply(msg) {
  let profile = null;
  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }
  const cycleInfo = profile ? calculateCycleInfo(profile) : null;
  const phase = cycleInfo?.phase || '';
  const name = STATE.currentUser?.name?.split(' ')[0] || 'there';

  if (msg.includes('stress') || msg.includes('anxious') || msg.includes('anxiety') || msg.includes('worried')) {
    return `I hear you, ${name}. Stress and anxiety are very real, especially during certain phases of your cycle. ${phase === 'Luteal' ? "You're in your luteal phase right now, which is when many women feel more anxious due to falling progesterone." : ''} Try this: take 5 slow deep breaths — inhale for 4 counts, hold for 4, exhale for 6. Small wins today are enough. Would you like some more self-care tips? 💜`;
  }
  if (msg.includes('cramp') || msg.includes('pain') || msg.includes('hurt')) {
    return `I'm sorry you're in pain, ${name} 💙 Cramps can be really draining. Here are a few things that may help right now:\n\n• Warm compress or heating pad on your lower abdomen for 15–20 mins\n• Gentle cat-cow yoga stretches\n• Warm ginger or ajwain water\n• Rest in a comfortable position\n\nIf the pain is severe (7+/10) or unusual, it's worth noting in your Tracker and consulting a doctor. You're doing great by tuning in to your body.`;
  }
  if (msg.includes('tired') || msg.includes('fatigue') || msg.includes('exhausted') || msg.includes('low energy')) {
    return `Fatigue is one of the most common symptoms during ${phase || 'your cycle'}, ${name}. Your body is working hard. 💪\n\nTry: a 20-minute nap if you can, hydrating well, and eating iron-rich foods like spinach or dates. Avoid pushing through exhaustion — rest is productive too. Be gentle with yourself today. 🌸`;
  }
  if (msg.includes('low') || msg.includes('sad') || msg.includes('cry') || msg.includes('depressed') || msg.includes('down')) {
    return `${name}, it's okay to feel low. You're not alone in this. 💜\n\n${(phase === 'Menstrual' || phase === 'Luteal') ? "During this phase of your cycle, estrogen dips which can directly affect your mood — it's hormonal and it's real." : ''}\n\nSomething small that might help: step outside for 5 minutes, wrap yourself in something warm, or text a friend. And remember — this feeling is temporary. Your body will shift again soon. I'm here with you. 🌸`;
  }
  if (msg.includes('motivation') || msg.includes('unmotivated') || msg.includes('lazy') || msg.includes('focus')) {
    return `Loss of motivation is completely normal and often cycle-linked, ${name}! 🌿\n\nTry the "two-minute rule" — commit to just two minutes of any task. Often, starting is the hardest part. Also, ${(phase === 'Follicular' || phase === 'Ovulation') ? "you're in a phase where energy typically rises — use that momentum!" : 'your energy phase will rise again soon. For now, be kind to yourself.'}\n\nWhat's one small thing you could do right now? 💪`;
  }
  if (msg.includes('doctor') || msg.includes('consult') || msg.includes('report') || msg.includes('summary')) {
    return `That's a great proactive step, ${name}! 👏 Consulting a doctor when you notice something unusual is the best thing you can do for your health.\n\nYou can go to the Care section to export your health report — it includes your cycle history, symptoms, pain levels, and lifestyle data in a clean format you can share with your doctor. Would you like me to help you prepare what to say? 🩺`;
  }
  if (msg.includes('pcos') || msg.includes('irregular')) {
    return `PCOS and irregular cycles are more common than many people realise — about 1 in 5 Indian women experience it. The most important thing is you're tracking and paying attention, ${name}.\n\nKey signs to watch for: cycles shorter than 21 or longer than 35 days, excess hair growth, acne, or difficulty managing weight. Your Insights section shows your cycle patterns.\n\nDo you want me to guide you to the Awareness section for more PCOS information? 🔬`;
  }
  if (msg.includes('sleep') || msg.includes('insomnia')) {
    return `Poor sleep and your cycle are closely connected, ${name}. In the luteal phase especially, progesterone changes can disrupt sleep patterns.\n\nTips for better sleep tonight:\n• Keep your room cool and dark\n• No screens 30 mins before bed\n• Try chamomile tea or warm milk with turmeric\n• Practice 4-7-8 breathing to calm your nervous system\n\nGood sleep is one of the most powerful things you can do for your hormonal health. 🌙`;
  }
  if (msg.includes('food') || msg.includes('eat') || msg.includes('diet') || msg.includes('craving')) {
    return `Cravings during your cycle are real and hormonal, ${name}! 🍫\n\n${phase === 'Luteal' ? 'In the luteal phase, progesterone can trigger cravings for sweets and carbs — your body is actually burning more calories than usual!' : ''}\n\nSatisfy cravings mindfully: dark chocolate (70%+) for magnesium, dates or jaggery for iron, nuts for healthy fats. The Awareness section has a full guide on Indian foods for cycle health. 🍛`;
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `Hello ${name}! 🌸 I'm here for you. How are you feeling today? You can tell me anything — this is a safe, completely private space just for you.`;
  }
  if (msg.includes('thank')) {
    return `You're so welcome, ${name} 💜 Taking time to check in with yourself is an act of self-love. Remember — you deserve care, and your health matters. I'm always here. 🌸`;
  }

  const generics = [
    `Thank you for sharing that, ${name}. Your feelings are completely valid. Taking care of yourself starts with acknowledging what you feel. What would feel most supportive right now — information, a breathing exercise, or just someone to listen? 💜`,
    `I hear you, ${name}. Being in tune with your body takes courage. Remember, every sensation you feel is a signal — and you're doing the right thing by paying attention. Is there something specific I can help with today? 🌸`,
    `You're not alone in what you're feeling, ${name}. Many women experience this, often connected to their cycle. Would it help to check your current cycle phase in the Home section? Sometimes knowing the "why" brings real comfort. 💜`
  ];
  return generics[Math.floor(Math.random() * generics.length)];
}

// ── CARE ──────────────────────────────────────────────────
async function renderReminders() {
  if (!STATE.currentUser) return;

  let profile = null;
  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }
  if (!profile) return;

  const cycleInfo = calculateCycleInfo(profile);
  const daysUntil = daysUntilNextPeriod(cycleInfo.nextPeriodDate);

  let todayLog = null;
  try { todayLog = await DB.getDailyLog(STATE.currentUser.id, TODAY); } catch (e) { /* ignore */ }

  const reminders = [];
  if (daysUntil <= 5) {
    reminders.push({ icon: '📅', text: `Period in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`, sub: 'Stock up on essentials' });
  }
  if (!todayLog) {
    reminders.push({ icon: '📝', text: "Track today's symptoms", sub: "You haven't logged yet today" });
  }
  reminders.push({ icon: '💧', text: 'Drink 8 glasses of water today', sub: 'Hydration supports hormonal balance' });
  if (cycleInfo.phase === 'Menstrual') {
    reminders.push({ icon: '🍃', text: 'Eat iron-rich foods today', sub: 'Replenish iron lost during your period' });
  }
  if (cycleInfo.phase === 'Luteal' && daysUntil <= 7) {
    reminders.push({ icon: '😴', text: 'Prioritise sleep tonight', sub: 'Your body needs extra rest in this phase' });
  }

  const box = document.getElementById('reminders-box');
  if (box) {
    box.innerHTML = reminders.map(r => `
      <div class="reminder-item">
        <div class="ri-icon">${r.icon}</div>
        <div><div class="ri-text">${r.text}</div><div class="ri-time">${r.sub}</div></div>
      </div>
    `).join('');
  }
}

async function showDoctorModal() {
  let profile = null;
  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }
  const cycleInfo = profile ? calculateCycleInfo(profile) : null;

  const content = document.getElementById('modal-content');
  if (!content) return;

  content.innerHTML = `
    <div class="modal-title">Consult a Gynaecologist</div>
    <div class="modal-section">
      <h4>When to consult</h4>
      <ul>
        <li>Cycles consistently shorter than 21 or longer than 35 days</li>
        <li>Severe pain (7+/10) that disrupts daily activities</li>
        <li>Periods lasting more than 7 days</li>
        <li>Sudden changes in your usual cycle pattern</li>
        <li>Symptoms suggesting PCOS, endometriosis, or thyroid issues</li>
      </ul>
    </div>
    <div class="modal-section">
      <h4>What to tell your doctor</h4>
      <p>Your current cycle: Day ${cycleInfo?.dayOfCycle || '–'} of ${profile?.cycleLength || 28}-day cycle. Last period: ${profile?.lastPeriodDate && isValidDate(profile.lastPeriodDate) ? formatDate(new Date(profile.lastPeriodDate)) : 'Unknown'}. Use the "Export Health Report" button to share your complete history.</p>
    </div>
    <div class="modal-section">
      <h4>Find a gynaecologist</h4>
      <p>Search on Practo, Apollo 247, or ask your general physician for a referral to a trusted gynaecologist near you.</p>
    </div>
    <button class="btn-primary" onclick="closeModal()">Got it</button>
  `;
  document.getElementById('modal-overlay')?.classList.remove('hidden');
}

async function showSymptomSummary() {
  let logs = [];
  let profile = null;
  try { logs = await DB.getLogsForUser(STATE.currentUser.id, 30) || []; } catch (e) { /* ignore */ }
  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }

  const cycleInfo = profile ? calculateCycleInfo(profile) : null;
  const topSymptoms = {};
  logs.forEach(l => (l?.symptoms || []).forEach(s => topSymptoms[s] = (topSymptoms[s] || 0) + 1));
  const sorted = Object.entries(topSymptoms).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const painLogs = logs.filter(l => l?.painLevel != null && l.painLevel > 0);
  const avgPain = painLogs.length
    ? painLogs.reduce((s, l) => s + l.painLevel, 0) / painLogs.length
    : 0;

  const content = document.getElementById('modal-content');
  if (!content) return;

  content.innerHTML = `
    <div class="modal-title">Doctor-Ready Symptom Summary</div>
    <div class="modal-section">
      <h4>Patient</h4>
      <p>${STATE.currentUser.name}, Age ${profile?.age || '–'}</p>
    </div>
    <div class="modal-section">
      <h4>Cycle Information</h4>
      <p>Average cycle length: ${profile?.cycleLength || 28} days<br>
      Last period: ${profile?.lastPeriodDate && isValidDate(profile.lastPeriodDate) ? formatDate(new Date(profile.lastPeriodDate)) : 'Unknown'}<br>
      Current cycle day: ${cycleInfo?.dayOfCycle || '–'}<br>
      Current phase: ${cycleInfo?.phase || '–'}</p>
    </div>
    <div class="modal-section">
      <h4>Most Common Symptoms (Last 30 Days)</h4>
      ${sorted.length ? sorted.map(([s, c]) => `<p>• ${s}: ${c} day${c !== 1 ? 's' : ''}</p>`).join('') : '<p>No symptoms logged yet.</p>'}
    </div>
    <div class="modal-section">
      <h4>Average Pain Level</h4>
      <p>${avgPain.toFixed(1)} / 10 ${avgPain >= 7 ? '— <strong>Severe, warrants medical attention</strong>' : avgPain >= 4 ? '— Moderate' : '— Mild'}</p>
    </div>
    <div class="modal-section">
      <h4>Known Conditions</h4>
      <p>${(profile?.conditions || ['None']).join(', ')}</p>
    </div>
    <div class="modal-section">
      <h4>Lifestyle Context</h4>
      <p>Typical stress level: ${profile?.stressLevel || '–'}/10</p>
    </div>
    <button class="btn-primary" onclick="closeModal(); exportReport()">Export as Report</button>
  `;
  document.getElementById('modal-overlay')?.classList.remove('hidden');
}

function showCommunity() {
  const content = document.getElementById('modal-content');
  if (!content) return;
  content.innerHTML = `
    <div class="modal-title">Women's Support Space 🌸</div>
    <div class="modal-section">
      <h4>About this space</h4>
      <p>A safe, anonymous, and moderated community space for women to share experiences, ask questions, and support each other — without judgment.</p>
    </div>
    <div class="modal-section">
      <h4>Community Guidelines</h4>
      <ul>
        <li>Be kind and supportive — no judgment here</li>
        <li>All posts are anonymous by default</li>
        <li>Share only what you're comfortable sharing</li>
        <li>For medical advice, always consult a qualified doctor</li>
        <li>Content is moderated to keep this space safe</li>
      </ul>
    </div>
    <div style="background:var(--lavender); border-radius:var(--radius-sm); padding:16px; margin-top:16px; text-align:center;">
      <div style="font-size:32px; margin-bottom:8px;">🚧</div>
      <p style="font-size:14px; color:var(--ink-muted);">Community feature coming soon!<br>You'll be notified when it launches.</p>
    </div>
    <button class="btn-primary" style="margin-top:16px;" onclick="closeModal()">Close</button>
  `;
  document.getElementById('modal-overlay')?.classList.remove('hidden');
}

async function exportReport() {
  let profile = null;
  let logs = [];
  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }
  try { logs = await DB.getLogsForUser(STATE.currentUser.id, 30) || []; } catch (e) { /* ignore */ }

  const cycleInfo = profile ? calculateCycleInfo(profile) : null;

  let report = `NAARI CYCLE — HEALTH REPORT\n`;
  report += `Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n`;
  report += `${'─'.repeat(40)}\n\n`;
  report += `PATIENT: ${STATE.currentUser.name}\nEMAIL: ${STATE.currentUser.email}\nAGE: ${profile?.age || '–'}\n\n`;
  report += `CYCLE SUMMARY\n${'─'.repeat(20)}\n`;
  report += `Cycle Length: ${profile?.cycleLength || 28} days\n`;
  report += `Period Duration: ${profile?.periodDuration || 5} days\n`;
  report += `Last Period: ${profile?.lastPeriodDate || 'Unknown'}\n`;
  report += `Current Day of Cycle: ${cycleInfo?.dayOfCycle || '–'}\n`;
  report += `Current Phase: ${cycleInfo?.phase || '–'}\n`;
  report += `Next Expected Period: ${cycleInfo?.nextPeriodDate || '–'}\n\n`;
  report += `RECENT HEALTH LOG (Last 30 days)\n${'─'.repeat(20)}\n`;
  logs.slice(0, 10).forEach(l => {
    if (!l) return;
    report += `${l.date || '–'}: Flow=${l.flow || '–'}, Pain=${l.painLevel ?? 0}/10, Mood=${l.mood || '–'}, Sleep=${l.sleep || '–'}h, Stress=${l.stress || '–'}/10\n`;
    if (l.symptoms?.length) report += `  Symptoms: ${l.symptoms.join(', ')}\n`;
  });
  report += `\nKNOWN CONDITIONS: ${(profile?.conditions || ['None']).join(', ')}\n`;
  report += `STRESS LEVEL: ${profile?.stressLevel || '–'}/10\n`;

  try {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NaariCycle_Report_${(STATE.currentUser.name || 'User').replace(/\s+/g, '_')}_${TODAY}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📄 Report downloaded!');
  } catch (e) {
    console.error('exportReport failed:', e);
    showToast('⚠️ Could not download report.');
  }
}

// ── AWARENESS ─────────────────────────────────────────────
function switchAwareness(tab, el) {
  document.querySelectorAll('.aw-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.aw-tab').forEach(t => t.classList.remove('active'));
  const tabEl = document.getElementById(`aw-${tab}`);
  if (tabEl) tabEl.classList.add('active');
  if (el) el.classList.add('active');
}

// ── CALENDAR ──────────────────────────────────────────────
async function renderCalendar() {
  if (!STATE.currentUser) return;

  let profile = null;
  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }
  if (!profile) return;

  const date = STATE.calendarDate;
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const calLabel = document.getElementById('cal-month-label');
  if (calLabel) calLabel.textContent = `${monthNames[month]} ${year}`;

  if (!profile.lastPeriodDate || !isValidDate(profile.lastPeriodDate)) {
    const grid = document.getElementById('calendar-grid');
    if (grid) grid.innerHTML = '<div style="grid-column:1/-1; font-size:13px; color:var(--ink-muted); padding:20px; text-align:center;">Update your profile with your last period date to see predictions.</div>';
    return;
  }

  const lastPeriod = new Date(profile.lastPeriodDate);
  lastPeriod.setHours(0, 0, 0, 0);
  const cycleLen = Math.max(20, parseInt(profile.cycleLength) || 28);
  const periodDur = Math.max(1, parseInt(profile.periodDuration) || 5);

  const periodDays = new Set();
  const fertileDays = new Set();
  const ovulationDays = new Set();
  const predictedDays = new Set();

  let logs = [];
  try { logs = await DB.getLogsForUser(STATE.currentUser.id, 365) || []; } catch (e) { /* ignore */ }
  logs.forEach(l => {
    if (l?.date && (l.periodStarted || ['Light', 'Medium', 'Heavy'].includes(l.flow))) {
      periodDays.add(l.date);
    }
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 3; i++) {
    const start = new Date(lastPeriod);
    start.setDate(lastPeriod.getDate() + i * cycleLen);
    for (let d = 0; d < periodDur; d++) {
      const day = new Date(start);
      day.setDate(start.getDate() + d);
      if (day >= today) predictedDays.add(day.toISOString().split('T')[0]);
    }
    const ovDay = new Date(start);
    ovDay.setDate(start.getDate() + 14);
    ovulationDays.add(ovDay.toISOString().split('T')[0]);
    for (let f = -5; f <= 1; f++) {
      const fd = new Date(ovDay);
      fd.setDate(ovDay.getDate() + f);
      fertileDays.add(fd.toISOString().split('T')[0]);
    }
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = new Date().toISOString().split('T')[0];
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;

  let html = '';
  for (let i = 0; i < firstDay; i++) html += `<div class="cal-cell empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    let cls = 'cal-cell';
    if (dateStr === todayStr) cls += ' today';
    if (periodDays.has(dateStr)) cls += ' period';
    else if (ovulationDays.has(dateStr)) cls += ' ovulation';
    else if (fertileDays.has(dateStr)) cls += ' fertile';
    else if (predictedDays.has(dateStr)) cls += ' predicted';

    let hasLog = false;
    try {
      const log = await DB.getDailyLog(STATE.currentUser.id, dateStr);
      hasLog = !!log;
    } catch (e) { /* ignore */ }

    const dot = hasLog ? `<span style="position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:4px;height:4px;background:var(--plum);border-radius:50%;"></span>` : '';
    html += `<div class="${cls}" onclick="showDayDetail('${dateStr}', ${d})">${d}${dot}</div>`;
  }
  grid.innerHTML = html;
}

async function showDayDetail(dateStr, day) {
  let log = null;
  try { log = await DB.getDailyLog(STATE.currentUser.id, dateStr); } catch (e) { /* ignore */ }

  const detail = document.getElementById('cal-day-detail');
  const content = document.getElementById('cal-detail-content');
  const dateLabel = document.getElementById('cal-detail-date');

  if (dateLabel && isValidDate(dateStr)) dateLabel.textContent = formatDate(new Date(dateStr));
  if (!detail || !content) return;

  if (log) {
    content.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px;">
        <div class="pi-item"><div class="pi-label">Flow</div><div class="pi-val" style="font-size:14px;">${log.flow || '–'}</div></div>
        <div class="pi-item"><div class="pi-label">Pain</div><div class="pi-val" style="font-size:14px;">${log.painLevel ?? '–'}/10</div></div>
        <div class="pi-item"><div class="pi-label">Mood</div><div class="pi-val" style="font-size:14px;">${log.mood || '–'}</div></div>
        <div class="pi-item"><div class="pi-label">Energy</div><div class="pi-val" style="font-size:14px;">${log.energyLevel ?? '–'}/10</div></div>
        <div class="pi-item"><div class="pi-label">Sleep</div><div class="pi-val" style="font-size:14px;">${log.sleep != null ? log.sleep + 'h' : '–'}</div></div>
        <div class="pi-item"><div class="pi-label">Stress</div><div class="pi-val" style="font-size:14px;">${log.stress ?? '–'}/10</div></div>
      </div>
      ${log.symptoms?.length ? `<div style="margin-top:10px;"><div class="card-label">Symptoms</div><div style="font-size:13px; color:var(--ink-muted);">${log.symptoms.join(', ')}</div></div>` : ''}
    `;
  } else {
    content.innerHTML = `<p style="font-size:13px; color:var(--ink-muted); margin-top:8px;">No data logged for this day. <a href="javascript:void(0)" onclick="showSection('tracker')" style="color:var(--plum);">Log today's data →</a></p>`;
  }
  detail.style.display = 'block';
}

function changeMonth(delta) {
  STATE.calendarDate = new Date(STATE.calendarDate.getFullYear(), STATE.calendarDate.getMonth() + delta, 1);
  const detail = document.getElementById('cal-day-detail');
  if (detail) detail.style.display = 'none';
  safeRun(renderCalendar, 'renderCalendar');
}

// ── PROFILE ───────────────────────────────────────────────
async function loadProfileInfo() {
  if (!STATE.currentUser) return;

  let profile = null;
  try { profile = await DB.getHealthProfile(STATE.currentUser.id); } catch (e) { /* ignore */ }
  if (!profile) return;

  const grid = document.getElementById('profile-info-grid');
  if (grid) {
    const items = [
      { label: 'Age Group', val: profile.ageGroup || profile.age ? (profile.ageGroup || profile.age + ' yrs') : '–' },
      { label: 'Cycle Length', val: (profile.cycleLength || 28) + ' days' },
      { label: 'Period Duration', val: (profile.periodDuration || 5) + ' days' },
      { label: 'Language', val: profile.language || 'English' },
      { label: 'Period Regularity', val: profile.obRegularity || '–' },
      { label: 'Pain Level', val: profile.obPainLevel || '–' },
      { label: 'Goals', val: (profile.goals || [profile.goal]).filter(Boolean).join(', ') || '–' },
      { label: 'Conditions', val: (profile.conditions || ['None']).join(', ') }
    ];
    grid.innerHTML = items.map(i =>
      `<div class="pi-item"><div class="pi-label">${i.label}</div><div class="pi-val">${i.val}</div></div>`
    ).join('');
  }

  const cycleEl = document.getElementById('edit-cycle');
  const durEl = document.getElementById('edit-duration');
  const lastEl = document.getElementById('edit-last-period');
  const heightEl = document.getElementById('edit-height');
  const weightEl = document.getElementById('edit-weight');
  if (cycleEl) cycleEl.value = profile.cycleLength || 28;
  if (durEl) durEl.value = profile.periodDuration || 5;
  if (lastEl) lastEl.value = profile.lastPeriodDate || '';
  if (heightEl && profile.height) heightEl.value = profile.height;
  if (weightEl && profile.weight) weightEl.value = profile.weight;

  // Pre-select deeper profile chips
  const preSelectChip = (gridId, val) => {
    if (!val) return;
    document.querySelectorAll(`#${gridId} .ob-option-chip`).forEach(c => {
      c.classList.toggle('selected', c.dataset.val === val);
    });
  };
  preSelectChip('profile-activity-chips', profile.activityLevel || profile.obActivityLevel);
  preSelectChip('profile-foodpref-chips', profile.foodPref || profile.obFoodPref);
  preSelectChip('profile-foodhabits-chips', profile.foodHabits || profile.obFoodHabits);
  preSelectChip('profile-movement-chips', profile.movement || profile.obMovement);
}

async function saveProfile() {
  if (!STATE.currentUser) return;

  let profile = null;
  try { profile = await DB.getHealthProfile(STATE.currentUser.id) || {}; } catch (e) { profile = {}; }

  const cycleEl = document.getElementById('edit-cycle');
  const durEl = document.getElementById('edit-duration');
  const lastEl = document.getElementById('edit-last-period');

  const updated = {
    ...profile,
    cycleLength: parseInt(cycleEl?.value) || 28,
    periodDuration: parseInt(durEl?.value) || 5,
    lastPeriodDate: lastEl?.value || profile.lastPeriodDate || ''
  };

  try {
    await DB.saveHealthProfile(STATE.currentUser.id, updated);
  } catch (e) {
    console.warn('saveProfile failed:', e);
    showToast('⚠️ Could not save profile.');
    return;
  }

  const savedMsg = document.getElementById('profile-saved-msg');
  if (savedMsg) {
    savedMsg.classList.remove('hidden');
    setTimeout(() => savedMsg.classList.add('hidden'), 3000);
  }
  await loadProfileInfo();
  await safeRun(renderHomeScreen, 'renderHomeScreen');
  showToast('✅ Profile updated!');
}

async function saveDeeperProfile() {
  if (!STATE.currentUser) return;
  let profile = null;
  try { profile = await DB.getHealthProfile(STATE.currentUser.id) || {}; } catch (e) { profile = {}; }

  const heightEl = document.getElementById('edit-height');
  const weightEl = document.getElementById('edit-weight');

  const getChipVal = (id) => {
    const sel = document.querySelector(`#${id} .ob-option-chip.selected`);
    return sel ? sel.dataset.val : (profile[id.replace('profile-','').replace('-chips','')] || '');
  };

  const updated = {
    ...profile,
    height: parseInt(heightEl?.value) || profile.height || '',
    weight: parseInt(weightEl?.value) || profile.weight || '',
    activityLevel: getChipVal('profile-activity-chips') || profile.activityLevel || '',
    foodPref: getChipVal('profile-foodpref-chips') || profile.foodPref || '',
    foodHabits: getChipVal('profile-foodhabits-chips') || profile.foodHabits || '',
    movement: getChipVal('profile-movement-chips') || profile.movement || ''
  };

  try {
    await DB.saveHealthProfile(STATE.currentUser.id, updated);
  } catch (e) {
    showToast('⚠️ Could not save personalisation.');
    return;
  }

  const savedMsg = document.getElementById('deeper-saved-msg');
  if (savedMsg) {
    savedMsg.classList.remove('hidden');
    setTimeout(() => savedMsg.classList.add('hidden'), 3000);
  }
  showToast('✅ Personalisation saved!');
}


  let csv = '';
  try {
    csv = await DB.exportToCSV(STATE.currentUser.id) || '';
  } catch (e) {
    console.warn('exportData failed:', e);
    showToast('⚠️ Could not export data.');
    return;
  }

  try {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NaariCycle_Data_${TODAY}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Data exported as CSV!');
  } catch (e) {
    console.error('exportData download failed:', e);
    showToast('⚠️ Could not download CSV.');
  }
}

async function clearAllData() {
  if (!confirm('Are you sure? This will delete all your health logs and cannot be undone.')) return;
  try {
    await DB.clearUserData(STATE.currentUser.id);
    showToast('🗑️ All data cleared');
    await safeRun(renderHomeScreen, 'renderHomeScreen');
    safeRun(renderInsights, 'renderInsights');
    safeRun(renderCalendar, 'renderCalendar');
  } catch (e) {
    console.warn('clearAllData failed:', e);
    showToast('⚠️ Could not clear data.');
  }
}

// ── LANGUAGE TOGGLE ───────────────────────────────────────
function showLangPicker() {
  const modal = document.getElementById('lang-picker-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  ['en', 'hi', 'ml', 'kn'].forEach(l => {
    const opt = document.querySelector(`.lp-option[onclick*="'${l}'"]`);
    const chk = document.getElementById(`lp-check-${l}`);
    if (opt) opt.classList.toggle('active', LANG === l);
    if (chk) chk.classList.toggle('hidden', LANG !== l);
  });
}

function closeLangPicker() {
  document.getElementById('lang-picker-modal')?.classList.add('hidden');
}

async function selectLangApp(lang) {
  applyLanguage(lang);
  try { await DB.setMeta('appLang', lang); } catch (e) { /* ignore */ }
  ['en', 'hi', 'ml', 'kn'].forEach(l => {
    const opt = document.querySelector(`.lp-option[onclick*="'${l}'"]`);
    const chk = document.getElementById(`lp-check-${l}`);
    if (opt) opt.classList.toggle('active', lang === l);
    if (chk) chk.classList.toggle('hidden', lang !== l);
  });
  const langNames = { en: 'English', hi: 'हिन्दी', ml: 'മലയാളം', kn: 'ಕನ್ನಡ' };
  showToast('🌐 ' + (langNames[lang] || lang));
  setTimeout(closeLangPicker, 600);
}

function cycleLang() { showLangPicker(); }

// ── MODAL ─────────────────────────────────────────────────
function closeModal() {
  document.getElementById('modal-overlay')?.classList.add('hidden');
}

// ── TOAST ─────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3000);
}

// ── UTILS ─────────────────────────────────────────────────
function formatDate(date) {
  if (!isValidDate(date)) return '–';
  try {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch (e) {
    return date.toString();
  }
}
