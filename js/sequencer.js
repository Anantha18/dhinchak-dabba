// 16th-note look-ahead scheduler. Visual hits are queued and fired in step with the audio clock.
import {S,track,toast} from './state.js';
import {A,unlockAudio} from './engine.js';
export const hooks={hit:null,beat:null,state:null,start:null};
let timer=null;
function stepTime(s){const p=S.pack;return S.t0+s*p.sd+((s&1)?p.sw*p.sd:0);}
function tick(){
  if(!S.playing)return;
  const p=S.pack,ac=A.ac;
  while(stepTime(S.stepIdx)<ac.currentTime+.13){
    const t=stepTime(S.stepIdx);
    for(let i=0;i<7;i++){
      if(S.slots[i]<0)continue;
      const hit=p.sounds[S.slots[i]].play(S.stepIdx,t,A.bus[i],p);
      if(hit&&!S.muted[i])S.vq.push({t:t,s:i});
    }
    if(S.stepIdx%(p.bar/4)===0)S.vq.push({t:t,b:1});
    S.stepIdx++;
  }
}
export function syncBuses(){
  const ac=A.ac;if(!ac||!S.pack)return;
  for(let i=0;i<7;i++){
    A.bus[i].gain.setTargetAtTime(S.muted[i]||S.slots[i]<0?0:1,ac.currentTime,.015);
    A.rsend[i].gain.setTargetAtTime(S.slots[i]<0?0:S.pack.sounds[S.slots[i]].rev,ac.currentTime,.015);
  }
}
A.onInit=syncBuses;
A.onRunning=()=>{ if(S.playing){ S.stepIdx=0; S.vq=[]; S.t0=A.ac.currentTime+.06; } };
function frame(){
  if(!S.playing)return;
  const now=A.ac.currentTime;
  while(S.vq.length&&S.vq[0].t<=now+.015){
    const e=S.vq.shift();
    if(e.b){hooks.beat&&hooks.beat();}else hooks.hit&&hooks.hit(e.s);
  }
  requestAnimationFrame(frame);
}
export function play(){
  unlockAudio();
  if(S.playing)return;
  S.playing=true;S.t0=A.ac.currentTime+.08;S.stepIdx=0;S.vq=[];
  timer=setInterval(tick,25);tick();
  hooks.state&&hooks.state();
  requestAnimationFrame(frame);
  track('first_play',{pack:S.pack.key},true);
  setTimeout(()=>{if(S.playing&&A.ac&&A.ac.state!=='running'){A.ac.resume();toast(S.pack.ui.silent);}},700);
  hooks.start&&hooks.start();
}
export function pause(){
  S.playing=false;clearInterval(timer);S.vq=[];
  hooks.state&&hooks.state();
}
