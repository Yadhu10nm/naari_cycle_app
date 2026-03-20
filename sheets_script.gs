/**
 * ═══════════════════════════════════════════════════════════════
 *  NAARI CYCLE — Google Apps Script Backend (sheets_script.gs)
 * ═══════════════════════════════════════════════════════════════
 *
 *  HOW TO SET UP (takes ~5 minutes):
 *
 *  STEP 1 — Create the Google Sheet
 *    • Go to sheets.google.com → click "+" (blank spreadsheet)
 *    • Name it: Naari Cycle Database
 *    • Copy the Sheet ID from the URL bar:
 *        https://docs.google.com/spreadsheets/d/[COPY_THIS]/edit
 *
 *  STEP 2 — Open Apps Script
 *    • In your Google Sheet click: Extensions → Apps Script
 *    • A new browser tab opens with a code editor
 *    • DELETE all the existing code (select all → delete)
 *    • PASTE this entire file into the editor
 *    • Replace YOUR_SPREADSHEET_ID_HERE below with your Sheet ID
 *    • Click 💾 Save (Ctrl+S)
 *
 *  STEP 3 — Deploy as Web App
 *    • Click the blue "Deploy" button → "New Deployment"
 *    • Click the ⚙ gear icon → Select type: "Web App"
 *    • Fill in:
 *        Description: Naari Cycle API
 *        Execute as:  Me
 *        Who has access: Anyone       ← this is important!
 *    • Click "Deploy"
 *    • Google will ask you to authorize — click "Authorize access"
 *    • Choose your Google account → click "Allow"
 *    • COPY the Web App URL (looks like https://script.google.com/macros/s/ABC.../exec)
 *
 *  STEP 4 — Connect to the Naari App
 *    • Open db.js in your Naari Cycle folder
 *    • Find this line:   const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
 *    • Replace the placeholder with the URL you just copied
 *    • Save db.js
 *    • Open index.html in your browser — Google Sheets is now your database!
 *
 *  WHAT APPEARS IN YOUR SPREADSHEET:
 *    6 tabs are auto-created the first time someone uses the app:
 *      Users          — name, email, password for all accounts
 *      HealthProfiles — cycle length, last period, conditions per user
 *      DailyLogs      — every tracker entry (symptoms, mood, flow etc.)
 *      CycleRecords   — period start/end dates and calculated lengths
 *      ChatHistory    — Naari Companion messages
 *      Meta           — app settings (current user ID, language)
 *
 *  RE-DEPLOYING AFTER CODE CHANGES:
 *    If you edit this script later, you must re-deploy:
 *    Deploy → Manage Deployments → Edit → Version: New Version → Deploy
 *    The URL stays the same after re-deployment.
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ─── PASTE YOUR GOOGLE SHEET ID HERE ─────────────────────────
const SPREADSHEET_ID = '14rStqOVHiAlZRm-Bk8VFlpSK7QXJgt-BiTeVD4A16Dmtn7_Qj9Nv-v9I';
// ─────────────────────────────────────────────────────────────

const SHEETS = {
  USERS: 'Users', PROFILES: 'HealthProfiles', LOGS: 'DailyLogs',
  CYCLES: 'CycleRecords', CHAT: 'ChatHistory', META: 'Meta'
};

const COLS = {
  USERS:    ['id','name','email','password','createdAt'],
  PROFILES: ['userId','age','language','goal','cycleLength','periodDuration','lastPeriodDate','conditions','stressLevel','updatedAt'],
  LOGS:     ['id','userId','date','periodStarted','flow','painLevel','symptoms','mood','energyLevel','sleep','water','stress','activity','productivity','createdAt'],
  CYCLES:   ['id','userId','startDate','endDate','length'],
  CHAT:     ['userId','role','text','ts'],
  META:     ['key','value']
};

// ── ENTRY POINTS ──────────────────────────────────────────────

function doGet(e) { return handleRequest(e.parameter); }

function doPost(e) {
  var body = {};
  try { body = JSON.parse(e.postData.contents); } catch(err) {}
  return handleRequest(body);
}

function handleRequest(p) {
  try {
    ensureSheets();
    var a = p.action || '', r;
    if      (a==='getUser')       r = getUser(p.email);
    else if (a==='getUserById')   r = getUserById(p.id);
    else if (a==='getProfile')    r = getProfile(p.userId);
    else if (a==='getLog')        r = getLog(p.userId, p.date);
    else if (a==='getLogs')       r = getLogs(p.userId, parseInt(p.limit)||30);
    else if (a==='getCycles')     r = getCycles(p.userId);
    else if (a==='getChat')       r = getChat(p.userId);
    else if (a==='getMeta')       r = getMetaVal(p.key);
    else if (a==='exportCSV')     r = exportCSV(p.userId);
    else if (a==='createUser')    r = createUser(p.name, p.email, p.password);
    else if (a==='saveProfile')   r = saveProfile(p.userId, p.data);
    else if (a==='saveDailyLog')  r = saveDailyLog(p.userId, p.date, p.data);
    else if (a==='recordCycle')   r = recordCycle(p.userId, p.date);
    else if (a==='saveChatMsg')   r = saveChatMsg(p.userId, p.role, p.text);
    else if (a==='setMeta')       r = setMetaVal(p.key, p.value);
    else if (a==='clearUserData') r = clearUserData(p.userId);
    else r = { error: 'Unknown action: ' + a };
    return json({ ok: true, data: r });
  } catch(err) {
    return json({ ok: false, error: err.message });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ── SHEET HELPERS ─────────────────────────────────────────────

function ss() { return SpreadsheetApp.openById(SPREADSHEET_ID); }

function ensureSheets() {
  var wb = ss();
  Object.keys(SHEETS).forEach(function(key) {
    var name = SHEETS[key];
    var sh = wb.getSheetByName(name);
    if (!sh) {
      sh = wb.insertSheet(name);
      sh.appendRow(COLS[key]);
      sh.getRange(1,1,1,COLS[key].length)
        .setFontWeight('bold').setBackground('#6F3B73').setFontColor('#ffffff');
      sh.setFrozenRows(1);
    }
  });
}

function getSheet(name) { return ss().getSheetByName(name); }

function allRows(name) {
  var sh = getSheet(name);
  var data = sh.getDataRange().getValues();
  if (data.length <= 1) return [];
  var headers = data[0];
  return data.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) {
      obj[h] = row[i];
      if (['conditions','symptoms','productivity'].indexOf(h) >= 0 && typeof obj[h] === 'string' && obj[h]) {
        try { obj[h] = JSON.parse(obj[h]); } catch(e) { obj[h] = []; }
      }
    });
    return obj;
  });
}

function appendTo(name, cols, obj) {
  var row = cols.map(function(col) {
    var v = obj[col];
    if (v === undefined || v === null) return '';
    if (Array.isArray(v) || (typeof v === 'object')) return JSON.stringify(v);
    return v;
  });
  getSheet(name).appendRow(row);
}

function updateWhere(name, cols, matchKey, matchVal, updates) {
  var sh = getSheet(name);
  var data = sh.getDataRange().getValues();
  var headers = data[0];
  var mi = headers.indexOf(matchKey);
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][mi]) === String(matchVal)) {
      Object.keys(updates).forEach(function(k) {
        var ci = headers.indexOf(k);
        if (ci >= 0) {
          var v = updates[k];
          sh.getRange(i+1, ci+1).setValue(
            Array.isArray(v)||(v&&typeof v==='object') ? JSON.stringify(v) : (v===undefined?'':v)
          );
        }
      });
      return true;
    }
  }
  return false;
}

function deleteWhere(name, matchKey, matchVal) {
  var sh = getSheet(name);
  var data = sh.getDataRange().getValues();
  var headers = data[0];
  var mi = headers.indexOf(matchKey);
  for (var i = data.length - 1; i >= 1; i--) {
    if (String(data[i][mi]) === String(matchVal)) sh.deleteRow(i+1);
  }
}

// ── USERS ─────────────────────────────────────────────────────

function createUser(name, email, password) {
  var rows = allRows(SHEETS.USERS);
  if (rows.find(function(u){ return u.email.toLowerCase()===email.toLowerCase(); }))
    throw new Error('Email already registered. Please sign in.');
  var user = { id:'U'+Date.now(), name:name.trim(), email:email.trim().toLowerCase(),
    password: Utilities.base64Encode(password), createdAt: new Date().toISOString() };
  appendTo(SHEETS.USERS, COLS.USERS, user);
  return { user: user };
}

function getUser(email) {
  return allRows(SHEETS.USERS).find(function(u){ return u.email.toLowerCase()===(email||'').toLowerCase(); }) || null;
}

function getUserById(id) {
  return allRows(SHEETS.USERS).find(function(u){ return u.id===id; }) || null;
}

// ── HEALTH PROFILES ───────────────────────────────────────────

function saveProfile(userId, data) {
  var profile = { userId:userId, age:data.age||'', language:data.language||'English',
    goal:data.goal||'', cycleLength:data.cycleLength||28, periodDuration:data.periodDuration||5,
    lastPeriodDate:data.lastPeriodDate||'', conditions:data.conditions||[], stressLevel:data.stressLevel||5,
    updatedAt:new Date().toISOString() };
  var existing = allRows(SHEETS.PROFILES).find(function(p){ return p.userId===userId; });
  if (existing) updateWhere(SHEETS.PROFILES, COLS.PROFILES, 'userId', userId, profile);
  else appendTo(SHEETS.PROFILES, COLS.PROFILES, profile);
  return profile;
}

function getProfile(userId) {
  return allRows(SHEETS.PROFILES).find(function(p){ return p.userId===userId; }) || null;
}

// ── DAILY LOGS ────────────────────────────────────────────────

function saveDailyLog(userId, date, data) {
  var existing = allRows(SHEETS.LOGS).find(function(l){ return l.userId===userId && l.date===date; });
  var log = { id:existing?existing.id:'L'+Date.now(), userId:userId, date:date,
    periodStarted:data.periodStarted||false, flow:data.flow||'None', painLevel:data.painLevel||0,
    symptoms:data.symptoms||[], mood:data.mood||'', energyLevel:data.energyLevel||5,
    sleep:data.sleep||7, water:data.water||6, stress:data.stress||5, activity:data.activity||'None',
    productivity:data.productivity||[], createdAt:existing?existing.createdAt:new Date().toISOString() };
  if (existing) updateWhere(SHEETS.LOGS, COLS.LOGS, 'id', log.id, log);
  else appendTo(SHEETS.LOGS, COLS.LOGS, log);
  if (data.periodStarted) recordCycle(userId, date);
  return log;
}

function getLog(userId, date) {
  return allRows(SHEETS.LOGS).find(function(l){ return l.userId===userId && l.date===date; }) || null;
}

function getLogs(userId, limit) {
  return allRows(SHEETS.LOGS)
    .filter(function(l){ return l.userId===userId; })
    .sort(function(a,b){ return new Date(b.date)-new Date(a.date); })
    .slice(0, limit);
}

// ── CYCLE RECORDS ─────────────────────────────────────────────

function recordCycle(userId, date) {
  var cycles = allRows(SHEETS.CYCLES).filter(function(c){ return c.userId===userId; });
  var open = cycles.find(function(c){ return !c.endDate; });
  if (open) {
    var len = Math.round((new Date(date)-new Date(open.startDate))/86400000);
    updateWhere(SHEETS.CYCLES, COLS.CYCLES, 'id', open.id, { endDate:date, length:len });
  }
  appendTo(SHEETS.CYCLES, COLS.CYCLES, { id:'C'+Date.now(), userId:userId, startDate:date, endDate:'', length:'' });
  var profile = getProfile(userId);
  if (profile) saveProfile(userId, Object.assign({}, profile, { lastPeriodDate:date }));
}

function getCycles(userId) {
  return allRows(SHEETS.CYCLES)
    .filter(function(c){ return c.userId===userId && c.length; })
    .sort(function(a,b){ return new Date(b.startDate)-new Date(a.startDate); });
}

// ── CHAT ──────────────────────────────────────────────────────

function saveChatMsg(userId, role, text) {
  appendTo(SHEETS.CHAT, COLS.CHAT, { userId:userId, role:role, text:text, ts:new Date().toISOString() });
  // Keep only last 100 messages per user
  var sh = getSheet(SHEETS.CHAT);
  var data = sh.getDataRange().getValues();
  var headers = data[0];
  var ui = headers.indexOf('userId');
  var userRowIdxs = [];
  for (var i = 1; i < data.length; i++) { if (data[i][ui]===userId) userRowIdxs.push(i+1); }
  if (userRowIdxs.length > 100) {
    var toRemove = userRowIdxs.slice(0, userRowIdxs.length-100).reverse();
    toRemove.forEach(function(r){ sh.deleteRow(r); });
  }
}

function getChat(userId) {
  return allRows(SHEETS.CHAT).filter(function(c){ return c.userId===userId; });
}

// ── META ──────────────────────────────────────────────────────

function getMetaVal(key) {
  var row = allRows(SHEETS.META).find(function(r){ return r.key===key; });
  return row ? row.value : null;
}

function setMetaVal(key, value) {
  var existing = allRows(SHEETS.META).find(function(r){ return r.key===key; });
  if (existing) updateWhere(SHEETS.META, COLS.META, 'key', key, { value:value });
  else appendTo(SHEETS.META, COLS.META, { key:key, value:value });
}

// ── DATA MANAGEMENT ───────────────────────────────────────────

function clearUserData(userId) {
  [SHEETS.PROFILES, SHEETS.LOGS, SHEETS.CYCLES, SHEETS.CHAT].forEach(function(name) {
    deleteWhere(name, 'userId', userId);
  });
  return { cleared: true };
}

function exportCSV(userId) {
  var logs = getLogs(userId, 365);
  var profile = getProfile(userId);
  var user = getUserById(userId);
  var csv = 'NAARI CYCLE — Health Export\n';
  csv += 'User: '+(user?user.name:'')+', Email: '+(user?user.email:'')+'\n';
  csv += 'Cycle Length: '+(profile?profile.cycleLength:28)+' days, Last Period: '+(profile?profile.lastPeriodDate:'')+'\n\n';
  csv += 'Date,Period Started,Flow,Pain Level,Symptoms,Mood,Energy,Sleep,Water,Stress,Activity,Productivity\n';
  logs.slice().reverse().forEach(function(l) {
    csv += [l.date, l.periodStarted?'Yes':'No', l.flow||'', l.painLevel||0,
      '"'+(Array.isArray(l.symptoms)?l.symptoms:[]).join('; ')+'"',
      l.mood||'', l.energyLevel||'', l.sleep||'', l.water||'', l.stress||'', l.activity||'',
      '"'+(Array.isArray(l.productivity)?l.productivity:[]).join('; ')+'"'
    ].join(',') + '\n';
  });
  return { csv: csv };
}
