import { INTERESTS, fireConfetti, profile, speakText } from './core.js';
import { chapters, lessons, chapterFor, defaultUnlocked, defaultStars } from './track-b-data.js';
import { renderLiveBlanks, buildLiveGrid, runLive } from './track-b-live.js';
import { renderDrawBlanks, clearDrawCanvas, runDraw } from './track-b-draw.js';
import { stopGame, renderGameBlanks, drawGameIdle, startGame } from './track-b-game.js';
import { buildQuiz, renderExerciseStage, renderWorked, checkExercise, startLockout } from './track-b-exercise.js';
import { startReview } from './track-b-review.js';

/* ============================= TRACK B: 11+ (Koko Kod code lessons) =============================
   Orchestrator only — chapters/lessons data lives in track-b-data.js, and each lesson type's
   rendering/checking logic lives in its own track-b-*.js module (live/draw/game/exercise/review).
   See CLAUDE.md for why core.js/track-a.js/track-b.js form a cyclic import graph safely: all
   cross-module usage here happens inside deferred function bodies (event handlers, calls made
   after boot()), never at top-level module-evaluation time. Same rule applies to these new
   track-b-*.js modules. */
export const TrackB = (function(){
  let state, onSave, container, current = 0, steps = [], stepIdx = 0;

  function mount(rootEl, progress, saveFn){
    state = progress; onSave = saveFn; container = rootEl;
    while(state.unlocked.length < lessons.length) state.unlocked.push(false);
    while(state.stars.length < lessons.length) state.stars.push(false);
    for(let i=0; i<lessons.length-1; i++){ if(state.stars[i] && !state.unlocked[i+1]) state.unlocked[i+1] = true; }
    if(state.lastLesson >= lessons.length) state.lastLesson = lessons.length-1;
    onSave(state);
    current = state.lastLesson || 0;
    container.innerHTML = `
      <section>
        <div class="section-head">
          <span class="kicker">Практика</span>
          <h2>Пътят на Луна, Бо и Мия</h2>
          <p>Всеки урок има обяснение, упражнение, кратък преговор и самостоятелна практика — общо около 15–20 минути. След глава 7 се отключва живата арена за кодиране!</p>
          <button class="hint-btn" id="bReviewBtn" style="margin-top:14px;">🔄 Бърз преговор на стари уроци</button>
        </div>
        <div id="bRecoBanner"></div>
        <div id="bChapterList"></div>
        <div class="step-progress" id="bStepProgress"></div>
        <div class="b-lesson-panel" id="bPanel">
          <div class="b-lesson-left" id="bLeftCol"></div>
          <div class="b-lesson-right" id="bRightCol"></div>
        </div>
      </section>`;
    container.querySelector('#bReviewBtn').addEventListener('click', () => startReview(container, state, loadLesson));
    renderMap(); loadLesson();
  }

  function renderMap(){
    const wrap = container.querySelector('#bChapterList'); wrap.innerHTML = '';
    const myInterests = (typeof profile !== 'undefined' && profile && Array.isArray(profile.interests)) ? profile.interests : [];
    const matched = myInterests.length ? chapters.filter(ch => ch.tags && ch.tags.some(t => myInterests.includes(t))) : [];
    const bannerHost = container.querySelector('#bRecoBanner');
    if(bannerHost){
      if(matched.length){
        const labels = INTERESTS.filter(it => myInterests.includes(it.id)).map(it => it.emoji + ' ' + it.label).join(', ');
        bannerHost.innerHTML = `<div class="reco-banner">
          <h4>🌳 Твоето дърво на ученето</h4>
          <p>Избрала си: ${labels}. Ето главите, които най-много ти пасват — търси значката ✨ по-долу!</p>
          <div class="reco-jumps">${matched.map(ch => `<button class="reco-jump-btn" data-ch="${ch.n}">${ch.n}. ${ch.title}</button>`).join('')}</div>
        </div>`;
        bannerHost.querySelectorAll('.reco-jump-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const ch = chapters.find(c => c.n === parseInt(btn.dataset.ch,10));
            const idx = ch.range[0]-1;
            if(state.unlocked[idx]){ current = idx; loadLesson();
              container.querySelector('#bPanel').scrollIntoView({behavior:'smooth', block:'center'}); }
            else { container.querySelector(`.b-chapter-block[data-ch="${ch.n}"]`)?.scrollIntoView({behavior:'smooth', block:'center'}); }
          });
        });
      } else bannerHost.innerHTML = '';
    }
    chapters.forEach(ch => {
      const block = document.createElement('div'); block.className='b-chapter-block'; block.dataset.ch = ch.n;
      const [bg, deep] = ch.color;
      const isReco = matched.includes(ch);
      const title = document.createElement('div'); title.className='b-chapter-title';
      title.innerHTML = `<span class="num" style="background:${deep}">${ch.n}</span><span>${ch.title}</span>${isReco ? '<span class="reco-badge" title="Препоръчано за теб по интереси">✨</span>' : ''}`;
      block.appendChild(title);
      if(ch.intro){
        const intro = document.createElement('p'); intro.className='b-chapter-intro'; intro.textContent = ch.intro;
        block.appendChild(intro);
      }
      const row = document.createElement('div'); row.className='b-badge-row';
      for(let id=ch.range[0]; id<=ch.range[1]; id++){
        const idx = id-1;
        const btn = document.createElement('button');
        btn.className = 'b-badge' + (!state.unlocked[idx]?' locked':'') + (idx===current?' current':'');
        btn.style.background = state.unlocked[idx] ? bg : '';
        btn.style.color = state.unlocked[idx] ? '#3E2247' : '';
        btn.innerHTML = id + (state.stars[idx] ? '<span class="star">⭐</span>' : '');
        btn.disabled = !state.unlocked[idx];
        btn.onclick = () => { current = idx; loadLesson();
          container.querySelector('#bPanel').scrollIntoView({behavior:'smooth', block:'center'}); };
        row.appendChild(btn);
      }
      block.appendChild(row); wrap.appendChild(block);
    });
  }

  function buildSteps(lesson, idx){
    const built = [{kind:'explain'}];
    if(lesson.type === 'info'){
      built.push({kind:'inforead'});
      built.push(Object.assign({kind:'quiz'}, buildQuiz(lesson, idx)));
    } else if(lesson.type === 'live'){
      built.push({kind:'live'});
    } else if(lesson.type === 'draw'){
      built.push({kind:'draw'});
    } else if(lesson.type === 'game'){
      built.push({kind:'game'});
    } else {
      built.push({kind:'exercise', repeat:false});
      built.push(Object.assign({kind:'quiz'}, buildQuiz(lesson, idx)));
      built.push({kind:'exercise', repeat:true});
    }
    built.push({kind:'complete'});
    return built;
  }

  function loadLesson(){
    state.lastLesson = current; onSave(state);
    steps = buildSteps(lessons[current], current);
    stepIdx = 0;
    renderMap(); renderStep();
  }

  function renderStepProgress(){
    const wrap = container.querySelector('#bStepProgress'); wrap.innerHTML = '';
    const cap = document.createElement('span'); cap.className='step-caption';
    cap.textContent = `Стъпка ${stepIdx+1} от ${steps.length}`;
    wrap.appendChild(cap);
    steps.forEach((s,i) => {
      const dot = document.createElement('span');
      dot.className = 'step-dot' + (i<stepIdx?' done':'') + (i===stepIdx?' active':'');
      wrap.appendChild(dot);
    });
  }

  function renderStep(){
    stopGame();
    const lesson = lessons[current];
    const ch = chapterFor(lesson.id);
    renderStepProgress();
    const left = container.querySelector('#bLeftCol');
    const right = container.querySelector('#bRightCol');
    const panel = container.querySelector('#bPanel');
    left.innerHTML=''; right.innerHTML=''; right.style.display='block'; panel.classList.remove('single-col');
    const step = steps[stepIdx];
    const badgeHtml = `<span class="b-chapter-badge" style="background:${ch.color[0]};color:${ch.color[1]}">Урок ${lesson.id} · Глава ${ch.n}</span>`;

    if(step.kind === 'explain'){
      const note = lesson.type==='info' ? 'Натисни напред, за да продължиш.'
        : lesson.type==='live' ? 'Ето синтаксиса, който ще използваш — после ще напишеш истински движещ код!'
        : lesson.type==='draw' ? 'Ето как четката рисува — после ще напишеш свой код за рисуване!'
        : lesson.type==='game' ? 'Настрой правилата на играта с код — после ще я играеш на живо!'
        : 'Виж как изглежда правилното решение, преди да пробваш сама:';
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Обяснение</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <p class="b-story">${lesson.story}</p>
        <div class="b-fact">💡 ${lesson.fact}</div>
        <button class="audio-btn" id="bAudioBtn" style="margin-top:10px;">🔊 Слушай</button>
        <div class="worked-note">${note}</div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn">Разбрах, напред →</button></div>`;
      container.querySelector('#bAudioBtn').addEventListener('click', () => speakText(lesson.story + ' ' + lesson.fact));
      if(lesson.type==='blanks' || lesson.type==='order'){
        right.innerHTML = `<div class="b-stage-title">Готово решение</div><div class="b-code-block" id="bWorked"></div>`;
        renderWorked(lesson, container.querySelector('#bWorked'));
      } else if(lesson.type==='live'){
        right.innerHTML = `<div class="b-stage-title">Как работи движението</div><div class="b-code-block">
          <div class="b-code-line"><span class="b-code-text">move(right);  // 1 стъпка надясно</span></div>
          <div class="b-code-line"><span class="b-code-text">for (int i = 0; i < 3; i++) {</span></div>
          <div class="b-code-line"><span class="b-code-text">&nbsp;&nbsp;move(up);  // повтаря се 3 пъти</span></div>
          <div class="b-code-line"><span class="b-code-text">}</span></div>
        </div>`;
      } else if(lesson.type==='draw'){
        right.innerHTML = `<div class="b-stage-title">Как работи четката</div><div class="b-code-block">
          <div class="b-code-line"><span class="b-code-text">forward(50);  // чертае 50 напред</span></div>
          <div class="b-code-line"><span class="b-code-text">turn(90);  // завива на 90°</span></div>
          <div class="b-code-line"><span class="b-code-text">penColor("розово");  // сменя цвета</span></div>
        </div>`;
      } else if(lesson.type==='game'){
        right.innerHTML = `<div class="b-stage-title">Как работи играта</div><div class="b-code-block">
          <div class="b-code-line"><span class="b-code-text">int skorost = {{X}};  // трудност</span></div>
          <div class="b-code-line"><span class="b-code-text">int cel = {{Y}};  // колко трябват за победа</span></div>
          <div class="b-code-line"><span class="b-code-text">// после играеш с ⬅️ ➡️ на живо!</span></div>
        </div>`;
      } else { right.style.display='none'; panel.classList.add('single-col'); }
      container.querySelector('#stepNextBtn').addEventListener('click', goNext);
    }
    else if(step.kind === 'exercise'){
      const ex = step.repeat ? lesson.sequel : lesson;
      left.innerHTML = `${badgeHtml}<div class="step-kicker">${step.repeat ? 'Историята продължава' : 'Упражнение'}</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}${step.repeat ? ' — част 2' : ''}</h3>
        <p class="b-story">${ex.story}</p>
        <div class="b-action-row">
          <button class="b-btn-run" id="bCheck">✔ Провери</button>
          <button class="b-btn-reset" id="bReset">Изчисти</button>
        </div>
        <div class="b-message" id="bMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      right.innerHTML = `<div class="b-stage-title">Код</div><div class="b-code-block" id="bStage"></div>`;
      renderExerciseStage(container, lesson, ex);
      container.querySelector('#bCheck').addEventListener('click', () => checkExercise(container, lesson, ex));
      container.querySelector('#bReset').addEventListener('click', () => {
        const msg = container.querySelector('#bMsg'); msg.textContent=''; msg.className='b-message';
        container.querySelector('#stepNextBtn').disabled = true;
        renderExerciseStage(container, lesson, ex);
      });
      container.querySelector('#stepNextBtn').addEventListener('click', goNext);
    }
    else if(step.kind === 'live'){
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Живо кодиране</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <p class="b-story">${lesson.story}</p>
        <div class="b-action-row">
          <button class="b-btn-run" id="bLiveRun">▶ Изпълни кода</button>
        </div>
        <div class="a-message" id="bLiveMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      right.innerHTML = `<div class="b-stage-title">Твоят код</div><div class="b-code-block" id="bLiveCode"></div>
        <div class="b-stage-title" style="margin-top:14px;">Терен на живо</div>
        <div class="a-grid-stage" id="bLiveGrid" style="margin:0 auto;"></div>`;
      renderLiveBlanks(container, lesson);
      const gridEl = container.querySelector('#bLiveGrid');
      buildLiveGrid(lesson.grid, gridEl);
      const msgEl = container.querySelector('#bLiveMsg');
      const nextBtn = container.querySelector('#stepNextBtn');
      container.querySelector('#bLiveRun').addEventListener('click', () => runLive(container, lesson, gridEl, msgEl, nextBtn));
      nextBtn.addEventListener('click', goNext);
    }
    else if(step.kind === 'draw'){
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Рисуване с код</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <p class="b-story">${lesson.story}</p>
        <div class="b-action-row">
          <button class="b-btn-run" id="bDrawRun">🖌️ Нарисувай</button>
          <button class="b-btn-reset" id="bDrawClear">Изчисти платното</button>
        </div>
        <div class="a-message" id="bDrawMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      right.innerHTML = `<div class="b-stage-title">Твоят код</div><div class="b-code-block" id="bDrawCode"></div>
        <div class="b-stage-title" style="margin-top:14px;">Платно</div>
        <div class="draw-canvas-wrap"><canvas id="bDrawCanvas" width="${lesson.canvas.size}" height="${lesson.canvas.size}"></canvas></div>`;
      renderDrawBlanks(container, lesson);
      clearDrawCanvas(container, lesson);
      const msgEl = container.querySelector('#bDrawMsg');
      const nextBtn = container.querySelector('#stepNextBtn');
      container.querySelector('#bDrawRun').addEventListener('click', () => runDraw(container, lesson, msgEl, nextBtn));
      container.querySelector('#bDrawClear').addEventListener('click', () => { clearDrawCanvas(container, lesson); msgEl.textContent=''; msgEl.className='a-message'; });
      nextBtn.addEventListener('click', goNext);
    }
    else if(step.kind === 'game'){
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Направи игра</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <p class="b-story">${lesson.story}</p>
        <div class="b-action-row">
          <button class="b-btn-run" id="bGameRun">🎮 Играй!</button>
        </div>
        <div class="a-message" id="bGameMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      right.innerHTML = `<div class="b-stage-title">Настройки на играта</div><div class="b-code-block" id="bGameCode"></div>
        <div class="b-stage-title" style="margin-top:14px;">Играй тук</div>
        <div class="game-canvas-wrap"><canvas id="bGameCanvas" width="${lesson.game.canvasW}" height="${lesson.game.canvasH}"></canvas>
          <div class="game-score" id="bGameScore" style="display:none;"></div></div>
        <div class="game-controls">
          <button class="game-ctrl-btn" id="bGameLeft">⬅️</button>
          <button class="game-ctrl-btn" id="bGameRight">➡️</button>
        </div>`;
      renderGameBlanks(container, lesson);
      drawGameIdle(container, lesson);
      const msgEl = container.querySelector('#bGameMsg');
      const nextBtn = container.querySelector('#stepNextBtn');
      container.querySelector('#bGameRun').addEventListener('click', () => startGame(container, lesson, msgEl, nextBtn));
      nextBtn.addEventListener('click', () => { stopGame(); goNext(); });
    }
    else if(step.kind === 'quiz'){
      panel.classList.add('single-col'); right.style.display='none';
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Бърз преговор</div>
        <div class="quiz-question">Кое от следните е вярно за този урок?</div>
        <div id="quizOpts"></div>
        <div class="b-message" id="bQuizMsg" role="status"></div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn" disabled>Напред →</button></div>`;
      const optsWrap = container.querySelector('#quizOpts');
      const quizMsg = container.querySelector('#bQuizMsg');
      step.options.forEach(opt => {
        const btn = document.createElement('button'); btn.className='quiz-opt'; btn.textContent = opt;
        btn.onclick = () => {
          const isRight = opt === step.correct;
          if(isRight){
            btn.classList.add('right');
            quizMsg.textContent = '🎉 Точно така!'; quizMsg.className='b-message ok';
            container.querySelector('#stepNextBtn').disabled=false;
            optsWrap.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
          } else {
            btn.classList.add('wrong'); btn.disabled = true;
            quizMsg.innerHTML = `🤔 <strong>Не точно.</strong> ${lesson.fact}<br>Тази опция вече е изключена — помисли и пробвай друга.`;
            quizMsg.className='b-message bad';
            const others = Array.from(optsWrap.querySelectorAll('.quiz-opt')).filter(b=>!b.classList.contains('wrong'));
            startLockout(quizMsg, 10, others);
          }
        };
        optsWrap.appendChild(btn);
      });
      container.querySelector('#stepNextBtn').addEventListener('click', goNext);
    }
    else if(step.kind === 'inforead'){
      panel.classList.add('single-col'); right.style.display='none';
      left.innerHTML = `${badgeHtml}<div class="step-kicker">Какво следва</div>
        <h3><span class="b-mascot-icon">${lesson.mascot}</span>${lesson.title}</h3>
        <div class="b-info-card" style="margin-top:14px;">
          <h4>🚀 Отвъд Коко Код</h4>
          ${lesson.infoBody.map(t=>`<p>${t}</p>`).join('')}
          <div class="tags"><span class="tag">Unity · C#</span><span class="tag">.NET</span><span class="tag">Go (Golang)</span></div>
        </div>
        <div class="step-nav"><button class="step-next" id="stepNextBtn">Напред →</button></div>`;
      container.querySelector('#stepNextBtn').addEventListener('click', goNext);
    }
    else if(step.kind === 'complete'){
      panel.classList.add('single-col'); right.style.display='none';
      left.innerHTML = `<div class="complete-card">
          <div class="big-star">⭐</div>
          <h3>Урок ${lesson.id} завършен!</h3>
          <p class="b-story">${lesson.successMsg}</p>
          <div class="step-nav" style="justify-content:center;">
            <button class="step-next" id="bNextLesson">${current<lessons.length-1 ? 'Следващ урок →' : 'Готово 🏆'}</button>
          </div>
        </div>`;
      container.querySelector('#bNextLesson').addEventListener('click', () => {
        if(current < lessons.length-1){ current++; loadLesson();
          container.querySelector('#bPanel').scrollIntoView({behavior:'smooth', block:'center'}); }
      });
    }
  }

  function goNext(){
    stepIdx++;
    if(steps[stepIdx].kind === 'complete' && !state.stars[current]){
      state.stars[current] = true;
      if(current < lessons.length-1) state.unlocked[current+1] = true;
      onSave(state); renderMap();
      fireConfetti();
    }
    renderStep();
  }

  return { mount, defaultUnlocked, defaultStars, stopGame };
})();
