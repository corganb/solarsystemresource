// ═══════════════════════════════════════════════════════════════════
// RESOURCE SYSTEMS CORE v1.1
// Shared module for all Resource Systems intelligence platforms
// a Corgan Studio production
// ═══════════════════════════════════════════════════════════════════

(function(global) {
'use strict';

// ═══ CONFIG ═══
var RS = {
  SUPABASE_URL: 'https://pxocavaczfjcpvqeiznt.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_1IZ6cL3vvPdAc1f8u2ah6w_-txoo_VL',
  VERSION: '1.2.0',
};

// HTML sanitizer: escapes <, >, &, ", ' to prevent XSS when
// inserting user-derived data (emails, names, descriptions) via innerHTML.
RS.esc = function(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
};

// ═══ DOMAIN REGISTRY ═══
RS.SITES = {
  sun:      { name: 'Sun',      domain: 'sunresource.net',          color: '#e8c840', icon: '☀️' },
  mercury:  { name: 'Mercury',  domain: 'mercuryresource.net',      color: '#a0a0a0', icon: '⚫' },
  venus:    { name: 'Venus',    domain: 'venusresource.net',        color: '#e8dcc0', icon: '🟡' },
  earth:    { name: 'Earth',    domain: 'terraresource.net',        color: '#4da6ff', icon: '🌍' },
  moon:     { name: 'Moon',     domain: 'moonresource.com',         color: '#c8c8c0', icon: '🌑' },
  mars:     { name: 'Mars',     domain: 'marsresource.net',         color: '#c45030', icon: '🔴' },
  jupiter:  { name: 'Jupiter',  domain: 'jupiterresource.net',      color: '#c88040', icon: '🟠' },
  saturn:   { name: 'Saturn',   domain: 'saturnresource.net',       color: '#d4b46a', icon: '🪐' },
  uranus:   { name: 'Uranus',   domain: 'uranusresource.net',       color: '#7ec8d4', icon: '🔵' },
  neptune:  { name: 'Neptune',  domain: 'neptuneresource.net',      color: '#4060d4', icon: '🔵' },
  pluto:    { name: 'Pluto',    domain: 'plutoresource.net',        color: '#b0a090', icon: '⚪' },
  hub:      { name: 'Solar System', domain: 'solarsystemresource.com', color: '#ffffff', icon: '☀️' },
  galactic: { name: 'Milky Way',    domain: 'galacticresource.com',    color: '#a0b8ff', icon: '🌌' },
};

// ═══ LOGO & FAVICON SYSTEM ═══
// Each site uses the same globe shape · primary color base with terrain-colored inner details
// This creates a unified family identity with distinct per-planet personality

RS.BRAND_MARKS = {
  // Unified logo: gradient circle with highlight + 3 centered horizontal pillbox bars
  // Each planet uses its own color palette: base (dark), highlight (lighter), bar1, bar2, bar3
  earth:   '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="eg" cx="35%" cy="35%"><stop offset="0%" stop-color="#2a7ab5" stop-opacity="0.8"/><stop offset="100%" stop-color="#0a2a44" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#122e44"/><circle cx="12" cy="12" r="11" fill="url(#eg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#44aa55" opacity="0.9"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#2d7a38" opacity="0.8"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#c8dce8" opacity="0.6"/></svg>',
  moon:    '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="mg" cx="35%" cy="35%"><stop offset="0%" stop-color="#a0a098" stop-opacity="0.6"/><stop offset="100%" stop-color="#3a3a38" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#4a4a46"/><circle cx="12" cy="12" r="11" fill="url(#mg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#b0b0a8" opacity="0.8"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#8a8a84" opacity="0.7"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#c8c8c0" opacity="0.55"/></svg>',
  sun:     '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="sg" cx="35%" cy="35%"><stop offset="0%" stop-color="#FFD54F" stop-opacity="0.7"/><stop offset="100%" stop-color="#7a4800" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#8a5a08"/><circle cx="12" cy="12" r="11" fill="url(#sg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#FFD54F" opacity="0.85"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#f0a820" opacity="0.75"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#ffe080" opacity="0.6"/></svg>',
  mercury: '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="meg" cx="35%" cy="35%"><stop offset="0%" stop-color="#888" stop-opacity="0.6"/><stop offset="100%" stop-color="#2a2a2a" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#3a3a3a"/><circle cx="12" cy="12" r="11" fill="url(#meg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#909090" opacity="0.8"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#686868" opacity="0.7"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#a8a8a8" opacity="0.55"/></svg>',
  venus:   '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="vg" cx="35%" cy="35%"><stop offset="0%" stop-color="#e8dcc0" stop-opacity="0.6"/><stop offset="100%" stop-color="#5a4a28" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#6a5a38"/><circle cx="12" cy="12" r="11" fill="url(#vg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#e8dcc0" opacity="0.8"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#c8b080" opacity="0.7"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#d8c8a0" opacity="0.55"/></svg>',
  mars:    '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="mrg" cx="35%" cy="35%"><stop offset="0%" stop-color="#d06040" stop-opacity="0.7"/><stop offset="100%" stop-color="#4a1a10" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#5a2018"/><circle cx="12" cy="12" r="11" fill="url(#mrg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#e8c0a0" opacity="0.85"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#d06040" opacity="0.75"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#b04828" opacity="0.6"/></svg>',
  jupiter: '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="jg" cx="35%" cy="35%"><stop offset="0%" stop-color="#c8a050" stop-opacity="0.7"/><stop offset="100%" stop-color="#3a2810" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#4a3018"/><circle cx="12" cy="12" r="11" fill="url(#jg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#c8a050" opacity="0.85"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#c04020" opacity="0.75"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#a07030" opacity="0.6"/></svg>',
  saturn:  '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="sag" cx="35%" cy="35%"><stop offset="0%" stop-color="#d4b46a" stop-opacity="0.7"/><stop offset="100%" stop-color="#4a3a18" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#4a3a18"/><circle cx="12" cy="12" r="11" fill="url(#sag)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#d4b46a" opacity="0.85"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#b09840" opacity="0.7"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#c8a850" opacity="0.55"/></svg>',
  uranus:  '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="ug" cx="35%" cy="35%"><stop offset="0%" stop-color="#90d8e4" stop-opacity="0.6"/><stop offset="100%" stop-color="#1a4a50" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#2a5a60"/><circle cx="12" cy="12" r="11" fill="url(#ug)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#90d8e4" opacity="0.8"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#60b0c0" opacity="0.7"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#7ec8d4" opacity="0.55"/></svg>',
  neptune: '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="ng" cx="35%" cy="35%"><stop offset="0%" stop-color="#4060d4" stop-opacity="0.7"/><stop offset="100%" stop-color="#0a1840" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#101a48"/><circle cx="12" cy="12" r="11" fill="url(#ng)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#4060d4" opacity="0.8"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#2840a0" opacity="0.7"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#5070e0" opacity="0.55"/></svg>',
  pluto:   '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="pg" cx="35%" cy="35%"><stop offset="0%" stop-color="#a09080" stop-opacity="0.6"/><stop offset="100%" stop-color="#2a2420" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#3a3028"/><circle cx="12" cy="12" r="11" fill="url(#pg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#b0a090" opacity="0.75"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#7a6a58" opacity="0.65"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#a09080" opacity="0.5"/></svg>',
  solarsystem: '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="ssg" cx="35%" cy="35%"><stop offset="0%" stop-color="#FFD54F" stop-opacity="0.8"/><stop offset="100%" stop-color="#1a0f28" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#0a0a1a"/><circle cx="12" cy="12" r="11" fill="url(#ssg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#FFD54F" opacity="0.9"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#4da6ff" opacity="0.85"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#c88040" opacity="0.8"/></svg>',
};
// Alias: SITES uses 'hub' as the key for solarsystemresource; BRAND_MARKS.hub points at the same pill-box SVG for consistency.
RS.BRAND_MARKS.hub = RS.BRAND_MARKS.solarsystem;

// Galactic brand: deep indigo base, blue/white/purple bars evoking spiral arms
RS.BRAND_MARKS.galactic = '<svg width="24" height="24" viewBox="0 0 24 24"><defs><radialGradient id="galg" cx="35%" cy="35%"><stop offset="0%" stop-color="#a0b8ff" stop-opacity="0.7"/><stop offset="100%" stop-color="#050820" stop-opacity="0"/></radialGradient></defs><circle cx="12" cy="12" r="11" fill="#060820"/><circle cx="12" cy="12" r="11" fill="url(#galg)"/><rect x="5" y="7.5" width="14" height="2.8" rx="1.4" fill="#a0b8ff" opacity="0.85"/><rect x="5" y="11" width="14" height="2.8" rx="1.4" fill="#ffddaa" opacity="0.8"/><rect x="5" y="14.5" width="14" height="2.8" rx="1.4" fill="#8890dd" opacity="0.7"/></svg>';


RS.generateFavicon = function(siteKey) {
  var svg = RS.BRAND_MARKS[siteKey];
  if (!svg) return '';
  var fav = svg.replace(/width="24" height="24"/, 'width="32" height="32"');
  return 'data:image/svg+xml,' + encodeURIComponent(fav);
};

RS.generateBrandMark = function(siteKey) {
  return RS.BRAND_MARKS[siteKey] || '';
};

// ═══ SUPABASE AUTH ═══
var sbClient = null;
RS.authUser = null;
// Tier is stored in a closure variable so it can't be trivially overwritten
// from the browser console. RS.userTier is a getter; RS._setTier is the
// only way to change it (called from fetchTier and signout).
var _tier = 'free';
Object.defineProperty(RS, 'userTier', {
  get: function() { return _tier; },
  set: function() { /* ignore direct assignment attempts */ },
  configurable: false
});
RS._setTier = function(t) {
  var valid = ['free','researcher','pro','team','enterprise'];
  _tier = (valid.indexOf(t) !== -1) ? t : 'free';
};
var _supabaseLoading = false;

RS.loadSupabase = function() {
  return new Promise(function(resolve, reject) {
    if (sbClient) { resolve(sbClient); return; }
    if (window.supabase && window.supabase.createClient) {
      sbClient = window.supabase.createClient(RS.SUPABASE_URL, RS.SUPABASE_ANON_KEY);
      resolve(sbClient); return;
    }
    if (_supabaseLoading) { setTimeout(function() { resolve(sbClient); }, 1000); return; }
    _supabaseLoading = true;
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    s.onload = function() {
      try {
        sbClient = window.supabase.createClient(RS.SUPABASE_URL, RS.SUPABASE_ANON_KEY);
        resolve(sbClient);
      } catch(e) { reject(e); }
    };
    s.onerror = function() { reject(new Error('Failed to load Supabase')); };
    document.head.appendChild(s);
  });
};

RS.getClient = function() { return sbClient; };

RS.checkSession = async function(onAuth) {
  try {
    await RS.loadSupabase();
    if (!sbClient) return;
    var sess = await sbClient.auth.getSession();
    if (sess.data.session && sess.data.session.user) {
      RS.authUser = sess.data.session.user;
      await RS.fetchTier();
      if (onAuth) onAuth();
    }
    sbClient.auth.onAuthStateChange(async function(event, session) {
      if (session && session.user) {
        RS.authUser = session.user;
        await RS.fetchTier();
      } else {
        RS.authUser = null;
        RS._setTier('free');
      }
      if (onAuth) onAuth();
    });
  } catch(e) { console.warn('[ResourceSystems] Session check failed:', e); }
};

RS.fetchTier = async function() {
  if (!sbClient || !RS.authUser) return;
  try {
    var result = await sbClient.from('profiles').select('tier').eq('id', RS.authUser.id).single();
    if (result.data) RS._setTier(result.data.tier || 'free');
  } catch(e) { RS._setTier('free'); }
};

RS.isProUser = function() {
  return RS.userTier === 'pro' || RS.userTier === 'team' || RS.userTier === 'enterprise';
};

RS.isEnterprise = function() {
  return RS.userTier === 'enterprise';
};

RS.signIn = async function(email, password) {
  if (!sbClient) return { error: 'Not initialized' };
  var result = await sbClient.auth.signInWithPassword({ email: email, password: password });
  if (result.error) return { error: result.error.message };
  RS.authUser = result.data.user;
  await RS.fetchTier();
  return { data: result.data };
};

RS.signUp = async function(email, password) {
  if (!sbClient) return { error: 'Not initialized' };
  var result = await sbClient.auth.signUp({ email: email, password: password });
  if (result.error) return { error: result.error.message };
  return { data: result.data, message: 'Check your email to confirm, then sign in.' };
};

RS.signOut = async function() {
  if (!sbClient) return;
  await sbClient.auth.signOut();
  RS.authUser = null;
  RS._setTier('free');
};

// ═══ PRICING ═══
RS.fetchPricing = async function() {
  try {
    var resp = await fetch(RS.SUPABASE_URL + '/rest/v1/pricing_config?select=*&order=sort_order', {
      headers: { 'apikey': RS.SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + RS.SUPABASE_ANON_KEY }
    });
    var data = await resp.json();
    return Array.isArray(data) ? data : [];
  } catch(e) { return []; }
};

// ═══ SOLAR SYSTEM EPHEMERIS ═══
RS.PLANETS_DATA = [
  { name: 'Mercury', color: '#a0a0a0', diam: 4879,   a: 0.387, e: 0.2056, i: 7.00,  L: 252.25, wBar: 77.46,  Om: 48.33,  url: 'https://mercuryresource.net', desc: 'Closest to the Sun · extreme temperatures · 4,879 km' },
  { name: 'Venus',   color: '#e8dcc0', diam: 12104,  a: 0.723, e: 0.0068, i: 3.39,  L: 181.98, wBar: 131.53, Om: 76.68,  url: 'https://venusresource.net',   desc: 'Hottest planet · retrograde rotation · 12,104 km' },
  { name: 'Mars',    color: '#d2694a', diam: 6779,   a: 1.524, e: 0.0934, i: 1.85,  L: 355.45, wBar: 336.04, Om: 49.56,  url: 'https://marsresource.net',    desc: 'The Red Planet · future colony target · 6,779 km' },
  { name: 'Jupiter', color: '#c88040', diam: 139820, a: 5.203, e: 0.0489, i: 1.30,  L: 34.40,  wBar: 14.73,  Om: 100.56, url: 'https://jupiterresource.net', desc: 'Largest planet · Great Red Spot · 139,820 km' },
  { name: 'Saturn',  color: '#d4b46a', diam: 116460, a: 9.537, e: 0.0565, i: 2.49,  L: 49.94,  wBar: 92.43,  Om: 113.72, url: 'https://saturnresource.net',  desc: 'Ringed giant · lowest density · 116,460 km' },
  { name: 'Uranus',  color: '#7ec8d4', diam: 50724,  a: 19.19, e: 0.0463, i: 0.77,  L: 313.23, wBar: 170.96, Om: 74.01,  url: 'https://uranusresource.net',  desc: 'Ice giant · extreme axial tilt · 50,724 km' },
  { name: 'Neptune', color: '#4060d4', diam: 49244,  a: 30.07, e: 0.0095, i: 1.77,  L: 304.88, wBar: 44.97,  Om: 131.78, url: 'https://neptuneresource.net', desc: 'Farthest planet · strongest winds · 49,244 km' },
];

RS.icrfToFixed = function(posIcrf) {
  var now = Cesium.JulianDate.now();
  var transform = Cesium.Transforms.computeIcrfToFixedMatrix(now);
  if (!transform) transform = Cesium.Transforms.computeTemeToPseudoFixedMatrix(now);
  return Cesium.Matrix3.multiplyByVector(transform, posIcrf, new Cesium.Cartesian3());
};

RS.getPlanetPosition = function(planet) {
  var AU = 149597870700;
  var p = RS.PLANETS_DATA.find(function(x) { return x.name === planet; });
  if (!p) return { pos: new Cesium.Cartesian3(), distKm: 1 };
  var d = Cesium.JulianDate.daysDifference(Cesium.JulianDate.now(), Cesium.JulianDate.fromIso8601('2000-01-01T12:00:00Z'));
  var T = d / 36525;
  var M = (p.L + 360 * T / (Math.pow(p.a, 1.5) * 365.25) - p.wBar) % 360 * Math.PI / 180;
  var E = M;
  for (var k = 0; k < 10; k++) E = M + p.e * Math.sin(E);
  var v = 2 * Math.atan2(Math.sqrt(1 + p.e) * Math.sin(E / 2), Math.sqrt(1 - p.e) * Math.cos(E / 2));
  var r = p.a * (1 - p.e * Math.cos(E)) * AU;
  var Om = p.Om * Math.PI / 180;
  var w = (p.wBar - p.Om) * Math.PI / 180;
  var inc = p.i * Math.PI / 180;
  var cosO = Math.cos(Om), sinO = Math.sin(Om);
  var cosW = Math.cos(w + v), sinW = Math.sin(w + v);
  var cosI = Math.cos(inc), sinI = Math.sin(inc);
  var x = r * (cosO * cosW - sinO * sinW * cosI);
  var y = r * (sinO * cosW + cosO * sinW * cosI);
  var z = r * sinW * sinI;
  return { pos: new Cesium.Cartesian3(x, y, z), distKm: r / 1000 };
};

// Cesium-free heliocentric planet position for Three.js-based sites.
// Returns raw {x, y, z, distKm} in meters (and km for distance) using the
// same simplified Kepler elements as getPlanetPosition, but without any
// Cesium dependency so the Three.js sites can use it.
RS.getPlanetPositionXYZ = function(name) {
  var AU = 149597870700;
  var p = RS.PLANETS_DATA.find(function(x) { return x.name === name; });
  if (!p) return null;
  // Days since J2000 (JD 2451545.0 = 2000-01-01T12:00:00Z)
  var d = (Date.now() / 86400000) + 2440587.5 - 2451545.0;
  var T = d / 36525;
  var M = (((p.L + 360 * T / (Math.pow(p.a, 1.5) * 365.25) - p.wBar) % 360) + 360) % 360 * Math.PI / 180;
  var E = M;
  for (var k = 0; k < 10; k++) E = M + p.e * Math.sin(E);
  var v = 2 * Math.atan2(Math.sqrt(1 + p.e) * Math.sin(E/2), Math.sqrt(1 - p.e) * Math.cos(E/2));
  var r = p.a * (1 - p.e * Math.cos(E)) * AU;
  var Om = p.Om * Math.PI / 180;
  var w = (p.wBar - p.Om) * Math.PI / 180;
  var inc = p.i * Math.PI / 180;
  var cosO = Math.cos(Om), sinO = Math.sin(Om);
  var cosW = Math.cos(w + v), sinW = Math.sin(w + v);
  var cosI = Math.cos(inc), sinI = Math.sin(inc);
  return {
    x: r * (cosO * cosW - sinO * sinW * cosI),
    y: r * (sinO * cosW + cosO * sinW * cosI),
    z: r * sinW * sinI,
    distKm: r / 1000,
  };
};

RS.getMoonPhase = function() {
  var now = new Date();
  var ref = new Date('2000-01-06T18:14:00Z');
  var days = (now - ref) / 86400000;
  var cycle = 29.53058867;
  var phase = ((days % cycle) + cycle) % cycle;
  var pct = phase / cycle;
  var names = ['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'];
  var icons = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
  var idx = Math.floor(pct * 8) % 8;
  return { pct: pct, name: names[idx], icon: icons[idx] };
};

RS.buildMoonSVG = function(pct) {
  var r = 10;
  var illum = Math.abs(0.5 - 0.5 * Math.cos(2 * Math.PI * pct)) * 100;
  var phase = pct < 0.5 ? 'waxing' : 'waning';
  var sweep = illum / 100;
  var dx = (phase === 'waxing' ? 1 - 2 * sweep : 2 * sweep - 1) * r;
  return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<circle cx="12" cy="12" r="' + r + '" fill="#1a1a18"/>' +
    '<clipPath id="mc"><circle cx="12" cy="12" r="' + r + '"/></clipPath>' +
    '<path d="M12 2 A' + r + ' ' + r + ' 0 0 1 12 22 A' + Math.abs(dx) + ' ' + r + ' 0 0 ' + (dx >= 0 ? '1' : '0') + ' 12 2Z" fill="#d4d4c8" clip-path="url(#mc)"/>' +
    '<circle cx="12" cy="12" r="' + r + '" fill="none" stroke="#888" stroke-width="0.3" opacity="0.4"/></svg>';
};

RS.SUN_SVG = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">' +
  '<circle cx="25" cy="25" r="8" fill="#FFF5CC"/>' +
  '<circle cx="25" cy="25" r="12" fill="#FFD54F" opacity="0.5"/>' +
  '<circle cx="25" cy="25" r="18" fill="#FFB300" opacity="0.15"/>' +
  '<circle cx="25" cy="25" r="24" fill="#FF8F00" opacity="0.06"/></svg>'
);

RS.angularSizePx = function(diamKm, distKm, minPx, maxPx) {
  var angRad = diamKm / distKm;
  var moonAngRad = 3474 / 384400;
  var moonPx = 22;
  var px = (angRad / moonAngRad) * moonPx;
  return Math.max(minPx, Math.min(maxPx, Math.round(px)));
};

// Detailed planet SVGs with recognizable features (for globe viewport)
RS.PLANET_SVGS = {
  Mercury: function(sz) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+sz+'" height="'+sz+'" viewBox="0 0 32 32">' +
      '<circle cx="16" cy="16" r="12" fill="#8a8a8a"/>' +
      '<circle cx="16" cy="16" r="12" fill="url(#mg)" opacity="0.3"/>' +
      '<circle cx="11" cy="13" r="3" fill="#707070" opacity="0.5"/>' +
      '<circle cx="19" cy="11" r="2" fill="#707070" opacity="0.4"/>' +
      '<circle cx="15" cy="19" r="2.5" fill="#707070" opacity="0.4"/>' +
      '<circle cx="21" cy="17" r="1.5" fill="#707070" opacity="0.3"/>' +
      '<circle cx="16" cy="16" r="12" fill="none" stroke="#666" stroke-width="0.3"/></svg>';
  },
  Venus: function(sz) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+sz+'" height="'+sz+'" viewBox="0 0 32 32">' +
      '<circle cx="16" cy="16" r="12" fill="#e8dcc0"/>' +
      '<ellipse cx="16" cy="10" rx="11" ry="2" fill="#d4c8a0" opacity="0.5"/>' +
      '<ellipse cx="16" cy="15" rx="10" ry="1.5" fill="#d4c8a0" opacity="0.4"/>' +
      '<ellipse cx="16" cy="20" rx="11" ry="2" fill="#d4c8a0" opacity="0.5"/>' +
      '<circle cx="16" cy="16" r="12" fill="#f0e8d0" opacity="0.15"/>' +
      '<circle cx="16" cy="16" r="12" fill="none" stroke="#c8b880" stroke-width="0.3"/></svg>';
  },
  Mars: function(sz) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+sz+'" height="'+sz+'" viewBox="0 0 32 32">' +
      '<circle cx="16" cy="16" r="12" fill="#c45030"/>' +
      '<circle cx="16" cy="16" r="12" fill="#d46040" opacity="0.3"/>' +
      '<ellipse cx="16" cy="6" rx="8" ry="3" fill="#e8d8d0" opacity="0.7"/>' +
      '<path d="M8 16 Q12 13 16 15 Q20 17 24 14" stroke="#a03020" stroke-width="1" fill="none" opacity="0.5"/>' +
      '<circle cx="12" cy="18" r="2" fill="#b04030" opacity="0.4"/>' +
      '<circle cx="16" cy="16" r="12" fill="none" stroke="#903020" stroke-width="0.3"/></svg>';
  },
  Jupiter: function(sz) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+sz+'" height="'+sz+'" viewBox="0 0 32 32">' +
      '<circle cx="16" cy="16" r="14" fill="#c8a060"/>' +
      '<ellipse cx="16" cy="9" rx="13" ry="2" fill="#d4a850" opacity="0.6"/>' +
      '<ellipse cx="16" cy="13" rx="13" ry="1.5" fill="#b08040" opacity="0.5"/>' +
      '<ellipse cx="16" cy="17" rx="13" ry="2" fill="#e0b060" opacity="0.4"/>' +
      '<ellipse cx="16" cy="21" rx="13" ry="1.5" fill="#a07030" opacity="0.5"/>' +
      '<ellipse cx="16" cy="24" rx="13" ry="2" fill="#d4a850" opacity="0.4"/>' +
      '<ellipse cx="20" cy="18" rx="3.5" ry="2.5" fill="#d04020" opacity="0.7"/>' +
      '<ellipse cx="20" cy="18" rx="2" ry="1.2" fill="#e05030" opacity="0.5"/>' +
      '<circle cx="16" cy="16" r="14" fill="none" stroke="#a08040" stroke-width="0.3"/></svg>';
  },
  Saturn: function(sz) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+sz+'" height="'+sz+'" viewBox="0 0 40 32">' +
      '<ellipse cx="20" cy="16" rx="18" ry="5" fill="none" stroke="#c8b070" stroke-width="1.5" opacity="0.6"/>' +
      '<ellipse cx="20" cy="16" rx="15" ry="3.5" fill="none" stroke="#c8b070" stroke-width="0.8" opacity="0.4"/>' +
      '<circle cx="20" cy="16" r="10" fill="#d4b46a"/>' +
      '<ellipse cx="20" cy="12" rx="9" ry="1.5" fill="#c8a850" opacity="0.5"/>' +
      '<ellipse cx="20" cy="15" rx="9" ry="1" fill="#b09840" opacity="0.4"/>' +
      '<ellipse cx="20" cy="19" rx="9" ry="1.5" fill="#c8a850" opacity="0.4"/>' +
      '<ellipse cx="20" cy="16" rx="18" ry="5" fill="none" stroke="#c8b070" stroke-width="1.5" opacity="0.35" stroke-dasharray="0 18 40"/>' +
      '<circle cx="20" cy="16" r="10" fill="none" stroke="#a09050" stroke-width="0.3"/></svg>';
  },
  Uranus: function(sz) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+sz+'" height="'+sz+'" viewBox="0 0 32 32">' +
      '<circle cx="16" cy="16" r="12" fill="#7ec8d4"/>' +
      '<circle cx="16" cy="16" r="12" fill="#90d8e4" opacity="0.3"/>' +
      '<ellipse cx="16" cy="16" rx="3" ry="14" fill="none" stroke="#a0d8e0" stroke-width="0.8" opacity="0.4" transform="rotate(8 16 16)"/>' +
      '<circle cx="16" cy="16" r="12" fill="none" stroke="#60a8b4" stroke-width="0.3"/></svg>';
  },
  Neptune: function(sz) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+sz+'" height="'+sz+'" viewBox="0 0 32 32">' +
      '<circle cx="16" cy="16" r="12" fill="#3050c0"/>' +
      '<circle cx="16" cy="16" r="12" fill="#4060d4" opacity="0.3"/>' +
      '<ellipse cx="16" cy="12" rx="10" ry="1.5" fill="#5070e0" opacity="0.4"/>' +
      '<ellipse cx="16" cy="18" rx="10" ry="1" fill="#5070e0" opacity="0.3"/>' +
      '<ellipse cx="13" cy="14" rx="2.5" ry="2" fill="#2040a0" opacity="0.5"/>' +
      '<circle cx="16" cy="16" r="12" fill="none" stroke="#2040a0" stroke-width="0.3"/></svg>';
  },
};

