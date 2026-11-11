import {$,INK} from './state.js';
export const SC={run:0};
export function scene(type,run){
  const cv=$('fx'),r=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
  cv.width=r.width*dpr;cv.height=r.height*dpr;const c=cv.getContext('2d');c.scale(dpr,dpr);
  const W=r.width,H=r.height,P=[],cols=['#ff3d86','#ffc21a','#12c2b0','#ff6a2b','#fff4dc'],st=performance.now();let last=st,acc=0;
  const eyes=[];if(type==='eyes')for(let i=0;i<14;i++)eyes.push({x:Math.random()*W,y:Math.random()*H*.8+10,d:Math.random()*1.5,s:10+Math.random()*10});
  function loop(now){
    if(run!==SC.run){c.clearRect(0,0,W,H);return;}
    const el=(now-st)/1000,dt=Math.min(.05,(now-last)/1000);last=now;acc+=dt;
    c.clearRect(0,0,W,H);
    if(el>5.2){return;}
    if(type==='fire'){
      if(acc>.3){acc=0;const x=Math.random()*W,y=Math.random()*H*.5+10,col=cols[Math.floor(Math.random()*5)];for(let i=0;i<36;i++){const a=i/36*6.283,v=60+Math.random()*90;P.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,c:col,r:2.5});}
        for(let i=0;i<6;i++)P.push({x:Math.random()*W,y:-5,vx:(Math.random()-.5)*30,vy:60+Math.random()*60,l:3,c:i%2?'#ff8a1f':'#ffc21a',r:4,p:1});}
    }else if(type==='paper'){
      if(acc>.04){acc=0;for(let i=0;i<3;i++)P.push({x:Math.random()*W,y:-5,vx:(Math.random()-.5)*60,vy:90+Math.random()*90,l:3,c:cols[Math.floor(Math.random()*5)],r:5,rect:1,a:Math.random()*6});}
      [-1,1].forEach(sg=>{const a=Math.sin(el*2+sg)*.35*sg;c.save();c.translate(sg<0?0:W,H);c.rotate(a+(sg<0?-.5:.5));c.beginPath();c.moveTo(0,0);c.lineTo(-45,-H*1.4);c.lineTo(45,-H*1.4);c.closePath();c.fillStyle='rgba(255,244,220,.16)';c.fill();c.restore();});
    }else if(type==='rain'){
      if(acc>.02){acc=0;for(let i=0;i<4;i++)P.push({x:Math.random()*(W+60),y:-10,vx:-70,vy:420+Math.random()*120,l:1.2,c:'#8fe9e0',rain:1});}
      c.font=Math.min(H*.42,120)+'px serif';c.textAlign='center';c.fillText('☕',W/2,H*.78+Math.sin(el*4)*4);
      c.strokeStyle='rgba(255,244,220,.8)';c.lineWidth=3;c.lineCap='round';
      for(let k=-1;k<=1;k++){c.beginPath();for(let y=0;y<50;y+=5){const yy=H*.42-y-((el*30)%20),xx=W/2+k*20+Math.sin((y+el*60)/9)*5;y?c.lineTo(xx,yy):c.moveTo(xx,yy);}c.stroke();}
    }else if(type==='auto'){
      const x=W+60-((el*W*.55)%(W+140)),y=H*.72+Math.abs(Math.sin(el*14))*-6;
      c.font=Math.min(H*.36,96)+'px serif';c.textAlign='center';c.fillText('🛺',x,y);
      if(acc>.05){acc=0;P.push({x:x+46,y:y-6,vx:40+Math.random()*40,vy:-20-Math.random()*20,l:.8,c:'rgba(255,244,220,.7)',r:5+Math.random()*5});}
    }else if(type==='eyes'){
      eyes.forEach(e=>{const o=Math.max(0,Math.min(1,(el-e.d)*4));if(!o)return;const blink=(Math.sin(el*3+e.x)>.96)?.15:1;
        [-1,1].forEach(sg=>{const ex=e.x+sg*e.s*1.15;c.beginPath();c.ellipse(ex,e.y,e.s*o,e.s*.62*o*blink,0,0,7);c.fillStyle='#fff';c.fill();c.strokeStyle=INK;c.lineWidth=2;c.stroke();
          const a=Math.atan2(H/2-e.y,W/2-ex);c.beginPath();c.arc(ex+Math.cos(a)*e.s*.35,e.y+Math.sin(a)*e.s*.2,e.s*.34*o*blink,0,7);c.fillStyle=INK;c.fill();});});
    }
    for(let i=P.length-1;i>=0;i--){const p=P[i];p.l-=dt;if(p.l<=0||p.y>H+20){P.splice(i,1);continue;}
      p.x+=p.vx*dt;p.y+=p.vy*dt;if(!p.rain&&!p.p&&!p.rect)p.vy+=120*dt;
      c.globalAlpha=Math.min(1,p.l*1.5);
      if(p.rain){c.strokeStyle=p.c;c.lineWidth=1.5;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(p.x+3,p.y-14);c.stroke();}
      else if(p.rect){p.a+=dt*8;c.save();c.translate(p.x,p.y);c.rotate(p.a);c.fillStyle=p.c;c.fillRect(-p.r,-p.r*.5,p.r*2,p.r);c.restore();}
      else{c.fillStyle=p.c;c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill();}
      c.globalAlpha=1;}
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

