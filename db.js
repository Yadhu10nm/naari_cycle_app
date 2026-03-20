/**
 * NAARI CYCLE — db.js
 * ═══════════════════════════════════════════════════════════════
 * Google Sheets is the primary database.
 * localStorage is the fallback if Sheets is not configured.
 *
 * TO CONNECT GOOGLE SHEETS:
 *   1. Follow setup in sheets_script.gs (takes ~5 min)
 *   2. Paste your Apps Script Web App URL below ↓
 * ═══════════════════════════════════════════════════════════════
 */

// ── PASTE YOUR WEB APP URL HERE ───────────────────────────────
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyEXGcwmn62jWOZ4zGopjme4UBvwPVSAc2RmZU4Izlj4ZGNG1dntAoChPEH5jturTva/exec';
// ─────────────────────────────────────────────────────────────

const USE_SHEETS = !!(SHEET_URL && SHEET_URL !== 'https://script.google.com/macros/s/AKfycbyEXGcwmn62jWOZ4zGopjme4UBvwPVSAc2RmZU4Izlj4ZGNG1dntAoChPEH5jturTva/exec');

// ── CONNECTION STATUS BADGE ───────────────────────────────────
function showConnectionBadge(connected) {
  let badge = document.getElementById('db-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'db-badge';
    badge.style.cssText = [
      'position:fixed','bottom:80px','right:12px','z-index:9999',
      'padding:5px 12px','border-radius:20px','font-size:11px','font-weight:700',
      "font-family:'Nunito Sans',sans-serif",'box-shadow:0 2px 8px rgba(0,0,0,.18)',
      'cursor:pointer','transition:opacity .4s','pointer-events:auto'
    ].join(';');
    badge.onclick = () => { badge.style.opacity = '0'; };
    document.body.appendChild(badge);
  }
  if (connected) {
    badge.textContent = '🟢 Google Sheets Connected';
    badge.style.background = '#e6f9f0';
    badge.style.color = '#1a7a4a';
    badge.style.border = '1.5px solid #a7e6c8';
  } else {
    badge.textContent = '🟡 Using Local Storage';
    badge.style.background = '#fff8e6';
    badge.style.color = '#8a6000';
    badge.style.border = '1.5px solid #ffd97a';
  }
  badge.style.opacity = '1';
  setTimeout(() => { if (badge) badge.style.opacity = '0'; }, 5000);
}