RS.makePlanetSVG = function(name, color, r) {
  var fn = RS.PLANET_SVGS[name];
  if (fn) return 'data:image/svg+xml,' + encodeURIComponent(fn(r * 2 + 8));
  // Fallback simple circle
  return 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">' +
    '<circle cx="16" cy="16" r="' + r + '" fill="' + color + '"/>' +
    '<circle cx="16" cy="16" r="' + (r + 2) + '" fill="' + color + '" opacity="0.2"/></svg>'
  );
};

// Navigation bar planet icons (small, for topbar links between sites)
RS.NAV_ICONS = {
  Sun: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="#FFD54F"/><circle cx="12" cy="12" r="9" fill="#FFB300" opacity="0.2"/></svg>',
  Mercury: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#8a8a8a"/><circle cx="9" cy="10" r="2" fill="#707070" opacity="0.5"/><circle cx="14" cy="9" r="1.3" fill="#707070" opacity="0.4"/><circle cx="11" cy="14" r="1.5" fill="#707070" opacity="0.4"/></svg>',
  Venus: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#e8dcc0"/><ellipse cx="12" cy="9" rx="6" ry="1.2" fill="#d4c8a0" opacity="0.5"/><ellipse cx="12" cy="14" rx="6" ry="1" fill="#d4c8a0" opacity="0.4"/></svg>',
  Earth: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#2266aa"/><path d="M7 9 Q9 7 12 8 Q14 9 16 7" fill="#44aa55" opacity="0.8"/><path d="M6 13 Q8 11 11 12 Q14 14 17 12" fill="#44aa55" opacity="0.7"/><circle cx="12" cy="12" r="7" fill="none" stroke="#1155aa" stroke-width="0.3"/></svg>',
  Moon: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#c8c8c0"/><circle cx="9" cy="10" r="1.8" fill="#a0a098" opacity="0.5"/><circle cx="14" cy="9" r="1.2" fill="#a0a098" opacity="0.4"/><circle cx="11" cy="14" r="1.5" fill="#a0a098" opacity="0.4"/></svg>',
  Mars: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#c45030"/><ellipse cx="12" cy="6.5" rx="5" ry="2" fill="#e8d8d0" opacity="0.6"/><circle cx="10" cy="13" r="1.2" fill="#a03020" opacity="0.4"/></svg>',
  Jupiter: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#c8a060"/><ellipse cx="12" cy="8" rx="7" ry="1.2" fill="#b08040" opacity="0.5"/><ellipse cx="12" cy="11" rx="7" ry="1" fill="#e0b060" opacity="0.4"/><ellipse cx="12" cy="15" rx="7" ry="1.2" fill="#a07030" opacity="0.5"/><ellipse cx="14" cy="13" rx="2.2" ry="1.5" fill="#d04020" opacity="0.7"/></svg>',
  Saturn: '<svg width="22" height="18" viewBox="0 0 28 24"><ellipse cx="14" cy="12" rx="12" ry="3.5" fill="none" stroke="#c8b070" stroke-width="1.2" opacity="0.5"/><circle cx="14" cy="12" r="7" fill="#d4b46a"/><ellipse cx="14" cy="9.5" rx="6" ry="1" fill="#c8a850" opacity="0.4"/><ellipse cx="14" cy="14" rx="6" ry="1" fill="#c8a850" opacity="0.4"/><ellipse cx="14" cy="12" rx="12" ry="3.5" fill="none" stroke="#c8b070" stroke-width="1" opacity="0.3" stroke-dasharray="0 12 28"/></svg>',
  Uranus: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#7ec8d4"/><ellipse cx="12" cy="12" rx="2" ry="9" fill="none" stroke="#a0d8e0" stroke-width="0.6" opacity="0.4" transform="rotate(8 12 12)"/></svg>',
  Neptune: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#3050c0"/><ellipse cx="12" cy="10" rx="6" ry="1" fill="#5070e0" opacity="0.4"/><ellipse cx="10" cy="12" rx="1.8" ry="1.3" fill="#2040a0" opacity="0.5"/></svg>',
  Pluto: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="#b0a090"/><circle cx="10" cy="11" r="1.5" fill="#907060" opacity="0.3"/><circle cx="14" cy="13" r="2" fill="#c0b0a0" opacity="0.3"/></svg>',
  SolarSystem: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" fill="#FFD54F"/><circle cx="12" cy="12" r="3.2" fill="#FFB300" opacity="0.4"/><circle cx="12" cy="12" r="7" fill="none" stroke="#4da6ff" stroke-width="0.7" opacity="0.5"/><circle cx="12" cy="12" r="10" fill="none" stroke="#c88040" stroke-width="0.5" opacity="0.4"/><circle cx="19" cy="12" r="1.1" fill="#c88040"/><circle cx="5" cy="12" r="0.9" fill="#4da6ff"/></svg>',
  Galactic: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" fill="#ffddaa"/><circle cx="16" cy="10" r="0.9" fill="#a0b8ff"/><circle cx="8" cy="14" r="0.9" fill="#a0b8ff"/><circle cx="14" cy="17" r="0.7" fill="#a0b8ff"/><circle cx="10" cy="7" r="0.7" fill="#a0b8ff"/><circle cx="19" cy="13" r="0.6" fill="#a0b8ff"/><circle cx="5" cy="11" r="0.6" fill="#a0b8ff"/><circle cx="17" cy="6" r="0.5" fill="#a0b8ff"/><circle cx="6" cy="18" r="0.5" fill="#a0b8ff"/></svg>',
};

