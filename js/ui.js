// Stage, sound shelves, combos, unlocks, daily challenge and pack switching.
import {S,$,GHEX,reduce,store,track,toast} from './state.js';
import {A,V,unlockAudio} from './engine.js';
import {play,pause,syncBuses,hooks} from './sequencer.js';
import {charSVG,faceSVG} from './characters.js';
import {drawArt,drawTrim} from './art.js';
import {scene,SC} from './scenes.js';
import {PACK_LIST,loadPack,hasPack,patOf} from './packs.js';
import {mixCode,parseCode,initShare,isRecording} from './share.js';
import * as PR from './progress.js';
import {showCard,initCards,drawChars} from './cards.js';

let slotEls=[],adds=0,beatFlip=false,daily=null;
const seenTheme={};
const EMPTY=()=>[-1,-1,-1,-1,-1,-1,-1];
// Pack copy with an English fallback, so a pack only writes the lines it wants to localise.
const tx=(k,d)=>(S.pack&&S.pack.ui[k])||d;

/* ---- stage ---- */
function buildStage(){
  const band=$('band');band.innerHTML='';slotEls=[];
  for(let i=0;i<7;i++){
    const d=document.createElement('div');d.className='slot';d.dataset.s=i;
    d.innerHTML=`<button class="who" id="who${i}"></button><span class="mt"></span><button class="x" id="x${i}" aria-label="Remove">✕</button>`;
    band.appendChild(d);slotEls.push(d);
    d.querySelector('.who').addEventListener('click',()=>{
      if(S.slots[i]<0){unlockAudio();const c=document.querySelector('.chip.nudge,.chip.want')||document.querySelector('.chip:not(.on)');if(c)c.scrollIntoView({block:'center',behavior:'smooth'});return;}
      S.muted[i]=S.muted[i]?0:1;renderSlot(i);syncBuses();afterChange();
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
  document.querySelectorAll('.chip').forEach(c=>{const i=+c.dataset.i,on=S.slots.indexOf(i)>=0;
    c.classList.toggle('on',on);c.classList.toggle('nudge',!daily&&empty&&i===0);c.classList.toggle('want',!!daily&&!on&&daily.idx.indexOf(i)>=0);});
  $('hint').textContent=daily?tx('dhint','Daily challenge: get the three glowing players playing together.'):empty?S.pack.ui.start:S.pack.ui.hint;
  syncBuses();
}
function afterChange(){checkCombos();checkDaily();}
function setSlot(i,idx){
  if(idx>=0){const prev=S.slots.indexOf(idx);if(prev>=0&&prev!==i){S.slots[prev]=-1;S.muted[prev]=0;}}
  S.slots[i]=idx;S.muted[i]=0;renderAll();afterChange();
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
function chipEl(p,s){
  const b=document.createElement('button');b.className='chip'+(s.g>3?' bz':'');b.dataset.i=s.i;b.id='chip-'+p.key+'-'+s.id;
  b.innerHTML=faceSVG(s)+`<i class="eb" aria-hidden="true">${s.emoji}</i><span>${s.name}</span>`;return b;
}
function buildTray(){
  const p=S.pack,tray=$('tray');tray.innerHTML='';
  p.groups.forEach((g,gi)=>{
    const list=p.sounds.filter(s=>s.g===gi);if(!list.length)return;
    const sec=document.createElement('section');sec.className='grp'+(gi>3?' secret':'');sec.style.setProperty('--c',GHEX[Math.min(gi,4)]);
    sec.innerHTML=`<h2>${g}</h2><div class="chips"></div>`;
    const box=sec.querySelector('.chips');
    if(gi>3&&!PR.bonusOpen(p.key)){
      const left=2-PR.combosIn(p.key);
      box.innerHTML=`<div class="lock" id="lock-${p.key}">🔒 ${tx('lock','A secret player is hiding here. Find {n} more combo(s) to unlock.').replace('{n}',left)}</div>`;
    }else list.forEach(s=>box.appendChild(chipEl(p,s)));
    tray.appendChild(sec);
  });
}
function initTray(){
  let drag=null,suppress=false;
  // Touch never starts a drag: swipes over the shelves must scroll the page.
  $('tray').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;const c=e.target.closest('.chip');if(!c)return;drag={i:+c.dataset.i,x:e.clientX,y:e.clientY,id:e.pointerId,moved:false,ghost:null};});
  window.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>12){drag.moved=true;const g=document.createElement('div');g.className='ghost';g.innerHTML=faceSVG(S.pack.sounds[drag.i]);document.body.appendChild(g);drag.ghost=g;}
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

/* ---- combos and unlocks ---- */
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
  const p=S.pack,k=p.key+cb.id,before=PR.snapshot();
  track('combo',{id:p.key+'-'+cb.id,first:S.got[k]?'no':'yes'});
  S.got[k]=1;store.set('dd-got',S.got);
  buildTrophies();buildPackRow();
  const t=A.ac.currentTime+.05;[587.3,740,880,1174.7].forEach((f,i)=>V.bell(t+i*.09,A.master,f,.22,.9));
  for(let i=0;i<8;i++)V.tak(t+i*.045,A.master,.25+i*.04,700+i*60,.04);
  $('bn1').textContent=cb.title;$('bn2').textContent=cb.sub;
  const b=$('banner');b.classList.remove('show');void b.offsetWidth;b.classList.add('show');
  const run=++SC.run;setTimeout(()=>{if(run===SC.run)b.classList.remove('show');},5200);
  const stg=$('stage');stg.classList.add('cheer');setTimeout(()=>stg.classList.remove('cheer'),2400);
  if(!reduce)scene(cb.fx,run,cb.icon);
  const g=PR.gained(before,PR.snapshot());
  if(g.b.length||g.p.length)setTimeout(()=>reveal(g),2600);
  else if(!$('lock-'+p.key))return;else buildTrayKeep();
}
function buildTrayKeep(){buildTray();renderAll();}
function reveal(g){
  const p=S.pack,bonus=g.b.indexOf(p.key)>=0?p.sounds.find(s=>s.g>3):null,packs=g.p.map(k=>PACK_LIST.find(x=>x.k===k).label);
  buildTrayKeep();buildPackRow();
  g.b.forEach(k=>track('unlock',{what:'bonus-'+k}));g.p.forEach(k=>track('unlock',{what:'pack-'+k}));
  const lines=[];
  if(bonus)lines.push(`I unlocked ${bonus.name}, the secret player in ${p.title}!`);
  if(packs.length)lines.push(`I unlocked the ${packs.join(' and ')} pack on Dhinchak Dabba!`);
  if(!lines.length)return;
  showCard({title:tx('unl','Unlocked!'),text:lines.join(' '),file:'dhinchak-unlocked.png',draw:async c=>{
    c.fillStyle='#ffc21a';c.font='120px "Yatra One","Hind Madurai",sans-serif';c.fillText('UNLOCKED!',540,270);
    if(bonus)await drawChars(c,p,[bonus],540,330,400);
    c.fillStyle='#12c2b0';c.font='700 40px "Hind Madurai",sans-serif';
    if(packs.length)c.fillText('NEW PACK: '+packs.join(' + ').toUpperCase(),540,bonus?920:560);
    c.fillStyle='#fff4dc';c.font='700 30px "Hind Madurai",sans-serif';c.fillText('DHINCHAK DABBA',540,985);
  }});
}

/* ---- daily challenge ---- */
function renderDaily(){
  const sp=PR.dailySpec(),st=PR.dailyState(),done=st.last===sp.d,b=$('daily');
  b.classList.toggle('done',done);
  b.innerHTML=done?`<b>Daily #${sp.n} done ✅</b><span>${st.secs}s · 🔥 ${st.streak}-day streak · new one tomorrow</span>`
    :`<b>🎯 Daily #${sp.n}</b><span>${daily?'Get the 3 glowing players together':'3 players, 1 mix. Tap to play'}${st.streak&&st.last===sp.d-1?' · 🔥 '+st.streak:''}</span>`;
}
async function startDaily(){
  const sp=PR.dailySpec(),st=PR.dailyState();
  if(st.last===sp.d){dailyCard(sp,st);return;}
  unlockAudio();
  await setPack(sp.k);
  daily={idx:sp.idx,t0:Date.now(),n:sp.n,d:sp.d,k:sp.k};
  renderAll();renderDaily();track('challenge_start',{n:sp.n,pack:sp.k});
  const c=document.querySelector('.chip.want');if(c)c.scrollIntoView({block:'center',behavior:'smooth'});
}
function checkDaily(){
  if(!daily||!S.playing||S.pack.key!==daily.k)return;
  const live=S.slots.filter((s,i)=>s>=0&&!S.muted[i]);
  if(!daily.idx.every(i=>live.indexOf(i)>=0))return;
  const secs=Math.max(1,Math.round((Date.now()-daily.t0)/1000)),sp={n:daily.n,d:daily.d,k:daily.k,idx:daily.idx},st=PR.dailyDone(secs);
  daily=null;renderAll();renderDaily();track('challenge_done',{n:sp.n,secs:secs<10?'<10':secs<30?'10-30':'30+',streak:st.streak});
  setTimeout(()=>dailyCard(sp,st),900);
}
async function dailyCard(sp,st){
  const p=await loadPack(sp.k),list=sp.idx.map(i=>p.sounds[i]);
  showCard({title:`Daily #${sp.n} done!`,text:`Dhinchak Daily #${sp.n}\n🟩🟩🟩 in ${st.secs}s · 🔥 ${st.streak}-day streak\n${list.map(s=>s.emoji).join(' ')}`,file:'dhinchak-daily.png',draw:async c=>{
    c.fillStyle='#12c2b0';c.font='700 40px "Hind Madurai",sans-serif';c.fillText('DHINCHAK DAILY',540,205);
    c.fillStyle='#ffc21a';c.font='150px "Yatra One","Hind Madurai",sans-serif';c.fillText('#'+sp.n,540,350);
    await drawChars(c,p,list,540,400,270);
    c.fillStyle='#fff4dc';c.font='700 62px "Hind Madurai",sans-serif';c.fillText(`${st.secs}s  ·  ${st.streak}-day streak`,540,870);
    c.fillStyle='#ff3d86';c.font='700 32px "Hind Madurai",sans-serif';c.fillText('CAN YOU BEAT IT?  DHINCHAK DABBA',540,960);
  }});
}

/* ---- packs ---- */
function buildPackRow(){
  const row=$('packs');row.innerHTML='';
  PACK_LIST.forEach(pk=>{
    const open=PR.packOpen(pk.k),b=document.createElement('button');b.id='pk-'+pk.k;b.textContent=(open?'':'🔒 ')+pk.label;
    b.setAttribute('aria-pressed',S.pack&&S.pack.key===pk.k?'true':'false');if(!open)b.classList.add('locked');
    b.addEventListener('click',()=>{
      if(!PR.packOpen(pk.k)){toast(tx('plock','Find all 4 combos in {n} pack(s) to unlock this.').replace('{n}',pk.season));return;}
      if(S.pack.key!==pk.k){setPack(pk.k);track('pack_switch',{to:pk.k});}
    });
    row.appendChild(b);
  });
  const t=document.createElement('button');t.id='progbtn';t.className='pg';t.textContent='🏆 '+Object.keys(S.got).length;t.setAttribute('aria-label','Progress');
  t.addEventListener('click',openProgress);row.appendChild(t);
}
function openProgress(){
  $('proglist').innerHTML=PACK_LIST.map(pk=>{
    const n=Math.min(4,PR.combosIn(pk.k)),open=PR.packOpen(pk.k);
    return `<div class="pr${open?'':' off'}"><b>${pk.label}</b><span class="dots">${'●'.repeat(n)}${'○'.repeat(4-n)}</span><span>${!open?'🔒 finish '+pk.season+' pack'+(pk.season>1?'s':''):PR.bonusOpen(pk.k)?'⭐ secret player':'🔒 secret at 2'}</span></div>`;
  }).join('');
  $('progsheet').classList.add('show');$('progclose').focus();
}
export async function setPack(k,keep){
  if(!PR.packOpen(k))return false;
  const p=await loadPack(k),was=S.playing;if(S.playing)pause();
  S.pack=p;S.comboOn={};SC.run++;$('banner').classList.remove('show');daily=null;
  if(!keep){S.slots=EMPTY();S.muted=[0,0,0,0,0,0,0];}
  store.set('dd-pack',k);
  $('ttl').textContent=p.title;$('tag').textContent=p.tag;
  const th=p.theme||{},stg=$('stage').style;['f1','f2','f3','bg1','bg2'].forEach(v=>th[v]?stg.setProperty('--'+v,th[v]):stg.removeProperty('--'+v));
  $('play').textContent=p.ui.play;$('shuf').textContent=p.ui.shuf;$('clr').textContent=p.ui.clr;$('shr').textContent=p.ui.shr;$('rec').textContent=p.ui.rec;
  buildPackRow();buildTray();buildTrophies();renderAll();drawTrim();drawArt();renderDaily();
  const act=$('pk-'+k);if(act&&act.scrollIntoView)act.scrollIntoView({block:'nearest',inline:'center'});
  track('pack_open',{pack:k});if(!seenTheme[k]){seenTheme[k]=1;track('theme_seen',{theme:th.art||'rangoli'});}
  if(was)play();
  return true;
}
export async function loadMix(m){
  if(!m||!hasPack(m.pack))return;
  const p=await loadPack(m.pack),n=p.sounds.length,seen={};
  const slots=m.slots.slice(0,7).map(s=>{if(!(s>=0&&s<n)||seen[s])return -1;seen[s]=1;return s;});
  while(slots.length<7)slots.push(-1);
  // A shared mix always plays, even if it uses a pack or player this visitor has not unlocked.
  PR.guestOpen(m.pack,slots.some(s=>s>=0&&p.sounds[s].g>3));
  S.slots=slots;S.muted=[0,0,0,0,0,0,0];
  await setPack(m.pack,true);
}
function shuffle(){
  const p=S.pack,pick=[],idx=p.sounds.filter(s=>s.g<4).map(s=>s.i);
  [0,0,1,2,2,3].forEach(g=>{const c=idx.filter(i=>p.sounds[i].g===g&&pick.indexOf(i)<0);pick.push(c[Math.floor(Math.random()*c.length)]);});
  if(Math.random()<.5){const rest=idx.filter(i=>pick.indexOf(i)<0);pick.push(rest[Math.floor(Math.random()*rest.length)]);}
  for(let i=pick.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pick[i],pick[j]]=[pick[j],pick[i]];}
  S.slots=EMPTY();pick.forEach((x,i)=>S.slots[i]=x);S.muted=[0,0,0,0,0,0,0];renderAll();
  if(!S.playing)play();else afterChange();
}
function defaultPack(){
  const st=store.get('dd-pack',null);if(st&&hasPack(st)&&PR.packOpen(st))return st;
  const ls=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'']).map(x=>String(x).toLowerCase().slice(0,2));
  for(const l of ls){const pk=PACK_LIST.find(p=>p.lang===l);if(pk)return pk.k;}
  return 'h';
}

