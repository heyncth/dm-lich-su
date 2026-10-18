/* ═══════════════════════════════════════════════════════
   QUIZ ROULETTE — Script
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════ CÂU HỎI ═══════════ */

const MAIN_QUESTIONS = [
  {
    id: "m1",
    question: "Người Ấn Độ cổ đại có khả năng sáng tạo đáng kinh ngạc trên những lĩnh vực nào?",
    options: [
      "Chỉ trong quân sự và chính trị",
      "Xây dựng hệ thống chữ viết, kiến trúc chạm khắc tinh xảo, toán học, khoa học và tư tưởng",
      "Chỉ trong nghệ thuật và tôn giáo",
      "Chỉ trong nông nghiệp và thủ công"
    ],
    correctIndex: 1,
    explanation: "Người Ấn Độ cổ đại có khả năng sáng tạo đáng kinh ngạc: hệ thống chữ viết, kiến trúc chạm khắc tinh xảo, toán học, khoa học và tư tưởng."
  },
  {
    id: "m2",
    question: "Điều gì tạo nên nét đặc trưng riêng cho văn minh Ấn Độ, giúp nó có sức sống bền bỉ qua nhiều thế kỉ?",
    options: [
      "Sự kết hợp giữa tín ngưỡng, triết học và nghệ thuật",
      "Quân đội hùng mạnh",
      "Tài nguyên thiên nhiên dồi dào",
      "Vị trí địa lý thuận lợi"
    ],
    correctIndex: 0,
    explanation: "Sự kết hợp giữa tín ngưỡng, triết học và nghệ thuật tạo nên nét đặc trưng riêng, giúp văn minh Ấn Độ có sức sống bền bỉ."
  },
  {
    id: "m3",
    question: "Nhiều thành tựu của Ấn Độ không chỉ được lưu giữ trong lịch sử mà còn tiếp tục hiện diện trong đời sống hiện đại. Điều này cho thấy gì?",
    options: [
      "Chúng không có giá trị thực tế",
      "Chúng chỉ quan trọng trong quá khứ",
      "Giá trị và sức ảnh hưởng vượt thời gian của chúng",
      "Người Ấn Độ bảo thủ, không thay đổi"
    ],
    correctIndex: 2,
    explanation: "Điều này cho thấy giá trị và sức ảnh hưởng vượt thời gian của các thành tựu văn minh Ấn Độ."
  },
  {
    id: "m4",
    question: "Điều gì đã giúp văn minh Ấn Độ duy trì được bản sắc riêng dù trải qua nhiều thời kì lịch sử?",
    options: [
      "Cô lập với thế giới bên ngoài",
      "Truyền thống văn hóa lâu đời, tôn giáo, chữ viết, văn học và khả năng tiếp thu mà vẫn giữ nét đặc trưng",
      "Quân sự mạnh, chinh phục các nước láng giềng",
      "Tài nguyên thiên nhiên phong phú"
    ],
    correctIndex: 1,
    explanation: "Truyền thống văn hóa lâu đời, sự phát triển của tôn giáo, chữ viết và văn học, cùng khả năng tiếp thu văn hóa bên ngoài mà vẫn giữ nét đặc trưng."
  },
  {
    id: "m5",
    question: "Nếu không có số 0 và hệ thống chữ số từ Ấn Độ, việc học tập và tính toán sẽ gặp khó khăn gì?",
    options: [
      "Không gặp khó khăn gì",
      "Khó biểu diễn số lớn, thực hiện phép tính và phát triển khoa học, kĩ thuật",
      "Chỉ khó trong toán học thuần túy",
      "Chỉ khó trong kinh doanh"
    ],
    correctIndex: 1,
    explanation: "Không có số 0 và hệ thống chữ số Ấn Độ, việc biểu diễn số lớn, phép tính và phát triển khoa học, kĩ thuật sẽ khó khăn hơn rất nhiều."
  },
  {
    id: "m6",
    question: "Em học được điều gì từ sự phát triển của nền văn minh Ấn Độ?",
    options: [
      "Chỉ cần học văn hóa Việt Nam",
      "Sự phát triển văn minh không chỉ qua công trình đồ sộ mà còn ở tri thức, tư tưởng truyền lại qua nhiều thế hệ",
      "Không cần học lịch sử",
      "Chỉ cần học khoa học hiện đại"
    ],
    correctIndex: 1,
    explanation: "Sự phát triển văn minh không chỉ qua công trình đồ sộ mà còn ở tri thức và tư tưởng được truyền lại qua nhiều thế hệ. Cần học hỏi lịch sử để hiểu nguồn gốc giá trị ngày nay."
  }
];