// ═══ SOLAR SYSTEM RENDERER ═══
// Call RS.renderSolarSystem(cesiumViewer) from any Resource Systems site
RS.renderSolarSystem = function(viewer, options) {
  options = options || {};
  var celestialEntities = {};

  // Moon
  var moonPosition = new Cesium.CallbackProperty(function() {
    return RS.icrfToFixed(Cesium.Simon1994PlanetaryPositions.computeMoonPositionInEarthInertialFrame(Cesium.JulianDate.now()));
  }, false);
  var moonPhase = RS.getMoonPhase();
  var moonEntity = viewer.entities.add({
    name: 'Moon', position: moonPosition,
    billboard: { image: 'data:image/svg+xml,' + encodeURIComponent(RS.buildMoonSVG(moonPhase.pct)), width: 36, height: 36, scaleByDistance: new Cesium.NearFarScalar(5e5,2.5,5e8,0.7), disableDepthTestDistance: Number.POSITIVE_INFINITY },
    label: { text: moonPhase.icon + ' Moon \u00b7 ' + moonPhase.name, font: '11px "JetBrains Mono", monospace', fillColor: Cesium.Color.fromCssColorString('#d4d4c8'), outlineColor: Cesium.Color.BLACK, outlineWidth: 3, style: Cesium.LabelStyle.FILL_AND_OUTLINE, pixelOffset: new Cesium.Cartesian2(18,0), horizontalOrigin: Cesium.HorizontalOrigin.LEFT, scaleByDistance: new Cesium.NearFarScalar(1e6,1,5e8,0.4), disableDepthTestDistance: Number.POSITIVE_INFINITY },
    description: '<b>The Moon</b><br>Phase: ' + moonPhase.icon + ' ' + moonPhase.name + '<br>Distance: ~384,400 km',
  });
  celestialEntities['Moon'] = { entity: moonEntity, url: 'https://moonresource.com' };

  // Sun - rendered at the REAL Earth-Sun distance (1 AU = 149.6 million
  // km) computed from Cesium's Simon1994 ephemeris in the Earth-inertial
  // frame and rotated into the Earth-fixed frame each tick. The billboard
  // uses disableDepthTestDistance: Infinity so it draws on top of the
  // globe and doesn't get clipped by the depth buffer at that range.
  // scaleByDistance maps 1.5e11 m down to a 26px icon so the user sees
  // a small but clearly positioned dot at the sunward horizon direction.
  var sunPosition = new Cesium.CallbackProperty(function() {
    var icrf = Cesium.Simon1994PlanetaryPositions.computeSunPositionInEarthInertialFrame(Cesium.JulianDate.now());
    return RS.icrfToFixed(icrf);
  }, false);
  var sunEntity = viewer.entities.add({
    name: 'Sun', position: sunPosition,
    // NearFarScalar is tuned for the real 1 AU distance: 70px up close
    // (if the camera ever gets near it) down to ~26px at 1.5e11 m, which
    // is the actual Earth-Sun range.
    billboard: { image: RS.SUN_SVG, width: 50, height: 50, scaleByDistance: new Cesium.NearFarScalar(1e8, 1.4, 3e11, 0.52), disableDepthTestDistance: Number.POSITIVE_INFINITY },
    label: { text: 'Sun', font: '11px "JetBrains Mono", monospace', fillColor: Cesium.Color.fromCssColorString('#FFD54F'), outlineColor: Cesium.Color.BLACK, outlineWidth: 3, style: Cesium.LabelStyle.FILL_AND_OUTLINE, pixelOffset: new Cesium.Cartesian2(28,0), horizontalOrigin: Cesium.HorizontalOrigin.LEFT, scaleByDistance: new Cesium.NearFarScalar(1e8, 1.1, 3e11, 0.5), disableDepthTestDistance: Number.POSITIVE_INFINITY },
    description: '<b>The Sun</b><br>Type: G2V main-sequence star<br>Angular diameter: ~0.53\u00b0<br>Distance: ~149.6M km<br>Surface Temp: ~5,778 K',
  });
  celestialEntities['Sun'] = { entity: sunEntity, url: 'https://sunresource.net' };

  // Planets (unchanged - keeping real scale positions for now; only Sun has
  // been reported as invisible, and clamping planets could affect existing
  // planet-related features on Terra that depend on real distance)
  for (var i = 0; i < RS.PLANETS_DATA.length; i++) {
    var p = RS.PLANETS_DATA[i];
    var pd = RS.getPlanetPosition(p.name);
    var iPx = RS.angularSizePx(p.diam, pd.distKm, 10, 20);
    var pEntity = viewer.entities.add({
      name: p.name,
      position: new Cesium.CallbackProperty((function(pn) { return function() { return RS.icrfToFixed(RS.getPlanetPosition(pn).pos); }; })(p.name), false),
      billboard: { image: RS.makePlanetSVG(p.name, p.color, iPx*0.8), width: iPx*2, height: iPx*2, scaleByDistance: new Cesium.NearFarScalar(1e7,1.2,5e12,0.5), disableDepthTestDistance: Number.POSITIVE_INFINITY },
      label: { text: p.name + ' \u2197', font: '10px "JetBrains Mono", monospace', fillColor: Cesium.Color.fromCssColorString(p.color), outlineColor: Cesium.Color.BLACK, outlineWidth: 3, style: Cesium.LabelStyle.FILL_AND_OUTLINE, pixelOffset: new Cesium.Cartesian2(iPx+6,0), horizontalOrigin: Cesium.HorizontalOrigin.LEFT, scaleByDistance: new Cesium.NearFarScalar(1e7,1,5e12,0.3), disableDepthTestDistance: Number.POSITIVE_INFINITY },
      description: '<b>' + p.name + '</b><br>' + p.desc + '<br>Distance: ~' + (pd.distKm/1e6).toFixed(1) + 'M km',
    });
    celestialEntities[p.name] = { entity: pEntity, url: p.url };
  }

  // Store globally
  window.RS_moonEntity = moonEntity;
  window.RS_sunEntity = sunEntity;
  window.RS_celestialEntities = celestialEntities;

  // Occlusion · hide bodies behind the host planet
  var BODY_RADIUS = options.bodyRadius || 6371000; // Earth default
  viewer.scene.preRender.addEventListener(function() {
    var camPos = viewer.camera.positionWC;
    var now = viewer.clock.currentTime;
    var showThrough = options.getShowThrough ? options.getShowThrough() : false;
    if (showThrough) return;

    for (var name in celestialEntities) {
      var cel = celestialEntities[name];
      if (!cel.entity || !cel.entity.position) continue;
      var entPos;
      try { entPos = cel.entity.position.getValue ? cel.entity.position.getValue(now) : cel.entity.position; } catch(e) { continue; }
      if (!entPos) continue;

      var dir = Cesium.Cartesian3.subtract(entPos, camPos, new Cesium.Cartesian3());
      Cesium.Cartesian3.normalize(dir, dir);
      var ray = new Cesium.Ray(camPos, dir);
      var intersection = Cesium.IntersectionTests.raySphere(ray, new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, BODY_RADIUS));
      var isBehind = false;
      if (intersection && intersection.start > 0) {
        isBehind = intersection.start < Cesium.Cartesian3.distance(camPos, entPos);
      }

      // Respect per-body visibility from host site
      var showFn = options.getBodyVisible ? options.getBodyVisible(name) : true;
      cel.entity.show = showFn && !isBehind;
    }
  });

  // Click handling is left to the host site · see celestialEntities[name].url

  return celestialEntities;
};