/* ---- boot ---- */
export async function start(){
  hooks.hit=i=>{const el=slotEls[i];el.classList.add('hit');clearTimeout(el._h);el._h=setTimeout(()=>el.classList.remove('hit'),110);};
  hooks.beat=()=>{beatFlip=!beatFlip;$('stage').classList.toggle('beat',beatFlip);};
  hooks.state=()=>{$('play').textContent=S.playing?S.pack.ui.pause:S.pack.ui.play;};
  hooks.start=afterChange;
  buildStage();initTray();initShare({loadMix});initCards();
  $('play').addEventListener('click',()=>{if(!S.playing&&S.slots.every(x=>x<0)){unlockAudio();toast(S.pack.ui.pick);return;}S.playing?pause():play();});
  $('clr').addEventListener('click',()=>{S.slots=EMPTY();S.muted=[0,0,0,0,0,0,0];renderAll();afterChange();});
  $('shuf').addEventListener('click',shuffle);
  $('daily').addEventListener('click',startDaily);
  $('progclose').addEventListener('click',()=>$('progsheet').classList.remove('show'));
  $('progsheet').addEventListener('click',e=>{if(e.target===$('progsheet'))$('progsheet').classList.remove('show');});
  window.addEventListener('hashchange',()=>{const m=parseCode(location.hash);if(m&&('mix-'+m.pack+'-'+m.slots.map(s=>s<0?'x':s.toString(36)).join(''))!==mixCode())loadMix(m);});
  let rz=0;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{drawTrim();drawArt();},150);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&S.playing&&!isRecording())pause();});
  const fromHash=parseCode(location.hash);
  if(fromHash){await loadMix(fromHash);track('mix_load',{via:'link'});}
  else await setPack(defaultPack());
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{drawTrim();drawArt();});
}
