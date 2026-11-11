// Audio engine: every sound is synthesised live, no samples.
export const A={ac:null,master:null,recDest:null,bus:[],rsend:[],onInit:null,onRunning:null};
let ac=null,master,comp,revSend,recDest,noiseBuf;
const VOW={a:[800,1200,2500],e:[450,1900,2550],i:[300,2300,3000],o:[450,800,2500],u:[325,700,2500],m:[250,1000,2200]};
export function initAudio(){
  if(ac){ if(ac.state==='suspended') ac.resume(); return; }
  ac=new (window.AudioContext||window.webkitAudioContext)();
  comp=ac.createDynamicsCompressor(); comp.threshold.value=-16; comp.ratio.value=6; comp.attack.value=.004; comp.release.value=.2;
  master=ac.createGain(); master.gain.value=.75; master.connect(comp); comp.connect(ac.destination);
  try{ recDest=ac.createMediaStreamDestination(); comp.connect(recDest); }catch(e){ recDest=null; }
  noiseBuf=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate);
  const nd=noiseBuf.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
  const len=Math.floor(ac.sampleRate*1.5), ir=ac.createBuffer(2,len,ac.sampleRate);
  for(let c=0;c<2;c++){ const d=ir.getChannelData(c); for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6); }
  const conv=ac.createConvolver(); conv.buffer=ir;
  revSend=ac.createGain(); revSend.gain.value=.5; revSend.connect(conv); conv.connect(master);
  for(let i=0;i<7;i++){
    const b=ac.createGain(); b.connect(master);
    const r=ac.createGain(); r.gain.value=0; b.connect(r); r.connect(revSend);
    A.bus.push(b); A.rsend.push(r);
  }
  A.ac=ac; A.master=master; A.recDest=recDest;
  ac.onstatechange=()=>{ if(ac.state==='running'&&A.onRunning) A.onRunning(); };
  if(A.onInit) A.onInit();
}
// Phones may create the audio engine paused even inside a tap: keep resuming on every real gesture until it runs.
export function unlockAudio(){
  try{ if(navigator.audioSession) navigator.audioSession.type='playback'; }catch(e){}
  initAudio();
  try{ if(ac.state!=='running') ac.resume(); const b=ac.createBuffer(1,1,ac.sampleRate),s=ac.createBufferSource(); s.buffer=b; s.connect(ac.destination); s.start(0); }catch(e){}
}
const UNLOCK_EVS=['pointerdown','pointerup','touchend','click','keydown'];
function gestureUnlock(e){
  if(e.type==='pointerdown'&&e.pointerType==='touch')return;
  unlockAudio();
  if(ac&&ac.state==='running')UNLOCK_EVS.forEach(x=>window.removeEventListener(x,gestureUnlock,true));
}
UNLOCK_EVS.forEach(ev=>window.addEventListener(ev,gestureUnlock,true));
function G(t,peak,a,d){const g=ac.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d);return g;}
function GS(t,peak,a,dur,r){const g=ac.createGain(),h=Math.max(a+.005,dur);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(peak,t+a);g.gain.setValueAtTime(peak,t+h);g.gain.linearRampToValueAtTime(.0001,t+h+r);return g;}
function O(type,f,t,stop){const o=ac.createOscillator();o.type=type;o.frequency.setValueAtTime(f,t);o.start(t);o.stop(stop);return o;}
function N(t,stop){const s=ac.createBufferSource();s.buffer=noiseBuf;s.loop=true;s.start(t,Math.random());s.stop(stop);return s;}
function F(type,f,q){const b=ac.createBiquadFilter();b.type=type;b.frequency.value=f;if(q!=null)b.Q.value=q;return b;}
function K(v){const g=ac.createGain();g.gain.value=v;return g;}
function chain(){for(let i=0;i<arguments.length-1;i++)arguments[i].connect(arguments[i+1]);}
function vib(os,rate,depth,t0,stop){const l=O('sine',rate,t0,stop),g=K(depth);l.connect(g);g.connect(os.frequency);}