// ═══ UI TEMPLATES ═══
// Shared UI components that all Resource Systems sites use

// Toast notifications
RS.showToast = function(msg) {
  var el = document.getElementById('rs-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'rs-toast';
    el.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:300;background:rgba(14,16,20,0.92);backdrop-filter:blur(12px);border:1px solid var(--b2);border-radius:8px;padding:8px 18px;font-size:12px;color:var(--t1);pointer-events:none;transition:opacity 0.3s;white-space:nowrap';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
};

RS.hideToast = function() {
  var el = document.getElementById('rs-toast');
  if (el) el.style.opacity = '0';
};

// Planet navigation bar · renders the row of planet dots in the topbar
RS.renderPlanetNav = function(activeSiteKey) {
  var navPlanets = [
    { key: 'earth',   label: 'TerraResource', color: '#4da6ff', active: false },
    { key: 'moon',    label: 'MoonResource',  color: '#c8c8c0', active: false },
    { key: 'mars',    label: 'MarsResource',  color: '#c45030', active: false },
    { key: 'sun',     label: 'SunResource',   color: '#e8c840', active: false },
  ];
  var html = '';
  for (var i = 0; i < navPlanets.length; i++) {
    var p = navPlanets[i];
    var site = RS.SITES[p.key];
    var isActive = (p.key === activeSiteKey);
    var opacity = isActive ? '1' : '0.35';
    var cursor = isActive ? 'default' : 'pointer';
    var onclick = isActive ? '' : 'onclick="window.open(\'https://' + site.domain + '\',\'_blank\')"';
    html += '<button class="tb-btn" style="width:30px;height:28px;padding:0;display:flex;align-items:center;justify-content:center;opacity:' + opacity + ';cursor:' + cursor + '" title="' + p.label + (isActive ? ' (current)' : '') + '" ' + onclick + '>' +
      '<svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="' + p.color + '"/></svg></button>';
  }
  return html;
};

// Auth button for topbar · renders sign-in or avatar+tier
RS.renderAuthButton = function() {
  if (RS.authUser) {
    var tier = RS.userTier.toUpperCase();
    var initial = (RS.authUser.email || 'U')[0].toUpperCase();
    return '<button class="tb-btn" onclick="window.RS_toggleAccountMenu()" title="Signed in as ' + RS.esc(RS.authUser.email) + '" style="border-color:var(--accent-border);color:var(--accent)">' +
      '<span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:var(--accent);color:#000;font-size:10px;font-weight:600;text-align:center;line-height:18px">' + initial + '</span> ' + tier + '</button>';
  }
  return '<button class="tb-btn" onclick="window.RS_toggleAuthModal()" title="Sign In" style="border-color:var(--accent-border);color:var(--accent)">Sign In</button>';
};

// ═══ ANALYSIS PANEL ═══
// Shared object-inspector panel rendered by RS.showAnalysisPanel(config).
// Config shape: { name, type, image, fields: [{label, value}], desc, link }
// Injected once into the DOM on first call; reused on subsequent calls.
// Close via RS.hideAnalysisPanel() or the X button.

RS._analysisPanelEl = null;

RS._ensureAnalysisCSS = function() {
  if (document.getElementById('rs-analysis-css')) return;
  var s = document.createElement('style');
  s.id = 'rs-analysis-css';
  s.textContent = [
    '#rs-analysis { position:fixed; right:16px; top:60px; width:320px; max-height:calc(100vh - 80px); overflow-y:auto; background:rgba(10,14,22,0.95); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:0; z-index:200; font-family:-apple-system,BlinkMacSystemFont,sans-serif; color:rgba(232,234,240,0.95); box-shadow:0 8px 40px rgba(0,0,0,0.5); transition:opacity 0.2s,transform 0.2s; }',
    '#rs-analysis.hidden { opacity:0; pointer-events:none; transform:translateX(20px); }',
    '#rs-analysis .ap-header { padding:14px 16px 10px; display:flex; gap:12px; align-items:flex-start; border-bottom:1px solid rgba(255,255,255,0.06); }',
    '#rs-analysis .ap-img { width:64px; height:64px; border-radius:6px; object-fit:cover; background:rgba(255,255,255,0.04); flex-shrink:0; }',
    '#rs-analysis .ap-img.placeholder { display:flex; align-items:center; justify-content:center; font-size:28px; color:rgba(255,255,255,0.15); }',
    '#rs-analysis .ap-title { font-size:15px; font-weight:600; letter-spacing:0.02em; line-height:1.3; }',
    '#rs-analysis .ap-type { font-size:9.5px; text-transform:uppercase; letter-spacing:0.1em; color:rgba(160,168,184,0.6); margin-top:2px; }',
    '#rs-analysis .ap-close { position:absolute; top:10px; right:12px; background:none; border:none; color:rgba(255,255,255,0.4); font-size:18px; cursor:pointer; line-height:1; padding:4px; }',
    '#rs-analysis .ap-close:hover { color:rgba(255,255,255,0.8); }',
    '#rs-analysis .ap-fields { padding:10px 16px; }',
    '#rs-analysis .ap-row { display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px dashed rgba(255,255,255,0.04); font-size:11.5px; }',
    '#rs-analysis .ap-row .ap-label { color:rgba(106,116,136,1); text-transform:uppercase; letter-spacing:0.06em; font-size:9.5px; }',
    '#rs-analysis .ap-row .ap-val { color:rgba(200,210,228,0.9); text-align:right; max-width:60%; }',
    '#rs-analysis .ap-desc { padding:8px 16px 14px; font-size:11.5px; color:rgba(160,172,200,0.65); line-height:1.7; }',
    '#rs-analysis .ap-link { display:block; padding:10px 16px; border-top:1px solid rgba(255,255,255,0.06); font-size:11px; color:rgba(160,184,255,0.8); text-decoration:none; text-align:center; }',
    '#rs-analysis .ap-link:hover { color:rgba(160,184,255,1); }',
    '@media (max-width:768px) { #rs-analysis { right:8px; left:8px; width:auto; top:56px; max-height:calc(100vh - 70px); } }',
  ].join('\n');
  document.head.appendChild(s);
};

RS.showAnalysisPanel = function(config) {
  RS._ensureAnalysisCSS();
  var el = RS._analysisPanelEl;
  if (!el) {
    el = document.createElement('div');
    el.id = 'rs-analysis';
    document.body.appendChild(el);
    RS._analysisPanelEl = el;
  }

  var imgHtml;
  if (config.image) {
    imgHtml = '<img class="ap-img" src="' + config.image + '" alt="' + RS.esc(config.name || '') + '">';
  } else {
    var icon = config.icon || '\u2B50';
    imgHtml = '<div class="ap-img placeholder">' + icon + '</div>';
  }

  var fieldsHtml = '';
  if (config.fields && config.fields.length) {
    fieldsHtml = '<div class="ap-fields">';
    for (var i = 0; i < config.fields.length; i++) {
      var f = config.fields[i];
      fieldsHtml += '<div class="ap-row"><span class="ap-label">' + RS.esc(f.label) + '</span><span class="ap-val">' + RS.esc(f.value) + '</span></div>';
    }
    fieldsHtml += '</div>';
  }

  var descHtml = config.desc ? '<div class="ap-desc">' + RS.esc(config.desc) + '</div>' : '';
  var linkHtml = config.link ? '<a class="ap-link" href="' + config.link.url + '" target="_blank">' + config.link.text + '</a>' : '';

  el.innerHTML =
    '<button class="ap-close" onclick="RS.hideAnalysisPanel()">&times;</button>' +
    '<div class="ap-header">' + imgHtml +
    '<div><div class="ap-title">' + RS.esc(config.name || 'Unknown') + '</div>' +
    '<div class="ap-type">' + RS.esc(config.type || '') + '</div></div></div>' +
    fieldsHtml + descHtml + linkHtml;

  el.classList.remove('hidden');
};

RS.hideAnalysisPanel = function() {
  if (RS._analysisPanelEl) RS._analysisPanelEl.classList.add('hidden');
};

// ═══ SHARED TOPBAR RENDERER ═══
// Builds the complete topbar HTML from a site key + display name.
// Each site just needs <div id="rs-topbar"></div> and a call to
// RS.renderTopBar('mercury', 'MERCURY RESOURCE') during init.
// Includes brand mark, planet nav, auth button, footer links,
// and a sidebar toggle button visible at ALL screen sizes.
RS.renderTopBar = function(siteKey, siteName) {
  var mark = RS.BRAND_MARKS[siteKey] || '';
  var nav = '';
  try { nav = RS.renderPlanetNav(siteKey); } catch(e) {}
  var auth = '';
  try { auth = RS.renderAuthButton(); } catch(e) {}
  var foot = '';
  try { foot = RS.renderFootLinks(); } catch(e) {}
  return '<div style="flex-shrink:0;margin-right:12px;display:flex;align-items:center">' +
    '<button id="rs-sidebar-toggle" style="background:none;border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:rgba(255,255,255,0.7);width:32px;height:32px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-right:10px;flex-shrink:0" title="Toggle sidebar">&#9776;</button>' +
    '<div style="display:flex;align-items:center;gap:10px;cursor:pointer" onclick="window.location.reload()">' +
    '<div style="width:26px;height:26px;flex-shrink:0">' + mark + '</div>' +
    '<div style="display:flex;flex-direction:column;line-height:1.15;font-size:13px;font-weight:600;letter-spacing:0.03em;text-transform:uppercase">' +
    siteName + '<br><span style="font-size:8.5px;color:rgba(106,116,136,1);font-weight:400;letter-spacing:0.08em;text-transform:none">a Corgan Studio intelligence platform</span></div>' +
    '</div></div>' +
    '<div style="flex:1;display:flex;justify-content:center"><div class="planet-nav" style="display:flex;gap:3px">' + nav + '</div></div>' +
    '<div style="position:absolute;right:20px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:6px">' + auth + foot + '</div>';
};

// Wire the sidebar toggle button after rendering the topbar.
// Looks for #rs-sidebar-toggle and toggles .sidebar-left or .sidebar.
RS.wireTopBar = function() {
  var btn = document.getElementById('rs-sidebar-toggle');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var sb = document.querySelector('.sidebar-left') || document.querySelector('.sidebar');
    if (!sb) return;
    if (sb.classList.contains('shut')) {
      sb.classList.remove('shut');
    } else if (sb.classList.contains('open')) {
      sb.classList.remove('open');
    } else {
      // Desktop toggle: use 'shut' class to collapse
      sb.classList.toggle('shut');
    }
  });
};

