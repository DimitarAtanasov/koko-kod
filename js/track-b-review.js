import { lessons } from './track-b-data.js';
import { buildQuiz, startLockout } from './track-b-exercise.js';
import { stopGame } from './track-b-game.js';
import { speakText } from './core.js';

/* ============================= TRACK B: spaced-repetition review mode ============================= */
let container, state, onDone;
let reviewQueue = [], reviewIdx = 0, reviewCorrect = 0;

export function startReview(containerEl, progress, onDoneCb){
    container = containerEl; state = progress; onDone = onDoneCb;
    stopGame();
    const completed = lessons.map((l,i)=>i).filter(i => state.stars[i]);
    if(completed.length === 0){
      alert('Все още няма завършени уроци за преговор. Довърши поне един урок и се върни тук!');
      return;
    }
    reviewQueue = completed.slice().sort(() => Math.random()-0.5).slice(0, Math.min(8, completed.length));
    reviewIdx = 0; reviewCorrect = 0;
    renderReviewQuestion();
  }

  function renderReviewQuestion(){
    const prog = container.querySelector('#bStepProgress');
    prog.innerHTML = `<span class="step-caption">🔄 Преговор: въпрос ${reviewIdx+1} от ${reviewQueue.length}</span>`;
    const left = container.querySelector('#bLeftCol');
    const right = container.querySelector('#bRightCol');
    const panel = container.querySelector('#bPanel');
    right.innerHTML=''; right.style.display='none'; panel.classList.add('single-col');
    const lesson = lessons[reviewQueue[reviewIdx]];
    const q = buildQuiz(lesson, reviewQueue[reviewIdx]);
    left.innerHTML = `<div class="step-kicker">Бърз преговор</div>
      <h3><span class="b-mascot-icon">${lesson.mascot}</span>Урок ${lesson.id}: ${lesson.title}</h3>
      <button class="audio-btn" id="reviewAudioBtn" style="margin-bottom:10px;">🔊 Слушай</button>
      <div class="quiz-question">Кое от следните е вярно?</div>
      <div id="reviewOpts"></div>
      <div class="b-message" id="reviewMsg" role="status"></div>`;
    container.querySelector('#reviewAudioBtn').addEventListener('click', () => speakText(lesson.fact));
    const optsWrap = container.querySelector('#reviewOpts');
    const msgEl = container.querySelector('#reviewMsg');
    q.options.forEach(opt => {
      const btn = document.createElement('button'); btn.className='quiz-opt'; btn.textContent=opt;
      btn.onclick = () => {
        const isRight = opt === q.correct;
        if(isRight){
          btn.classList.add('right'); reviewCorrect++;
          msgEl.textContent = '🎉 Точно!'; msgEl.className='b-message ok';
          optsWrap.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
          setTimeout(() => { reviewIdx++; if(reviewIdx>=reviewQueue.length) renderReviewSummary(); else renderReviewQuestion(); }, 1000);
        } else {
          btn.classList.add('wrong'); btn.disabled = true;
          msgEl.innerHTML = `🤔 <strong>Не точно.</strong> ${lesson.fact}`;
          msgEl.className = 'b-message bad';
          const others = Array.from(optsWrap.querySelectorAll('.quiz-opt')).filter(b=>!b.classList.contains('wrong'));
          startLockout(msgEl, 10, others);
        }
      };
      optsWrap.appendChild(btn);
    });
  }

  function renderReviewSummary(){
    const prog = container.querySelector('#bStepProgress'); prog.innerHTML = '';
    const left = container.querySelector('#bLeftCol');
    const ratio = reviewCorrect / reviewQueue.length;
    const praise = ratio === 1 ? '🌟 Перфектно! Помниш всичко отлично!' : ratio >= 0.6 ? '👏 Много добре, продължавай да учиш!' : '💪 Добро начало — повтарянето прави майстора!';
    left.innerHTML = `<div class="complete-card">
        <div class="big-star">🔄⭐</div>
        <h3>Преговорът приключи!</h3>
        <p class="b-story">Позна ${reviewCorrect} от ${reviewQueue.length} въпроса. ${praise}</p>
        <div class="step-nav" style="justify-content:center;">
          <button class="step-next" id="reviewBackBtn">Обратно към уроците →</button>
        </div>
      </div>`;
    container.querySelector('#reviewBackBtn').addEventListener('click', () => onDone());
  }

