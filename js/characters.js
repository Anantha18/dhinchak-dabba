// Character kit: every band member is drawn in code from a one-line descriptor,
//   "skin hat hatColour outfitColour prop flags [propColour]"
// skin 0-5 · flags: m moustache, b beard, g specs, d shades, i bindi, t tilak,
// w woman (lashes, earrings, dupatta), o old (grey hair), k kid, f broad, z bonus sparkle.
import {INK,GHEX} from './state.js';
export const COL={haldi:'#ffc21a',rani:'#ff3d86',mor:'#12c2b0',sindoor:'#ff6a2b',chuna:'#fff4dc',leaf:'#2fa84a',neel:'#4a86ff',jamun:'#9a5cf0',white:'#ffffff',khaki:'#d6ab6c',maroon:'#b3274a',gold:'#f5b301',sky:'#7fd3f7',lime:'#b7e04a',metal:'#dfe7f0',wood:'#b9692a',clay:'#cf6a35'};
const SKIN=['#f3c592','#e3aa74','#d1925d','#bb7a49','#a2643b','#8a5332'];
const HAIR='#2b1b30',GREY='#e4dfee';
const st=(w=3)=>`stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const stick=(x1,y1,x2,y2,c)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${INK}" stroke-width="5.4" stroke-linecap="round"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="2.8" stroke-linecap="round"/>`;
const tube=(d,c,w)=>`<path d="${d}" stroke="${INK}" stroke-width="${w+3}" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;

/* ---- props: where the hands go, what they hold, how they move ---- */
const P={
  dhol:c=>({L:[23,90],R:[77,90],an:'beat',eL:stick(23,90,33,95,'#f6e7c8'),eR:stick(77,90,67,95,'#f6e7c8'),
    svg:`<ellipse cx="50" cy="97" rx="20" ry="11.5" fill="${c||COL.wood}" ${st()}/><path d="M35 88 L65 106 M35 106 L65 88" stroke="${COL.haldi}" stroke-width="1.8"/><ellipse cx="31.5" cy="97" rx="4.5" ry="11.5" fill="${COL.chuna}" ${st(2.4)}/><ellipse cx="68.5" cy="97" rx="4.5" ry="11.5" fill="${COL.chuna}" ${st(2.4)}/>`}),
  tabla:c=>({L:[37,91],R:[63,91],an:'beat',
    svg:`<path d="M29 97 Q28 111 39 111 Q50 111 49 97Z" fill="${c||COL.wood}" ${st(2.6)}/><ellipse cx="39" cy="97" rx="10" ry="4" fill="${COL.chuna}" ${st(2.2)}/><ellipse cx="39" cy="97" rx="3.6" ry="1.5" fill="${INK}"/><path d="M52 98 Q52 111 61 111 Q70 111 70 98Z" fill="#9aa2b8" ${st(2.6)}/><ellipse cx="61" cy="98" rx="9" ry="3.6" fill="${COL.chuna}" ${st(2.2)}/><ellipse cx="61" cy="98" rx="3.2" ry="1.3" fill="${INK}"/>`}),
  parai:c=>({L:[31,98],R:[75,88],an:'beat',eR:stick(75,88,61,93,'#f6e7c8'),
    svg:`<circle cx="50" cy="96" r="16" fill="${c||COL.wood}" ${st(2.6)}/><circle cx="50" cy="96" r="12" fill="${COL.chuna}" stroke="${INK}" stroke-width="1.5"/>`}),
  pot:c=>({L:[32,99],R:[68,99],an:'beat',
    svg:`<path d="M35 94 Q32 113 50 113 Q68 113 65 94 Q60 90 61 86 L39 86 Q40 90 35 94Z" fill="${c||COL.clay}" ${st(2.8)}/><ellipse cx="50" cy="86" rx="11" ry="3" fill="#8f4420" ${st(2.2)}/><path d="M40 98 q2 6 6 8" stroke="#fff4dc" stroke-width="2" opacity=".6" fill="none" stroke-linecap="round"/>`}),
  cooker:()=>({L:[30,101],R:[70,101],an:'puff',
    svg:`<path class="pf" d="M50 80 q-4 -5 0 -9 q4 -5 0 -9" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/><rect x="33" y="93" width="34" height="19" rx="4.5" fill="${COL.metal}" ${st(2.8)}/><rect x="31" y="89" width="38" height="6.5" rx="3" fill="#b9c3d1" ${st(2.4)}/><rect x="47.5" y="83" width="5" height="6.5" rx="1.5" fill="${INK}"/><path d="M67 97 h9" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`}),
  tiffin:()=>({L:[33,100],R:[67,100],an:'beat',
    svg:`<path d="M39 90 Q33 81 50 80 Q67 81 61 90" fill="none" ${st(2.4)}/>`+[88,96,104].map(y=>`<rect x="38" y="${y}" width="24" height="8" rx="3" fill="${COL.metal}" ${st(2.4)}/>`).join('')}),
  clap:()=>({L:[41,92],R:[59,92],an:'clap',svg:`<path class="pf" d="M50 83 v-6 M42 85 l-4 -4.5 M58 85 l4 -4.5" stroke="${COL.haldi}" stroke-width="2.6" stroke-linecap="round"/>`}),
  sticks:()=>({L:[36,94],R:[64,94],an:'clap',eL:stick(36,94,56,75,COL.rani),eR:stick(64,94,44,75,COL.haldi),svg:''}),
  cym:c=>({L:[41,91],R:[59,91],an:'clap',eL:`<ellipse cx="45" cy="91" rx="3" ry="7.5" fill="${c||COL.gold}" ${st(2)}/>`,eR:`<ellipse cx="55" cy="91" rx="3" ry="7.5" fill="${c||COL.gold}" ${st(2)}/>`,svg:''}),
  string:c=>({L:[67,81],R:[45,101],an:'strum',
    svg:tube('M40 103 L80 70',COL.wood,4)+`<path d="M76 70 l5 3 M79 67 l5 3" ${st(2.4)}/><circle cx="39" cy="104" r="10.5" fill="${c||'#e09a45'}" ${st(2.8)}/><circle cx="39" cy="104" r="3" fill="${INK}"/><path d="M41 102 L80 70" stroke="${COL.chuna}" stroke-width="1"/>`}),
  horn:c=>({L:[57,73],R:[68,90],an:'puff',top:1,
    svg:`<g class="pp"><path d="M51 58.5 L55 57 L80 97 L67 104Z" fill="${c||COL.wood}" ${st(2.6)}/><ellipse cx="74" cy="101" rx="9.5" ry="4.5" transform="rotate(-25 74 101)" fill="${COL.gold}" ${st(2.4)}/></g>`}),
  brass:()=>({L:[62,66],R:[73,69],an:'puff',top:1,
    svg:`<g class="pp">`+tube('M53 59 L80 66',COL.gold,4.6)+`<path d="M77 59 L93 52 L93 82 L79 71Z" fill="${COL.gold}" ${st(2.6)}/><path d="M62 58 v-4 M67 59.5 v-4 M72 61 v-4" ${st(2.4)}/></g>`}),
  flute:()=>({L:[60,63],R:[76,61],an:'sway',top:1,
    svg:tube('M40 59 L88 55','#ecc66b',4.2)+`<circle cx="63" cy="57.2" r="1" fill="${INK}"/><circle cx="70" cy="56.6" r="1" fill="${INK}"/><circle cx="82" cy="55.6" r="1" fill="${INK}"/>`}),
  box:c=>({L:[39,91],R:[73,97],an:'beat',
    svg:`<rect x="29" y="89" width="42" height="21" rx="3.5" fill="${c||COL.wood}" ${st(2.8)}/><rect x="32" y="92" width="28" height="7" rx="1.5" fill="#fff" stroke="${INK}" stroke-width="1.5"/><path d="M36 92 v7 M40 92 v7 M44 92 v7 M48 92 v7 M52 92 v7 M56 92 v7 M64 92 v15 M67.5 92 v15" stroke="${INK}" stroke-width="1.2"/>`}),
  keys:()=>({L:[37,95],R:[63,95],an:'beat',
    svg:`<rect x="22" y="93" width="56" height="13.5" rx="4" fill="#3b2a7a" ${st(2.8)}/><rect x="25.5" y="96.5" width="49" height="6.5" rx="1.5" fill="#fff"/><path d="${[31,36.5,42,47.5,53,58.5,64,69.5].map(x=>`M${x} 96.5 v6.5`).join(' ')}" stroke="${INK}" stroke-width="1.1"/>`}),
  wheel:()=>({L:[27,93],R:[73,93],an:'shake',
    svg:tube('M27 93 Q50 83 73 93','#5d5870',4.2)+`<circle cx="50" cy="100" r="8.5" fill="${COL.haldi}" ${st(2.6)}/><circle cx="50" cy="100" r="4" fill="#fff"/>`}),
  speaker:()=>({L:[36,89],R:[64,89],an:'nod',
    svg:`<rect x="32" y="87" width="36" height="27" rx="5" fill="#2f2747" ${st(2.8)}/><circle cx="50" cy="92.5" r="2.6" fill="${COL.haldi}"/><g class="pp"><circle cx="50" cy="104" r="8" fill="#9aa2b8" stroke="${INK}" stroke-width="2"/><circle cx="50" cy="104" r="3" fill="${INK}"/></g>`}),
  mic:()=>({L:[31,97],R:[63,72],an:'sing',top:1,
    svg:`<path d="M63 73 L59 64" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/><circle cx="58" cy="61.5" r="5" fill="#cfd6e2" ${st(2.2)}/>`}),
  cup:c=>({L:[32,97],R:[65,91],an:'sway',
    eR:`<path class="stm" d="M61 77 q-3 -4 0 -7 M68 77 q-3 -4 0 -7" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"/><path d="M73.5 83 q6 1 3 6.5" fill="none" ${st(2.2)}/><path d="M56 80 h17.5 l-2.5 12.5 h-12.5Z" fill="${c||COL.chuna}" ${st(2.4)}/>`,svg:''}),
  pom:()=>({L:[32,97],R:[64,89],an:'puff',
    svg:`<g class="pp"><path d="M63 86 L86 73 L90 88 L66 93Z" fill="${COL.gold}" ${st(2.6)}/><circle cx="59" cy="91" r="6.5" fill="#3a3350" ${st(2.4)}/></g>`}),
  kite:c=>({L:[32,97],R:[68,84],an:'sway',top:1,
    svg:`<path d="M68 84 Q78 72 86 64" stroke="${COL.chuna}" stroke-width="1.2" fill="none"/><path d="M86 42 l9 11.5 l-9 14 l-9 -14Z" fill="${c||COL.rani}" ${st(2.2)}/><path d="M86 42 v25.5 M77 53.5 h18" stroke="${INK}" stroke-width="1.2"/>`}),
  gasp:()=>({L:[26,61],R:[74,61],an:'puff',top:1,ao:1,svg:''}),
  hum:()=>({L:[46.5,91],R:[53.5,91],an:'sway',ce:1,svg:`<path d="M38 74 Q50 88 62 74" fill="none" stroke="${COL.wood}" stroke-width="2.4" stroke-dasharray=".1 4.2" stroke-linecap="round"/>`}),
  whis:()=>({L:[31,97],R:[57,62],an:'sing',top:1,
    svg:`<g class="pf"><circle cx="74" cy="50" r="2.8" fill="${COL.haldi}" stroke="${INK}" stroke-width="1.2"/><path d="M76.6 50 v-9 l5 2" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/></g>`})
};

