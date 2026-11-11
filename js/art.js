// Folk-art stage dressing, all drawn in code: one backdrop and one toran per pack theme.
import {S,$} from './state.js';
const PAL=['#ff3d86','#ffc21a','#12c2b0','#ff6a2b','#fff4dc'];
const ART={
  rangoli(c,W,H,cx,cy,R){ // rings of petals
    for(let ring=5;ring>=1;ring--){
      const n=8*Math.min(ring,3),rr=R*ring/5,pl=R/5*1.15,pw=Math.PI*rr/n*.8;
      for(let k=0;k<n;k++){const a=k/n*Math.PI*2+(ring%2?0:Math.PI/n);
        c.save();c.translate(cx+Math.cos(a)*rr*.8,cy+Math.sin(a)*rr*.8);c.rotate(a);
        c.beginPath();c.moveTo(0,-pw/2);c.quadraticCurveTo(pl,0,0,pw/2);c.quadraticCurveTo(-pl*.35,0,0,-pw/2);
        c.fillStyle=PAL[(ring+k)%2?ring%5:(ring+2)%5];c.globalAlpha=.75;c.fill();c.globalAlpha=1;c.strokeStyle='#fff4dc';c.lineWidth=1;c.stroke();c.restore();}
    }
    c.beginPath();c.arc(cx,cy,R*.09,0,7);c.fillStyle='#ffc21a';c.fill();
  },
  kolam(c,W,H,cx,cy,R){ // dots in a diamond with loops woven round them
    const rows=[1,3,5,7,9,7,5,3,1],g=Math.min(R*2/9,H/9.5);
    c.strokeStyle='#fff4dc';c.fillStyle='#fff4dc';c.lineWidth=2;c.lineJoin='round';
    rows.forEach((n,ri)=>{for(let k=0;k<n;k++){
      const x=cx+(k-(n-1)/2)*g,y=cy+(ri-4)*g,s=g*.5;
      c.beginPath();c.arc(x,y,2.4,0,7);c.fill();
      c.beginPath();c.moveTo(x,y-s);c.quadraticCurveTo(x+s*.9,y-s*.9,x+s,y);c.quadraticCurveTo(x+s*.9,y+s*.9,x,y+s);c.quadraticCurveTo(x-s*.9,y+s*.9,x-s,y);c.quadraticCurveTo(x-s*.9,y-s*.9,x,y-s);
      if((ri+k)%2===0)c.stroke();
      else{c.save();c.translate(x,y);c.rotate(Math.PI/4);c.strokeRect(-s*.62,-s*.62,s*1.24,s*1.24);c.restore();}
    }});
  },
  phulkari(c,W,H){ // phulkari bagh: a field of four-colour diamonds
    const g=Math.max(26,Math.min(W/11,H/4.2)),cols=['#ff3d86','#ffc21a','#2fa84a','#ff6a2b'];
    for(let r=0,y=g*.2;y<H+g;y+=g*.5,r++)for(let x=(r%2)*g*.5;x<W+g;x+=g){
      [[0,-1,1,0],[1,0,0,1],[0,1,-1,0],[-1,0,0,-1]].forEach((q,i)=>{c.beginPath();c.moveTo(x,y);c.lineTo(x+q[0]*g*.42,y+q[1]*g*.21);c.lineTo(x+q[2]*g*.42,y+q[3]*g*.21);c.closePath();c.fillStyle=cols[(i+r)%4];c.fill();});
    }
  },
  bandhani(c,W,H,cx,cy,R){ // tie-dye rings of dots with mirror-work
    for(let ring=1;ring<=7;ring++){const n=6+ring*7,rr=R*1.25*ring/7;
      for(let k=0;k<n;k++){const a=k/n*Math.PI*2+ring*.3,x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.72;
        c.beginPath();c.arc(x,y,3.4,0,7);c.strokeStyle='#fff4dc';c.lineWidth=1.6;c.stroke();c.beginPath();c.arc(x,y,1.2,0,7);c.fillStyle=PAL[ring%4];c.fill();}}
    for(let k=0;k<8;k++){const a=k/8*Math.PI*2,x=cx+Math.cos(a)*R*.5,y=cy+Math.sin(a)*R*.36;c.save();c.translate(x,y);c.rotate(Math.PI/4);c.fillStyle='#fff4dc';c.fillRect(-6,-6,12,12);c.strokeStyle='#f5b301';c.lineWidth=2.5;c.strokeRect(-6,-6,12,12);c.restore();}
  },
  ikat(c,W,H){ // feathered ikat chevrons in bands
    const cols=['#ff3d86','#fff4dc','#12c2b0','#ffc21a','#ff6a2b'],step=Math.max(20,W/16),rowH=H/5.2;
    for(let r=0;r<6;r++)for(let j=0;j<3;j++){
      c.beginPath();for(let x=-step,k=0;x<W+step;x+=step,k++){const y=r*rowH+(k%2?0:rowH*.55)+j*5;k?c.lineTo(x+j*2,y):c.moveTo(x,y);}
      c.strokeStyle=cols[r%5];c.globalAlpha=[.9,.5,.25][j];c.lineWidth=4;c.lineJoin='miter';c.stroke();}
    c.globalAlpha=1;
  },
  lights(c,W,H){ // marigold strands and fairy lights
    for(let x=W*.06,k=0;x<W;x+=W/9,k++){const len=H*(.28+.2*((k*37)%5)/5);for(let y=30;y<30+len;y+=11){c.beginPath();c.arc(x+Math.sin(y/14)*2,y,5.5,0,7);c.fillStyle=(Math.floor(y/11)+k)%2?'#ff8a1f':'#ffc21a';c.fill();}}
    for(let s=0;s<3;s++){const y0=H*(.3+s*.2);c.beginPath();for(let x=0;x<=W;x+=8){const y=y0+Math.sin(x/W*Math.PI)*H*.1;x?c.lineTo(x,y):c.moveTo(x,y);}c.strokeStyle='rgba(255,244,220,.5)';c.lineWidth=1.2;c.stroke();
      for(let x=10;x<W;x+=26){const y=y0+Math.sin(x/W*Math.PI)*H*.1+4,g=c.createRadialGradient(x,y,0,x,y,11);g.addColorStop(0,'#fff4dc');g.addColorStop(.35,PAL[(x/26|0)%4]);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,11,0,7);c.fill();}}
  },
  sun(c,W,H,cx){ // harvest sun, rays and kites
    const R=Math.min(W*.3,H*.55),cy=H*.95;
    for(let k=0;k<18;k++){const a=Math.PI+k/17*Math.PI;c.beginPath();c.moveTo(cx+Math.cos(a-.05)*R*1.08,cy+Math.sin(a-.05)*R*1.08);c.lineTo(cx+Math.cos(a)*R*1.75,cy+Math.sin(a)*R*1.75);c.lineTo(cx+Math.cos(a+.05)*R*1.08,cy+Math.sin(a+.05)*R*1.08);c.closePath();c.fillStyle=k%2?'#ff6a2b':'#ffc21a';c.fill();}
    c.beginPath();c.arc(cx,cy,R,Math.PI,0);c.fillStyle='#ffc21a';c.fill();c.lineWidth=4;c.strokeStyle='#ff6a2b';c.stroke();
    [[.12,.3,'#ff3d86'],[.86,.24,'#12c2b0'],[.7,.5,'#fff4dc'],[.26,.56,'#ff6a2b']].forEach(k=>{const x=W*k[0],y=H*k[1],s=Math.min(W,H)*.07;c.beginPath();c.moveTo(x,y-s);c.lineTo(x+s*.75,y);c.lineTo(x,y+s*1.2);c.lineTo(x-s*.75,y);c.closePath();c.fillStyle=k[2];c.fill();c.strokeStyle='#170e33';c.lineWidth=1.5;c.stroke();});
  }
};
export function drawArt(){
  const cv=$('art'),r=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
  if(!r.width||!S.pack)return;
  cv.width=r.width*dpr;cv.height=r.height*dpr;const c=cv.getContext('2d');c.scale(dpr,dpr);
  (ART[(S.pack.theme||{}).art]||ART.rangoli)(c,r.width,r.height,r.width/2,r.height/2,Math.min(r.width*.46,r.height*.62));
}
export function drawTrim(){
  const w=Math.max(300,$('stage').clientWidth),kind=(S.pack&&S.pack.theme&&S.pack.theme.toran)||'mango';
  let s=`<path d="M0 5 H${w}" stroke="#ffc21a" stroke-width="2"/>`;
  for(let x=10,k=0;x<w;x+=20,k++){
    if(kind==='genda')s+=[0,1,2].slice(0,k%2?3:2).map(j=>`<circle cx="${x}" cy="${9+j*7.5}" r="4.6" fill="${(j+k)%2?'#ffc21a':'#ff8a1f'}" stroke="#170e33" stroke-width="1"/>`).join('');
    else if(kind==='bulbs')s+=`<path d="M${x} 5 v4" stroke="#fff4dc" stroke-width="1.2"/><ellipse cx="${x}" cy="15" rx="4.6" ry="6.5" fill="${PAL[k%4]}" stroke="#170e33" stroke-width="1.2"/><ellipse cx="${x-1.4}" cy="13" rx="1.2" ry="2" fill="#fff" opacity=".7"/>`;
    else if(kind==='patang')s+=`<path d="M${x-9} 5 h18 l-9 19Z" fill="${PAL[k%5]}" stroke="#170e33" stroke-width="1.2"/>`;
    else s+=k%2?`<circle cx="${x}" cy="14" r="7" fill="#ff8a1f" stroke="#170e33" stroke-width="1.2"/><circle cx="${x}" cy="14" r="3" fill="#ffc21a"/>`
          :`<path d="M${x} 5 C${x-7} 12 ${x-5} 22 ${x} 28 C${x+5} 22 ${x+7} 12 ${x} 5Z" fill="#2fa84a" stroke="#170e33" stroke-width="1.2"/><path d="M${x} 7V26" stroke="#170e33" stroke-width=".8"/>`;
  }
  const tr=$('toran');tr.setAttribute('viewBox',`0 0 ${w} 30`);tr.setAttribute('preserveAspectRatio','xMinYMin slice');tr.innerHTML=s;
  let wv='';const n=Math.floor(w/30);
  for(let k=0;k<n;k++){const x=15+k*(w/n);
    wv+=`<g class="w" stroke="#fff4dc" stroke-width="1.6" fill="#fff4dc" stroke-linecap="round"><circle cx="${x}" cy="8" r="3" /><path d="M${x-5} 12 L${x+5} 12 L${x} 19Z"/><path d="M${x} 19 L${x-5} 26 L${x+5} 26Z"/><path d="M${x-5} 13 L${x-14} ${k%2?9:16} M${x+5} 13 L${x+14} ${k%2?16:9} M${x-3} 26 L${x-4} 32 M${x+3} 26 L${x+4} 32" fill="none"/></g>`;}
  const wl=$('warli');wl.setAttribute('viewBox',`0 0 ${w} 34`);wl.setAttribute('preserveAspectRatio','xMidYMid slice');wl.innerHTML=wv;
}
