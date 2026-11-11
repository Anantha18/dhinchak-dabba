import {S,$} from './state.js';
export function drawArt(){
  const cv=$('art'),r=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
  if(!r.width)return;
  cv.width=r.width*dpr;cv.height=r.height*dpr;const c=cv.getContext('2d');c.scale(dpr,dpr);
  const cx=r.width/2,cy=r.height/2,R=Math.min(r.width*.46,r.height*.62);
  if(S.pack.key==='h'){ /* rangoli: rings of petals */
    const cols=['#ff3d86','#ffc21a','#12c2b0','#ff6a2b','#fff4dc'];
    for(let ring=5;ring>=1;ring--){
      const n=8*Math.min(ring,3),rr=R*ring/5,pl=R/5*1.15,pw=Math.PI*rr/n*.8;
      for(let k=0;k<n;k++){const a=k/n*Math.PI*2+(ring%2?0:Math.PI/n);
        c.save();c.translate(cx+Math.cos(a)*rr*.8,cy+Math.sin(a)*rr*.8);c.rotate(a);
        c.beginPath();c.moveTo(0,-pw/2);c.quadraticCurveTo(pl,0,0,pw/2);c.quadraticCurveTo(-pl*.35,0,0,-pw/2);
        c.fillStyle=cols[(ring+k)%2?ring%5:(ring+2)%5];c.globalAlpha=.75;c.fill();c.globalAlpha=1;c.strokeStyle='#fff4dc';c.lineWidth=1;c.stroke();c.restore();}
    }
    c.beginPath();c.arc(cx,cy,R*.09,0,7);c.fillStyle='#ffc21a';c.fill();
    for(let k=0;k<12;k++){const a=k/12*Math.PI*2;c.beginPath();c.arc(cx+Math.cos(a)*R*.14,cy+Math.sin(a)*R*.14,R*.018,0,7);c.fillStyle='#fff4dc';c.fill();}
  }else{ /* kolam: dots in a diamond with loops woven around them */
    const rows=[1,3,5,7,9,7,5,3,1],g=Math.min(R*2/9,r.height/9.5);
    c.strokeStyle='#fff4dc';c.fillStyle='#fff4dc';c.lineWidth=2;c.lineJoin='round';
    rows.forEach((n,ri)=>{for(let k=0;k<n;k++){
      const x=cx+(k-(n-1)/2)*g,y=cy+(ri-4)*g;
      c.beginPath();c.arc(x,y,2.4,0,7);c.fill();
      const s=g*.5;c.beginPath();c.moveTo(x,y-s);c.quadraticCurveTo(x+s*.9,y-s*.9,x+s,y);c.quadraticCurveTo(x+s*.9,y+s*.9,x,y+s);c.quadraticCurveTo(x-s*.9,y+s*.9,x-s,y);c.quadraticCurveTo(x-s*.9,y-s*.9,x,y-s);
      if((ri+k)%2===0)c.stroke();
      else{c.save();c.translate(x,y);c.rotate(Math.PI/4);c.strokeRect(-s*.62,-s*.62,s*1.24,s*1.24);c.restore();}
    }});
  }
}
export function drawTrim(){
  const w=Math.max(300,$('stage').clientWidth);
  /* toran: mango leaves and marigolds on a string */
  let s=`<path d="M0 5 H${w}" stroke="#ffc21a" stroke-width="2"/>`;
  for(let x=10,k=0;x<w;x+=20,k++){
    s+=k%2?`<circle cx="${x}" cy="14" r="7" fill="#ff8a1f" stroke="#170e33" stroke-width="1.2"/><circle cx="${x}" cy="14" r="3" fill="#ffc21a"/>`
          :`<path d="M${x} 5 C${x-7} 12 ${x-5} 22 ${x} 28 C${x+5} 22 ${x+7} 12 ${x} 5Z" fill="#2fa84a" stroke="#170e33" stroke-width="1.2"/><path d="M${x} 7V26" stroke="#170e33" stroke-width=".8"/>`;
  }
  const tr=$('toran');tr.setAttribute('viewBox',`0 0 ${w} 30`);tr.setAttribute('preserveAspectRatio','xMinYMin slice');tr.innerHTML=s;
  /* warli dancers holding hands */
  let wv='';const n=Math.floor(w/30);
  for(let k=0;k<n;k++){const x=15+k*(w/n);
    wv+=`<g class="w" stroke="#fff4dc" stroke-width="1.6" fill="#fff4dc" stroke-linecap="round"><circle cx="${x}" cy="8" r="3" /><path d="M${x-5} 12 L${x+5} 12 L${x} 19Z"/><path d="M${x} 19 L${x-5} 26 L${x+5} 26Z"/><path d="M${x-5} 13 L${x-14} ${k%2?9:16} M${x+5} 13 L${x+14} ${k%2?16:9} M${x-3} 26 L${x-4} 32 M${x+3} 26 L${x+4} 32" fill="none"/></g>`;}
  const wl=$('warli');wl.setAttribute('viewBox',`0 0 ${w} 34`);wl.setAttribute('preserveAspectRatio','xMidYMid slice');wl.innerHTML=wv;
}

