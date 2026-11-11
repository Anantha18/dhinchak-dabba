// Stage, sound shelves, combos and pack switching.
import {S,$,GHEX,reduce,store,track,toast} from './state.js';
import {A,V,unlockAudio} from './engine.js';
import {play,pause,syncBuses,hooks} from './sequencer.js';
import {charSVG,faceSVG} from './characters.js';
import {drawArt,drawTrim} from './art.js';
import {scene,SC} from './scenes.js';
import {PACK_LIST,loadPack,hasPack,patOf} from './packs.js';
import {mixCode,parseCode,initShare,isRecording} from './share.js';

let slotEls=[],adds=0,beatFlip=false;
const EMPTY=()=>[-1,-1,-1,-1,-1,-1,-1];

/* ---- stage ---- */
function buildStage(){
  const band=$('band');band.innerHTML='';slotEls=[];
  for(let i=0;i<7;i++){
    const d=document.createElement('div');d.className='slot';d.dataset.s=i;
    d.innerHTML=`<button class="who" id="who${i}"></button><span class="mt"></span><button class="x" id="x${i}" aria-label="Remove">✕</button>`;
    band.appendChild(d);slotEls.push(d);
    d.querySelector('.who').addEventListener('click',()=>{
      if(S.slots[i]<0){unlockAudio();const c=document.querySelector('.chip.nudge')||document.querySelector('.chip:not(.on)');if(c)c.scrollIntoView({block:'center',behavior:'smooth'});return;}
      S.muted[i]=S.muted[i]?0:1;renderSlot(i);syncBuses();checkCombos();
    });
    d.querySelector('.x').addEventListener('click',()=>setSlot(i,-1));
  }
}
function renderSlot(i){
  const p=S.pack,el=slotEls[i],sd=S.slots[i]>=0?p.sounds[S.slots[i]]:null;
  el.classList.toggle('on',!!sd);el.classList.toggle('muted',!!sd&&!!S.muted[i]);
  const w=el.querySelector('.who');
  w.innerHTML=charSVG(sd,sd?(S.muted[i]?'muted':'on'):'empty',{pat:patOf(p,sd)})+`<span class="nm">${sd?sd.name:p.ui.empty}</span>`;
  w.setAttribute('aria-label',sd?(sd.name+(S.muted[i]?', muted. Tap to unmute':'. Tap to mute')):'Empty spot');
  el.querySelector('.mt').textContent=p.ui.muted;
}
export function renderAll(){
  for(let i=0;i<7;i++)renderSlot(i);
  const empty=S.slots.every(x=>x<0);
  document.querySelectorAll('.chip').forEach(c=>{const i=+c.dataset.i;c.classList.toggle('on',S.slots.indexOf(i)>=0);c.classList.toggle('nudge',empty&&i===0);});
  $('hint').textContent=empty?S.pack.ui.start:S.pack.ui.hint;
  syncBuses();
}
function setSlot(i,idx){
  if(idx>=0){const prev=S.slots.indexOf(idx);if(prev>=0&&prev!==i){S.slots[prev]=-1;S.muted[prev]=0;}}
  S.slots[i]=idx;S.muted[i]=0;renderAll();checkCombos();
  if(idx>=0){adds++;if(adds===5)track('engaged_5_sounds',{pack:S.pack.key},true);}
}
function toggleSound(idx){
  const at=S.slots.indexOf(idx);
  if(at>=0){setSlot(at,-1);return;}
  const free=S.slots.indexOf(-1);
  if(free<0){toast(S.pack.ui.full);return;}
  setSlot(free,idx);
  if(!S.playing)play();
}

