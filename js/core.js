/* ============================= STORAGE HELPERS ============================= */
/* window.storage only exists inside certain sandboxed preview embeds. On a real
   deployment (GitHub Pages, etc.) it's undefined, so every read/write falls back
   to localStorage — that's what actually persists progress for real players. */
async function loadJSON(key, fallback){
  try{
    if(window.storage){
      const res = await window.storage.get(key, false);
      if(res && res.value) return JSON.parse(res.value);
      return fallback;
    }
  }catch(e){ /* window.storage present but unusable here - fall through to localStorage */ }
  try{
    const raw = localStorage.getItem('kokoKod_' + key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){ return fallback; }
}
async function saveJSON(key, obj){
  try{
    if(window.storage){ await window.storage.set(key, JSON.stringify(obj), false); return; }
  }catch(e){ /* fall through to localStorage */ }
  try{ localStorage.setItem('kokoKod_' + key, JSON.stringify(obj)); }
  catch(e){ console.error('Storage save failed', key, e); }
}

/* ============================= AUDIO NARRATION (Web Speech API) ============================= */
/* Priority feature for pre-readers (6+ course): reads instructions aloud on tap. */
let bgVoice = null;
let ttsUtterance = null; // keep a strong reference - Chrome silently drops speech if the
                          // SpeechSynthesisUtterance gets garbage-collected mid-utterance
if(window.speechSynthesis){
  const pickVoice = () => {
    try{
      const voices = window.speechSynthesis.getVoices();
      bgVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('bg')) || null;
    }catch(e){ /* getVoices can throw in some embedded webviews - ignore, fallback voice used */ }
  };
  pickVoice();
  try{ window.speechSynthesis.onvoiceschanged = pickVoice; }catch(e){}
  // Chrome has a long-standing bug where speech silently pauses ~15s in and never
  // resumes on its own - nudge it periodically so longer instructions finish playing.
  setInterval(() => {
    try{ if(window.speechSynthesis.speaking){ window.speechSynthesis.pause(); window.speechSynthesis.resume(); } }
    catch(e){}
  }, 5000);
}
function speakText(text){
  if(!window.speechSynthesis || !text) return;
  try{
    const clean = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}]/gu, '').replace(/\s+/g,' ').trim();
    if(!clean) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(clean);
    // Only force the bg-BG locale when a matching voice actually exists - on many
    // Android/Chrome setups without a Bulgarian voice pack, forcing an unmatched
    // lang makes speak() a silent no-op instead of falling back to a default voice.
    if(bgVoice){ utter.voice = bgVoice; utter.lang = bgVoice.lang; }
    utter.rate = 0.92; utter.pitch = 1.05;
    ttsUtterance = utter;
    // cancel() clears the queue asynchronously; speaking again in the very same tick
    // can get silently dropped by some browsers, so give it a moment to actually clear.
    setTimeout(() => {
      try{ window.speechSynthesis.speak(utter); }catch(e){}
    }, 30);
  }catch(e){ /* speech not supported in this browser - fail silently, button just won't speak */ }
}

/* ============================= CELEBRATION EFFECT ============================= */
/* Lightweight, dependency-free confetti burst for level/lesson completion.
   Respects prefers-reduced-motion via the global CSS override, and is skipped
   entirely for that preference so no motion is forced on sensitive users. */
const CONFETTI_COLORS = ['#FF6FA5','#9B7BFF','#2FB893','#FF9A4D','#4FA1E8','#E3A319','#5B6EE8','#D6467F'];
function fireConfetti(){
  try{
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layer = document.createElement('div');
    layer.className = 'confetti-layer';
    document.body.appendChild(layer);
    for(let i=0;i<28;i++){
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = (Math.random()*100) + 'vw';
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.animationDelay = (Math.random()*0.3) + 's';
      piece.style.animationDuration = (1.6 + Math.random()*0.9) + 's';
      piece.style.transform = `rotate(${Math.random()*360}deg)`;
      layer.appendChild(piece);
    }
    setTimeout(() => layer.remove(), 2800);
  }catch(e){ /* purely decorative - fail silently */ }
}

