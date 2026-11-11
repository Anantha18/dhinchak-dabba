// Unlock rules and the daily challenge. All progress lives in this browser's localStorage.
import {S,store} from './state.js';
import {PACK_LIST} from './packs.js';
const guest={}; // content opened from a shared link plays for this visit even if not unlocked
export const combosIn=k=>Object.keys(S.got).filter(x=>x[0]===k).length;
export const packsDone=()=>PACK_LIST.filter(p=>combosIn(p.k)>=4).length;
// 2 combos in a pack open its secret player.
export const bonusOpen=k=>combosIn(k)>=2||!!guest['b'+k];
// Language packs are never locked. Seasonal pack n opens once n packs have all 4 combos.
export function packOpen(k){const pk=PACK_LIST.find(p=>p.k===k);if(!pk)return false;if(!pk.season)return true;return packsDone()>=pk.season||!!guest['p'+k];}
export function guestOpen(k,bonus){guest['p'+k]=1;if(bonus)guest['b'+k]=1;}
export function snapshot(){return {b:PACK_LIST.filter(p=>combosIn(p.k)>=2).map(p=>p.k),p:PACK_LIST.filter(p=>p.season&&packsDone()>=p.season).map(p=>p.k)};}
export function gained(a,b){return {b:b.b.filter(x=>a.b.indexOf(x)<0),p:b.p.filter(x=>a.p.indexOf(x)<0)};}

/* ---- daily challenge: the same three players for everyone on a given India day ---- */
const IST=19800e3,DAY0=Math.floor((Date.UTC(2026,10,12)+IST)/864e5);
export function today(){const d=Math.floor((Date.now()+IST)/864e5);return {d:d,n:Math.max(1,d-DAY0+1)};}
function rng(seed){let a=seed>>>0;return ()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
export function dailySpec(){
  const {d,n}=today(),r=rng(d*7919),langs=PACK_LIST.filter(p=>!p.season),k=langs[Math.floor(r()*langs.length)].k,sh=[0,1,2,3];
  sh.splice(Math.floor(r()*4),1);
  return {d:d,n:n,k:k,idx:sh.map(s=>s*5+Math.floor(r()*5))};
}
export function dailyState(){return store.get('dd-daily',null)||{last:0,streak:0,secs:0};}
export function dailyDone(secs){
  const {d}=today(),st=dailyState();if(st.last===d)return st;
  const ns={last:d,streak:st.last===d-1?st.streak+1:1,secs:secs};store.set('dd-daily',ns);return ns;
}
