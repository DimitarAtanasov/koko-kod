import { lessons } from './track-b-data.js';
import { RUBRICS, RUBRIC_CHAR_LABEL } from './rubrics.js';

/* ============================= TRACK B: blanks/order exercise checking + rubric feedback ============================= */
let orderState = [];

export function buildQuiz(lesson, idx){
    const pool = lessons.filter((l,i) => i!==idx).map(l => l.fact);
    const shuffled = pool.slice().sort(() => Math.random()-0.5).slice(0,2);
    const options = [lesson.fact, ...shuffled].sort(() => Math.random()-0.5);
    return { correct: lesson.fact, options };
  }

  export function renderExerciseStage(container, lesson, ex){
    const stage = container.querySelector('#bStage'); stage.innerHTML='';
    if(lesson.type === 'blanks'){
      ex.codeLines.forEach(lineStr => {
        const lineEl = document.createElement('div'); lineEl.className='b-code-line';
        const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
        parts.forEach(part => {
          const m = part.match(/^\{\{(\w+)\}\}$/);
          if(m){
            const blank = ex.blanks.find(b=>b.id===m[1]);
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
    } else if(lesson.type === 'order'){
      orderState = [];
      const poolTitle = document.createElement('div'); poolTitle.className='b-code-line';
      poolTitle.innerHTML = '<span class="b-code-text" style="color:#C9BFFF;">// избери реда, в който да поставиш командите:</span>';
      stage.appendChild(poolTitle);
      const answer = document.createElement('div'); answer.className='b-chip-answer'; answer.id='bChipAnswer';
      const pool = document.createElement('div'); pool.className='b-chip-pool'; pool.id='bChipPool';
      stage.appendChild(answer); stage.appendChild(pool);
      renderChips(container, ex);
    }
  }

  export function renderWorked(lesson, el){
    el.innerHTML='';
    if(lesson.type === 'blanks'){
      lesson.codeLines.forEach(lineStr => {
        const lineEl = document.createElement('div'); lineEl.className='b-code-line';
        const parts = lineStr.split(/(\{\{\w+\}\})/g).filter(s=>s!=='');
        parts.forEach(part => {
          const m = part.match(/^\{\{(\w+)\}\}$/);
          if(m){
            const blank = lesson.blanks.find(b=>b.id===m[1]);
            const span = document.createElement('span'); span.className='worked-badge';
            if(blank.kind==='select'){
              const opt = blank.options.find(o=>o.value===String(blank.correct));
              span.textContent = opt ? opt.label : blank.correct;
            } else { span.textContent = blank.correct; }
            lineEl.appendChild(span);
          } else {
            const span = document.createElement('span'); span.className='b-code-text'; span.textContent=part;
            lineEl.appendChild(span);
          }
        });
        el.appendChild(lineEl);
      });
    } else if(lesson.type === 'order'){
      lesson.correctOrder.forEach((id,i) => {
        const c = lesson.chips.find(x=>x.id===id);
        const lineEl = document.createElement('div'); lineEl.className='b-code-line';
        lineEl.innerHTML = `<span class="worked-badge">${i+1}</span><span class="b-code-text">${c.label}</span>`;
        el.appendChild(lineEl);
      });
    }
  }

export function renderChips(container, lesson){
    const pool = container.querySelector('#bChipPool');
    const answer = container.querySelector('#bChipAnswer');
    pool.innerHTML='';
    lesson.chips.forEach(c => {
      if(orderState.includes(c.id)) return;
      const chip = document.createElement('button'); chip.className='b-chip'; chip.textContent=c.label;
      chip.onclick = () => { orderState.push(c.id); renderChips(container, lesson); };
      pool.appendChild(chip);
    });
    answer.innerHTML='';
    if(orderState.length===0){ answer.innerHTML = '<span class="b-empty-hint">Натисни командите отдолу в правилния ред</span>'; }
    else {
      orderState.forEach((id,i) => {
        const c = lesson.chips.find(x=>x.id===id);
        const chip = document.createElement('button'); chip.className='b-chip placed'; chip.textContent=(i+1)+'. '+c.label;
        chip.onclick = () => { orderState.splice(i,1); renderChips(container, lesson); };
        answer.appendChild(chip);
      });
    }
  }

  export function findRubricLine(lesson, wrongBlanks){
    const entries = RUBRICS[lesson.id];
    if(!entries) return null;
    if(lesson.type === 'order'){
      const e = entries.find(e => e.blankId === 'chips');
      return e ? { label: RUBRIC_CHAR_LABEL[e.character] || '', line: e.line } : null;
    }
    for(const wb of wrongBlanks){
      const e = entries.find(e => e.blankId === wb.id && String(e.wrongValue) === wb.value);
      if(e) return { label: RUBRIC_CHAR_LABEL[e.character] || '', line: e.line };
    }
    return null;
  }

export function checkExercise(container, lesson, ex){
    const msg = container.querySelector('#bMsg');
    let success = false;
    const wrongBlanks = [];
    if(lesson.type === 'blanks'){
      let allRight = true;
      ex.blanks.forEach(b => {
        const el = container.querySelector(`#bStage [data-id="${b.id}"]`);
        const val = (el.value||'').trim();
        const ok = val!=='' && val===String(b.correct).trim();
        el.classList.toggle('right', ok); el.classList.toggle('wrong', !ok);
        if(!ok){ allRight=false; wrongBlanks.push({id:b.id, value:val}); }
      });
      success = allRight;
    } else if(lesson.type === 'order'){
      success = orderState.length===ex.correctOrder.length && orderState.every((id,i)=> id===ex.correctOrder[i]);
    }
    if(success){
      let extra = '';
      if(ex.resultCountId){
        const el = container.querySelector(`#bStage [data-id="${ex.resultCountId}"]`);
        const n = Math.min(parseInt(el.value,10)||0, 12);
        extra = ' ' + (ex.resultEmoji||'⭐').repeat(n);
      }
      msg.textContent = '🎉 ' + ex.successMsg + extra; msg.className='b-message ok';
      container.querySelector('#stepNextBtn').disabled = false;
    } else {
      const rubric = findRubricLine(lesson, wrongBlanks);
      if(rubric){
        msg.innerHTML = `${rubric.label}: ${rubric.line}`;
      } else {
        msg.innerHTML = `🤔 <strong>Не съвсем.</strong> ${lesson.fact}<br>Помисли отново върху обяснението, преди да пробваш пак.`;
      }
      msg.className='b-message bad';
      const checkBtn = container.querySelector('#bCheck');
      const resetBtn = container.querySelector('#bReset');
      const fields = Array.from(container.querySelectorAll('#bStage [data-id]'));
      startLockout(msg, 10, [checkBtn, resetBtn, ...fields]);
    }
  }

export function startLockout(msgEl, seconds, elsToDisable){
    let remaining = seconds;
    const baseHTML = msgEl.innerHTML;
    elsToDisable.forEach(el => { if(el) el.disabled = true; });
    const tick = () => {
      msgEl.innerHTML = baseHTML + `<br><span class="lockout-timer">⏳ Можеш да пробваш пак след ${remaining} сек...</span>`;
      remaining--;
      if(remaining < 0){
        clearInterval(iv);
        elsToDisable.forEach(el => { if(el) el.disabled = false; });
        msgEl.innerHTML = baseHTML + `<br><span class="lockout-timer" style="color:var(--ok);">✏️ Пробвай сега!</span>`;
      }
    };
    tick();
    const iv = setInterval(tick, 1000);
  }