const BONUS_QUESTIONS = [
  {
    id: "b1",
    question: "Phật giáo và Hin-đu giáo có ảnh hưởng như thế nào đến đời sống tinh thần?",
    options: [
      "Không ảnh hưởng gì",
      "Sâu rộng đến người dân Ấn Độ và nhiều quốc gia khác",
      "Chỉ ảnh hưởng tại Ấn Độ",
      "Chỉ ảnh hưởng giới thượng lưu"
    ],
    correctIndex: 1,
    explanation: "Phật giáo và Hin-đu giáo có ảnh hưởng sâu rộng đến đời sống tinh thần của người dân Ấn Độ và nhiều quốc gia khác."
  },
  {
    id: "b2",
    question: "Vì sao Phật giáo được truyền bá rộng rãi sang nhiều quốc gia châu Á?",
    options: [
      "Do quân đội Ấn Độ chinh phục",
      "Vì mang thông điệp hòa bình, từ bi, phù hợp nhiều dân tộc",
      "Do vua chúa bắt buộc",
      "Do thương mại"
    ],
    correctIndex: 1,
    explanation: "Phật giáo mang thông điệp hòa bình, từ bi, phù hợp với nhiều dân tộc nên được truyền bá rộng rãi."
  },
  {
    id: "b3",
    question: "Toán học và kiến trúc Ấn Độ cổ đại có ảnh hưởng gì đến thế giới ngày nay?",
    options: [
      "Không ảnh hưởng",
      "Ảnh hưởng đến khoa học, kiến trúc và tư duy nhân loại",
      "Chỉ ảnh hưởng Ấn Độ",
      "Chỉ ảnh hưởng toán học"
    ],
    correctIndex: 1,
    explanation: "Toán học và kiến trúc Ấn Độ cổ đại có ảnh hưởng sâu rộng đến khoa học, kiến trúc và tư duy nhân loại."
  },
  {
    id: "b4",
    question: "Thành tựu văn minh Ấn Độ có giá trị gì đối với nhân loại?",
    options: [
      "Chỉ có trong quá khứ",
      "Giá trị lâu dài, góp phần làm phong phú kho tàng văn hóa nhân loại",
      "Không có giá trị",
      "Chỉ có với người Ấn Độ"
    ],
    correctIndex: 1,
    explanation: "Thành tựu văn minh Ấn Độ có giá trị lâu dài, góp phần làm phong phú kho tàng văn hóa nhân loại."
  }
];

/* ═══════════ PRIZES ═══════════ */

const PRIZES = [
  { id:"risk",      label:"THỬ THÁCH MAY MẮN", short:"THỬ",     prob:45, real:true,  color:"#AB47BC", grad:"#CE93D8" },
  { id:"cash10",    label:"10k",               short:"10K",     prob:0,  real:false, color:"#FF6F00", grad:"#FFB300" },
  { id:"candy",     label:"Kẹo",               short:"KẸO",     prob:10, real:true,  color:"#FF6B9D", grad:"#F48FB1" },
  { id:"praise",    label:"1 tràng pháo tay",  short:"PHÁO",    prob:20, real:true,  color:"#4ECDC4", grad:"#80CBC4" },
  { id:"cash20",    label:"20k",               short:"20K",     prob:0,  real:false, color:"#D84315", grad:"#FF7043" },
  { id:"song",      label:"Chọn bài hát",      short:"BÀI HÁT", prob:15, real:true,  color:"#45B7D1", grad:"#4FC3F7" },
  { id:"cash50",    label:"50k",               short:"50K",     prob:0,  real:false, color:"#F9A825", grad:"#FFD54F" },
  { id:"extraSpin", label:"Quay thêm",          short:"THÊM",    prob:10, real:true,  color:"#FFA726", grad:"#FFB74D" },
];

