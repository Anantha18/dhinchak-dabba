import {GHEX,INK} from './state.js';
const SKIN=['#c98a5a','#b5733f','#d9a070','#a8643a'];
export function charSVG(sd,i){
  const on=!!sd, skin=on?SKIN[i%4]:'#8a7db5', body=on?GHEX[sd.g]:'#43347a', hair=on?'#1c1226':'#5a4c8c', c2=on?GHEX[(sd.g+2)%4]:'#5a4c8c';
  const head=on?sd.head:'none'; let top='',over='';
  const base=`<path d="M28 36 C25 9 75 9 72 36 C66 23 34 23 28 36Z" fill="${hair}"/>`;
  const bindi=`<circle cx="50" cy="27" r="2.4" fill="#e0122f"/>`;
  if(head==='turban') top=`<path d="M25 32 C22 3 78 3 75 32 C62 21 38 21 25 32Z" fill="${c2}" stroke="${INK}" stroke-width="2.5"/><path d="M30 22 C42 14 58 14 70 22 M35 14 C44 9 56 9 65 14" stroke="${INK}" fill="none" stroke-width="1.5"/><circle cx="50" cy="19" r="3.5" fill="#fff4dc" stroke="${INK}" stroke-width="1.2"/>`;
  else if(head==='bun') top=base+`<circle cx="50" cy="9" r="8" fill="${hair}"/>`+bindi+`<circle cx="28" cy="48" r="3" fill="#ffc21a" stroke="${INK}"/><circle cx="72" cy="48" r="3" fill="#ffc21a" stroke="${INK}"/>`;
  else if(head==='cap') top=base+`<path d="M27 27 C29 9 71 9 73 27Z" fill="#fff4dc" stroke="${INK}" stroke-width="2"/><path d="M25 28h50" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  else if(head==='specs'){top=`<path d="M28 36 C25 9 75 9 72 34 C60 30 46 22 40 18 C36 24 31 28 28 36Z" fill="${hair}"/>`;over=`<circle cx="40" cy="37" r="8.5" fill="rgba(255,255,255,.22)" stroke="${INK}" stroke-width="2.2"/><circle cx="60" cy="37" r="8.5" fill="rgba(255,255,255,.22)" stroke="${INK}" stroke-width="2.2"/><path d="M48.5 37h3" stroke="${INK}" stroke-width="2.2"/>`;}
  else if(head==='vibhuti') top=`<path d="M29 37 q-4 -10 2 -17 M71 37 q4 -10 -2 -17" stroke="#e8e2f5" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M41 21h18M40 24.5h20M41 28h18" stroke="#fff4dc" stroke-width="2" stroke-linecap="round"/><circle cx="50" cy="24.5" r="2.2" fill="#e0122f"/>`;
  else if(head==='malli') top=base+bindi+[[71,21],[75,29],[77,38],[77,47]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.2" fill="#fff" stroke="${INK}" stroke-width=".8"/>`).join('');
  else if(head==='shades'){top=base+[[32,16],[41,11],[50,9],[59,11],[68,16]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${hair}"/>`).join('');over=`<rect x="30" y="31" width="18" height="11" rx="4" fill="#0b0b12"/><rect x="52" y="31" width="18" height="11" rx="4" fill="#0b0b12"/><path d="M48 34h4" stroke="#0b0b12" stroke-width="2.5"/>`;}
  else if(head==='dj') top=base+`<path d="M26 38 C23 4 77 4 74 38" stroke="#ff3d86" stroke-width="4.5" fill="none"/><rect x="21" y="33" width="9" height="15" rx="3" fill="#ff3d86" stroke="${INK}" stroke-width="1.5"/><rect x="70" y="33" width="9" height="15" rx="3" fill="#ff3d86" stroke="${INK}" stroke-width="1.5"/>`;
  else if(head==='band') top=base+`<rect x="28" y="21" width="44" height="6" rx="2" fill="${c2}" stroke="${INK}" stroke-width="1.5"/>`;
  else top=base;
  const eye=x=>on?`<path d="M${x-8} 37 Q${x} 30 ${x+8} 37 Q${x} 44 ${x-8} 37Z" fill="#fff" stroke="${INK}" stroke-width="1.8"/><circle cx="${x}" cy="37" r="3.3" fill="${INK}"/>`
                 :`<path d="M${x-7} 38 Q${x} 43 ${x+7} 38" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const mous=on&&sd.mous?`<path d="M37 49 Q44 44 50 48 Q56 44 63 49 Q56 53 50 50 Q44 53 37 49Z" fill="#1c1226"/>`:'';
  const hem=[24,33,42,50,58,67,76].map(x=>`<circle cx="${x}" cy="124" r="2.3" fill="#fff4dc"/>`).join('');
  return `<svg viewBox="0 0 100 140" aria-hidden="true">
  <path d="M31 80 Q14 92 15 108" stroke="${body}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M69 80 Q86 92 85 108" stroke="${body}" stroke-width="10" fill="none" stroke-linecap="round"/>
  <circle cx="15" cy="110" r="5.5" fill="${skin}" stroke="${INK}" stroke-width="1.5"/><circle cx="85" cy="110" r="5.5" fill="${skin}" stroke="${INK}" stroke-width="1.5"/>
  <path d="M50 62 C29 62 22 82 17 134 L83 134 C78 82 71 62 50 62Z" fill="${body}" stroke="${INK}" stroke-width="3"/>
  <path d="M21 118 H79 M20 129 H80" stroke="${INK}" stroke-width="1.4" opacity=".7"/>${on?hem:''}
  <path d="M50 64 V84" stroke="${INK}" stroke-width="1.5" opacity=".6"/>
  <circle cx="50" cy="100" r="14" fill="#fff4dc" stroke="${INK}" stroke-width="2"/>
  <text x="50" y="106" text-anchor="middle" font-size="${on?16:18}" ${on?'':`fill="${INK}" font-weight="700"`}>${on?sd.emoji:'+'}</text>
  <circle cx="29" cy="40" r="4.5" fill="${skin}" stroke="${INK}" stroke-width="1.5"/><circle cx="71" cy="40" r="4.5" fill="${skin}" stroke="${INK}" stroke-width="1.5"/>
  <ellipse cx="50" cy="38" rx="21" ry="23" fill="${skin}" stroke="${INK}" stroke-width="3"/>
  ${top}${eye(40)}${eye(60)}${over}
  <path d="M50 40 q-3 7 0 8 q3 0 3 -1" stroke="${INK}" stroke-width="1.5" fill="none"/>
  ${mous}
  <path class="mc" d="M43 ${on&&sd.mous?55:53} Q50 ${on?59:55} 57 ${on&&sd.mous?55:53}" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse class="mo" cx="50" cy="55" rx="6" ry="5" fill="#7a0f2a" stroke="${INK}" stroke-width="1.5"/>
  </svg>`;
}
