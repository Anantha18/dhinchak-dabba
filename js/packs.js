// Pack registry. Packs load lazily as ES modules and are normalised to sound objects.
export const PACK_LIST=[
  {k:'h',label:'Hinglish'},
  {k:'t',label:'தமிழ்'}
];
const cache={};
export const hasPack=k=>PACK_LIST.some(p=>p.k===k);
export async function loadPack(k){
  if(cache[k])return cache[k];
  const m=await import(`../packs/${k}.js`),p=m.default;
  p.sounds=p.sounds.map((s,i)=>({id:s[0],name:s[1],emoji:s[2],head:s[3],mous:s[4],rev:s[5],play:s[6],g:Math.floor(i/5),i:i}));
  cache[k]=p;return p;
}