const SEG_COUNT = PRIZES.length;
const SEG_ANGLE = 360 / SEG_COUNT;

/* ═══════════ WRONG MASCOTS + SOUNDS ═══════════ */

const WRONG_MASCOTS = [
  "assets/img/image22.png",
  "assets/img/image32.png",
  "assets/img/image33.png",
];
const WRONG_SOUNDS = [
  "assets/audio/media3.MP3",
  "assets/audio/media4.MP3",
  "assets/audio/media5.MP3",
];

/* ═══════════ STATE ═══════════ */

let state = {};
let audioOn = true;
let currentAudio = null;

function resetGame() {
  state = {
    questions: MAIN_QUESTIONS.map(q => ({ ...q, status: "unused" })),
    currentQId: null,
    wrongCount: 0,
    bonusQ: null,
    extraSpinUsed: false,
    playedCount: 0,
    usedBonusIds: [],
    isBonus: false,
    answeredCorrect: false,
  };
}

/* ═══════════ AUDIO ═══════════ */

function playSfx(src) {
  if (!audioOn || !src) return;
  if (currentAudio) currentAudio.pause();
  currentAudio = new Audio(src);
  currentAudio.play().catch(() => {});
}

const SFX_CORRECT = "assets/audio/media2.MP3";

let audioCtx = null;
function playTick() {
  if (!audioOn) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = 800 + Math.random() * 150;
    osc.type = 'square';
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch(e) {}
}

// Toggle ALL audio buttons
function toggleAudio() {
  audioOn = !audioOn;
  document.querySelectorAll('.corner-btn').forEach(btn => {
    btn.classList.toggle('muted', !audioOn);
  });
}

document.getElementById('audio-toggle').onclick = toggleAudio;
document.getElementById('audio-toggle-w').onclick = toggleAudio;
document.getElementById('audio-toggle-q').onclick = toggleAudio;
document.getElementById('audio-toggle-p').onclick = toggleAudio;

/* ═══════════ SVG WHEEL ═══════════ */