// Shared footer/nav links rendered in the topbar right section.
// Called from each site's initTopBar wiring so any change propagates
// to all 13 sites from a single source of truth.
RS.renderFootLinks = function() {
  var s = 'display:flex;gap:8px;margin-left:8px;font-size:9px;opacity:0.35';
  var a = 'color:var(--t2,#a0a8b8);text-decoration:none';
  return '<span class="tb-footlinks" style="' + s + '">' +
    '<a href="https://instagram.com/resourcesystems" target="_blank" style="' + a + '">IG</a>' +
    '<a href="https://x.com/resource_sys" target="_blank" style="' + a + '">X</a>' +
    '<a href="/faq" style="' + a + '">FAQ</a>' +
    '<a href="/privacy" style="' + a + '">Privacy</a>' +
    '<a href="/terms" style="' + a + '">Terms</a>' +
    '</span>';
};

// Auth modal
RS.toggleAuthModal = function(siteName) {
  siteName = siteName || 'Resource Systems';
  var overlay = document.getElementById('auth-overlay');
  if (overlay) { overlay.remove(); return; }
  overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.className = 'intel-overlay';
  overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML =
    '<div class="intel-modal" style="max-width:360px">' +
      '<button class="intel-close" onclick="document.getElementById(\'auth-overlay\').remove()">✕</button>' +
      '<div style="text-align:center;margin-bottom:16px">' +
        '<div style="font-size:16px;font-weight:600;color:var(--t1);margin-bottom:4px">Sign In to ' + siteName + '</div>' +
        '<div style="font-size:12px;color:var(--t3)">Access all layers and intelligence features</div>' +
      '</div>' +
      '<div id="auth-msg" style="display:none;padding:8px 12px;border-radius:6px;font-size:12px;margin-bottom:12px"></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' +
        '<input id="auth-email" type="email" placeholder="Email" style="padding:10px 12px;background:rgba(255,255,255,0.04);border:1px solid var(--b1);border-radius:6px;color:var(--t1);font-size:13px;outline:none" />' +
        '<input id="auth-pass" type="password" placeholder="Password" style="padding:10px 12px;background:rgba(255,255,255,0.04);border:1px solid var(--b1);border-radius:6px;color:var(--t1);font-size:13px;outline:none" onkeydown="if(event.key===\'Enter\')document.getElementById(\'auth-signin-btn\').click()" />' +
        '<button id="auth-signin-btn" onclick="window.RS_handleSignIn()" class="intel-btn intel-btn-primary" style="margin-top:4px">Sign In</button>' +
        '<button onclick="window.RS_handleSignUp()" class="intel-btn intel-btn-secondary">Create Account</button>' +
      '</div>' +
      '<div style="text-align:center;margin-top:12px;font-size:10.5px;color:var(--t4)">' +
        'Free accounts get 3 active layers.<br>Pro subscribers get unlimited access.' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  setTimeout(function() { var el = document.getElementById('auth-email'); if (el) el.focus(); }, 100);
};

// Account dropdown
RS.toggleAccountMenu = function() {
  var menu = document.getElementById('account-menu');
  if (menu) { menu.remove(); return; }
  menu = document.createElement('div');
  menu.id = 'account-menu';
  menu.style.cssText = 'position:fixed;top:48px;right:14px;z-index:200;background:rgba(14,16,20,0.95);backdrop-filter:blur(12px);border:1px solid var(--b2);border-radius:8px;padding:8px 0;min-width:220px;box-shadow:0 8px 24px rgba(0,0,0,0.4)';
  var tier = RS.userTier.toUpperCase();
  var tierColor = RS.isProUser() ? 'var(--accent)' : 'var(--t4)';
  menu.innerHTML =
    '<div style="padding:10px 16px;border-bottom:1px solid var(--b1)">' +
      '<div style="font-size:13px;color:var(--t1);font-weight:500">' + RS.esc(RS.authUser.email) + '</div>' +
      '<div style="font-size:11px;color:' + tierColor + ';margin-top:2px">' + tier + ' Plan</div>' +
    '</div>' +
    '<button onclick="window.RS_toggleAccountMenu();window.RS_togglePricing()" style="display:block;width:100%;text-align:left;padding:8px 16px;background:none;border:none;color:var(--t2);font-size:12px;cursor:pointer;font-family:inherit" onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'none\'">' +
      (RS.isProUser() ? 'Manage Plan' : 'Upgrade to Pro') +
    '</button>' +
    '<div style="height:1px;background:var(--b1);margin:4px 0"></div>' +
    '<button onclick="window.RS_toggleAccountMenu();window.RS_signOut()" style="display:block;width:100%;text-align:left;padding:8px 16px;background:none;border:none;color:#ff6666;font-size:12px;cursor:pointer;font-family:inherit" onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'none\'">' +
      'Sign Out' +
    '</button>';
  document.body.appendChild(menu);
  setTimeout(function() {
    document.addEventListener('click', function closeMenu(ev) {
      if (!menu.contains(ev.target)) { menu.remove(); document.removeEventListener('click', closeMenu); }
    });
  }, 10);
};

