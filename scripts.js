// dynamique année
document.getElementById('year').textContent = new Date().getFullYear();

// toggle member description
function toggleDesc(el){
  el.classList.toggle('open');
  const desc = el.querySelector('.member-desc');
  if(!desc) return;
  if(el.classList.contains('open')) desc.style.maxHeight = desc.scrollHeight + 'px';
  else desc.style.maxHeight = null;
}

// toggle expertise expanded
function toggleExpertise(el){
  const open = el.classList.contains('open');
  // fermer les autres
  document.querySelectorAll('.expertise-item.open').forEach(x=>{
    if(x!==el){ x.classList.remove('open'); x.querySelector('.expertise-desc').style.maxHeight = null; }
  });
  if(open){ el.classList.remove('open'); el.querySelector('.expertise-desc').style.maxHeight = null; }
  else { el.classList.add('open'); const d = el.querySelector('.expertise-desc'); d.style.maxHeight = d.scrollHeight + 'px'; }
}

// Light mode toggle
const modeBtn = document.getElementById('modeBtn');
function setModeLight(on){
  if(on){
    document.body.classList.add('light');
    modeBtn.textContent='🌙';
    modeBtn.setAttribute('aria-pressed','true');
  } else {
    document.body.classList.remove('light');
    modeBtn.textContent='☀️';
    modeBtn.setAttribute('aria-pressed','false');
  }
}
modeBtn.addEventListener('click', ()=> setModeLight(!document.body.classList.contains('light')));

// Supprimer le listener sur le hero (c'est lui qui activait light mode au clic)

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); ro.unobserve(e.target); }
  });
},{threshold:0.12});
reveals.forEach(r=>ro.observe(r));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(ev){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){ ev.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// close panels on Escape
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    document.querySelectorAll('.member.open, .expertise-item.open').forEach(n=>{
      n.classList.remove('open');
      const d = n.querySelector('.member-desc, .expertise-desc');
      if(d) d.style.maxHeight = null;
    });
  }
});