/* ---- sound shelves ---- */
function buildTray(){
  const p=S.pack,tray=$('tray');tray.innerHTML='';
  p.groups.forEach((g,gi)=>{
    const sec=document.createElement('section');sec.className='grp';sec.style.setProperty('--c',GHEX[gi]);
    sec.innerHTML=`<h2>${g}</h2><div class="chips"></div>`;
    const box=sec.querySelector('.chips');
    p.sounds.forEach(s=>{ if(s.g!==gi)return;
      const b=document.createElement('button');b.className='chip';b.dataset.i=s.i;b.id='chip-'+p.key+'-'+s.id;
      b.innerHTML=faceSVG(s)+`<i class="eb" aria-hidden="true">${s.emoji}</i><span>${s.name}</span>`;box.appendChild(b);});
    tray.appendChild(sec);
  });
}
function initTray(){
  let drag=null,suppress=false;
  // Touch never starts a drag: swipes over the shelves must scroll the page.
  $('tray').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;const c=e.target.closest('.chip');if(!c)return;drag={i:+c.dataset.i,x:e.clientX,y:e.clientY,id:e.pointerId,moved:false,ghost:null};});
  window.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>12){drag.moved=true;const g=document.createElement('div');g.className='ghost';g.textContent=S.pack.sounds[drag.i].emoji;document.body.appendChild(g);drag.ghost=g;}
    if(drag.moved){drag.ghost.style.left=e.clientX+'px';drag.ghost.style.top=e.clientY+'px';
      const t=document.elementFromPoint(e.clientX,e.clientY),s=t&&t.closest('.slot');slotEls.forEach(el=>el.classList.toggle('drop',el===s));}
  });
  function endDrag(e){
    if(!drag||e.pointerId!==drag.id)return;
    if(drag.moved){
      const t=document.elementFromPoint(e.clientX,e.clientY),s=t&&t.closest('.slot');
      drag.ghost.remove();slotEls.forEach(el=>el.classList.remove('drop'));
      if(s){setSlot(+s.dataset.s,drag.i);if(!S.playing)play();}
      suppress=true;setTimeout(()=>{suppress=false;},60);
    }
    drag=null;
  }
  window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',endDrag);
  $('tray').addEventListener('click',e=>{const c=e.target.closest('.chip');if(!c||suppress)return;toggleSound(+c.dataset.i);});
}

/* ---- combos ---- */
function buildTrophies(){
  const p=S.pack,box=$('troph');box.innerHTML='';
  p.combos.forEach(cb=>{
    const d=document.createElement('div');const has=!!S.got[p.key+cb.id];d.className='tro'+(has?' got':'');
    const icons=cb.need.map(id=>p.sounds.find(s=>s.id===id).emoji).join(' ');
    d.innerHTML=`<i aria-hidden="true">${icons}</i><span>${has?cb.name:'= ?'}</span>`;
    d.setAttribute('aria-label',has?cb.name+', unlocked':'Locked combo');box.appendChild(d);
  });
}
function checkCombos(){
  if(!S.playing)return;
  const p=S.pack,live=S.slots.map((s,i)=>s>=0&&!S.muted[i]?p.sounds[s].id:null);
  p.combos.forEach(cb=>{
    const ok=cb.need.every(id=>live.indexOf(id)>=0),k=p.key+cb.id;
    if(ok&&!S.comboOn[k]){S.comboOn[k]=1;fire(cb);}
    if(!ok)S.comboOn[k]=0;
  });
}
function fire(cb){
  const p=S.pack,k=p.key+cb.id;
  track('combo',{id:p.key+'-'+cb.id,first:S.got[k]?'no':'yes'});
  S.got[k]=1;store.set('dd-got',S.got);
  buildTrophies();
  const t=A.ac.currentTime+.05;[587.3,740,880,1174.7].forEach((f,i)=>V.bell(t+i*.09,A.master,f,.22,.9));
  for(let i=0;i<8;i++)V.tak(t+i*.045,A.master,.25+i*.04,700+i*60,.04);
  $('bn1').textContent=cb.title;$('bn2').textContent=cb.sub;
  const b=$('banner');b.classList.remove('show');void b.offsetWidth;b.classList.add('show');
  const run=++SC.run;setTimeout(()=>{if(run===SC.run)b.classList.remove('show');},5200);
  const stg=$('stage');stg.classList.add('cheer');setTimeout(()=>stg.classList.remove('cheer'),2400);
  if(!reduce)scene(cb.fx,run);
}