/* ---- outfit borders, one folk craft per region ---- */
function border(pat,fit){
  const c2=[COL.rani,COL.haldi,COL.mor,COL.sindoor].find(c=>c!==fit),ch=fit===COL.chuna||fit===COL.white?COL.rani:COL.chuna;
  const zig=(y,c,w)=>`<path d="M30 ${y} l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
  if(pat==='phul')return [34,42,50,58,66].map((x,i)=>`<path d="M${x} 99.5 l4 4.7 l-4 4.7 l-4 -4.7Z" fill="${[c2,ch,COL.leaf,ch,c2][i]}" stroke="${INK}" stroke-width=".9"/>`).join('');
  if(pat==='bandh')return [[34,101],[42,107],[50,101],[58,107],[66,101]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.3" fill="none" stroke="${ch}" stroke-width="1.5"/>`).join('')+`<circle cx="50" cy="83" r="3.4" fill="#fff" stroke="${COL.gold}" stroke-width="1.6"/><circle cx="38.5" cy="86" r="2.2" fill="#fff" stroke="${COL.gold}" stroke-width="1.2"/><circle cx="61.5" cy="86" r="2.2" fill="#fff" stroke="${COL.gold}" stroke-width="1.2"/>`;
  if(pat==='ikat')return zig(108.5,ch,2.2)+zig(104.5,c2,2.2);
  if(pat==='kolam')return `<path d="M31 106 q4.75 -8 9.5 0 t9.5 0 t9.5 0 t9.5 0" fill="none" stroke="${ch}" stroke-width="1.8" stroke-linecap="round"/>`+[35.7,45.2,54.7,64.2].map(x=>`<circle cx="${x}" cy="107.5" r="1.3" fill="${ch}"/>`).join('');
  if(pat==='zari')return `<path d="M27.8 104.5 Q50 111 72.2 104.5" fill="none" stroke="${COL.gold}" stroke-width="4.5"/>`+[34,42,50,58,66].map((x,i)=>`<circle cx="${x}" cy="${[98.5,100,100.5,100,98.5][i]}" r="1.4" fill="${ch}"/>`).join('');
  return zig(108.5,ch,2)+[34,42,50,58,66].map(x=>`<circle cx="${x}" cy="98.5" r="1.5" fill="${ch}"/>`).join('');
}

