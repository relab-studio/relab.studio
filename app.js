
// UTIL
const $ = (sel, p=document)=>p.querySelector(sel);
const $$ = (sel, p=document)=>[...p.querySelectorAll(sel)];
const store = (k,v)=>localStorage.setItem(k,JSON.stringify(v));
const load = (k,def=null)=>JSON.parse(localStorage.getItem(k) || JSON.stringify(def));

// YEAR
$("#year").textContent = new Date().getFullYear();

// HERO CAROUSEL
(function(){
  const box = $("#heroCarousel");
  const files = (window.HERO_IMAGES||[]).map(n=>`assets/${n}`);
  if(!files.length){
    box.innerHTML = '<div style="display:grid;place-items:center;color:#8a93a6">Add hero images in /assets</div>';
    return;
  }
  let i=0;
  const img = new Image();
  img.alt = "hero";
  img.src = files[0];
  box.appendChild(img);
  setInterval(()=>{
    i = (i+1) % files.length;
    img.src = files[i];
  }, 3800);
})();

// STUDY ROOM VIDEOS
const freeVideos = [
  {title:"City café ambience • 2h", url:"https://www.youtube.com/watch?v=Z9AYPxH5NTM"},
  {title:"Rainy window Pomodoro • 25/5", url:"https://www.youtube.com/watch?v=vPWA0m7WqXE"},
  {title:"Library ambience • 3h", url:"https://www.youtube.com/watch?v=2OEL4P1Rz04"},
];
const proVideos = [
  {title:"Night drive focus • 2h (PRO)", url:"#"},
  {title:"Minimal office deep work • 3h (PRO)", url:"#"},
  {title:"Coastal morning Pomodoro • 50/10 (PRO)", url:"#"},
];
(function(){
  const f = $("#freeVideos");
  freeVideos.forEach(v=>{
    const li=document.createElement('li');
    li.innerHTML = `<a href="${v.url}" target="_blank" rel="noopener">${v.title}</a>`;
    f.appendChild(li);
  });
  const p = $("#proVideos");
  proVideos.forEach(v=>{
    const li=document.createElement('li');
    li.textContent = v.title;
    p.appendChild(li);
  });
})();

// QUIZ / EXAM
async function loadQuestions(state){
  const map = { GA: 'data/questions-ga.json' };
  const resp = await fetch(map[state]);
  return await resp.json();
}

let currentQuiz = null;
async function startQuiz(){
  const state = $("#stateSel").value;
  const mode = $("#modeSel").value;
  if(mode==='exam50' && !load('isPro', false)){
    $("#qaMount").innerHTML = `<div class="card">🔒 Full 50‑question exams are for Pro members. <a href="#pricing">Upgrade</a>.</div>`;
    return;
  }
  let qs = await loadQuestions(state);
  if(mode==='exam50'){
    // Stretch to 50 by repeating shuffled blocks until length 50 (placeholder).
    const orig = qs.slice();
    while(qs.length<50){ qs = qs.concat(orig); }
    qs = qs.slice(0,50);
  }
  currentQuiz = {i:0, correct:0, qs};
  renderQ();
}
$("#startBtn").addEventListener('click', startQuiz);

function renderQ(){
  const mount = $("#qaMount");
  const {i, qs} = currentQuiz;
  if(i>=qs.length) { 
    const score = currentQuiz.correct + ' / ' + qs.length;
    // progress save
    const hist = load('scores', []);
    hist.push({date: new Date().toISOString(), score});
    store('scores', hist);
    mount.innerHTML = `<div class="card"><h3>Done!</h3><p>Your score: <strong>${score}</strong></p></div>`;
    return; 
  }
  const q = qs[i];
  mount.innerHTML = `
    <div class="question">
      <div><strong>Q${i+1}.</strong> ${q.q}</div>
      <div id="answers"></div>
    </div>
    <div class="row"><small class="muted">Progress: ${i+1}/${qs.length}</small></div>
  `;
  const box = $("#answers");
  q.choices.forEach((c,idx)=>{
    const b = document.createElement('button');
    b.className='answer';
    b.textContent = c;
    b.addEventListener('click',()=>{
      if(idx===q.a){ b.classList.add('correct'); currentQuiz.correct++; }
      else { b.classList.add('wrong'); }
      setTimeout(()=>{ currentQuiz.i++; renderQ(); }, 450);
    });
    box.appendChild(b);
  });
}

// FLASHCARDS (sample)
const cards = [
  {front:"BRRETA", back:"Brokerage Relationships in Real Estate Transactions Act — GA agency law."},
  {front:"Exclusive Buyer Brokerage", back:"Agreement that hires a broker to represent a buyer; must have definite end date in GA."},
  {front:"Special Warranty Deed", back:"Commonly used in GA; warrants title against defects during grantor’s ownership only."},
];
let ci = 0, flipped=false;
function renderCard(){
  const m = $("#flashMount");
  const c = cards[ci];
  m.innerHTML = `<div class="card" style="padding:14px;text-align:center">
    <div style="font-weight:800;font-size:20px">${flipped?c.back:c.front}</div>
  </div>`;
}
$("#prevCard").onclick = ()=>{ ci=(ci+cards.length-1)%cards.length; flipped=false; renderCard(); }
$("#nextCard").onclick = ()=>{ ci=(ci+1)%cards.length; flipped=false; renderCard(); }
$("#flipCard").onclick = ()=>{ flipped=!flipped; renderCard(); }
renderCard();

// TODO Checklist (kept minimal; persists)
const defaultTodos = [
  {t:"25‑minute Pomodoro", done:false},
  {t:"Review 10 flashcards", done:false},
  {t:"Take GA 10‑Q quiz", done:false},
];
const todos = load('todos', defaultTodos);
const list = $("#todoList");
function drawTodos(){
  list.innerHTML = "";
  todos.forEach((it,idx)=>{
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" ${it.done?'checked':''}/> <span>${it.t}</span>`;
    li.querySelector('input').onchange = (e)=>{
      todos[idx].done = e.target.checked; store('todos', todos);
    }
    list.appendChild(li);
  });
}
drawTodos();

// AUTH PLACEHOLDER + STRIPE PAYMENT LINK (replace with real checkout)
$("#signinBtn").onclick = ()=> $("#authModal").classList.remove('hidden');
$("#closeAuth").onclick = ()=> $("#authModal").classList.add('hidden');
$("#enterAuth").onclick = ()=>{
  const key = $("#accessKey").value.trim();
  if(key.length>0){
    store('isPro', true); 
    alert("Pro unlocked for this device (dev mode).");
    $("#authModal").classList.add('hidden');
    $("#proVideos").classList.remove('locked');
  }
}

// BUY BUTTON: temporary Payment Link placeholder
$("#buyBtn").addEventListener('click', ()=>{
  alert("For MVP: connect Stripe Payment Link to this button. On success, redirect back and set isPro=true.");
});
