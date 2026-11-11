// Mix codes, band names, poster, caption and recording.
import {S,$,INK,GHEX,track,toast} from './state.js';
import {A,initAudio} from './engine.js';
import {play} from './sequencer.js';
import {hasPack,patOf} from './packs.js';
import {charSVG} from './characters.js';
export function mixCode(){return 'mix-'+S.pack.key+'-'+S.slots.map(s=>s<0?'x':s.toString(36)).join('');}
export function parseCode(str){
  const m=/mix-([a-z])-([0-9a-z]{7})/i.exec(str||'');if(!m||!hasPack(m[1].toLowerCase()))return null;
  return {pack:m[1].toLowerCase(),slots:m[2].toLowerCase().split('').map(ch=>ch==='x'?-1:parseInt(ch,36))};
}
export function bandName(){
  const p=S.pack;let h=S.nameSeed*131+7;S.slots.forEach((s,i)=>{h=(h*31+(s+2)*(i+3))>>>0;});
  return p.bandA[h%p.bandA.length]+' '+p.bandB[Math.floor(h/97)%p.bandB.length];
}
export function wrapText(c,text,x,y,maxW,lh){const words=text.split(' ');let line='',yy=y;words.forEach(w=>{const t=line?line+' '+w:w;if(c.measureText(t).width>maxW&&line){c.fillText(line,x,yy);line=w;yy+=lh;}else line=t;});c.fillText(line,x,yy);return yy+lh;}
export function svgImg(svg){return new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});}
export function posterBase(c,W,H){
  const g=c.createRadialGradient(W/2,H*.45,60,W/2,H*.45,H*.75);g.addColorStop(0,'#3b2380');g.addColorStop(.6,'#24145a');g.addColorStop(1,INK);
  c.fillStyle=g;c.fillRect(0,0,W,H);
  c.save();c.globalAlpha=.16;for(let r=0;r<3;r++){const n=16+r*8,R=250+r*130;for(let k=0;k<n;k++){const a=k/n*Math.PI*2+r*.2;c.beginPath();c.ellipse(W/2+Math.cos(a)*R,H*.46+Math.sin(a)*R,46,18,a,0,7);c.fillStyle=['#ff3d86','#ffc21a','#12c2b0'][(k+r)%3];c.fill();}}c.restore();
  ['#12c2b0','#ff3d86','#ffc21a'].forEach((col,i)=>{c.strokeStyle=col;c.lineWidth=16;c.strokeRect(24+i*18,24+i*18,W-48-i*36,H-48-i*36);});
  for(let x=110,k=0;x<W-90;x+=44,k++){c.beginPath();c.moveTo(x,96);c.lineTo(x+22,132);c.lineTo(x+44,96);c.closePath();c.fillStyle=k%2?'#ff8a1f':'#2fa84a';c.fill();}
  c.textAlign='center';
}
let posterRun=0;
async function drawPoster(){
  const p=S.pack,cv=$('poster'),c=cv.getContext('2d'),W=1080,H=1350,run=++posterRun;
  const act=S.slots.map(s=>s>=0?p.sounds[s]:null).filter(Boolean);
  const ims=await Promise.all(act.map(s=>svgImg(charSVG(s,'on',{pat:patOf(p,s),stat:1}))));
  if(run!==posterRun)return;
  posterBase(c,W,H);
  c.fillStyle='#12c2b0';c.font='700 34px "Hind Madurai",sans-serif';c.fillText(p.title.toUpperCase()+'  PRESENTS',W/2,215);
  c.font='88px "Yatra One","Hind Madurai",sans-serif';
  c.fillStyle='#ff3d86';let y=wrapText(c,bandName(),W/2+5,335,860,100);
  c.fillStyle='#ffc21a';wrapText(c,bandName(),W/2,330,860,100);
  const rows=act.length>4?[act.slice(0,4),act.slice(4)]:[act],cw=act.length>4?205:Math.min(250,860/Math.max(1,act.length)),ch=cw*1.3;
  let top=Math.max(y+10,rows.length>1?560:640),n=0;
  rows.forEach(row=>{const x0=W/2-row.length*cw/2;
    row.forEach((s,i)=>{const im=ims[n++],x=x0+i*cw;
      if(im)c.drawImage(im,x+cw*.06,top,cw*.88,ch*.88);
      c.font='700 25px "Hind Madurai",sans-serif';c.fillStyle='#fff4dc';wrapText(c,s.name,x+cw/2,top+ch*.88+30,cw-10,28);});
    top+=ch+62;});
  c.fillStyle='#fff4dc';c.fillRect(110,H-212,860,84);
  c.fillStyle=INK;c.font='700 40px ui-monospace,Menlo,monospace';c.fillText(mixCode(),W/2,H-156);
  c.fillStyle='#12c2b0';c.font='700 28px "Hind Madurai",sans-serif';c.fillText(p.ui.foot,W/2,H-92);
}
function captionText(){
  let s=S.pack.ui.cap(bandName(),mixCode());
  if(/^https?:/.test(location.href))s+=' '+location.href.split('#')[0]+'#'+mixCode();
  return s;
}
function openShare(){
  track('share_open',{pack:S.pack.key});
  try{location.hash=mixCode();}catch(e){}
  $('bandname').textContent=bandName();$('mixcode').textContent=mixCode();
  $('sharehelp').textContent='Copy the caption. It carries a link that opens this exact mix.';
  drawPoster();$('sheet').classList.add('show');$('closesheet').focus();
}
export function saveFile(filename,blob){
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
}
export function copyText(txt,ok,fail){
  (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(ok).catch(fail);
}
let recBlob=null,recExt='webm',recorder=null;
function recType(){if(!window.MediaRecorder)return null;const c=[['audio/webm;codecs=opus','webm'],['audio/webm','webm'],['audio/mp4','mp4']];for(const x of c){try{if(MediaRecorder.isTypeSupported(x[0]))return x;}catch(e){}}return null;}
export const isRecording=()=>!!recorder;
export function initShare(cb){
  $('shr').addEventListener('click',()=>{(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(openShare);});
  $('closesheet').addEventListener('click',()=>$('sheet').classList.remove('show'));
  $('sheet').addEventListener('click',e=>{if(e.target===$('sheet'))$('sheet').classList.remove('show');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.sheet.show').forEach(x=>x.classList.remove('show'));});
  $('rename').addEventListener('click',()=>{S.nameSeed++;$('bandname').textContent=bandName();drawPoster();});
  $('copycap').addEventListener('click',()=>copyText(captionText(),()=>{toast('Caption copied');track('caption_copy',{pack:S.pack.key});},()=>toast('Copy blocked here. Mix code: '+mixCode())));
  $('loadform').addEventListener('submit',async e=>{
    e.preventDefault();const m=parseCode($('loadcode').value);
    if(!m){toast('That code does not look right. It should read like mix-h-0x7xax9');return;}
    await cb.loadMix(m);$('sheet').classList.remove('show');$('loadcode').value='';play();track('mix_load',{via:'code'});
  });
  $('saveposter').addEventListener('click',()=>{track('poster_save');$('poster').toBlob(b=>{if(b)saveFile('dhinchak-poster.png',b);},'image/png');});
  $('saveposter').hidden=false;$('rec').hidden=!recType();
  $('rec').addEventListener('click',()=>{
    if(recorder){recorder.stop();return;}
    initAudio();const ty=recType();
    if(!A.recDest||!ty){toast('Recording is not supported in this browser');return;}
    if(!S.playing)play();
    const chunks=[];recExt=ty[1];
    try{recorder=new MediaRecorder(A.recDest.stream,{mimeType:ty[0]});}catch(e){toast('Recording is not supported in this browser');return;}
    recorder.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
    recorder.onstop=()=>{recorder=null;$('rec').setAttribute('aria-pressed','false');$('rec').textContent=S.pack.ui.rec;
      recBlob=new Blob(chunks,{type:ty[0]});
      toast('Recording ready','Save',()=>{track('recording_save');saveFile('dhinchak-mix.'+recExt,recBlob);},12000);};
    recorder.start();$('rec').setAttribute('aria-pressed','true');$('rec').textContent='Stop';
    const ms=(S.pack.L*2*S.pack.sd+.6)*1000,r=recorder;setTimeout(()=>{if(recorder===r)r.stop();},ms);
  });
}