/* ============================= PWA: install + offline support ============================= */
/* Feature-detected and wrapped in try/catch: this only activates when the file is actually
   hosted at a real origin (e.g. GitHub Pages, Netlify) alongside manifest.json + service-worker.js.
   Inside a sandboxed preview it silently no-ops rather than breaking anything. */
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    try{
      navigator.serviceWorker.register('service-worker.js').catch(() => { /* no real origin available here - expected in preview */ });
    }catch(e){ /* sandboxed context may block SW registration entirely - safe no-op */ }
  });
}
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('installBtn');
  if(btn) btn.classList.remove('hidden');
});
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  const btn = document.getElementById('installBtn');
  if(btn) btn.classList.add('hidden');
});

/* ============================= INTERESTS (learning tree by interest) ============================= */
const INTERESTS = [
  {id:'space', emoji:'🚀', label:'Космос'},
  {id:'art', emoji:'🎨', label:'Изкуство'},
  {id:'animals', emoji:'🐾', label:'Животни'},
  {id:'games', emoji:'🎮', label:'Игри'},
  {id:'logic', emoji:'🧩', label:'Логика'},
  {id:'story', emoji:'📖', label:'Приказки'}
];

/* ============================= APP STATE ============================= */
let profile = null; // {name, activeTrack, interests:[]}
let progressA = null; // {unlocked:[], stars:[], lastLevel:0}
let progressB = null; // {unlocked:[], stars:[], lastLesson:0}

const onboardRoot = document.getElementById('onboardRoot');
const appShell = document.getElementById('appShell');
const appRoot = document.getElementById('appRoot');

async function boot(){
  onboardRoot.innerHTML = `<div class="onboard"><div class="loading-screen"><div class="spin">🐾</div><p>Зареждане...</p></div></div>`;
  profile = await loadJSON('profile', null);
  if(!profile){
    renderOnboarding();
  }else{
    await enterApp();
  }
}

function renderOnboarding(){
  let chosenTrack = 'A';
  const chosenInterests = new Set();
  onboardRoot.innerHTML = `
  <div class="onboard">
    <div class="onboard-card">
      <div class="mascots">🐱 🐶 👗</div>
      <h1>Добре дошла в Коко Код!</h1>
      <p class="onboard-motto">Където приказките учат децата да програмират.</p>
      <p>Всяко приключение започва с едно име — как се казваш, млад магьоснико? Избери своята пътека: заведи Роби до звездата или тръгни с Луна, Бо и Мия из приказното кралство — а после винаги можеш да смениш пътя.</p>
      <input class="onboard-input" id="nameInput" placeholder="Твоето име" maxlength="20">
      <div class="track-choice">
        <div class="track-card selected" id="cardA">
          <div class="emoji">🧸</div>
          <h3>Курс 6+</h3>
          <p>Роби и приказният свят — блокчета и стрелки, без четене на код.</p>
        </div>
        <div class="track-card" id="cardB">
          <div class="emoji">🎀</div>
          <h3>Курс 11+</h3>
          <p>Луна, Бо и Мия — истински основи на програмирането.</p>
        </div>
      </div>
      <div class="interest-head">От какво се интересуваш? (по избор — оформя твоето дърво на ученето)</div>
      <div class="interest-choice" id="interestChoice">
        ${INTERESTS.map(it => `<button type="button" class="interest-chip" data-id="${it.id}">${it.emoji} ${it.label}</button>`).join('')}
      </div>
      <button class="onboard-start" id="startBtn" disabled>Да започваме!</button>
    </div>
  </div>`;
  const nameInput = document.getElementById('nameInput');
  const startBtn = document.getElementById('startBtn');
  const cardA = document.getElementById('cardA');
  const cardB = document.getElementById('cardB');
  function refresh(){ startBtn.disabled = nameInput.value.trim().length === 0; }
  nameInput.addEventListener('input', refresh);
  cardA.addEventListener('click', () => { chosenTrack='A'; cardA.classList.add('selected'); cardB.classList.remove('selected'); });
  cardB.addEventListener('click', () => { chosenTrack='B'; cardB.classList.add('selected'); cardA.classList.remove('selected'); });
  document.querySelectorAll('#interestChoice .interest-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const id = chip.dataset.id;
      if(chosenInterests.has(id)){ chosenInterests.delete(id); chip.classList.remove('selected'); }
      else { chosenInterests.add(id); chip.classList.add('selected'); }
    });
  });
  startBtn.addEventListener('click', async () => {
    profile = { name: nameInput.value.trim() || 'Приятелко', activeTrack: chosenTrack, interests: [...chosenInterests] };
    await saveJSON('profile', profile);
    await enterApp();
  });
}