// Pricing modal
RS.togglePricingModal = function(siteCategory, siteName) {
  siteCategory = siteCategory || 'earth';
  siteName = siteName || 'Resource Systems';
  var overlay = document.getElementById('intel-overlay');
  if (overlay) { overlay.remove(); return; }

  overlay = document.createElement('div');
  overlay.id = 'intel-overlay';
  overlay.className = 'intel-overlay';
  overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = '<div class="intel-modal"><div style="text-align:center;padding:40px;color:var(--t3)">Loading pricing...</div></div>';
  document.body.appendChild(overlay);

  RS.fetchPricing().then(function(tiers) {
    if (!tiers || tiers.length === 0) { overlay.innerHTML = '<div class="intel-modal"><div style="text-align:center;padding:40px;color:var(--t3)">Pricing unavailable</div></div>'; return; }
    var tiersHtml = '';
    for (var i = 0; i < tiers.length; i++) {
      var t = tiers[i];
      var price = (t.price_monthly / 100).toLocaleString();
      var annual = t.price_annual ? '<div style="font-size:10px;color:var(--t4)">or $' + (t.price_annual / 100).toLocaleString() + '/yr</div>' : '<div style="font-size:10px;color:var(--t4)">custom pricing</div>';
      var sf = t.site_features || {};
      var featureList = [].concat(sf.universal || [], sf[siteCategory] || []);
      if (featureList.length === 0) featureList = t.features || [];
      var features = featureList.map(function(f) { return '<div class="intel-feat">' + f + '</div>'; }).join('');
      var isFeatured = t.is_featured;
      var suffix = t.id === 'enterprise' ? '+' : '';
      var per = t.id === 'team' ? '/seat/mo' : '/mo';
      tiersHtml += '<div class="intel-tier ' + (isFeatured ? 'featured' : '') + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">' +
          '<span style="font-size:14px;font-weight:600;color:' + (isFeatured ? 'var(--accent)' : 'var(--t1)') + '">' + t.name + '</span>' +
          '<div style="text-align:right"><span style="font-size:15px;font-weight:600;color:var(--t1)">$' + price + suffix + '<span style="font-size:11px;color:var(--t3);font-weight:400">' + per + '</span></span>' + annual + '</div>' +
        '</div>' + features +
        '<button class="intel-btn ' + (isFeatured ? 'intel-btn-primary' : 'intel-btn-secondary') + '">' + (isFeatured ? 'Get Started \u2014 $' + price + '/mo' : 'Contact Sales') + '</button>' +
      '</div>';
    }
    overlay.innerHTML = '<div class="intel-modal">' +
      '<button class="intel-close" onclick="document.getElementById(\'intel-overlay\').remove()">✕</button>' +
      '<div style="text-align:center;margin-bottom:20px">' +
        '<div style="font-size:22px;margin-bottom:6px">\ud83d\udd12</div>' +
        '<div style="font-size:16px;font-weight:600;color:var(--t1);margin-bottom:4px">Intelligence Engine</div>' +
        '<div style="font-size:12px;color:var(--t3)">Professional-grade planetary intelligence across all Resource Systems</div>' +
      '</div>' + tiersHtml +
      '<div style="text-align:center;margin-top:14px;font-size:10.5px;color:var(--t4)">All plans include access to the entire Resource Systems suite</div>' +
      '<div style="text-align:center;margin-top:10px;font-size:11px">' +
        '<span style="color:var(--t4)">Already have an account?</span>' +
        '<a href="#" onclick="event.preventDefault();document.getElementById(\'intel-overlay\').remove();window.RS_toggleAuthModal()" style="color:var(--accent);text-decoration:none;margin-left:4px">Sign In \u2192</a>' +
      '</div></div>';
  });
};

// Brand subtitle
RS.BRAND_SUBTITLE = 'a Corgan Studio intelligence platform';

// Global function wiring (for onclick in HTML templates)
global.RS_toggleAuthModal = function() { RS.toggleAuthModal(); };
global.RS_toggleAccountMenu = function() { RS.toggleAccountMenu(); };
global.RS_togglePricing = function() { RS.togglePricingModal(); };
global.RS_signOut = async function() { await RS.signOut(); if (global.render) global.render(); };
global.RS_handleSignIn = async function() {
  var email = document.getElementById('auth-email');
  var pass = document.getElementById('auth-pass');
  var msg = document.getElementById('auth-msg');
  if (!email || !pass || !email.value || !pass.value) { RS._authMsg(msg, 'Please enter email and password.', false); return; }
  RS._authMsg(msg, 'Signing in...', true);
  try { await RS.loadSupabase(); } catch(e) { RS._authMsg(msg, 'Could not connect.', false); return; }
  var result = await RS.signIn(email.value, pass.value);
  if (result.error) { RS._authMsg(msg, result.error, false); }
  else { document.getElementById('auth-overlay').remove(); RS.showToast('Signed in as ' + email.value); setTimeout(RS.hideToast, 2000); if (global.render) global.render(); }
};
global.RS_handleSignUp = async function() {
  var email = document.getElementById('auth-email');
  var pass = document.getElementById('auth-pass');
  var msg = document.getElementById('auth-msg');
  if (!email || !pass || !email.value || !pass.value) { RS._authMsg(msg, 'Please enter email and password.', false); return; }
  if (pass.value.length < 6) { RS._authMsg(msg, 'Password must be at least 6 characters.', false); return; }
  RS._authMsg(msg, 'Creating account...', true);
  try { await RS.loadSupabase(); } catch(e) { RS._authMsg(msg, 'Could not connect.', false); return; }
  var result = await RS.signUp(email.value, pass.value);
  if (result.error) { RS._authMsg(msg, result.error, false); }
  else { RS._authMsg(msg, result.message || 'Account created! You can now sign in.', true); }
};
RS._authMsg = function(el, text, success) {
  if (!el) return;
  el.style.display = 'block';
  el.style.background = success ? 'rgba(77,166,255,0.1)' : 'rgba(255,68,68,0.1)';
  el.style.color = success ? 'var(--accent)' : '#ff6666';
  el.style.border = '1px solid ' + (success ? 'var(--accent-border)' : 'rgba(255,68,68,0.3)');
  el.textContent = text;
};

// ═══ SHARED UI COMPONENTS ═══

// Generate planet navigation bar · highlights the active site
// 'hub' = SolarSystemResource (heliocentric overview). 'galactic' = GalacticResource
// (milky way scale). Both are appended after the planets and a separator.
RS.renderPlanetNav = function(activeSiteKey) {
  var planets = [
    { key: 'sun', label: 'SunResource' },
    { key: 'mercury', label: 'MercuryResource' },
    { key: 'venus', label: 'VenusResource' },
    { key: 'earth', label: 'TerraResource' },
    { key: 'moon', label: 'MoonResource' },
    { key: 'mars', label: 'MarsResource' },
    { key: 'jupiter', label: 'JupiterResource' },
    { key: 'saturn', label: 'SaturnResource' },
    { key: 'uranus', label: 'UranusResource' },
    { key: 'neptune', label: 'NeptuneResource' },
    { key: 'pluto', label: 'PlutoResource' },
    { key: 'hub', label: 'SolarSystemResource' },
    { key: 'galactic', label: 'GalacticResource' },
  ];
  // All thirteen sibling sites are scaffolded and reachable at their
  // .pages.dev URLs as of 2026-04-14; treat the whole family as live.
  var liveKeys = {
    sun: 1, mercury: 1, venus: 1, earth: 1, moon: 1, mars: 1,
    jupiter: 1, saturn: 1, uranus: 1, neptune: 1, pluto: 1,
    hub: 1, galactic: 1,
  };
  var html = '';
  for (var i = 0; i < planets.length; i++) {
    var p = planets[i];
    var site = RS.SITES[p.key];
    var isActive = p.key === activeSiteKey;
    var isLive = !!liveKeys[p.key];
    var iconKey = p.key === 'earth' ? 'Earth'
                : p.key === 'hub' ? 'SolarSystem'
                : p.key === 'galactic' ? 'Galactic'
                : p.key.charAt(0).toUpperCase() + p.key.slice(1);
    var icon = RS.NAV_ICONS && RS.NAV_ICONS[iconKey] ? RS.NAV_ICONS[iconKey] : iconKey.charAt(0);
    var opacity = isActive ? '1' : (isLive ? '0.75' : '0.4');
    var click = isActive ? '' : (' onclick="window.open(\'https://' + site.domain + '\',\'_blank\')"');
    var cls = isActive ? 'tb-btn active' : 'tb-btn';
    html += '<button class="' + cls + '"' + click + ' title="' + p.label + '" style="width:28px;height:26px;padding:0;display:flex;align-items:center;justify-content:center;opacity:' + opacity + '">' + icon + '</button>';
  }
  return html;
};

// Generate the brand section (logo + name + subtitle)
RS.renderBrand = function(siteKey, siteName) {
  var mark = RS.BRAND_MARKS[siteKey] || '';
  return '<div class="brand"><div class="brand-mark">' + mark + '</div>' +
    '<div style="display:flex;flex-direction:column;line-height:1.2">' +
    '<span class="brand-name">' + siteName + '</span>' +
    '<span style="font-size:8.5px;color:var(--t2);letter-spacing:0.05em;font-weight:400;opacity:0.85">a Corgan Studio intelligence platform</span>' +
    '</div></div>';
};

// Set favicon dynamically from brand marks
RS.setFavicon = function(siteKey) {
  var favicon = RS.generateFavicon(siteKey);
  if (!favicon) return;
  var link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  }
  link.href = favicon;
};