const V={
  kick(t,o,v,f0,f1,d){const os=O('sine',f0,t,t+d+.05);os.frequency.exponentialRampToValueAtTime(f1,t+.09);chain(os,G(t,v,.002,d),o);},
  tak(t,o,v,f,d){d=d||.07;chain(N(t,t+d+.02),F('bandpass',f*2.2,1.2),G(t,v,.001,d),o);chain(O('triangle',f,t,t+d+.01),G(t,v*.5,.001,d*.7),o);},
  na(t,o,v,f,d){d=d||.22;chain(O('sine',f,t,t+d+.02),G(t,v,.001,d),o);chain(O('sine',f*2.02,t,t+d),G(t,v*.35,.001,d*.5),o);chain(N(t,t+.04),F('highpass',3000),G(t,v*.4,.001,.02),o);},
  ge(t,o,v,f,up,d){f=f||85;up=up||1.5;d=d||.35;const os=O('sine',f,t,t+d+.05);os.frequency.linearRampToValueAtTime(f*up,t+.11);os.frequency.linearRampToValueAtTime(f*1.1,t+d);chain(os,G(t,v,.004,d),o);chain(O('triangle',f*2,t,t+.12),G(t,v*.3,.002,.09),o);},
  ghat(t,o,v,f){chain(O('triangle',f,t,t+.15),G(t,v,.001,.11),o);chain(N(t,t+.06),F('bandpass',1500,2),G(t,v*.5,.001,.035),o);},
  hiss(t,o,v,d){chain(N(t,t+d+.02),F('highpass',7000),G(t,v,.001,d),o);},
  cooker(t,o,v,d){const g=ac.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+d*.6);g.gain.exponentialRampToValueAtTime(.0001,t+d);const b=F('bandpass',2600,6);b.frequency.setValueAtTime(2600,t);b.frequency.linearRampToValueAtTime(3600,t+d*.7);chain(N(t,t+d+.02),b,g,o);const os=O('sine',2600,t,t+d+.02);os.frequency.linearRampToValueAtTime(3600,t+d*.7);chain(os,K(.12),g);},
  steel(t,o,v,f){[1,2.76,5.4].forEach((m,i)=>chain(O('sine',f*m,t,t+.22),G(t,v/(i+1),.001,.13/(i+1)+.03),o));},
  clap(t,o,v){[0,.012,.026].forEach(dt=>chain(N(t+dt,t+dt+.14),F('bandpass',1400,1.4),G(t+dt,v,.001,dt>.02?.11:.02),o));},
  pluck(t,o,f,d,v,type,br,bend){const os=O(type||'sawtooth',f*(1+(bend||0)),t,t+d+.05);if(bend)os.frequency.exponentialRampToValueAtTime(f,t+.09);const top=Math.min(f*(br||7),12000),lp=F('lowpass',top,2);lp.frequency.setValueAtTime(top,t);lp.frequency.exponentialRampToValueAtTime(Math.max(f*1.2,200),t+d);chain(os,lp,G(t,v,.003,d),o);},
  reed(t,o,f,d,v,from){const os=O('sawtooth',from||f,t,t+d+.12);if(from)os.frequency.exponentialRampToValueAtTime(f,t+.07);vib(os,5.5,f*.012,t+.1,t+d+.12);const g=GS(t,v,.03,d,.06);[[1150,5,1],[2700,6,.6]].forEach(a=>{const b=F('bandpass',a[0],a[1]);chain(os,b,K(a[2]),g);});g.connect(o);},
  brass(t,o,f,d,v){const lp=F('lowpass',400,1);lp.frequency.setValueAtTime(400,t);lp.frequency.linearRampToValueAtTime(3200,t+.04);lp.frequency.linearRampToValueAtTime(1200,t+d+.06);const g=GS(t,v,.02,d,.07);[1,1.006,.5,1.5].forEach((m,i)=>chain(O('sawtooth',f*m,t,t+d+.12),K(i<2?.5:.25),lp));chain(lp,g,o);},
  flute(t,o,f,d,v,from){const os=O('sine',from||f,t,t+d+.15);if(from)os.frequency.exponentialRampToValueAtTime(f,t+.06);vib(os,5,f*.008,t+.08,t+d+.15);const g=GS(t,v,.04,d,.1);os.connect(g);chain(O('triangle',f*2,t,t+d+.15),K(.1),g);chain(N(t,t+d+.1),F('bandpass',f*2,3),K(.1),g);g.connect(o);},
  pad(t,o,fs,d,v){const lp=F('lowpass',1900,.7),g=GS(t,v,.03,d,.09);fs.forEach(f=>{[['sawtooth',1,.6],['square',2,.2]].forEach(a=>{const os=O(a[0],f*a[1],t,t+d+.14);os.detune.value=(Math.random()-.5)*10;chain(os,K(a[2]),lp);});});chain(lp,g,o);},
  putt(t,o,f,d,v){const os=O('sawtooth',f,t,t+d+.06),lp=F('lowpass',620,3),am=K(.55),l=O('square',24,t,t+d+.06);chain(l,K(.45),am.gain);chain(os,lp,am,GS(t,v,.005,d,.04),o);},
  sub(t,o,f,d,v){const os=O('sine',f*1.5,t,t+d+.12);os.frequency.exponentialRampToValueAtTime(f,t+.05);const g=GS(t,v,.005,d,.08);os.connect(g);chain(O('triangle',f*2,t,t+d+.12),K(.4),g);g.connect(o);},
  vox(t,o,f,d,v1,v2,v,to){const os=O('sawtooth',f,t,t+d+.1);if(to)os.frequency.exponentialRampToValueAtTime(to,t+d);vib(os,6,f*.01,t+.08,t+d+.1);const g=GS(t,v||.35,.015,d,.05),A1=VOW[v1],A2=VOW[v2||v1];A1.forEach((ff,i)=>{const b=F('bandpass',ff,i?9:6);b.frequency.setValueAtTime(ff,t);b.frequency.linearRampToValueAtTime(A2[i],t+d*.8);chain(os,b,K([1.6,1.1,.5][i]),g);});g.connect(o);},
  cons(t,o,k,v){const m={t:[3500,.025],k:[1800,.03],d:[900,.04],c:[4500,.07],h:[1500,.08]}[k]||[2500,.03];chain(N(t,t+m[1]+.03),F('bandpass',m[0],1.5),G(t,v||.3,.002,m[1]),o);},
  whistle(t,o,f0,f1,d,v){const os=O('sine',f0,t,t+d+.06);os.frequency.exponentialRampToValueAtTime(f1,t+d*.7);vib(os,7,f0*.01,t,t+d+.06);const g=GS(t,v||.22,.02,d,.04);os.connect(g);chain(N(t,t+d+.05),F('bandpass',f1,8),K(.1),g);g.connect(o);},
  horn(t,o,d,v){const lp=F('lowpass',1800,2),g=GS(t,v||.3,.01,d,.05);[370,466].forEach(f=>{const os=O('sawtooth',f*1.04,t,t+d+.1);os.frequency.linearRampToValueAtTime(f*.94,t+d+.05);os.connect(lp);});chain(lp,g,o);},
  twang(t,o,f,d,v,hi){const os=O('sawtooth',f,t,t+d+.05),b=F('bandpass',500,10);b.frequency.setValueAtTime(500,t);b.frequency.exponentialRampToValueAtTime(hi,t+d*.4);b.frequency.exponentialRampToValueAtTime(700,t+d);chain(os,b,G(t,v*2.5,.003,d),o);},
  urumi(t,o,d,v){const os=O('sine',75,t,t+d+.08);os.frequency.linearRampToValueAtTime(170,t+d*.5);os.frequency.linearRampToValueAtTime(85,t+d);chain(os,GS(t,v,.02,d*.8,.05),o);chain(O('triangle',150,t,t+d+.08),GS(t,v*.25,.02,d*.7,.05),o);chain(N(t,t+d+.02),F('bandpass',400,3),G(t,v*.2,.02,d*.8),o);},
  lead(t,o,f,d,v,from){const os=O('square',from||f,t,t+d+.08);if(from)os.frequency.exponentialRampToValueAtTime(f,t+.05);vib(os,6.5,f*.012,t+.06,t+d+.08);chain(os,F('lowpass',2800,3),GS(t,v,.008,d,.04),o);},
  pour(t,o,d,v){const b=F('bandpass',500,4);b.frequency.setValueAtTime(500,t);b.frequency.exponentialRampToValueAtTime(3200,t+d);chain(N(t,t+d+.06),b,GS(t,v,.05,d,.04),o);},
  bell(t,o,f,v,d){[1,2,3.01,4.2].forEach((m,i)=>chain(O('sine',f*m,t,t+d+.02),G(t,v/(i+1),.002,d/(i+1)),o));}
};

