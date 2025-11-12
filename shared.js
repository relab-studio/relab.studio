
const $ = (s,p=document)=>p.querySelector(s);
const $$ = (s,p=document)=>[...p.querySelectorAll(s)];
const load = (k,d=null)=>JSON.parse(localStorage.getItem(k)||JSON.stringify(d));
const store = (k,v)=>localStorage.setItem(k,JSON.stringify(v));

const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

// Auth modal
const authModal = document.getElementById('authModal');
document.getElementById('signinBtn')?.addEventListener('click', ()=> authModal.style.display='grid');
document.getElementById('signinFromPricing')?.addEventListener('click', ()=> authModal.style.display='grid');
document.getElementById('closeAuth')?.addEventListener('click', ()=> authModal.style.display='none');
window.addEventListener('message',(e)=>{
  if(e.data?.type==='saveEmail'){ const list = load('emails',[]); list.push({email:e.data.email, ts:Date.now()}); store('emails',list); alert('Saved! We will finish account setup soon.'); authModal.style.display='none'; }
});

// Study videos + modal player (no redirect)
if(window.PAGE==='study'){
  const free = [
    {title:'Deep Focus • Pomodoro 25/5 — City vibes', id:'kw2oTZSv7ag'},
    {title:'Lo‑fi workstation • 3h', id:'74cOUSKXMz0'},
    {title:'Rain window • 2h', id:'qXjxkXMf4Aw'},
  ];
  const pro = [
    {title:'Minimal office • 3h (PRO)', id:'dQw4w9WgXcQ'},
  ];
  const make = (arr, ul, proFlag)=>{
    arr.forEach(v=>{
      const li=document.createElement('li');
      li.innerHTML=`<span>${v.title}</span>`;
      const b=document.createElement('button'); b.className='btn ghost small'; b.textContent='Play';
      b.onclick=()=>openYT(v.id, v.title, proFlag);
      li.appendChild(b); ul.appendChild(li);
    });
  };
  make(free, document.getElementById('freeVideos'), false);
  make(pro, document.getElementById('proVideos'), true);

  const modal=document.getElementById('playerModal'); const frame=document.getElementById('ytFrame');
  document.getElementById('closePlayer').onclick=()=>{ frame.src='about:blank'; modal.classList.remove('open'); };
  function openYT(id, title, proFlag){
    if(proFlag && !load('isPro',false)){ alert('Pro video. Unlock in Pricing.'); return; }
    document.getElementById('playerTitle').textContent=title;
    frame.src=`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`;
    modal.classList.add('open');
  }
}

// Exams: 50-state dropdown + explanations & review
if(window.PAGE==='exams'){
  const stateSel=document.getElementById('stateSel');
  fetch('data/states.json').then(r=>r.json()).then(states=>{
    stateSel.innerHTML = states.map(s=>`<option value="${s}">${s}</option>`).join('');
    stateSel.value='GA';
  });
  document.getElementById('startBtn').onclick = async ()=>{
    const s=stateSel.value; const mode=document.getElementById('modeSel').value;
    let qs=null;
    try{
      const r = await fetch(`data/questions-${s}.json`);
      if(r.ok) qs = await r.json();
    }catch(e){}
    if(!qs){ 
      const r = await fetch('data/questions-GA.json'); qs = await r.json();
      qs = qs.map(q=>({...q, note:`Showing GA sample while ${s} is being authored.`}));
    }
    if(mode==='quiz10' && qs.length>10) qs=qs.slice(0,10);
    if(mode==='exam50'){
      if(!load('isPro',false)){ document.getElementById('qaMount').innerHTML='<div class="card">🔒 Full 50‑question exams are for Pro members.</div>'; return; }
      while(qs.length<50) qs = qs.concat(qs);
      qs = qs.slice(0,50);
    }
    const sess={i:0,correct:0,qs,answers:[]}; renderQ(sess);
  };
  function renderQ(sess){
    const m=document.getElementById('qaMount');
    if(sess.i>=sess.qs.length){
      const total=sess.qs.length, pct=Math.round(100*sess.correct/total);
      const list=sess.answers.map((ans,idx)=>{
        const q=sess.qs[idx]; const your=ans.choiceIndex; const expl=q.expl||'Explanation coming soon.';
        return `<div class="review" style="margin:10px 0"><div><strong>Q${idx+1}.</strong> ${q.q}</div><div class="muted">Your answer: <em>${q.choices[your]||'-'}</em></div><div>Correct: <strong>${q.choices[q.a]}</strong></div><div class="muted">${expl}</div></div>`;
      }).join('');
      m.innerHTML=`<div class="card"><h3>Completed</h3><p>Score: <strong>${sess.correct}/${total} (${pct}%)</strong></p>${list}</div>`;
      const hist=load('scores',[]); hist.push({ts:Date.now(), pct}); store('scores',hist);
      return;
    }
    const q=sess.qs[sess.i];
    m.innerHTML=`<div class="q"><div><strong>Q${sess.i+1}.</strong> ${q.q}</div><div id="opts"></div>${q.note?`<div class="muted">${q.note}</div>`:''}</div>`;
    const box=document.getElementById('opts');
    q.choices.forEach((c,idx)=>{
      const b=document.createElement('button'); b.className='opt'; b.textContent=c;
      b.onclick=()=>{ if(idx===q.a){ b.classList.add('correct'); sess.correct++; } else { b.classList.add('wrong'); } sess.answers.push({choiceIndex:idx}); setTimeout(()=>{ sess.i++; renderQ(sess); }, 420); };
      box.appendChild(b);
    });
  }
}

// Checklist
if(window.PAGE==='checklist'){
  const list=document.getElementById('todoList');
  const defaults=[{t:'25‑minute Pomodoro',done:false},{t:'Review 15 flashcards',done:false},{t:'Free 10‑Q quiz',done:false}];
  const todos=load('todos',defaults);
  function draw(){ list.innerHTML=''; todos.forEach((it,idx)=>{ const li=document.createElement('li'); li.innerHTML=`<span>${it.t}</span>`; const c=document.createElement('input'); c.type='checkbox'; c.checked=it.done; c.onchange=e=>{ todos[idx].done=e.target.checked; store('todos',todos); }; li.appendChild(c); list.appendChild(li); }); }
  draw();
}

// Buy button
document.getElementById('buyBtn')?.addEventListener('click', ()=> alert('Connect Stripe Payment Link here.'));
