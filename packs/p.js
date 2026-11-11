// Punjabi pack: bhangra. All regional copy below NEEDS NATIVE REVIEW.
import {V,mkfq,drum,mel,chords,at} from '../js/engine.js';
const burr=(t,o)=>{for(let i=0;i<5;i++)V.cons(t+i*.035,o,'d',.22);V.vox(t+.17,o,300,.3,'u','a',.45,470);};
const oye=(t,o)=>V.vox(t,o,300,.2,'o','e',.42,380);
const clink=(t,o)=>V.steel(t,o,.3,1568);
const wh=(a,b,d)=>(t,o)=>V.whistle(t,o,a,b,d);
export default {
  key:'p', L:32, bar:16, sd:60/100/4, sw:.2, fq:mkfq([0,2,4,5,7,9,10],2),
  title:'Balle Balle Box', tag:'ਪੰਜਾਬੀ · Chak de phatte', lang:'pa', pat:'phul',
  theme:{art:'phulkari',toran:'genda',f1:'#ffc21a',f2:'#2fa84a',f3:'#ff3d86',bg1:'#4d2a7a'},
  ui:{play:'Vajao',pause:'Ruko',shuf:'Ghumao',clr:'Saaf karo',shr:'Share karo',rec:'Record',empty:'Khaali',muted:'CHUP', // NEEDS NATIVE REVIEW
    full:'Stage full ae. Kise nu hatao.',pick:'Pehlan thalle ton ik sound chuno', // NEEDS NATIVE REVIEW
    silent:'Awaaz nahi aundi? Silent mode band karo te dobara tap karo.', // NEEDS NATIVE REVIEW
    foot:'HORN OK PLEASE  ·  EH CODE PAO, EH GAANA VAJAO', // NEEDS NATIVE REVIEW
    hint:'Sound te tap karo. Player nu tap karke chup karao. Chaar secret combo lukke ne.', // NEEDS NATIVE REVIEW
    start:'Pehlan beat: thalle Dholi Veer te tap karo, phir har shelf ton ik chuno.', // NEEDS NATIVE REVIEW
    cap:(b,c)=>`"${b}" ne hune Balle Balle Box te gaana drop kitta. Mix code: ${c}. Tera band is ton vadiya ae?`}, // NEEDS NATIVE REVIEW
  groups:['Taal','Bass','Dhun','Raunaq','Chhupa Sher'], // NEEDS NATIVE REVIEW
  sounds:[
   ['dhol','Dholi Veer','🥁','3 pagri sindoor - dhol mbf',0,.08,drum('K..tK.tKt.tK.t.t K..tK.tKt.tKttKt',{K:(t,o)=>{V.kick(t,o,.95,160,50,.34);V.tak(t,o,.25,800);},t:(t,o)=>V.tak(t,o,.5,1150)})],
   ['chimta','Chimta Chacha','🔔','2 pagri neel - cym m',0,.15,drum('..j...j...j.j.j. ..j...j...j.jjj.',{j:(t,o)=>V.jing(t,o,.5)})],
   ['gharha','Gharha Bebe','🏺','1 pallu rani - pot wo',0,.12,drum('g..g..G.g..g.G.. g..g..G.g.gG.GG.',{g:(t,o)=>V.ghat(t,o,.55,150),G:(t,o)=>V.ghat(t,o,.7,225)})],
   ['sapp','Sapp Shera','🪵','4 patka leaf - sticks k',0,.15,drum('w.w...w.w.w...w. w.w...w.w.w.w.ww',{w:(t,o)=>V.wood(t,o,.5,1300)})],
   ['gidda','Gidda Bhabhi','👏','2 braid - - clap wi',0,.2,drum('....c..c....c... ....c..c....c.cc',{c:(t,o)=>V.clap(t,o,.55)})],
   ['tractor','Tractor Tau','🚜','3 pagri khaki - wheel mo',0,0,mel(32,2,[[0,0,2],[4,0,1],[6,0,2],[8,0,2],[12,4,1],[14,2,2],[16,0,2],[20,0,1],[22,0,2],[24,-3,2],[28,-1,2],[30,-1,2]],(t,o,f,d)=>V.putt(t,o,f,d*.85,.5))],
   ['woofer','Woofer Veerji','🔊','2 dj leaf - speaker d',0,0,mel(32,2,[[0,0,3],[5,0,1],[6,0,2],[10,0,2],[16,0,3],[21,0,1],[22,-3,2],[26,-1,2],[30,-1,2]],(t,o,f,d)=>V.sub(t,o,f,d*.8,.6))],
   ['baja','Baja Bauji','🪗','4 pagri maroon - box mo',0,.25,chords(32,3,[[0,[0,2,4],7],[8,[0,2,4],7],[16,[3,5,7],7],[24,[4,6,8],3],[28,[0,2,4],3]],(t,o,fs,d)=>V.pad(t,o,fs,d,.1))],
   ['toomba','Toomba Taya','🪕','3 pagri jamun - string m',0,.2,mel(32,3,Array.from({length:16},(_,i)=>[i*2,i%2?4:0,2]),(t,o,f,d)=>V.pluck(t,o,f,d*1.2,.24,'sawtooth',8))],
   ['alaap','Alaap Bapu','🧘','4 mund chuna - hum bo',0,.4,mel(32,3,[[0,0,7],[8,0,7],[16,3,7],[24,4,7]],(t,o,f,d)=>V.vox(t,o,f,d,'a','o',.22))],
   ['algoza','Algoza Ustad','🎶','2 pagri mor - flute m',0,.3,mel(32,5,[[0,4],[1,5],[2,4],[3,2],[4,4,2],[6,2],[7,1],[8,2,2],[12,4],[13,5],[14,7,2],[16,7],[17,5],[18,4],[19,2],[20,4,2],[22,2],[23,1],[24,0,2],[28,2],[29,1],[30,0,2]],(t,o,f,d,p)=>{V.flute(t,o,f,d*.85,.13,p);V.flute(t,o,f*1.5,d*.85,.05);})],
   ['sarangi','Sarangi Bibi','🎻','1 pallu mor - string w',0,.4,mel(32,4,[[0,2,4],[4,4,4],[8,5,3],[11,4,1],[12,2,4],[16,4,4],[20,7,4],[24,5,2],[26,4,2],[28,2,4]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.15,p))],
   ['bugdu','Bugdu Bai','🪘','3 braid haldi - pot w',0,.12,drum('B..b..B.B..b.bB. B..b..B.B.bB.bBB',{B:(t,o)=>V.twang(t,o,165,.18,.4,2400),b:(t,o)=>V.twang(t,o,165,.1,.25,1400)})],
   ['bugle','Baraati Bugle','🎺','4 safa rani - brass m',0,.25,mel(32,4,[[4,0,1],[6,2,1],[7,4,2],[12,4,1],[14,2,2],[20,0,1],[22,2,1],[23,4,2],[28,7,1],[29,5,1],[30,4,2]],(t,o,f,d)=>V.brass(t,o,f,d*.7,.26))],
   ['keys','Keyboard Kaka','🎹','1 patka sindoor - keys k',0,.2,mel(32,4,[[0,7],[2,7],[3,9],[4,7,2],[8,5],[10,4],[11,5],[12,4,2],[16,7],[18,7],[19,9],[20,11,2],[24,9],[26,7],[27,5],[28,4,2]],(t,o,f,d,p)=>V.lead(t,o,f,d*.8,.14,p))],
   ['burr','Burrah Bhaji','🙌','3 pagri haldi - whis mf',0,.25,at(32,{6:burr,22:burr,30:(t,o)=>V.vox(t,o,330,.16,'o','i',.45,300)})],
   ['oye','Oye Bebe','👵','1 bun - - gasp wog',0,.3,at(32,{4:oye,12:oye,20:oye,28:(t,o)=>V.vox(t,o,300,.45,'o','e',.42,420)})],
   ['lassi','Lassi Lala','🥛','2 spike - - cup kf metal',0,.25,at(32,{2:clink,10:clink,18:clink,26:clink,27:clink})],
   ['horn','Horn Paaji','📯','4 cap neel - pom md',0,.2,mel(32,4,[[12,0,1],[13,2,1],[14,4,2],[28,4,1],[29,2,1],[30,0,2]],(t,o,f,d)=>V.brass(t,o,f,d*.8,.2))],
   ['seeti','Seeti Shera','😙','3 curly - - whis d',0,.3,at(32,{8:wh(1700,3100,.2),24:wh(1900,3300,.16),26:wh(3300,1700,.3)})],
   ['nagada','Nagada Nawab','🥁','5 crown - maroon dhol mbz',0,.2,drum('N.......N..N.... N.......N.NN.NNN',{N:(t,o)=>{V.kick(t,o,.9,120,42,.45);V.ge(t,o,.5,70,1.2,.3);}})]
  ],
  combos:[ // NEEDS NATIVE REVIEW
   {id:'bhangra',need:['dhol','algoza','burr'],name:'Bhangra Paa Le',title:'BHANGRA PAA LE!',sub:'Chak de phatte, nach de saare.',fx:'fire'},
   {id:'tractor',need:['tractor','horn','woofer'],name:'Tractor Te Speaker',title:'TRACTOR TE SPEAKER',sub:'Pind di sadak, full volume.',fx:'auto',icon:'🚜'},
   {id:'gidda',need:['gharha','gidda','oye'],name:'Gidda Night',title:'GIDDA NIGHT',sub:'Bebe ne vi boliyan paa ditiyan.',fx:'bonfire'},
   {id:'lassi',need:['lassi','baja','sarangi'],name:'Lassi Break',title:'LASSI BREAK',sub:'Malai maar ke, vadda glass.',fx:'rain',icon:'🥛'}
  ],
  bandA:['Pind De Munde','Bebe Di Rasoi','Tractor Toli','Lassi Legends','Makki Di Roti','Chacha Chatur','Sarson Squad','Patiala Peg Party','Veer Ji','Canada Wale Cousins'], // NEEDS NATIVE REVIEW
  bandB:['& The Dhol Brigade','Te Unha Di Tolli','feat. Bebe Di Daant','Unplugged (Bijli Gayi)','& Sons Transport','Da Asli Remix','Vyah Season Edition','ft. Bas Paunch Gaye','& The Paratha Breaks','Live From The Khet'] // NEEDS NATIVE REVIEW
};