/* ---- pattern helpers ---- */
function mkfq(scale){return (deg,oct)=>{const n=scale.length,o=Math.floor(deg/n),d=((deg%n)+n)%n;return 73.416*Math.pow(2,oct-2+o+scale[d]/12);};}
function drum(pat,map){pat=pat.replace(/\s/g,'');return (s,t,o)=>{const f=map[pat[s%pat.length]];if(f){f(t,o);return 1;}return 0;};}
function mel(L,oct,evs,fn){const m={};evs.forEach((e,i)=>{const p=evs[i-1];m[e[0]]={d:e[1],l:e[2]||1,p:(p&&p[0]+(p[2]||1)===e[0])?p[1]:null};});
  return (s,t,o,pk)=>{const e=m[s%L];if(!e)return 0;fn(t,o,pk.fq(e.d,oct),e.l*pk.sd,e.p==null?0:pk.fq(e.p,oct));return 1;};}
function chords(L,oct,evs,fn){const m={};evs.forEach(e=>m[e[0]]=e);return (s,t,o,pk)=>{const e=m[s%L];if(!e)return 0;fn(t,o,e[1].map(d=>pk.fq(d,oct)),e[2]*pk.sd);return 1;};}
function at(L,map){return (s,t,o,pk)=>{const f=map[s%L];if(f){f(t,o,pk.sd);return 1;}return 0;};}
function syl(L,evs,base){const m={};evs.forEach(e=>m[e[0]]=e);return (s,t,o,pk)=>{const e=m[s%L];if(!e)return 0;if(e[1]!=='.')V.cons(t,o,e[1],.35);const hi=e[1]==='d'?1.5:(e[1]==='k'?1.12:1);V.vox(t+.012,o,base*hi,(e[3]||.72)*pk.sd,e[1]==='.'?'m':e[2],e[2],.42);return 1;};}

export {V,mkfq,drum,mel,chords,at,syl,G,GS,O,N,F,K,chain,vib};