function buildWheel(container, prizes) {
  const size = 420;
  const cx = size/2, cy = size/2, r = size/2 - 8;
  const n = prizes.length;
  const segDeg = 360 / n;

  // Angle 0° at TOP (12 o'clock), clockwise
  // X = cx + sin(angle) * r, Y = cy - cos(angle) * r
  const toXY = (angleDeg, radius) => {
    const rad = angleDeg * Math.PI / 180;
    return [cx + Math.sin(rad) * radius, cy - Math.cos(rad) * radius];
  };

  let paths = '', labels = '', defs = '';

  for (let i = 0; i < n; i++) {
    const a0 = i * segDeg;
    const a1 = (i + 1) * segDeg;
    const [x0, y0] = toXY(a0, r);
    const [x1, y1] = toXY(a1, r);
    const largeArc = segDeg > 180 ? 1 : 0;
    const p = prizes[i];

    defs += `<linearGradient id="g${i}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.grad}"/><stop offset="100%" stop-color="${p.color}"/>
    </linearGradient>`;

    paths += `<path d="M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1} Z"
              fill="url(#g${i})" stroke="#fff" stroke-width="2.5"/>`;

    // Label at segment center - store angle for dynamic rotation
    const midDeg = i * segDeg + segDeg / 2;
    const [lx, ly] = toXY(midDeg, r * 0.6);
    // No rotation at build time - will be updated during spin
    labels += `<text x="${lx}" y="${ly}" data-mid="${midDeg}"
              text-anchor="middle" dominant-baseline="middle"
              font-family="'Be Vietnam Pro',sans-serif" font-weight="900" font-size="17"
              fill="#fff" stroke="#404049" stroke-width="3" paint-order="stroke"
              style="filter: drop-shadow(0 1px 2px rgba(0,0,0,.5))"
              >${p.short}</text>`;
  }

  container.innerHTML = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>${defs}</defs>
    <g id="wheel-group">${paths}${labels}</g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#404049" stroke-width="8" opacity=".9"/>
    <circle cx="${cx}" cy="${cy}" r="${r+4}" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="2"/>
    ${Array.from({length:n},(_,i)=>{
      const a=i*segDeg*Math.PI/180;
      return `<circle cx="${cx+Math.sin(a)*(r+2)}" cy="${cy-Math.cos(a)*(r+2)}" r="5" fill="#FFF2CF" stroke="#404049" stroke-width="1.5"/>`;
    }).join('')}
  </svg>`;
}

// Update text rotation to keep text upright based on wheel rotation
function updateTextRotation(container, wheelRotation) {
  const texts = container.querySelectorAll('text[data-mid]');
  texts.forEach(text => {
    const mid = parseFloat(text.dataset.mid);
    const x = text.getAttribute('x');
    const y = text.getAttribute('y');
    // Absolute angle from top after wheel rotation
    const absAngle = ((mid + wheelRotation) % 360 + 360) % 360;
    // Counter-rotate to keep upright, flip 180° if in bottom half
    const textRot = (absAngle > 90 && absAngle < 270) ? -(absAngle) + 180 : -(absAngle);
    text.setAttribute('transform', `rotate(${textRot} ${x} ${y})`);
  });
}

/* ═══════════ WHEEL SPIN ═══════════ */

let qWheelRotation = 0;
let prizeWheelRotation = 0;

function easeSpin(t) {
  return 1 - Math.pow(1 - t, 3.5);
}

function segmentCenterAngle(idx, totalSegments) {
  const segDeg = 360 / totalSegments;
  return 360 - (idx * segDeg + segDeg / 2);
}

function findAdjacentDecoy(targetIdx) {
  const before = (targetIdx - 1 + SEG_COUNT) % SEG_COUNT;
  const after  = (targetIdx + 1) % SEG_COUNT;
  if (!PRIZES[before].real) return before;
  if (!PRIZES[after].real) return after;
  return null;
}

let skipSpin = false;

function animateWheel(container, targetRotation, duration, onTick, rotationKey) {
  return new Promise(resolve => {
    const group = container.querySelector('#wheel-group');
    if (!group) { resolve(); return; }
    const rot = rotationKey === 'prize' ? prizeWheelRotation : qWheelRotation;
    const startRot = rot;
    const delta = targetRotation - startRot;
    const startTime = performance.now();
    let lastTickSeg = Math.floor(startRot / SEG_ANGLE);

    container.classList.add('spinning');
    skipSpin = false;

    function frame(now) {
      const elapsed = now - startTime;
      let t = Math.min(elapsed / duration, 1);
      if (skipSpin) t = 1;
      const current = startRot + delta * easeSpin(t);
      if (rotationKey === 'prize') prizeWheelRotation = current;
      else qWheelRotation = current;
      group.setAttribute('transform', `rotate(${current} 210 210)`);
      updateTextRotation(container, current);

      if (t < 0.85) {
        const seg = Math.floor(current / SEG_ANGLE);
        if (seg !== lastTickSeg) { lastTickSeg = seg; if (onTick) onTick(); }
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        container.classList.remove('spinning');
        wobbleWheel(group, current, container).then(resolve);
      }
    }
    requestAnimationFrame(frame);
  });
}

function wobbleWheel(group, baseAngle, container) {
  return new Promise(resolve => {
    const wobbleAmp = 2.5;
    const wobbleDur = 250;
    const startTime = performance.now();

    function frame(now) {
      const t = Math.min((now - startTime) / wobbleDur, 1);
      const decay = Math.cos(t * Math.PI * 3) * (1 - t);
      const offset = decay * wobbleAmp;
      const current = baseAngle + offset;
      group.setAttribute('transform', `rotate(${current} 210 210)`);
      if (container) updateTextRotation(container, current);
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });
}

async function spinPrizeWheel() {
  const container = document.getElementById('prize-wheel-container');

  const realPrizes = PRIZES.filter(p => p.real);
  const rand = Math.random() * 100;
  let cum = 0, result = realPrizes[0];
  for (const p of realPrizes) { cum += p.prob; if (rand < cum) { result = p; break; } }
  const resultIdx = PRIZES.indexOf(result);

  // Always spin forward: add enough full rotations to exceed current
  const resultAngle = segmentCenterAngle(resultIdx, PRIZES.length);
  const spins = 5 + Math.floor(Math.random() * 3);
  const target = prizeWheelRotation + 360 * spins + ((resultAngle - prizeWheelRotation) % 360 + 360) % 360;

  const shouldTease = Math.random() < 0.4;
  const decoyIdx = findAdjacentDecoy(resultIdx);

  if (shouldTease && decoyIdx !== null) {
    const teaseAngle = segmentCenterAngle(decoyIdx, PRIZES.length);
    const teaseTarget = prizeWheelRotation + 360 * spins + ((teaseAngle - prizeWheelRotation) % 360 + 360) % 360;
    // Spin fast to near decoy, then creep to decoy, pause, slip to result
    await animateWheel(container, teaseTarget - 30, 2800, playTick, 'prize');
    await animateWheel(container, teaseTarget, 800, playTick, 'prize');
    await new Promise(r => setTimeout(r, 500));
    await animateWheel(container, target, 700, playTick, 'prize');
  } else {
    await animateWheel(container, target, 3800, playTick, 'prize');
  }

  return result;
}

/* ═══════════ SCREENS ═══════════ */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ═══════════ QUESTION WHEEL ═══════════ */

function getUnused() {
  return state.questions.filter(q => q.status === 'unused');
}

function buildQuestionWheel() {
  const unused = getUnused();
  if (unused.length === 0) { showEnd(); return; }
  const wheelPrizes = unused.map((q, i) => ({
    id: q.id,
    short: 'Câu ' + (MAIN_QUESTIONS.findIndex(x => x.id === q.id) + 1),
    color: ['#FEA9B6','#4ECDC4','#45B7D1','#FFA726','#AB47BC','#FF6B9D','#66BB6A','#8D6E63'][i % 8],
    grad: ['#F8BBD0','#B2DFDB','#81D4FA','#FFE0B2','#E1BEE7','#F8BBD0','#A5D6A7','#BCAAA4'][i % 8],
  }));
  const container = document.getElementById('q-wheel-container');
  buildWheel(container, wheelPrizes);
  updateTextRotation(container, 0);
}

function startQuestionWheel() {
  if (getUnused().length === 0) { showEnd(); return; }
  buildQuestionWheel();
  document.getElementById('spin-result').textContent = '';
  document.getElementById('btn-spin-q').style.display = '';
  document.getElementById('btn-spin-q').disabled = false;
  document.getElementById('btn-open-q').hidden = true;
  showScreen('screen-wheel');
}

document.getElementById('btn-spin-q').onclick = async function() {
  const unused = getUnused();
  if (unused.length === 0) { showEnd(); return; }

  const btn = document.getElementById('btn-spin-q');

  // If already spinning, skip
  if (btn.textContent === 'SKIP') {
    skipSpin = true;
    return;
  }

  btn.textContent = 'SKIP';

  const randIdx = Math.floor(Math.random() * unused.length);
  const targetQ = unused[randIdx];

  buildQuestionWheel();
  qWheelRotation = 0;
  const spins = 5 + Math.floor(Math.random() * 2);
  const targetAngle = 360 * spins + segmentCenterAngle(randIdx, unused.length);
  await animateWheel(document.getElementById('q-wheel-container'), targetAngle, 3800, playTick, 'q');

  const qNum = MAIN_QUESTIONS.findIndex(x => x.id === targetQ.id) + 1;
  document.getElementById('spin-result').textContent = 'Đã chọn Câu ' + qNum + '!';
  state.currentQId = targetQ.id;
  btn.textContent = 'QUAY';
  btn.style.display = 'none';
  document.getElementById('btn-open-q').hidden = false;
};

document.getElementById('btn-open-q').onclick = () => startQuiz(false);
document.getElementById('home-btn').onclick = () => startQuestionWheel();

/* ═══════════ QUIZ ═══════════ */

const THEME_ACCENTS = ['#FEA9B6','#9CCCEF','#00B050','#B67E00','#7E57C2','#EC407A'];

function startQuiz(isBonus) {
  const q = isBonus ? state.bonusQ : state.questions.find(x => x.id === state.currentQId);
  if (!q) return;

  state.isBonus = isBonus;
  state.answeredCorrect = false;
  state.wrongCount = 0;

  const screen = document.getElementById('screen-quiz');
  const themeIdx = state.playedCount % THEME_ACCENTS.length;
  screen.className = 'screen active theme-' + themeIdx;

  const chip = document.getElementById('quiz-chip');
  const prog = document.getElementById('quiz-progress');
  const qEl = document.getElementById('quiz-question');
  const optsEl = document.getElementById('quiz-options');
  const expEl = document.getElementById('quiz-explain');
  const nextBtn = document.getElementById('btn-next');

  if (isBonus) {
    chip.textContent = 'THỬ THÁCH MAY MẮN';
    chip.style.background = '#CE93D8';
    prog.textContent = '';
  } else {
    const qNum = MAIN_QUESTIONS.findIndex(x => x.id === state.currentQId) + 1;
    const answered = state.playedCount + 1;
    chip.textContent = 'CÂU ' + qNum + ' (' + answered + '/' + MAIN_QUESTIONS.length + ')';
    chip.style.background = THEME_ACCENTS[themeIdx];
    prog.textContent = '';
  }

  qEl.textContent = q.question;
  expEl.textContent = '';
  optsEl.innerHTML = '';
  nextBtn.hidden = true;

  // Clean up mascots from previous question
  document.querySelectorAll('.mascot-overlap').forEach(el => el.remove());

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-option';
    btn.dataset.index = i;
    btn.innerHTML = '<span class="key">' + 'ABCD'[i] + '</span>' + opt;
    btn.onclick = () => handleAnswer(i, btn);
    optsEl.appendChild(btn);
  });

  showScreen('screen-quiz');
}

function handleAnswer(idx, btnEl) {
  if (state.answeredCorrect) return;
  if (btnEl.classList.contains('wrong') || btnEl.classList.contains('correct')) return;

  const q = state.isBonus ? state.bonusQ : state.questions.find(x => x.id === state.currentQId);
  if (!q) return;

  const correct = idx === q.correctIndex;

  if (correct) {
    state.answeredCorrect = true;
    document.querySelectorAll('#quiz-options .btn-option').forEach(b => {
      b.disabled = true;
      if (b.dataset.index == idx) b.classList.add('correct');
      else b.classList.add('dimmed');
    });
    document.getElementById('quiz-explain').textContent = 'Đúng rồi! ' + (q.explanation || '');
    playSfx(SFX_CORRECT);

    showOverlapMascot(btnEl, 'assets/img/image27.png', false);

    const nextBtn = document.getElementById('btn-next');
    nextBtn.hidden = false;
    nextBtn.onclick = () => {
      if (state.isBonus) completeQuestion();
      else startPrizeWheel();
    };
  } else {
    state.wrongCount++;
    btnEl.classList.add('wrong');
    btnEl.disabled = true;
    playSfx(WRONG_SOUNDS[(state.wrongCount - 1) % WRONG_SOUNDS.length]);

    const mascotSrc = WRONG_MASCOTS[(state.wrongCount - 1) % WRONG_MASCOTS.length];
    showOverlapMascot(btnEl, mascotSrc, false);

    document.getElementById('quiz-explain').textContent = 'Sai rồi, thử đáp án khác nhé!';

    const wrongBtns = document.querySelectorAll('#quiz-options .btn-option.wrong');
    const totalBtns = document.querySelectorAll('#quiz-options .btn-option');
    if (wrongBtns.length >= totalBtns.length - 1) {
      setTimeout(() => {
        document.querySelectorAll('#quiz-options .btn-option').forEach(b => {
          if (!b.classList.contains('wrong')) {
            b.classList.add('correct');
            b.disabled = true;
          }
        });
        document.getElementById('quiz-explain').textContent = 'Đáp án đúng: ' + q.options[q.correctIndex];
        const nextBtn = document.getElementById('btn-next');
        nextBtn.hidden = false;
        nextBtn.onclick = () => {
          if (state.isBonus) completeQuestion();
          else startPrizeWheel();
        };
      }, 1200);
    }
  }
}

function showOverlapMascot(btnEl, src, removeExisting) {
  if (removeExisting) {
    document.querySelectorAll('.mascot-overlap').forEach(el => el.remove());
  }

  const quizScreen = document.getElementById('screen-quiz');
  const btnRect = btnEl.getBoundingClientRect();
  const stageRect = document.getElementById('stage').getBoundingClientRect();
  const scale = stageRect.width / 1280;

  const col = parseInt(btnEl.dataset.index) % 2;
  const x = col === 1
    ? (btnRect.right - stageRect.left) / scale - 60
    : (btnRect.left - stageRect.left) / scale - 30;
  const y = (btnRect.top - stageRect.top) / scale - 40;

  const img = document.createElement('img');
  img.className = 'mascot-overlap';
  img.src = src;
  img.style.left = x + 'px';
  img.style.top = y + 'px';
  quizScreen.appendChild(img);
}

/* ═══════════ PRIZE WHEEL ═══════════ */

function startPrizeWheel() {
  const container = document.getElementById('prize-wheel-container');
  buildWheel(container, PRIZES);
  updateTextRotation(container, 0);
  prizeWheelRotation = 0;
  document.getElementById('prize-overlay').classList.remove('show');
  document.getElementById('btn-spin-prize').style.display = '';
  document.getElementById('btn-spin-prize').disabled = false;
  showScreen('screen-prize');
}

document.getElementById('btn-spin-prize').onclick = async function() {
  const btn = document.getElementById('btn-spin-prize');

  // If already spinning, skip
  if (btn.textContent === 'SKIP') {
    skipSpin = true;
    return;
  }

  btn.textContent = 'SKIP';

  const result = await spinPrizeWheel();

  const overlay = document.getElementById('prize-overlay');
  const nameEl = document.getElementById('prize-result-text');
  const nextBtn = document.getElementById('btn-prize-next');

  nameEl.textContent = result.label;
  overlay.classList.add('show');
  btn.textContent = 'QUAY PHẦN THƯỞNG';

  if (result.id === 'risk') {
    nextBtn.textContent = 'TIẾP TỤC';
    nextBtn.onclick = () => { overlay.classList.remove('show'); startBonus(); };
  } else if (result.id === 'extraSpin') {
    if (!state.extraSpinUsed) {
      state.extraSpinUsed = true;
      nextBtn.textContent = 'QUAY THÊM';
      nextBtn.onclick = () => {
        overlay.classList.remove('show');
        btn.disabled = false;
      };
    } else {
      nextBtn.textContent = 'TIẾP TỤC';
      nextBtn.onclick = () => { overlay.classList.remove('show'); completeQuestion(); };
    }
  } else {
    nextBtn.textContent = 'TIẾP TỤC';
    nextBtn.onclick = () => { overlay.classList.remove('show'); completeQuestion(); };
  }
};

/* ═══════════ BONUS ═══════════ */

function startBonus() {
  let pool = BONUS_QUESTIONS.filter(q => !state.usedBonusIds.includes(q.id));
  if (pool.length === 0) { state.usedBonusIds = []; pool = BONUS_QUESTIONS; }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  state.usedBonusIds.push(pick.id);
  state.bonusQ = pick;
  startQuiz(true);
}

/* ═══════════ COMPLETE / END ═══════════ */

function completeQuestion() {
  const q = state.questions.find(x => x.id === state.currentQId);
  if (q) q.status = 'completed';
  state.playedCount++;
  state.extraSpinUsed = false;
  if (getUnused().length === 0) showEnd();
  else startQuestionWheel();
}

function showEnd() {
  document.getElementById('end-summary').textContent =
    'Đã chơi ' + state.playedCount + '/' + MAIN_QUESTIONS.length + ' câu hỏi.';
  showScreen('screen-end');
}

/* ═══════════ INIT ═══════════ */

document.getElementById('btn-start').onclick = () => { resetGame(); startQuestionWheel(); };
document.getElementById('btn-replay').onclick = () => { resetGame(); showScreen('screen-start'); };

resetGame();

function fitStage() {
  const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
  document.getElementById('stage').style.transform = 'scale(' + s + ')';
}
window.addEventListener('resize', fitStage);
fitStage();
