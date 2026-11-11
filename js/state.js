// Shared state and small helpers used by every module.
export const S={pack:null,slots:[-1,-1,-1,-1,-1,-1,-1],muted:[0,0,0,0,0,0,0],playing:false,stepIdx:0,t0:0,vq:[],comboOn:{},got:{},nameSeed:0};
export const $=id=>document.getElementById(id);
export const INK='#170e33';
export const GHEX=['#ff6a2b','#12c2b0','#ffc21a','#ff3d86','#f5b301'];
export const reduce=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
export const store={
  get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
};
const _sent={};
export function track(name,data,once){try{if(once){if(_sent[name])return;_sent[name]=1;}window.va&&window.va('event',{name:name,data:data||{}});}catch(e){}}
let toastT=0;
export function toast(msg,btn,fn,ms){
  $('toastmsg').textContent=msg;const b=$('toastbtn');
  if(btn){b.hidden=false;b.textContent=btn;b.onclick=()=>{$('toast').classList.remove('show');fn();};}else{b.hidden=true;b.onclick=null;}
  $('toast').classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>$('toast').classList.remove('show'),ms||2600);
}
S.got=store.get('dd-got',{})||{};
(function(){const now=Date.now(),first=+store.get('dd-first',0)||0,last=+store.get('dd-last',0)||0;
  if(!first)store.set('dd-first',now);
  else if(now-last>6*3600e3){const d=Math.floor((now-first)/864e5);track('return_visit',{days:d>=7?'7+':d>=1?'1-6':'0'});}
  store.set('dd-last',now);})();
