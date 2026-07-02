/* ============================= TRACK B: chapter 10 — game maker ============================= */
let gameRAF = null, gameKeyHandler = null, gameHeld = null;

export function stopGame(){
    if(gameRAF){ cancelAnimationFrame(gameRAF); gameRAF = null; }
    if(gameKeyHandler){ document.removeEventListener('keydown', gameKeyHandler.down); document.removeEventListener('keyup', gameKeyHandler.up); gameKeyHandler = null; }
    gameHeld = null;
  }

  export function renderGameBlanks(container, lesson){
    const stage = container.querySelector('#bGameCode'); stage.innerHTML='';
    lesson.codeLines.forEach(lineStr => {
      const lineEl = document.createElement('div'); lineEl.className='b-code-line';
      const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
      parts.forEach(part => {
        const m = part.match(/^\{\{(\w+)\}\}$/);
        if(m){
          const blank = lesson.blanks.find(b=>b.id===m[1]);
          const inp = document.createElement('input');
          inp.type='number'; inp.className='b-blank-input'; inp.dataset.id=blank.id; inp.placeholder='?';
          lineEl.appendChild(inp);
        } else {
          const span = document.createElement('span'); span.className='b-code-text'; span.textContent=part;
          lineEl.appendChild(span);
        }
      });
      stage.appendChild(lineEl);
    });
  }

export function drawGameIdle(container, lesson){
    const cv = container.querySelector('#bGameCanvas');
    if(!cv) return;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#1B1B3A'; ctx.fillRect(0,0,cv.width,cv.height);
    ctx.font = '14px Nunito, sans-serif'; ctx.fillStyle = '#DCDCF5'; ctx.textAlign = 'center';
    ctx.fillText('Настрой кода и натисни „Играй!“', cv.width/2, cv.height/2);
  }

  export async function startGame(container, lesson, msgEl, nextBtn){
    const codeEl = container.querySelector('#bGameCode');
    let allFilled = true; const values = {};
    lesson.blanks.forEach(b => {
      const el = codeEl.querySelector(`[data-id="${b.id}"]`);
      const val = (el.value||'').trim();
      if(val==='') allFilled=false;
      values[b.id] = val;
    });
    if(!allFilled){ msgEl.textContent='✏️ Попълни всички стойности в кода първо.'; msgEl.className='a-message bad'; return; }
    stopGame();
    const cfg = lesson.compile(values);
    const cv = container.querySelector('#bGameCanvas');
    const ctx = cv.getContext('2d');
    const scoreEl = container.querySelector('#bGameScore');
    scoreEl.style.display = 'block';
    msgEl.textContent = ''; msgEl.className = 'a-message';
    nextBtn.disabled = true;

    const W = cv.width, H = cv.height;
    let basketX = W/2, basketW = 46, basketY = lesson.game.basketY;
    let score = 0, running = true, lastSpawn = 0;
    const items = [];

    gameHeld = null;
    const leftBtn = container.querySelector('#bGameLeft');
    const rightBtn = container.querySelector('#bGameRight');
    const setHeld = (dir) => { gameHeld = dir; };
    const clearHeld = () => { gameHeld = null; };
    ['mousedown','touchstart'].forEach(ev => { leftBtn.addEventListener(ev, ()=>setHeld('left')); rightBtn.addEventListener(ev, ()=>setHeld('right')); });
    ['mouseup','mouseleave','touchend'].forEach(ev => { leftBtn.addEventListener(ev, clearHeld); rightBtn.addEventListener(ev, clearHeld); });
    gameKeyHandler = {
      down:(e) => { if(e.key==='ArrowLeft') gameHeld='left'; if(e.key==='ArrowRight') gameHeld='right'; },
      up:(e) => { if(e.key==='ArrowLeft' || e.key==='ArrowRight') gameHeld=null; }
    };
    document.addEventListener('keydown', gameKeyHandler.down);
    document.addEventListener('keyup', gameKeyHandler.up);

    function spawnItem(){
      const isRock = Math.random()*100 < (cfg.rockChance||0);
      items.push({ x: 20+Math.random()*(W-40), y: -10, isRock, speed: 1.2 + cfg.speed*0.5 });
    }

    function frame(ts){
      if(!running) return;
      ctx.fillStyle = '#1B1B3A'; ctx.fillRect(0,0,W,H);

      if(gameHeld==='left') basketX = Math.max(basketW/2, basketX - 5);
      if(gameHeld==='right') basketX = Math.min(W-basketW/2, basketX + 5);

      if(!lastSpawn || ts - lastSpawn > Math.max(350, 1000 - cfg.speed*90)){ spawnItem(); lastSpawn = ts; }

      for(let i=items.length-1; i>=0; i--){
        const it = items[i];
        it.y += it.speed;
        ctx.font = '20px sans-serif'; ctx.textAlign='center';
        ctx.fillText(it.isRock ? '🪨' : '⭐', it.x, it.y);
        if(it.y > basketY-10 && it.y < basketY+16 && Math.abs(it.x-basketX) < basketW/2+8){
          if(it.isRock){ score = Math.max(0, score-1); } else { score += 1; }
          items.splice(i,1);
        } else if(it.y > H+10){
          items.splice(i,1);
        }
      }

      ctx.font = '28px sans-serif'; ctx.textAlign='center';
      ctx.fillText('🧺', basketX, basketY+22);

      scoreEl.textContent = `⭐ ${score} / ${cfg.winScore}`;

      if(score >= cfg.winScore){
        running = false; stopGame();
        msgEl.textContent = '🎉 ' + lesson.successMsg; msgEl.className='a-message ok';
        nextBtn.disabled = false;
        return;
      }
      gameRAF = requestAnimationFrame(frame);
    }
    gameRAF = requestAnimationFrame(frame);
  }