/* ---- hair and headwear ---- */
function hair(hat,hc,hcol,old){
  const hs=`fill="${hcol}" ${st(2.4)}`,cs=`fill="${hc}" ${st(2.6)}`;
  const part=`<path d="M22.5 43 Q21.5 16.5 50 16.5 Q78.5 16.5 77.5 43 Q73 28 50 24.5 Q27 28 22.5 43Z" ${hs}/>`;
  const shortH=`<path d="M22.5 42 Q21 16 50 16 Q79 16 77.5 42 Q74 30 61 27.5 Q47 32 37 27.5 Q26 30 22.5 42Z" ${hs}/>`;
  let back='',front='';
  switch(hat){
    case 'short':front=shortH;break;
    case 'side':front=`<path d="M22.5 43 Q20 15 50 15.5 Q80 15 77.5 43 Q76 32 67 26 Q48 37 22.5 43Z" ${hs}/>`;break;
    case 'curly':front=[[27,26],[35,18.5],[45,14.5],[55,14.5],[65,18.5],[73,26]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="7" ${hs}/>`).join('')+`<path d="M24 38 Q26 20 50 19 Q74 20 76 38 Q64 27 50 28 Q36 27 24 38Z" fill="${hcol}"/>`;break;
    case 'spike':front=shortH+`<path d="M43.5 17 Q46 4.5 51.5 9.5 Q55 4 57 17Z" ${hs}/>`;break;
    case 'bald':front=old?`<path d="M23.5 40 Q21.5 30 27 23 M76.5 40 Q78.5 30 73 23" fill="none" stroke="${GREY}" stroke-width="4.5" stroke-linecap="round"/>`:'';break;
    case 'bun':back=`<circle cx="50" cy="13" r="10" ${hs}/>`;front=part;break;
    case 'gajra':back=`<circle cx="50" cy="13" r="9.5" ${hs}/>`+[0,1,2,3,4,5,6].map(i=>{const a=Math.PI*(1+i/6);return `<circle cx="${(50+Math.cos(a)*10.5).toFixed(1)}" cy="${(13+Math.sin(a)*10.5).toFixed(1)}" r="2.7" fill="#fff" stroke="${INK}" stroke-width=".9"/>`;}).join('');front=part;break;
    case 'lowbun':back=`<circle cx="75" cy="22" r="9" ${hs}/>`;front=part;break;
    case 'braid':back=`<ellipse cx="81" cy="58" rx="5.5" ry="7" ${hs}/><ellipse cx="83" cy="70" rx="5.2" ry="6.5" ${hs}/><ellipse cx="81.5" cy="81" rx="4.6" ry="5.6" ${hs}/><circle cx="79.5" cy="49" r="3" fill="#fff" stroke="${INK}" stroke-width=".9"/><circle cx="84" cy="52" r="2.6" fill="${COL.sindoor}" stroke="${INK}" stroke-width=".9"/>`;front=part;break;
    case 'pagri':case 'safa':
      front=`<path d="M19.5 41 Q14 6 50 5 Q86 6 80.5 41 Q66 28 50 34 Q34 28 19.5 41Z" ${cs}/><path d="M25 31 Q38 15 50 12 Q62 15 75 31 M32.5 20.5 Q42 11 50 9.5 Q58 11 67.5 20.5" fill="none" stroke="${INK}" stroke-width="1.6" opacity=".5" stroke-linecap="round"/><path d="M50 34 L45 25 L55 25Z" fill="rgba(255,255,255,.4)"/>`;
      if(hat==='safa')front=`<path d="M72 13 Q86 -2 93 12 Q89 23 78 21Z" ${cs}/>`+front+`<path d="M50 19 Q46.5 9 50 2 Q53.5 9 50 19Z" fill="${COL.chuna}" ${st(1.5)}/><circle cx="50" cy="22" r="3.6" fill="${COL.gold}" ${st(1.5)}/>`;
      break;
    case 'topi':front=shortH+`<path d="M23 32 Q25 10 50 9.5 Q75 10 77 32 Q50 23.5 23 32Z" ${cs}/><path d="M30 20.5 Q50 13.5 70 20.5" fill="none" stroke="${INK}" stroke-width="1.3" opacity=".4"/>`;break;
    case 'cap':front=shortH+`<path d="M22 33.5 Q22 8.5 50 8.5 Q78 8.5 78 33.5Z" ${cs}/><path d="M21 33.5 Q50 27.5 88 35.5 Q58 41.5 21 36.5Z" ${cs}/><circle cx="50" cy="9.5" r="2.2" fill="${INK}"/>`;break;
    case 'mund':front=`<path d="M19 36 l-5 10 l8 -2Z" ${cs}/><path d="M19.5 40 Q16 8 50 8 Q84 8 80.5 40 Q50 26 19.5 40Z" ${cs}/><path d="M24 29 Q50 15 76 29" fill="none" stroke="${hc===COL.white||hc===COL.chuna?COL.maroon:COL.chuna}" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="21.5" cy="34" rx="6" ry="5" ${cs}/>`;break;
    case 'band':front=shortH+tube('M23 34 Q50 22 77 34',hc,4.6);break;
    case 'dj':front=shortH+tube('M19 47 Q15 5 50 5 Q85 5 81 47',hc,4.8)+`<rect x="13" y="39" width="11" height="17" rx="4.5" ${cs}/><rect x="76" y="39" width="11" height="17" rx="4.5" ${cs}/>`;break;
    case 'pallu':back=`<path d="M15 72 Q7 6 50 5 Q93 6 85 72 Q84 52 80 45 L20 45 Q16 52 15 72Z" ${cs}/>`;
      front=part+`<path d="M20.5 43 Q18 10 50 9.5 Q82 10 79.5 43 Q76 23 50 20 Q24 23 20.5 43Z" ${cs}/>`+[[27,24],[38,15.5],[50,13],[62,15.5],[73,24]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="1.5" fill="${COL.gold}"/>`).join('');break;
    case 'gtopi':front=shortH+`<path d="M25 30 Q26 8 50 8 Q74 8 75 30 Q50 22.5 25 30Z" ${cs}/>`+[[36,19.5],[50,16.5],[64,19.5]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.1" fill="#fff" stroke="${COL.gold}" stroke-width="1.5"/>`).join('');break;
    case 'patka':back=`<circle cx="50" cy="11.5" r="7.5" ${cs}/>`;front=`<path d="M22 39 Q21 15 50 15 Q79 15 78 39 Q50 28 22 39Z" ${cs}/>`;break;
    case 'crown':front=shortH+`<path d="M33 21 L30 4 L41 12.5 L50 1 L59 12.5 L70 4 L67 21 Q50 16 33 21Z" fill="${COL.gold}" ${st(2.4)}/><circle cx="50" cy="13" r="2.4" fill="${COL.rani}"/>`;break;
    default:front=shortH;
  }
  return [back,front];
}

function parse(sd){
  const [sk,hat,hc,fit,prop,fl,pc]=((sd&&sd.ch)||'2 short - - clap').split(' ');
  const f=fl||'',shelf=GHEX[sd&&sd.g!=null?sd.g:0];
  return {skin:SKIN[+sk]||SKIN[2],hat,hc:COL[hc]||shelf,fit:COL[fit]||shelf,prop:P[prop]?prop:'clap',pc:COL[pc],f,has:c=>f.indexOf(c)>=0};
}
function head(o,pr,state,stat){
  const old=o.has('o'),hcol=old?GREY:HAIR,[hb,hf]=hair(o.hat,o.hc,hcol,old),kid=o.has('k'),W=o.has('w');
  const closed=state==='muted'||pr.ce,my=o.has('b')?63:o.has('m')?59.5:57;
  let s=hb+`<circle cx="22.5" cy="47" r="5" fill="${o.skin}" ${st(2.4)}/><circle cx="77.5" cy="47" r="5" fill="${o.skin}" ${st(2.4)}/>`;
  if(W)s+=`<circle cx="22" cy="54" r="2.6" fill="${COL.gold}" stroke="${INK}" stroke-width="1"/><circle cx="78" cy="54" r="2.6" fill="${COL.gold}" stroke="${INK}" stroke-width="1"/>`;
  s+=`<ellipse cx="50" cy="44" rx="28" ry="25.5" fill="${o.skin}" ${st()}/>`;
  s+=`<ellipse cx="31" cy="54.5" rx="5" ry="3" fill="#ff5d7a" opacity=".45"/><ellipse cx="69" cy="54.5" rx="5" ry="3" fill="#ff5d7a" opacity=".45"/>`;
  if(o.has('b'))s+=`<path d="M23.5 50 Q25 73 50 74.5 Q75 73 76.5 50 Q68 61 50 60 Q32 61 23.5 50Z" fill="${hcol}" ${st(2.4)}/>`;
  s+=hf;
  if(o.has('i'))s+=`<circle cx="50" cy="34" r="2.4" fill="#e0122f"/>`;
  if(o.has('t'))s+=`<path d="M42.5 29.5 h15 M41.5 33 h17 M42.5 36.5 h15" stroke="${COL.chuna}" stroke-width="2" stroke-linecap="round"/><circle cx="50" cy="33" r="2" fill="#e0122f"/>`;
  if(o.has('d'))s+=`<rect x="29" y="40" width="19" height="12" rx="5" fill="#15101f" ${st(1.6)}/><rect x="52" y="40" width="19" height="12" rx="5" fill="#15101f" ${st(1.6)}/><path d="M48 44 h4" stroke="${INK}" stroke-width="2.6"/><path d="M33 43.5 l4 -1.5 M56 43.5 l4 -1.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`;
  else{
    if(!o.has('g'))s+=`<path d="M33 37 q6 -3.6 11 -.6 M67 37 q-6 -3.6 -11 -.6" fill="none" stroke="${old?'#8d86a3':HAIR}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(closed)s+=`<path d="M33.5 46.5 q5.5 4.5 11 0 M55.5 46.5 q5.5 4.5 11 0" fill="none" ${st(2.4)}/>`;
    else{const ry=kid?7:6.2,rx=kid?5.6:5;
      s+=`<g class="ey"><ellipse cx="39" cy="46" rx="${rx}" ry="${ry}" fill="${INK}"/><ellipse cx="61" cy="46" rx="${rx}" ry="${ry}" fill="${INK}"/><circle cx="40.8" cy="43.6" r="2" fill="#fff"/><circle cx="62.8" cy="43.6" r="2" fill="#fff"/><circle cx="37.4" cy="48.6" r="1" fill="#fff"/><circle cx="59.4" cy="48.6" r="1" fill="#fff"/></g>`;}
    if(W&&!closed)s+=`<path d="M33.8 42.5 l-3 -2.4 M66.2 42.5 l3 -2.4" ${st(1.8)}/>`;
    if(o.has('g'))s+=`<circle cx="39" cy="46" r="9.4" fill="rgba(255,255,255,.22)" ${st(2.3)}/><circle cx="61" cy="46" r="9.4" fill="rgba(255,255,255,.22)" ${st(2.3)}/><path d="M48.4 46 h3.2" ${st(2.3)}/>`;
  }
  if(o.has('m'))s+=`<path d="M36 55.5 Q30.5 52.5 30 47.5 Q36 52.5 44 51.5 Q50 49.5 56 51.5 Q64 52.5 70 47.5 Q69.5 52.5 64 55.5 Q56 58.5 50 54.5 Q44 58.5 36 55.5Z" fill="${hcol}" ${st(1.4)}/>`;
  const open=`<ellipse class="mo" cx="50" cy="${my+1.5}" rx="4.2" ry="4.8" fill="#8a1232" ${st(2)}/>`,shut=`<path class="mc" d="M45.5 ${my} q4.5 4 9 0" fill="none" ${st(2.2)}/>`;
  s+=stat?(pr.ao?open:shut):shut+open;
  if(state==='muted')s+=`<text x="80" y="20" font-size="13" font-weight="700" fill="${COL.chuna}" font-family="sans-serif">z</text><text x="88" y="11" font-size="9" font-weight="700" fill="${COL.chuna}" font-family="sans-serif">z</text>`;
  return s;
}
function arm(sx,h,side,o,extra){
  const cx=(sx+h[0])/2-side*5,cy=(80+h[1])/2+4,d=`M${sx} 80 Q${cx} ${cy} ${h[0]} ${h[1]}`;
  return `<g class="${side<0?'ar':'al'}">${tube(d,o.fit,6.4)}${extra||''}<circle cx="${h[0]}" cy="${h[1]}" r="4.6" fill="${o.skin}" ${st(2.2)}/></g>`;
}
const BIG='translate(50 69) scale(1.15) translate(-50 -69)';
const BODY='M29.5 84 Q29 69 50 69 Q71 69 70.5 84 L74.5 113 Q50 120 25.5 113Z';
const rnd=(a,b)=>(a+Math.random()*(b-a)).toFixed(2);

// state: 'on' | 'muted' | 'empty'.  opts.pat: outfit craft.  opts.stat: static render (posters).
export function charSVG(sd,state,opts){
  opts=opts||{};
  const ns=opts.stat?' xmlns="http://www.w3.org/2000/svg" width="200" height="260"':'';
  if(!sd||state==='empty')return `<svg class="cs em" viewBox="0 0 100 130" aria-hidden="true"${ns}><path transform="${BIG}" d="${BODY}" fill="rgba(255,244,220,.06)" stroke="#8a7db5" stroke-width="2.2" stroke-dasharray="4.5 4.5"/><ellipse cx="50" cy="44" rx="28" ry="25.5" fill="rgba(255,244,220,.06)" stroke="#8a7db5" stroke-width="2.4" stroke-dasharray="5 5"/><circle cx="50" cy="98" r="9.5" fill="${COL.chuna}"/><path d="M50 93 v10 M45 98 h10" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/></svg>`;
  const o=parse(sd),pr=P[o.prop](o.pc),W=o.has('w'),pat=opts.pat||'madhu';
  let body=`<path d="${BODY}" fill="${o.fit}" ${st()}/>`;
  if(!W&&(pat==='kolam'||pat==='ikat'))body+=`<path d="M27.4 99 L72.6 99 L74.5 113 Q50 120 25.5 113Z" fill="#fff" ${st(2.4)}/><path d="M27 108.5 Q50 115 73 108.5" fill="none" stroke="${pat==='ikat'?COL.maroon:COL.gold}" stroke-width="2.6"/>`;
  else body+=border(pat,o.fit);
  body+=`<path d="M43 70.5 Q50 77.5 57 70.5" fill="none" stroke="${INK}" stroke-width="1.8" opacity=".55" stroke-linecap="round"/>`;
  if(W)body+=`<path d="M33.5 73 Q48 90 68.5 97" fill="none" stroke="${o.hat==='pallu'?o.hc:COL.chuna}" stroke-width="5" opacity=".92" stroke-linecap="round"/>`;
  const arms=arm(32,pr.L,1,o,pr.eL)+arm(68,pr.R,-1,o,pr.eR);
  const bt=BIG+(o.has('f')?' translate(50 0) scale(1.1 1) translate(-50 0)':'');
  const hd=`<g class="hd">${head(o,pr,state,opts.stat)}</g>`;
  const inner=pr.top?`<g transform="${bt}"><g class="bd">${body}</g></g>${hd}<g transform="${BIG}"><g class="bd">${pr.svg}${arms}</g></g>`:`<g transform="${bt}"><g class="bd">${body}${pr.svg}${arms}</g></g>${hd}`;
  const kid=o.has('k')?`<g transform="translate(50 128) scale(.88) translate(-50 -128)">${inner}</g>`:inner;
  const star=(x,y,r)=>`<path d="M${x} ${y-r} l${r*.3} ${r*.7} l${r*.7} ${r*.3} l${-r*.7} ${r*.3} l${-r*.3} ${r*.7} l${-r*.3} ${-r*.7} l${-r*.7} ${-r*.3} l${r*.7} ${-r*.3}Z" fill="${COL.gold}" stroke="${INK}" stroke-width=".8"/>`;
  const spark=o.has('z')?`<g class="sp">${star(9,30,6)}${star(92,60,5)}${star(88,22,4)}${star(12,78,4)}</g>`:'';
  return `<svg class="cs an-${pr.an}${pr.ao?' ao':''}${state==='muted'?' mu':''}" viewBox="0 0 100 130" aria-hidden="true"${ns}${opts.stat?'':` style="--bd:-${rnd(0,5)}s;--bl:${rnd(3.2,6)}s"`}>${kid}${spark}</svg>`;
}
// Head-only portrait for the sound buttons.
export function faceSVG(sd){
  const o=parse(sd),pr=P[o.prop](o.pc);
  return `<svg class="cs fc" viewBox="10 -2 80 80" aria-hidden="true">${head(o,{ce:pr.ce,ao:0},'on',true)}</svg>`;
}
