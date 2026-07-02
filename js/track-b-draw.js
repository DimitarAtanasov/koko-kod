import { delay } from './track-b-live.js';

/* ============================= TRACK B: chapter 9 — drawing with code ============================= */
export function renderDrawBlanks(container, lesson){
    const stage = container.querySelector('#bDrawCode'); stage.innerHTML='';
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

export function clearDrawCanvas(container, lesson){
    const cv = container.querySelector('#bDrawCanvas');
    if(!cv) return;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#FFFAF3'; ctx.fillRect(0,0,cv.width,cv.height);
  }

  export async function runDraw(container, lesson, msgEl, nextBtn){
    const codeEl = container.querySelector('#bDrawCode');
    let allFilled = true; const values = {};
    lesson.blanks.forEach(b => {
      const el = codeEl.querySelector(`[data-id="${b.id}"]`);
      const val = (el.value||'').trim();
      if(val==='') allFilled=false;
      values[b.id] = val;
    });
    if(!allFilled){ msgEl.textContent='✏️ Попълни всички стойности първо.'; msgEl.className='a-message bad'; return; }
    const ops = lesson.compile(values);
    const cv = container.querySelector('#bDrawCanvas');
    const ctx = cv.getContext('2d');
    clearDrawCanvas(container, lesson);
    let x = cv.width/2, y = cv.height/2, angle = 0, color = '#D6467F';
    ctx.lineWidth = 3; ctx.lineCap = 'round';
    msgEl.textContent=''; msgEl.className='a-message';
    for(const op of ops){
      if(op.op === 'color'){ color = op.value; await delay(30); }
      else if(op.op === 'turn'){ angle = (angle + (op.deg||0)) % 360; await delay(30); }
      else if(op.op === 'forward'){
        const dist = Math.max(0, Math.min(300, op.dist||0));
        const nx = x + dist*Math.sin(angle*Math.PI/180);
        const ny = y - dist*Math.cos(angle*Math.PI/180);
        ctx.strokeStyle = color;
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(nx,ny); ctx.stroke();
        x = nx; y = ny;
        await delay(90);
      }
    }
    msgEl.textContent = '🎉 ' + lesson.successMsg; msgEl.className='a-message ok';
    nextBtn.disabled = false;
  }