// ── HTTP HELPERS ──────────────────────────────────────────────
async function sheetGET(action, params = {}) {
  const qs = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${SHEET_URL}?${qs}`, { redirect: 'follow' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'Sheets error');
  return json.data;
}

async function sheetPOST(action, body = {}) {
  const res = await fetch(SHEET_URL, {
    method: 'POST', redirect: 'follow',
    body: JSON.stringify({ action, ...body })
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'Sheets error');
  return json.data;
}

// ── LOCAL STORAGE FALLBACK ────────────────────────────────────
const LOCAL = {
  K: { U:'nc_users', P:'nc_profiles', L:'nc_logs', C:'nc_cycles', H:'nc_chat', M:'nc_meta' },
  get(k)    { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } },
  set(k, d) { localStorage.setItem(k, JSON.stringify(d)); },
  getMeta(k, def = null) {
    const m = JSON.parse(localStorage.getItem(this.K.M) || '{}');
    return m[k] !== undefined ? m[k] : def;
  },
  setMeta(k, v) {
    const m = JSON.parse(localStorage.getItem(this.K.M) || '{}');
    m[k] = v; localStorage.setItem(this.K.M, JSON.stringify(m));
  }
};

// ── DATABASE API ──────────────────────────────────────────────
const DB = {

  // USERS
  async createUser(name, email, password) {
    if (USE_SHEETS) {
      try { return await sheetPOST('createUser', { name, email, password }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    const users = LOCAL.get(LOCAL.K.U);
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { error: 'Email already registered. Please sign in.' };
    const user = { id: 'U'+Date.now(), name: name.trim(),
      email: email.trim().toLowerCase(), password: btoa(password),
      createdAt: new Date().toISOString() };
    users.push(user); LOCAL.set(LOCAL.K.U, users);
    return { user };
  },

  async loginUser(email, password) {
    if (USE_SHEETS) {
      try {
        const user = await sheetGET('getUser', { email });
        if (!user) return { error: 'No account found with this email.' };
        if (user.password !== btoa(password)) return { error: 'Incorrect password.' };
        return { user };
      } catch(e) { console.warn('[Sheets]', e.message); }
    }
    const user = LOCAL.get(LOCAL.K.U).find(u =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === btoa(password));
    return user ? { user } : { error: 'Incorrect email or password.' };
  },

  async getUserById(id) {
    if (USE_SHEETS) {
      try { return await sheetGET('getUserById', { id }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    return LOCAL.get(LOCAL.K.U).find(u => u.id === id) || null;
  },

  // HEALTH PROFILE
  async saveHealthProfile(userId, data) {
    if (USE_SHEETS) {
      try { return await sheetPOST('saveProfile', { userId, data }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    const profiles = LOCAL.get(LOCAL.K.P);
    const idx = profiles.findIndex(p => p.userId === userId);
    const profile = { userId, ...data, updatedAt: new Date().toISOString() };
    if (idx >= 0) profiles[idx] = profile; else profiles.push(profile);
    LOCAL.set(LOCAL.K.P, profiles); return profile;
  },

  async getHealthProfile(userId) {
    if (USE_SHEETS) {
      try { return await sheetGET('getProfile', { userId }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    return LOCAL.get(LOCAL.K.P).find(p => p.userId === userId) || null;
  },

  // DAILY LOG
  async saveDailyLog(userId, date, data) {
    if (USE_SHEETS) {
      try { return await sheetPOST('saveDailyLog', { userId, date, data }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    const logs = LOCAL.get(LOCAL.K.L);
    const idx = logs.findIndex(l => l.userId === userId && l.date === date);
    const log = { id: 'L'+Date.now(), userId, date, ...data, createdAt: new Date().toISOString() };
    if (idx >= 0) { logs[idx] = { ...logs[idx], ...log }; } else logs.push(log);
    LOCAL.set(LOCAL.K.L, logs);
    if (data.periodStarted) await this.recordCycleStart(userId, date);
    return log;
  },

  async getDailyLog(userId, date) {
    if (USE_SHEETS) {
      try { return await sheetGET('getLog', { userId, date }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    return LOCAL.get(LOCAL.K.L).find(l => l.userId === userId && l.date === date) || null;
  },

  async getLogsForUser(userId, limit = 30) {
    if (USE_SHEETS) {
      try { return await sheetGET('getLogs', { userId, limit }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    return LOCAL.get(LOCAL.K.L)
      .filter(l => l.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },

  // CYCLE RECORDS
  async recordCycleStart(userId, date) {
    if (USE_SHEETS) {
      try { return await sheetPOST('recordCycle', { userId, date }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    const cycles = LOCAL.get(LOCAL.K.C);
    const profile = await this.getHealthProfile(userId);
    if (!profile) return;
    const open = cycles.find(c => c.userId === userId && !c.endDate);
    if (open) {
      open.endDate = date;
      open.length = Math.round((new Date(date) - new Date(open.startDate)) / 86400000);
    }
    cycles.push({ id: 'C'+Date.now(), userId, startDate: date, endDate: null, length: null });
    LOCAL.set(LOCAL.K.C, cycles);
    await this.saveHealthProfile(userId, { ...profile, lastPeriodDate: date });
  },

  async getCyclesForUser(userId) {
    if (USE_SHEETS) {
      try { return await sheetGET('getCycles', { userId }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    return LOCAL.get(LOCAL.K.C)
      .filter(c => c.userId === userId && c.length)
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  },

  // CHAT
  async saveChatMessage(userId, role, text) {
    if (USE_SHEETS) {
      try { return await sheetPOST('saveChatMsg', { userId, role, text }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    const chats = LOCAL.get(LOCAL.K.H);
    chats.push({ userId, role, text, ts: new Date().toISOString() });
    const uc = chats.filter(c => c.userId === userId);
    LOCAL.set(LOCAL.K.H, uc.length > 100
      ? chats.filter(c => c.userId !== userId).concat(uc.slice(-100)) : chats);
  },

  async getChatHistory(userId) {
    if (USE_SHEETS) {
      try { return await sheetGET('getChat', { userId }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    return LOCAL.get(LOCAL.K.H).filter(c => c.userId === userId);
  },

  // META (always localStorage for speed; also syncs to Sheets)
  getMeta(key, def = null) { return LOCAL.getMeta(key, def); },
  setMeta(key, val) {
    LOCAL.setMeta(key, val);
    if (USE_SHEETS) sheetPOST('setMeta', { key, value: val }).catch(() => {});
  },

  // EXPORT
  async exportToCSV(userId) {
    if (USE_SHEETS) {
      try { const r = await sheetGET('exportCSV', { userId }); return r.csv; }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    const logs = await this.getLogsForUser(userId, 365);
    const profile = await this.getHealthProfile(userId);
    const user = await this.getUserById(userId);
    let csv = 'NAARI CYCLE — Health Export\n';
    csv += `User: ${user?.name||''}, Email: ${user?.email||''}\n`;
    csv += `Cycle Length: ${profile?.cycleLength||28} days, Last Period: ${profile?.lastPeriodDate||''}\n\n`;
    csv += 'Date,Period Started,Flow,Pain Level,Symptoms,Mood,Energy,Sleep,Water,Stress,Activity,Productivity\n';
    [...logs].reverse().forEach(l => {
      csv += `${l.date},${l.periodStarted?'Yes':'No'},${l.flow||''},${l.painLevel||0},`;
      csv += `"${(l.symptoms||[]).join('; ')}",${l.mood||''},${l.energyLevel||''},`;
      csv += `${l.sleep||''},${l.water||''},${l.stress||''},${l.activity||''},`;
      csv += `"${(l.productivity||[]).join('; ')}"\n`;
    });
    return csv;
  },

  // UTILITIES
  async clearUserData(userId) {
    if (USE_SHEETS) {
      try { return await sheetPOST('clearUserData', { userId }); }
      catch(e) { console.warn('[Sheets]', e.message); }
    }
    [LOCAL.K.P, LOCAL.K.L, LOCAL.K.C, LOCAL.K.H].forEach(k =>
      LOCAL.set(k, LOCAL.get(k).filter(r => r.userId !== userId)));
  },

  isUsingSheets() { return USE_SHEETS; },

  async testConnection() {
    if (!USE_SHEETS) { showConnectionBadge(false); return { connected: false }; }
    try {
      await sheetGET('getMeta', { key: '__ping__' });
      showConnectionBadge(true);
      return { connected: true };
    } catch(e) {
      showConnectionBadge(false);
      return { connected: false, error: e.message };
    }
  }
};
