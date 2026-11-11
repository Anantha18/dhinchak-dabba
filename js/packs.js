// Pack registry. Packs load lazily as ES modules and are normalised to sound objects.
export const PACK_LIST=[
  {k:'h',label:'Hinglish'},
  {k:'t',label:'தமிழ்',lang:'ta'}
];
const cache={};
export const patOf=(p,s)=>Array.isArray(p.pat)?p.pat[Math.min(s?s.g:0,p.pat.length-1)]:(p.pat||'madhu');
export const hasPack=k=>PACK_LIST.some(p=>p.k===k);
export async function loadPack(k){
  if(cache[k])return cache[k];
  const m=await import(`../packs/${k}.js`),p=m.default;
  const cast=p.cast||{};
  p.sounds=p.sounds.map((s,i)=>{const c=cast[s[0]]||[];return {id:s[0],name:c[0]||s[1],emoji:s[2],ch:c[1]||(/ /.test(s[3]||'')?s[3]:null),rev:s[5],play:s[6],g:Math.floor(i/5),i:i};});
  cache[k]=p;return p;
}
