/* ============================= TRACK B: chapter 8 — live coding arena ============================= */
export function renderLiveBlanks(container, lesson){
    const stage = container.querySelector('#bLiveCode'); stage.innerHTML='';
    lesson.codeLines.forEach(lineStr => {
      const lineEl = document.createElement('div'); lineEl.className='b-code-line';
      const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
      parts.forEach(part => {
        const m = part.match(/^\{\{(\w+)\}\}$/);
        if(m){
          const blank = lesson.blanks.find(b=>b.id===m[1]);
          if(blank.kind==='number'){
            const inp = document.createElement('input');
            inp.type='number'; inp.className='b-blank-input'; inp.dataset.id=blank.id; inp.placeholder='?';
            lineEl.appendChild(inp);
          } else {
            const sel = document.createElement('select');
            sel.className='b-blank-select'; sel.dataset.id=blank.id;
            const def = document.createElement('option'); def.value=''; def.textContent='— избери —';
            sel.appendChild(def);
            blank.options.forEach(o => { const opt=document.createElement('option'); opt.value=o.value; opt.textContent=o.label; sel.appendChild(opt); });
            lineEl.appendChild(sel);
          }
        } else {
          const span = document.createElement('span'); span.className='b-code-text'; span.textContent=part;
          lineEl.appendChild(span);
        }
      });
      stage.appendChild(lineEl);
    });
  }

export function buildLiveGrid(grid, gridEl){
    gridEl.style.gridTemplateColumns = `repeat(${grid.cols}, 46px)`;
    gridEl.style.gridTemplateRows = `repeat(${grid.rows}, 46px)`;
    gridEl.innerHTML = '';
    for(let r=0;r<grid.rows;r++){
      for(let c=0;c<grid.cols;c++){
        const cell = document.createElement('div'); cell.className='a-cell';
        const isWall = grid.walls.some(w=>w[0]===r&&w[1]===c);
        const isGoal = grid.goal[0]===r && grid.goal[1]===c;
        if(isWall){ cell.classList.add('wall'); cell.textContent='🪨'; }
        else if(isGoal){ cell.classList.add('goal'); cell.textContent='⭐'; }
        gridEl.appendChild(cell);
      }
    }
    const token = document.createElement('div'); token.className='a-robot-token'; token.id='bLiveToken'; token.textContent='🧚‍♀️';
    gridEl.appendChild(token);
    positionLiveToken(grid.start[0], grid.start[1], gridEl);
  }

export function positionLiveToken(r, c, gridEl){
    const token = gridEl.querySelector('#bLiveToken');
    token.style.left = (c*(46+4)+10)+'px'; token.style.top = (r*(46+4)+10)+'px';
  }

  export function delay(ms){ return new Promise(res=>setTimeout(res,ms)); }

  export async function runLive(container, lesson, gridEl, msgEl, nextBtn){
    const codeEl = container.querySelector('#bLiveCode');
    const values = {}; let allFilled = true;
    lesson.blanks.forEach(b => {
      const el = codeEl.querySelector(`[data-id="${b.id}"]`);
      const val = (el.value||'').trim();
      if(val==='') allFilled = false;
      values[b.id] = val;
    });
    if(!allFilled){ msgEl.textContent = '✏️ Попълни всички стойности в кода първо.'; msgEl.className='a-message bad'; return; }

    const moves = lesson.compile(values);
    const grid = lesson.grid;
    let r = grid.start[0], c = grid.start[1];
    positionLiveToken(r, c, gridEl);
    msgEl.textContent=''; msgEl.className='a-message';
    await delay(200);
    let blocked = false;
    outer: for(const seg of moves){
      const n = Math.max(0, seg.count||0);
      for(let i=0;i<n;i++){
        let nr=r, nc=c;
        if(seg.dir==='up') nr--; if(seg.dir==='down') nr++;
        if(seg.dir==='left') nc--; if(seg.dir==='right') nc++;
        const oob = nr<0||nr>=grid.rows||nc<0||nc>=grid.cols;
        const wall = grid.walls.some(w=>w[0]===nr&&w[1]===nc);
        if(oob||wall){ blocked=true; break outer; }
        r=nr; c=nc; positionLiveToken(r,c,gridEl); await delay(300);
        if(r===grid.goal[0] && c===grid.goal[1]) break outer;
      }
    }
    await delay(150);
    if(r===grid.goal[0] && c===grid.goal[1]){
      msgEl.textContent = '🎉 ' + lesson.successMsg; msgEl.className='a-message ok';
      nextBtn.disabled = false;
    } else if(blocked){
      msgEl.textContent = '💥 Опа! Кодът изведе героя извън пътя. Провери числата и посоките и пробвай пак.'; msgEl.className='a-message bad';
    } else {
      msgEl.textContent = '🤔 Почти! Героят спря, но не стигна звездата. Коригирай кода и пробвай пак.'; msgEl.className='a-message bad';
    }
  }