// Shared CSS variables and base styles for all Resource Systems sites
RS.getSharedCSS = function() {
  return [
    ':root { --bg: #0a0c10; --panel-bg: rgba(14,16,20,0.95); --panel-blur: blur(14px); --b1: rgba(255,255,255,0.06); --b2: rgba(255,255,255,0.12); --t1: #e8eaf0; --t2: #a0a8b8; --t3: #6a7488; --t4: #4a5060; --accent: #4da6ff; --accent-bg: rgba(77,166,255,0.08); --accent-border: rgba(77,166,255,0.25); --radius-sm: 6px; --transition: 0.15s ease; }',
    'body { margin:0; padding:0; background:var(--bg); color:var(--t1); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overflow:hidden; height:100vh; display:flex; flex-direction:column; }',
    '.brand { display:flex; align-items:center; gap:8px; }',
    '.brand-mark { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; }',
    '.brand-name { font-size:15px; font-weight:600; letter-spacing:0.02em; color:var(--t1); }',
    '.topbar { height:44px; display:flex; align-items:center; gap:8px; padding:0 14px; background:var(--panel-bg); backdrop-filter:var(--panel-blur); border-bottom:1px solid var(--b1); flex-shrink:0; z-index:100; }',
    '.tb-group { display:flex; align-items:center; gap:4px; }',
    '.tb-btn { padding:5px 10px; background:rgba(255,255,255,0.03); border:1px solid var(--b1); border-radius:var(--radius-sm); color:var(--t3); font-size:11.5px; display:flex; align-items:center; gap:4px; transition:all var(--transition); cursor:pointer; }',
    '.tb-btn:hover { color:var(--t1); border-color:var(--b2); background:rgba(255,255,255,0.05); }',
    '.tb-btn.active { color:var(--accent); border-color:var(--accent-border); background:var(--accent-bg); }',
    '.planet-nav::-webkit-scrollbar { display:none; }',
  ].join('\n');
};


// ═══ SHARED LAYOUT & RESPONSIVE CSS (v1.1) ═══
//   - RS.renderSEOFooter() - crawlable SEO text with cross-links
//   - RS.NAV_SVGS - consistent SVG icons for nav buttons (Sun, Earth, Moon)
// ═══════════════════════════════════════════════════════════════════

// ═══ SHARED ICONS ═══

RS.NAV_SVGS = {
  sun: '<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#FFD54F"/><g stroke="#FFD54F" stroke-width="2"><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/></g></svg>',
  earth: '<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1a5276" stroke="#4da6ff" stroke-width="1"/><path d="M6,8 Q9,6 12,9 Q15,12 10,15 Q7,17 6,13 Z" fill="#44aa55" opacity="0.8"/><path d="M14,5 Q17,7 16,10 Q15,12 14,11 Z" fill="#44aa55" opacity="0.7"/></svg>',
  moon: '<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#a0a0a0" stroke="#888" stroke-width="0.8"/><circle cx="8" cy="9" r="2" fill="#8a8a8a" opacity="0.5"/><circle cx="14" cy="8" r="1.5" fill="#8a8a8a" opacity="0.4"/><circle cx="10" cy="14" r="1.8" fill="#8a8a8a" opacity="0.4"/></svg>',
};

// ═══ SHARED LAYOUT CSS ═══
// Standardized responsive rules for all Resource Systems sites.
// Sites call RS.getResponsiveCSS(siteKey) and inject it into a <style> tag.

RS.getResponsiveCSS = function(siteKey) {
  var accentColor = (RS.SITES[siteKey] && RS.SITES[siteKey].color) || '#4da6ff';
  
  return '\n' +
  '/* ═══ RESOURCE SYSTEMS RESPONSIVE LAYOUT v1.1 ═══ */\n' +
  '/* Camera buttons: centered text (desktop + mobile) */\n' +
  '#camera-mode-container button, #mars-controls button, #viewer-ui-overlay button {\n' +
  '  display: flex; align-items: center; justify-content: center;\n' +
  '}\n\n' +

  '@media (max-width: 768px) {\n' +
  '  /* ── Topbar ── */\n' +
  '  .topbar {\n' +
  '    height: 40px; min-height: 40px; padding: 0 8px;\n' +
  '    flex-wrap: nowrap; gap: 4px; overflow-x: auto;\n' +
  '    -webkit-overflow-scrolling: touch; scrollbar-width: none;\n' +
  '  }\n' +
  '  .topbar::-webkit-scrollbar { display: none; }\n' +
  '  .topbar > * { flex-shrink: 0; }\n' +
  '  .tb-group { flex-shrink: 0; }\n' +
  '  .brand-name { font-size: 12px !important; }\n' +
  '  .brand-mark { width: 26px; height: 26px; }\n' +
  '  .brand-mark svg { width: 24px; height: 24px; }\n' +
  '  .pill-switch { display: none; }\n' +
  '  .tb-btn { padding: 3px 6px; font-size: 9px; }\n' +
  '  .topbar a[href*="instagram"], .topbar a[href*="x.com"],\n' +
  '  .topbar a[href="/faq"], .topbar a[href="/privacy"], .topbar a[href="/terms"] { display: none; }\n\n' +

  '  /* ── Sidebars ── */\n' +
  '  .sidebar-left { position: absolute; z-index: 60; height: 100%; width: calc(100vw - 60px); max-width: 300px; left: 0; top: 0; }\n' +
  '  .sidebar-left.shut { width: 0; opacity: 0; }\n' +
  '  .sidebar-right { position: absolute; z-index: 60; height: 100%; width: calc(100vw - 60px); max-width: 300px; right: 0; top: 0; }\n' +
  '  .sidebar-right.shut { width: 0; opacity: 0; }\n\n' +

  '  /* ── Hamburgers: both inside viewer at same row ── */\n' +
  '  .sb-toggle {\n' +
  '    top: 24px !important; left: 6px !important;\n' +
  '    width: 30px !important; height: 30px !important; font-size: 13px !important;\n' +
  '    z-index: 70 !important; background: rgba(10,14,28,0.92) !important;\n' +
  '    border-color: var(--b2) !important; border-radius: 8px !important;\n' +
  '  }\n' +
  '  .sb-toggle-right {\n' +
  '    top: 24px !important; right: 6px !important;\n' +
  '    width: 30px !important; height: 30px !important; font-size: 13px !important;\n' +
  '    z-index: 71 !important; background: rgba(10,14,28,0.92) !important;\n' +
  '    border-color: var(--b2) !important; border-radius: 8px !important;\n' +
  '  }\n\n' +

  '  /* ── Camera buttons row ── */\n' +
  '  #camera-mode-container, #mars-controls, #viewer-ui-overlay > div:first-child {\n' +
  '    top: 24px !important;\n' +
  '    left: 38px !important;\n' +
  '    right: 38px !important;\n' +
  '    gap: 3px !important;\n' +
  '  }\n' +
  '  #camera-mode-container button, #mars-controls button, #viewer-ui-overlay button {\n' +
  '    padding: 0 10px !important; font-size: 10px !important;\n' +
  '    height: 30px !important; display: flex !important;\n' +
  '    align-items: center !important; justify-content: center !important;\n' +
  '    box-sizing: border-box !important;\n' +
  '  }\n' +
  '  #camera-mode-container input, #mars-controls input, #viewer-ui-overlay input {\n' +
  '    height: 30px !important; box-sizing: border-box !important;\n' +
  '    width: auto !important; flex: 1 !important; min-width: 80px !important;\n' +
  '    font-size: 10px !important; padding: 0 8px 0 22px !important;\n' +
  '    line-height: 30px !important;\n' +
  '  }\n\n' +

  '  /* ── Nav stack ── */\n' +
  '  [id$="-nav"] { bottom: 140px !important; right: 8px !important; gap: 2px !important; }\n' +
  '  .nav-btn { width: 30px !important; height: 30px !important; font-size: 14px !important; }\n' +
  '  .nav-btn svg { width: 14px !important; height: 14px !important; }\n\n' +

  '  /* ── DSN panel ── */\n' +
  '  #dsn-live-panel, [id*="dsn-live"] {\n' +
  '    max-height: 120px !important; max-width: 55vw !important;\n' +
  '    font-size: 9px !important;\n' +
  '  }\n\n' +

  '  /* ── Hide on mobile ── */\n' +
  '  .legend-overlay { display: none !important; }\n' +
  '  .load-toast { display: none !important; }\n' +
  '  [id*="tile-status"] { display: none !important; }\n' +
  '  .v-coords { font-size: 9px !important; }\n' +
  '}\n\n' +

  '@media (max-width: 480px) {\n' +
  '  .sidebar-left { width: calc(100vw - 50px) !important; max-width: none !important; }\n' +
  '  .sidebar-right { width: calc(100vw - 50px) !important; max-width: none !important; }\n' +
  '  .topbar { padding: 0 6px; }\n' +
  '  .brand span[style*="8.5px"] { display: none; }\n' +
  '}\n';
};

// ═══ SEO FOOTER ═══
RS.renderSEOFooter = function(siteKey, siteName, siteDesc) {
  var links = [];
  var sites = [
    { key: 'earth', name: 'TerraResource', url: 'https://terraresource.net' },
    { key: 'moon', name: 'MoonResource', url: 'https://moonresource.com' },
    { key: 'mars', name: 'MarsResource', url: 'https://marsresource.net' },
  ];
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].key !== siteKey) {
      links.push('<a href="' + sites[i].url + '" style="color:inherit;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.1)">' + sites[i].name + '</a>');
    }
  }
  return '<div id="seo-footer" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;font-size:12px;color:#333;line-height:1.6">' +
    '<p>' + siteName + ' is ' + siteDesc + ' Part of the <a href="https://corganstudio.com" style="color:inherit">Resource Systems</a> suite by <a href="https://corganstudio.com" style="color:inherit">Corgan Studio</a>. ' + links.join(' | ') + '</p></div>';
};


// ═══ EXPORT ═══
global.RS = RS;

})(typeof window !== 'undefined' ? window : this);

// ═══ SUBSCRIBER LOCK SYSTEM v1.2 ═══
RS.TIERS = { free: 0, researcher: 1, pro: 1, team: 2, enterprise: 3 };
RS.FREE_LAYER_LIMIT = 3;
// tier already initialized via closure

RS.isProUser = function() {
  var t = RS.userTier || 'free';
  return (RS.TIERS[t] || 0) >= 1;
};

RS.hasTier = function(minTier) {
  var current = RS.TIERS[RS.userTier || 'free'] || 0;
  var required = RS.TIERS[minTier] || 0;
  return current >= required;
};

RS.checkLayerAccess = function(layerId, proSet, activeCount) {
  if (proSet && proSet.has && proSet.has(layerId) && !RS.isProUser()) {
    return { allowed: false, reason: 'premium', requiredTier: 'researcher' };
  }
  if (!RS.isProUser() && typeof activeCount === 'number' && activeCount >= RS.FREE_LAYER_LIMIT) {
    return { allowed: false, reason: 'limit', requiredTier: 'researcher' };
  }
  return { allowed: true };
};

RS.enforceProLockOnLoad = function(layers, proSet) {
  if (RS.isProUser()) return;
  if (!layers || !proSet) return;
  for (var i = 0; i < layers.length; i++) {
    if (proSet.has(layers[i].id) && layers[i].visible) {
      layers[i].visible = false;
    }
  }
};

RS._upgradeHandler = null;
RS.registerUpgradeHandler = function(fn) { RS._upgradeHandler = fn; };
RS.openUpgradeModal = function(reason, requiredTier) {
  var tier = requiredTier || 'researcher';
  if (typeof RS._upgradeHandler === 'function') {
    RS._upgradeHandler(reason, tier);
    return;
  }
  if (typeof toggleIntelModal === 'function') toggleIntelModal();
  setTimeout(function() { RS.highlightTier(tier); }, 150);
};

