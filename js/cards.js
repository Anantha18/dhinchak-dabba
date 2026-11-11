// Shareable square cards (unlocks, daily result): a picture plus a line of text to copy.
import {$,toast} from './state.js';
import {copyText,saveFile,posterBase,svgImg} from './share.js';
import {charSVG} from './characters.js';
import {patOf} from './packs.js';
let cur=null;
export const siteUrl=()=>/^https?:/.test(location.href)?location.origin+location.pathname:'';
export async function drawChars(c,pack,list,cx,y,w){
  const ims=await Promise.all(list.map(s=>svgImg(charSVG(s,'on',{pat:patOf(pack,s),stat:1})))),x0=cx-list.length*w/2;
  ims.forEach((im,i)=>{if(im)c.drawImage(im,x0+i*w+w*.05,y,w*.9,w*1.17);
    c.font='700 30px "Hind Madurai",sans-serif';c.fillStyle='#fff4dc';c.textAlign='center';c.fillText(list[i].name,x0+i*w+w/2,y+w*1.17+38);});
}
export async function showCard(o){
  cur=o;$('cardttl').textContent=o.title;$('cardtxt').textContent=o.text;
  const cv=$('cardcv'),c=cv.getContext('2d');posterBase(c,1080,1080);
  try{await o.draw(c);}catch(e){}
  $('cardsheet').classList.add('show');$('cardclose').focus();
}
export function initCards(){
  $('cardclose').addEventListener('click',()=>$('cardsheet').classList.remove('show'));
  $('cardsheet').addEventListener('click',e=>{if(e.target===$('cardsheet'))$('cardsheet').classList.remove('show');});
  $('cardcopy').addEventListener('click',()=>{if(cur)copyText(cur.text+(siteUrl()?' '+siteUrl():''),()=>toast('Copied'),()=>toast('Copy blocked here'));});
  $('cardsave').addEventListener('click',()=>{if(cur)$('cardcv').toBlob(b=>{if(b)saveFile(cur.file||'dhinchak-card.png',b);},'image/png');});
}
