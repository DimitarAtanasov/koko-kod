import { speakText, fireConfetti } from './core.js';

/* ============================= TRACK A: 6+ (Robi grid) ============================= */
export const TrackA = (function(){
  const levels = [
    { title:"Първи стъпки", text:"Роби разбира прости команди. Постави стрелки една по една, за да го заведеш до звездата.",
      tip:"💡 Съвет: тук ти трябва само бутонът ➡️", hint:"Реши го така: натисни ➡️ четири пъти.",
      rows:1, cols:5, start:[0,0], goal:[0,4], walls:[], par:5, showMultiplier:false },
    { title:"Завий към целта", text:"Понякога Роби трябва да завива. Комбинирай стрелки нагоре и надясно, за да стигнеш до звездата.",
      tip:"💡 Съвет: пробвай да го качиш нагоре, а после да го придвижиш надясно.", hint:"Реши го така: ⬆️⬆️ после ➡️➡️.",
      rows:3, cols:3, start:[2,0], goal:[0,2], walls:[], par:4, showMultiplier:false },
    { title:"По-бързо с повторение", text:"Вместо да редиш 5 еднакви команди, използвай копчето „Повтори“ и избери x5!",
      tip:"💡 Съвет: избери x5, после натисни ➡️ само веднъж.", hint:"Реши го така: избери x5, после натисни ➡️ веднъж.",
      rows:1, cols:6, start:[0,0], goal:[0,5], walls:[], par:1, showMultiplier:true },
    { title:"Внимавай за камъните", text:"На пътя има камъни 🪨 — Роби не може да мине през тях. Намери заобиколен път до звездата.",
      tip:"💡 Съвет: качи се нагоре, преди да тръгнеш надясно.", hint:"Реши го така: ⬆️⬆️⬆️ после ➡️➡️➡️.",
      rows:4, cols:4, start:[3,0], goal:[0,3],
      walls:[[3,1],[2,1],[1,2],[2,3]], par:6, showMultiplier:true },
    { title:"Голямото предизвикателство", text:"Използвай завои и повторения, за да преведеш Роби през целия лабиринт.",
      tip:"💡 Съвет: раздели пътя на къси прави отсечки.", hint:"Реши го така: избери x4 и ⬆️, после избери x4 и ➡️.",
      rows:5, cols:5, start:[4,0], goal:[0,4],
      walls:[[4,1],[3,1],[2,1],[1,3],[2,3],[3,3]], par:5, showMultiplier:true },
    { title:"Роби открива нова планета", text:"Приключението продължава на нова планета! Камъните тук са подредени различно — намери пътя нагоре и надясно.",
      tip:"💡 Съвет: избери x4 и качи Роби нагоре, после избери x4 и го премести надясно.", hint:"Реши го така: избери x4 и ⬆️, после избери x4 и ➡️.",
      rows:5, cols:5, start:[4,0], goal:[0,4],
      walls:[[4,2],[3,2],[2,2],[2,3],[2,4]], par:8, showMultiplier:true },
    { title:"Скритата звезда", text:"Този път звездата се крие зад завой — Роби трябва да завие няколко пъти, за да я стигне.",
      tip:"💡 Съвет: качи се нагоре, мини надясно, слез надолу и пак надясно, за да заобиколиш камъните.", hint:"Реши го така: избери x4 и ⬆️, после избери x5 и ➡️, после избери x2 и ⬇️, после избери x2 и ⬅️.",
      rows:5, cols:6, start:[4,0], goal:[2,3],
      walls:[[4,2],[3,2],[2,2],[1,2],[1,3],[1,4]], par:13, showMultiplier:true },
    { title:"Пътят покрай стената", text:"Дълга стена препречва горния ред. Роби трябва да намери процепа, преди да продължи към звездата.",
      tip:"💡 Съвет: качи Роби почти до горе, мини надясно покрай стената, после довърши пътя нагоре.", hint:"Реши го така: избери x4 и ⬆️, после избери x3 и ➡️, после ⬆️ веднъж и ➡️ веднъж.",
      rows:6, cols:5, start:[5,0], goal:[0,4],
      walls:[[5,2],[4,2],[3,2],[2,2],[2,3],[2,4],[0,1],[0,2]], par:9, showMultiplier:true },
    { title:"Слаломът между звездите", text:"Две стени с процепи на различни места! Мини през първия процеп долу и през втория горе.",
      tip:"💡 Съвет: мини надясно покрай първата стена, после се качи догоре, после продължи надясно.", hint:"Реши го така: избери x3 и ➡️, после избери x5 и ⬆️, после избери x2 и ➡️.",
      rows:6, cols:6, start:[5,0], goal:[0,5],
      walls:[[0,2],[1,2],[2,2],[3,2],[4,2],[1,4],[2,4],[3,4],[4,4],[5,4]], par:10, showMultiplier:true },
    { title:"Финалното пътешествие на Роби", text:"Най-голямото приключение досега! Две дълги стени зигзагообразно — комбинирай завоите и повторенията, за да стигнеш последната звезда.",
      tip:"💡 Съвет: качи се догоре покрай лявата стена, мини надясно, слез долу покрай дясната стена, мини пак надясно и се качи за финал.", hint:"Реши го така: избери x6 и ⬆️, после x2 и ➡️, после x6 и ⬇️, после x2 и ➡️, после x6 и ⬆️, после ➡️ веднъж.",
      rows:7, cols:6, start:[6,0], goal:[0,5],
      walls:[[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]], par:23, showMultiplier:true },
    { title:"Царството на близалките", text:"Роби намира вратичка към сладко приключение! Царството на близалките е пълно с шоколадови блокчета — прескочи ги и стигни до захарната звезда.",
      tip:"💡 Съвет: качи Роби нагоре три пъти, после го премести надясно четири пъти.", hint:"Реши го така: избери x3 и ⬆️, после избери x4 и ➡️.",
      rows:4, cols:5, start:[3,0], goal:[0,4], goalEmoji:"🍭", wallEmoji:"🍫",
      walls:[[3,2],[2,2]], par:7, showMultiplier:true },
    { title:"Дълбините на океана", text:"Робо се гмурка в океана! Приятелски октоподи пазят пътя — заобиколи ги внимателно, за да стигнеш до рибката звезда.",
      tip:"💡 Съвет: качи Роби нагоре четири пъти покрай октоподите, после го отведи надясно четири пъти.", hint:"Реши го така: избери x4 и ⬆️, после избери x4 и ➡️.",
      rows:5, cols:5, start:[4,0], goal:[0,4], goalEmoji:"🐠", wallEmoji:"🐙",
      walls:[[4,2],[3,2],[3,3],[1,1],[1,2]], par:8, showMultiplier:true },
    { title:"Омагьосаната гора", text:"Дърветата в омагьосаната гора растат в редици! Намери процепите между тях, за да стигнеш до вълшебната гъбка.",
      tip:"💡 Съвет: мини надясно покрай първите дървета, после се качи нагоре и продължи надясно.", hint:"Реши го така: избери x3 и ➡️, после избери x4 и ⬆️, после избери x2 и ➡️.",
      rows:5, cols:6, start:[4,0], goal:[0,5], goalEmoji:"🍄", wallEmoji:"🌳",
      walls:[[0,2],[1,2],[2,2],[3,2],[1,4],[2,4],[3,4],[4,4]], par:9, showMultiplier:true },
    { title:"Замъкът в облаците", text:"Роби се качва по стълба от облаци към омагьосан замък. Облаците са наредени на етапи — качвай се внимателно стъпка по стъпка.",
      tip:"💡 Съвет: качи се през облаците на етапи — нагоре, после надясно, пак нагоре, пак надясно.", hint:"Реши го така: избери x3 и ⬆️, после избери x2 и ➡️, после избери x2 и ⬆️, после избери x2 и ➡️.",
      rows:6, cols:5, start:[5,0], goal:[0,4], goalEmoji:"🏰", wallEmoji:"☁️",
      walls:[[5,2],[4,2],[3,2],[1,1],[0,1],[1,3]], par:9, showMultiplier:true },
    { title:"Рожденият ден на Роби", text:"Изненада! Всички приятели на Роби подредиха балони в лабиринт за неговото парти. Стигни през завоите до тортата, за да започне купонът!",
      tip:"💡 Съвет: голямо предизвикателство за партито — раздели пътя на кратки отсечки и следвай завоите покрай балоните.", hint:"Реши го така: избери x5 и ⬆️, после x2 и ➡️, после x5 и ⬇️, после x2 и ➡️, после x5 и ⬆️, после ➡️ веднъж.",
      rows:6, cols:6, start:[5,0], goal:[0,5], goalEmoji:"🎂", wallEmoji:"🎈",
      walls:[[1,1],[2,1],[3,1],[4,1],[5,1],[0,3],[1,3],[2,3],[3,3],[4,3]], par:20, showMultiplier:true },
    { title:"🎁 Тайното съкровище на Роби", text:"Само най-упоритите изследователи виждат това ниво! Роби намери скрита карта — тя води през тройна плетеница от стени до диамант, пазен от Звездна академия Искрилия.",
      tip:"💡 Съвет: три високи стени с процепи на различни места — качи се, мини, слез, мини пак, качи се за последно. Прошепни си „Стрелко-зум!“ всеки път, когато повтаряш посока — на Роби ще му хареса!", hint:"Реши го така: избери x6 и ⬆️, после x2 и ➡️, после x6 и ⬇️, после x2 и ➡️, после x6 и ⬆️, после x2 и ➡️.",
      rows:7, cols:7, start:[6,0], goal:[0,6], goalEmoji:"💎", wallEmoji:"🌟", secret:true,
      walls:[[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]], par:24, showMultiplier:true,
      secretReveal:"Роби премина и трите слалома и стигна до диаманта — но когато го докосна, диамантът светна и се отвори като врата! Зад нея го чакаха усмихнати звездни магьосници, които му казаха: „Роби, ти реши всички лабиринти — това е истинска звездна магия! Добре дошъл в нашата академия, малък магьоснико на стрелките!“" }
  ];

  let state, onSave, container, currentLevel = 0, program = [], activeMult = 1, running = false, encoreStage = false;

  function defaultUnlocked(){ return levels.map((l,i)=> i===0); }
  function defaultStars(){ return levels.map(()=> false); }

  function mount(rootEl, progress, saveFn){
    state = progress; onSave = saveFn; container = rootEl;
    while(state.unlocked.length < levels.length) state.unlocked.push(false);
    while(state.stars.length < levels.length) state.stars.push(false);
    if(state.lastLevel >= levels.length) state.lastLevel = levels.length-1;
    onSave(state);
    currentLevel = state.lastLevel || 0;
    container.innerHTML = `
      <header class="robi-hero">
        <h2>Заведи Роби до звездата ⭐</h2>
        <p>Избери команди, натисни „Старт“ и веднага виж резултата.</p>
        <div class="robi-mascot">🤖</div>
      </header>
      <section>
        <div class="a-level-tabs" id="aLevelTabs"></div>
        <div class="a-game-panel">
          <div class="a-instructions">
            <span class="a-badge" id="aBadge">Ниво 1</span>
            <h3 id="aTitle"></h3>
            <p id="aText"></p>
            <div class="a-tip" id="aTip"></div>
            <div class="a-encore-banner">🔁 Всяко ниво го играеш два пъти — веднъж с обяснение и веднъж сама, за бонус!</div>
            <div class="audio-hint-row">
              <button class="audio-btn" id="aAudioBtn">🔊 Слушай</button>
              <button class="hint-btn" id="aHintBtn">💡 Подсказка</button>
            </div>
            <div class="hint-box hidden" id="aHintBox"></div>
            <div class="a-cmd-palette">
              <button class="a-cmd-btn" data-dir="up" aria-label="Нагоре">⬆️</button>
              <button class="a-cmd-btn" data-dir="down" aria-label="Надолу">⬇️</button>
              <button class="a-cmd-btn" data-dir="left" aria-label="Наляво">⬅️</button>
              <button class="a-cmd-btn" data-dir="right" aria-label="Надясно">➡️</button>
            </div>
            <div class="a-mult-row" id="aMultRow">
              <span>Повтори:</span>
              <button class="a-mult-btn active" data-n="1">x1</button>
              <button class="a-mult-btn" data-n="2">x2</button>
              <button class="a-mult-btn" data-n="3">x3</button>
              <button class="a-mult-btn" data-n="4">x4</button>
              <button class="a-mult-btn" data-n="5">x5</button>
            </div>
            <div class="a-program" id="aProgram"></div>
            <div class="a-action-row">
              <button class="a-btn-run" id="aRun">▶ Старт</button>
              <button class="a-btn-clear" id="aClear">Изчисти</button>
            </div>
          </div>
          <div class="a-stage-wrap">
            <div class="a-grid-stage" id="aGrid"></div>
            <div class="a-message" id="aMsg" role="status"></div>
            <button class="btn btn-primary a-next" id="aNext" style="border:none;background:var(--yellow);color:var(--navy);font-family:'Baloo 2',cursive;font-weight:700;border-radius:100px;padding:10px 20px;cursor:pointer;">Следващо ниво →</button>
          </div>
        </div>
      </section>`;
    wireControls();
    loadLevel();
  }

  function wireControls(){
    container.querySelectorAll('.a-cmd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if(running) return;
        program.push({dir: btn.dataset.dir, count: activeMult});
        renderProgram();
      });
    });
    container.querySelectorAll('.a-mult-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeMult = parseInt(btn.dataset.n, 10);
        container.querySelectorAll('.a-mult-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    container.querySelector('#aClear').addEventListener('click', () => {
      if(running) return;
      program = []; renderProgram();
      container.querySelector('#aMsg').textContent = ''; container.querySelector('#aMsg').className='a-message';
      const lvl = levels[currentLevel]; positionToken(lvl.start[0], lvl.start[1]);
    });
    container.querySelector('#aRun').addEventListener('click', runProgram);
    container.querySelector('#aNext').addEventListener('click', () => {
      if(currentLevel < levels.length-1){ currentLevel++; state.lastLevel = currentLevel; onSave(state); loadLevel(); }
    });
    container.querySelector('#aAudioBtn').addEventListener('click', () => {
      const lvl = levels[currentLevel];
      speakText(lvl.title + '. ' + lvl.text + ' ' + lvl.tip);
    });
    container.querySelector('#aHintBtn').addEventListener('click', () => {
      const lvl = levels[currentLevel];
      const box = container.querySelector('#aHintBox');
      box.textContent = '💡 ' + lvl.hint;
      box.classList.remove('hidden');
      speakText(lvl.hint);
    });
  }

  function renderTabs(){
    const wrap = container.querySelector('#aLevelTabs'); wrap.innerHTML = '';
    levels.forEach((lvl,i) => {
      const tab = document.createElement('button');
      tab.className = 'a-level-tab' + (i===currentLevel?' active':'') + (!state.unlocked[i]?' locked':'');
      tab.innerHTML = `${lvl.secret && state.unlocked[i] ? '🎁 ' : ''}Ниво ${i+1} ${state.stars[i] ? '⭐' : ''}`;
      tab.disabled = !state.unlocked[i];
      tab.onclick = () => { currentLevel = i; state.lastLevel = i; onSave(state); loadLevel(); };
      wrap.appendChild(tab);
    });
  }

  function loadLevel(){
    const lvl = levels[currentLevel];
    program = []; activeMult = 1; running = false; encoreStage = false;
    container.querySelector('#aBadge').textContent = 'Ниво ' + (currentLevel+1);
    container.querySelector('#aTitle').textContent = lvl.title;
    container.querySelector('#aText').textContent = lvl.text;
    container.querySelector('#aTip').textContent = lvl.tip;
    container.querySelector('#aMultRow').style.display = lvl.showMultiplier ? 'flex' : 'none';
    container.querySelectorAll('.a-mult-btn').forEach(b => b.classList.toggle('active', b.dataset.n==='1'));
    container.querySelector('#aMsg').textContent=''; container.querySelector('#aMsg').className='a-message';
    container.querySelector('#aNext').classList.remove('show');
    container.querySelector('#aHintBox').classList.add('hidden');
    renderTabs(); renderProgram(); buildGrid();
  }

  function buildGrid(){
    const lvl = levels[currentLevel];
    const grid = container.querySelector('#aGrid');
    grid.style.gridTemplateColumns = `repeat(${lvl.cols}, 46px)`;
    grid.style.gridTemplateRows = `repeat(${lvl.rows}, 46px)`;
    grid.innerHTML = '';
    for(let r=0;r<lvl.rows;r++) for(let c=0;c<lvl.cols;c++){
      const cell = document.createElement('div'); cell.className='a-cell';
      const isWall = lvl.walls.some(w=>w[0]===r&&w[1]===c);
      const isGoal = lvl.goal[0]===r && lvl.goal[1]===c;
      if(isWall){ cell.classList.add('wall'); cell.textContent=lvl.wallEmoji || '🪨'; }
      else if(isGoal){ cell.classList.add('goal'); cell.textContent=lvl.goalEmoji || '⭐'; }
      grid.appendChild(cell);
    }
    const token = document.createElement('div'); token.className='a-robot-token'; token.id='aToken'; token.textContent='🤖';
    grid.appendChild(token);
    positionToken(lvl.start[0], lvl.start[1]);
  }

  function positionToken(r,c){
    const token = container.querySelector('#aToken');
    token.style.left = (c*(46+4)+10)+'px'; token.style.top = (r*(46+4)+10)+'px';
  }

  function renderProgram(){
    const strip = container.querySelector('#aProgram'); strip.innerHTML='';
    if(program.length===0){ strip.innerHTML = '<span class="a-empty-hint">Натисни стрелките, за да построиш програмата ⬆️➡️</span>'; return; }
    const icons = {up:'⬆️',down:'⬇️',left:'⬅️',right:'➡️'};
    program.forEach((step,idx) => {
      const chip = document.createElement('span'); chip.className='a-chip';
      chip.innerHTML = `${icons[step.dir]} ${step.count>1?'x'+step.count:''}`;
      chip.onclick = () => { if(!running){ program.splice(idx,1); renderProgram(); } };
      strip.appendChild(chip);
    });
  }

  function delay(ms){ return new Promise(res=>setTimeout(res,ms)); }

  async function runProgram(){
    if(running || program.length===0) return;
    running = true;
    container.querySelector('#aNext').classList.remove('show');
    const lvl = levels[currentLevel];
    let r=lvl.start[0], c=lvl.start[1];
    positionToken(r,c);
    const msg = container.querySelector('#aMsg'); msg.textContent=''; msg.className='a-message';
    await delay(200);
    let blocked = false;
    outer: for(const step of program){
      for(let i=0;i<step.count;i++){
        let nr=r, nc=c;
        if(step.dir==='up') nr--; if(step.dir==='down') nr++;
        if(step.dir==='left') nc--; if(step.dir==='right') nc++;
        const oob = nr<0||nr>=lvl.rows||nc<0||nc>=lvl.cols;
        const wall = lvl.walls.some(w=>w[0]===nr&&w[1]===nc);
        if(oob||wall){ blocked=true; shake(); break outer; }
        r=nr; c=nc; positionToken(r,c); await delay(300);
        if(r===lvl.goal[0]&&c===lvl.goal[1]) break outer;
      }
    }
    await delay(150);
    if(r===lvl.goal[0]&&c===lvl.goal[1]){
      if(!encoreStage){
        encoreStage = true;
        state.stars[currentLevel] = true;
        onSave(state); renderTabs();
        msg.textContent = '🌟 Супер! Сега опитай пак — сама, без да гледаш старата програма — за да затвърдиш наученото!';
        msg.className='a-message ok';
        speakText('Супер! Сега опитай пак сама, за да затвърдиш наученото.');
        setTimeout(() => {
          program = []; renderProgram();
          const lvl2 = levels[currentLevel]; positionToken(lvl2.start[0], lvl2.start[1]);
        }, 1400);
      } else {
        msg.textContent = '🎉 Браво! Роби стигна до звездата и втори път — научи го наистина добре!'; msg.className='a-message ok';
        speakText('Браво! Роби стигна до звездата и втори път! Научи го наистина добре.');
        if(currentLevel < levels.length-1){ state.unlocked[currentLevel+1]=true; container.querySelector('#aNext').classList.add('show'); }
        else if(lvl.secretReveal){ msg.textContent = lvl.secretReveal; speakText(lvl.secretReveal); }
        else msg.textContent += ' 🏆 Завърши всички нива!';
        onSave(state); renderTabs();
        fireConfetti();
      }
    } else {
      msg.textContent = '🙈 Опа! Роби се блъсна. Оправи програмата и опитай пак.'; msg.className='a-message bad';
      speakText('Опа! Роби се блъсна. Оправи програмата и опитай пак.');
    }
    running = false;
  }

  function shake(){
    const token = container.querySelector('#aToken');
    token.style.transition='none'; token.textContent='💥';
    setTimeout(()=>{ token.textContent='🤖'; token.style.transition='left .3s ease, top .3s ease'; }, 480);
  }

  return { mount, defaultUnlocked, defaultStars };
})();