async function enterApp(){
  onboardRoot.innerHTML = '';
  appShell.classList.remove('hidden');
  if(!Array.isArray(profile.interests)) profile.interests = [];
  document.getElementById('childNameLabel').textContent = profile.name;
  progressA = await loadJSON('progressA', null);
  progressB = await loadJSON('progressB', null);
  document.getElementById('tabA').addEventListener('click', () => switchTrack('A'));
  document.getElementById('tabB').addEventListener('click', () => switchTrack('B'));
  document.getElementById('continueBtn').addEventListener('click', () => switchTrack(profile.activeTrack));
  document.getElementById('installBtn').addEventListener('click', async () => {
    if(!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    document.getElementById('installBtn').classList.add('hidden');
  });
  setupSettings();
  switchTrack(profile.activeTrack || 'A');
}

async function switchTrack(track){
  if(typeof TrackB !== 'undefined' && TrackB.stopGame) TrackB.stopGame();
  profile.activeTrack = track;
  saveJSON('profile', profile);
  document.getElementById('tabA').classList.toggle('active', track==='A');
  document.getElementById('tabB').classList.toggle('active', track==='B');
  appRoot.innerHTML = `<div class="loading-screen"><div class="spin">🐾</div></div>`;
  if(track === 'A'){
    if(!progressA) progressA = { unlocked:TrackA.defaultUnlocked(), stars:TrackA.defaultStars(), lastLevel:0 };
    TrackA.mount(appRoot, progressA, async (p) => { progressA = p; await saveJSON('progressA', progressA); });
  } else {
    if(!progressB) progressB = { unlocked:TrackB.defaultUnlocked(), stars:TrackB.defaultStars(), lastLesson:0 };
    TrackB.mount(appRoot, progressB, async (p) => { progressB = p; await saveJSON('progressB', progressB); });
  }
}

/* ============================= SETTINGS PANEL ============================= */
function setupSettings(){
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  const interestsWrap = document.getElementById('settingsInterests');
  interestsWrap.innerHTML = INTERESTS.map(it => `<button type="button" class="interest-chip" data-id="${it.id}">${it.emoji} ${it.label}</button>`).join('');
  let settingsInterestSet = new Set();
  interestsWrap.querySelectorAll('.interest-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const id = chip.dataset.id;
      if(settingsInterestSet.has(id)){ settingsInterestSet.delete(id); chip.classList.remove('selected'); }
      else { settingsInterestSet.add(id); chip.classList.add('selected'); }
    });
  });
  document.getElementById('settingsBtn').addEventListener('click', () => {
    document.getElementById('settingsName').value = profile.name;
    settingsInterestSet = new Set(profile.interests || []);
    interestsWrap.querySelectorAll('.interest-chip').forEach(chip => {
      chip.classList.toggle('selected', settingsInterestSet.has(chip.dataset.id));
    });
    panel.classList.remove('hidden'); overlay.classList.remove('hidden');
  });
  function closeIt(){ panel.classList.add('hidden'); overlay.classList.add('hidden'); }
  document.getElementById('closeSettings').addEventListener('click', closeIt);
  overlay.addEventListener('click', closeIt);
  document.getElementById('saveSettings').addEventListener('click', async () => {
    const val = document.getElementById('settingsName').value.trim();
    if(val) profile.name = val;
    profile.interests = [...settingsInterestSet];
    await saveJSON('profile', profile);
    document.getElementById('childNameLabel').textContent = profile.name;
    if(profile.activeTrack==='B') switchTrack('B');
    closeIt();
  });
  document.getElementById('resetA').addEventListener('click', async () => {
    if(!confirm('Да изчистя ли прогреса за Курс 6+?')) return;
    progressA = { unlocked:TrackA.defaultUnlocked(), stars:TrackA.defaultStars(), lastLevel:0 };
    await saveJSON('progressA', progressA);
    if(profile.activeTrack==='A') switchTrack('A');
  });
  document.getElementById('resetB').addEventListener('click', async () => {
    if(!confirm('Да изчистя ли прогреса за Курс 11+?')) return;
    progressB = { unlocked:TrackB.defaultUnlocked(), stars:TrackB.defaultStars(), lastLesson:0 };
    await saveJSON('progressB', progressB);
    if(profile.activeTrack==='B') switchTrack('B');
  });
}