RS.highlightTier = function(tier) {
  var labels = { researcher: 'Researcher', pro: 'Researcher', team: 'Team', enterprise: 'Enterprise' };
  var label = labels[tier] || 'Researcher';
  var cards = document.querySelectorAll('.intel-tier');
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.textContent.indexOf(label) !== -1) {
      card.style.boxShadow = '0 0 0 2px var(--accent, #e07040), 0 0 20px rgba(224,112,64,0.4)';
      card.style.transition = 'box-shadow 0.3s ease';
      try { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e) {}
      setTimeout(function(c) { return function() { c.style.boxShadow = ''; }; }(card), 2500);
      break;
    }
  }
};

// ═══ UNIFIED UPGRADE MODAL v1.3 (append-only, overrides any earlier definition) ═══
RS.openUpgradeModal = function(reason, requiredTier) {
  var tier = requiredTier || 'researcher';
  // If a site registered a custom upgrade handler (e.g. Terra's Supabase-driven
  // dynamic pricing modal), delegate to it instead of rendering the default card.
  if (typeof RS._upgradeHandler === 'function') {
    RS._upgradeHandler(reason, tier);
    return;
  }
  var existing = document.getElementById('rs-upgrade-overlay');
  if (existing) existing.remove();
  var reasonText = reason === 'limit' ? 'Free tier is limited to 3 active layers.' : 'This feature requires a paid subscription.';
  var tierLabels = { researcher: 'Researcher', pro: 'Researcher', team: 'Team', enterprise: 'Enterprise' };
  var requiredLabel = tierLabels[tier] || 'Researcher';
  var overlay = document.createElement('div');
  overlay.id = 'rs-upgrade-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;font-family:"Instrument Sans",sans-serif';
  var tiers = [
    { key: 'researcher', name: 'Researcher', price: '$149', unit: '/mo', features: ['Unlimited active layers', 'Data export (GeoJSON, CSV, KML)', 'High-resolution imagery', 'Mission planning tools', 'Saved views and bookmarks'] },
    { key: 'team', name: 'Team', price: '$499', unit: '/seat/mo', features: ['Everything in Researcher', 'Multi-layer correlation engine', 'API access (webhooks, queries)', 'Advanced analysis tools', 'Team workspaces'] },
    { key: 'enterprise', name: 'Enterprise', price: '$2,499', unit: '+/mo', features: ['Everything in Team', 'AI-driven scoring models', 'ISRU resource modeling', 'White-label embedding', 'SSO, dedicated support, SLA'] }
  ];
  var cardsHtml = tiers.map(function(t) {
    var highlighted = t.key === tier || (tier === 'researcher' && t.key === 'researcher');
    var border = highlighted ? '2px solid #e07040' : '1px solid rgba(255,255,255,0.1)';
    var glow = highlighted ? 'box-shadow:0 0 24px rgba(224,112,64,0.35);' : '';
    var feats = t.features.map(function(f) { return '<div style="font-size:11px;color:rgba(255,255,255,0.7);padding:3px 0">' + f + '</div>'; }).join('');
    return '<div style="background:rgba(10,14,28,0.92);border:' + border + ';' + glow + 'border-radius:8px;padding:16px;flex:1;min-width:220px;max-width:280px"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px"><span style="font-size:14px;font-weight:600;color:' + (highlighted ? '#e07040' : '#fff') + '">' + t.name + '</span><span style="font-size:15px;font-weight:600;color:#fff">' + t.price + '<span style="font-size:11px;color:rgba(255,255,255,0.5);font-weight:400">' + t.unit + '</span></span></div>' + feats + '<button onclick="if(typeof window.stripeCheckout===\'function\')window.stripeCheckout(\''+ t.key + '\')" style="margin-top:12px;width:100%;padding:8px 12px;background:' + (highlighted ? '#e07040' : 'rgba(255,255,255,0.08)') + ';border:none;border-radius:4px;color:' + (highlighted ? '#fff' : 'rgba(255,255,255,0.8)') + ';font-weight:600;font-size:12px;cursor:pointer;font-family:inherit">Get Started</button></div>';
  }).join('');
  overlay.innerHTML = '<div style="background:rgba(6,8,14,0.98);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;position:relative"><button onclick="document.getElementById(\'rs-upgrade-overlay\').remove()" style="position:absolute;top:12px;right:12px;background:none;border:none;color:rgba(255,255,255,0.5);font-size:20px;cursor:pointer;padding:0;width:28px;height:28px">\u2715</button><div style="text-align:center;margin-bottom:18px"><div style="font-size:28px;margin-bottom:6px">\uD83D\uDD12</div><div style="font-size:18px;font-weight:600;color:#fff;margin-bottom:4px">Requires ' + requiredLabel + ' tier or higher</div><div style="font-size:12px;color:rgba(255,255,255,0.6)">' + reasonText + '</div></div><div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">' + cardsHtml + '</div><div style="text-align:center;margin-top:16px;font-size:10.5px;color:rgba(255,255,255,0.4)">All plans include TerraResource, MoonResource, and MarsResource</div></div>';
  document.body.appendChild(overlay);
};

// ═══ 360 PANORAMA VIEWER ═══
// Self-contained WebGL equirectangular sphere viewer.
// Usage: RS.openPanorama('panoramas/apollo17.jpg', 'Apollo 17 - Taurus-Littrow Valley')
RS.openPanorama = function(imageUrl, title) {
  // Remove existing
  var existing = document.getElementById('rs-pano-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'rs-pano-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10000;background:#000';

  // Header bar
  var header = document.createElement('div');
  header.style.cssText = 'position:absolute;top:0;left:0;right:0;z-index:10001;display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:linear-gradient(rgba(0,0,0,0.8),transparent);pointer-events:none';
  header.innerHTML = '<div style="pointer-events:auto"><div style="font-size:14px;font-weight:600;color:#fff;font-family:\'JetBrains Mono\',\'IBM Plex Mono\',monospace">' + (title || '360 Panorama') + '</div><div style="font-size:10px;color:rgba(255,255,255,0.5);margin-top:2px">Drag to look around</div></div>' +
    '<button id="rs-pano-close" style="pointer-events:auto;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:6px;color:#fff;font-size:14px;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center">\u2715</button>';
  overlay.appendChild(header);

  // Canvas
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;cursor:grab';
  overlay.appendChild(canvas);
  document.body.appendChild(overlay);

  // Loading indicator
  var loadMsg = document.createElement('div');
  loadMsg.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:rgba(255,255,255,0.6);font-size:13px;font-family:monospace';
  loadMsg.textContent = 'Loading panorama...';
  overlay.appendChild(loadMsg);

  // WebGL setup
  var gl = canvas.getContext('webgl', { antialias: true }) || canvas.getContext('experimental-webgl');
  if (!gl) { loadMsg.textContent = 'WebGL not supported'; return; }

  // Sphere geometry
  var segs = 64, rings = 32;
  var verts = [], uvs = [], indices = [];
  for (var y = 0; y <= rings; y++) {
    for (var x = 0; x <= segs; x++) {
      var u = x / segs, v = y / rings;
      var theta = u * Math.PI * 2, phi = v * Math.PI;
      verts.push(-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
      uvs.push(u, v);
    }
  }
  for (var yy = 0; yy < rings; yy++) {
    for (var xx = 0; xx < segs; xx++) {
      var a = yy * (segs + 1) + xx, b = a + segs + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  // Shaders
  var vs = 'attribute vec3 aPos;attribute vec2 aUV;uniform mat4 uMVP;varying vec2 vUV;void main(){vUV=aUV;gl_Position=uMVP*vec4(aPos,1.0);}';
  var fs = 'precision mediump float;varying vec2 vUV;uniform sampler2D uTex;void main(){gl_FragColor=texture2D(uTex,vUV);}';
  function compileShader(src, type) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s;
  }
  var prog = gl.createProgram();
  gl.attachShader(prog, compileShader(vs, gl.VERTEX_SHADER));
  gl.attachShader(prog, compileShader(fs, gl.FRAGMENT_SHADER));
  gl.linkProgram(prog); gl.useProgram(prog);

  var aPos = gl.getAttribLocation(prog, 'aPos');
  var aUV = gl.getAttribLocation(prog, 'aUV');
  var uMVP = gl.getUniformLocation(prog, 'uMVP');

  var vBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

  var uBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, uBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(aUV); gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

  var iBuf = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  // Texture
  var tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([30, 30, 40, 255]));

  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    loadMsg.style.display = 'none';
  };
  img.onerror = function() { loadMsg.textContent = 'Failed to load panorama'; };
  img.src = imageUrl;

  // Camera state
  var yaw = 0, pitch = 0, fov = 75;
  var dragging = false, lastX = 0, lastY = 0;

  // Matrix helpers
  function perspective(fovDeg, aspect, near, far) {
    var f = 1.0 / Math.tan(fovDeg * Math.PI / 360), nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function multiply(a, b) {
    var o = new Array(16);
    for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
      o[j * 4 + i] = a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] + a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3];
    }
    return o;
  }
  function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return [1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1]; }
  function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return [c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]; }

  // Render loop
  var animId;
  function draw() {
    var w = overlay.clientWidth, h = overlay.clientHeight;
    if (canvas.width !== w * devicePixelRatio || canvas.height !== h * devicePixelRatio) {
      canvas.width = w * devicePixelRatio; canvas.height = h * devicePixelRatio;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.05, 0.05, 0.08, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    var proj = perspective(fov, canvas.width / canvas.height, 0.1, 100);
    var view = multiply(rotX(pitch), rotY(yaw));
    gl.uniformMatrix4fv(uMVP, false, new Float32Array(multiply(proj, view)));
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    animId = requestAnimationFrame(draw);
  }
  draw();

  // Mouse interaction
  canvas.addEventListener('mousedown', function(e) { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.style.cursor = 'grabbing'; });
  window.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    yaw += (e.clientX - lastX) * 0.004;
    pitch += (e.clientY - lastY) * 0.004;
    pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch));
    lastX = e.clientX; lastY = e.clientY;
  });
  window.addEventListener('mouseup', function() { dragging = false; canvas.style.cursor = 'grab'; });

  // Touch interaction
  canvas.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) { dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; }
  }, { passive: true });
  canvas.addEventListener('touchmove', function(e) {
    if (!dragging || e.touches.length !== 1) return;
    yaw += (e.touches[0].clientX - lastX) * 0.004;
    pitch += (e.touches[0].clientY - lastY) * 0.004;
    pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch));
    lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
  }, { passive: true });
  canvas.addEventListener('touchend', function() { dragging = false; }, { passive: true });

  // Scroll to zoom
  canvas.addEventListener('wheel', function(e) {
    e.preventDefault();
    fov = Math.max(30, Math.min(110, fov + e.deltaY * 0.05));
  }, { passive: false });

  // Close
  function closePano() {
    cancelAnimationFrame(animId);
    overlay.remove();
    document.removeEventListener('keydown', escHandler);
  }
  document.getElementById('rs-pano-close').addEventListener('click', closePano);
  function escHandler(e) { if (e.key === 'Escape') closePano(); }
  document.addEventListener('keydown', escHandler);
};