/* ---- packs ---- */
function buildPackRow(){
  const row=$('packs');row.innerHTML='';
  PACK_LIST.forEach(pk=>{
    const b=document.createElement('button');b.id='pk-'+pk.k;b.textContent=pk.label;b.setAttribute('aria-pressed','false');
    b.addEventListener('click',()=>{if(S.pack.key!==pk.k){setPack(pk.k);track('pack_switch',{to:pk.k});}});
    row.appendChild(b);
  });
}
export async function setPack(k,keep){
  const p=await loadPack(k),was=S.playing;if(S.playing)pause();
  S.pack=p;S.comboOn={};SC.run++;$('banner').classList.remove('show');
  if(!keep){S.slots=EMPTY();S.muted=[0,0,0,0,0,0,0];}
  $('ttl').textContent=p.title;$('tag').textContent=p.tag;
  PACK_LIST.forEach(pk=>$('pk-'+pk.k).setAttribute('aria-pressed',pk.k===k));
  $('play').textContent=p.ui.play;$('shuf').textContent=p.ui.shuf;$('clr').textContent=p.ui.clr;$('shr').textContent=p.ui.shr;$('rec').textContent=p.ui.rec;
  buildTray();buildTrophies();renderAll();drawArt();
  if(was)play();
}
export async function loadMix(m){
  if(!m||!hasPack(m.pack))return;
  const p=await loadPack(m.pack),n=p.sounds.length,seen={};
  S.slots=m.slots.slice(0,7).map(s=>{if(!(s>=0&&s<n)||seen[s])return -1;seen[s]=1;return s;});
  while(S.slots.length<7)S.slots.push(-1);S.muted=[0,0,0,0,0,0,0];
  await setPack(m.pack,true);
}
function shuffle(){
  const p=S.pack,pick=[],idx=p.sounds.map(s=>s.i);
  [0,0,1,2,2,3].forEach(g=>{const c=idx.filter(i=>p.sounds[i].g===g&&pick.indexOf(i)<0);pick.push(c[Math.floor(Math.random()*c.length)]);});
  if(Math.random()<.5){const rest=idx.filter(i=>pick.indexOf(i)<0&&p.sounds[i].g<4);pick.push(rest[Math.floor(Math.random()*rest.length)]);}
  for(let i=pick.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pick[i],pick[j]]=[pick[j],pick[i]];}
  S.slots=EMPTY();pick.forEach((x,i)=>S.slots[i]=x);S.muted=[0,0,0,0,0,0,0];renderAll();
  if(!S.playing)play();else checkCombos();
}

/* ---- boot ---- */
export async function start(){
  hooks.hit=i=>{const el=slotEls[i];el.classList.add('hit');clearTimeout(el._h);el._h=setTimeout(()=>el.classList.remove('hit'),110);};
  hooks.beat=()=>{beatFlip=!beatFlip;$('stage').classList.toggle('beat',beatFlip);};
  hooks.state=()=>{$('play').textContent=S.playing?S.pack.ui.pause:S.pack.ui.play;};
  hooks.start=checkCombos;
  buildStage();drawTrim();buildPackRow();initTray();initShare({loadMix});
  $('play').addEventListener('click',()=>{if(!S.playing&&S.slots.every(x=>x<0)){unlockAudio();toast(S.pack.ui.pick);return;}S.playing?pause():play();});
  $('clr').addEventListener('click',()=>{S.slots=EMPTY();S.muted=[0,0,0,0,0,0,0];renderAll();checkCombos();});
  $('shuf').addEventListener('click',shuffle);
  window.addEventListener('hashchange',()=>{const m=parseCode(location.hash);if(m&&('mix-'+m.pack+'-'+m.slots.map(s=>s<0?'x':s.toString(36)).join(''))!==mixCode())loadMix(m);});
  let rz=0;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{drawTrim();drawArt();},150);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&S.playing&&!isRecording())pause();});
  const fromHash=parseCode(location.hash);
  if(fromHash){await loadMix(fromHash);track('mix_load',{via:'link'});}
  else await setPack('h');
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{drawTrim();drawArt();});
}
