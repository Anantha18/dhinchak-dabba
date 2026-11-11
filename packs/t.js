import {V,mkfq,drum,mel,chords,at,syl} from '../js/engine.js';
function hoi(t,o){V.cons(t,o,'h',.3);V.vox(t+.02,o,330,.16,'o','i',.45,300);}
function chai(t,o){V.cons(t,o,'c',.3);V.vox(t+.04,o,247,.2,'a','i',.36);}
function dei(t,o){V.cons(t,o,'d',.35);V.vox(t+.015,o,260,.22,'e','i',.5,200);}
export default {
  key:'t', L:24, bar:12, sd:60/138/3, sw:0, fq:mkfq([0,2,3,5,7,8,10]),
  title:'Dabba Kuthu', tag:'டப்பாங்குத்து · Sound-u vera level', lang:'ta',
  ui:{play:'Podu!',pause:'Niruthu',shuf:'Kalakku',clr:'Clear pannu',shr:'Share pannu',rec:'Record',full:'Stage full. Yaaraiyaavadhu eduthudu.',pick:'Mudhalla keezha oru sound-a thattu',silent:'Sound varalaya? Silent mode-a off panni thirumba thattu.',foot:'SOUND HORN  ·  INDHA CODE PODU, INDHA PAATU KELU',empty:'Kaali',muted:'MUTE',
      hint:'Oru sound-a thattu. Player-a thatti mute pannu. Naalu secret combo irukku.',
      start:'Mudhalla oru beat: keezha Parai Paandi-a thattu, apram ovvoru shelf-layum onnu podu.',
      cap:(b,c)=>`"${b}" ippo Dabba Kuthu-la oru track drop pannirukkanga. Mix code: ${c}. Un band idha beat pannuma?`},
  groups:['Thaalam','Sruthi','Raagam','Masala'],
  demo:[0,-1,7,-1,14,-1,15],
  sounds:[
   ['parai','Parai Paandi','🥁','band',1,.08,drum('D.tD.tDttD.t D.tD.tDtDtDt',{D:(t,o)=>{V.kick(t,o,.75,260,110,.15);V.tak(t,o,.4,500);},t:(t,o)=>V.tak(t,o,.55,1300,.05)})],
   ['thavil','Thavil Thatha','🪘','vibhuti',1,.12,drum('d.TT.Td.T.TT d.TT.TdTTdTT',{d:(t,o)=>V.ge(t,o,.8,95,1.3,.25),T:(t,o)=>{V.na(t,o,.45,1100,.07);V.tak(t,o,.25,1800,.03);}})],
   ['ghatam','Ghatam Gopal','🏺','vibhuti',0,.15,drum('g.gG.g.gG.gG g.gG.gGgG.GG',{g:(t,o)=>V.ghat(t,o,.5,196),G:(t,o)=>V.ghat(t,o,.7,293.7)})],
   ['davara','Davara Tumbler','🥛','malli',0,.15,drum('s..S..s..S.s s..S..s.sS.S',{s:(t,o)=>V.steel(t,o,.35,880),S:(t,o)=>V.steel(t,o,.35,1318.5)})],
   ['kai','Kai Thattu','👏','malli',0,.2,drum('...c.....c.. ...c.....c.c',{c:(t,o)=>V.clap(t,o,.55)})],
   ['sruthi','Sruthi Petti','🪗','bun',0,.3,chords(24,3,[[0,[0,4,7],11.5],[12,[0,4,7],11.5]],(t,o,fs,d)=>V.pad(t,o,fs,d,.085))],
   ['urumi','Urumi Machan','🌀','band',1,.1,at(24,{0:(t,o)=>V.urumi(t,o,.3,.6),6:(t,o)=>V.urumi(t,o,.3,.6),12:(t,o)=>V.urumi(t,o,.3,.6),18:(t,o)=>V.urumi(t,o,.3,.6),21:(t,o)=>V.urumi(t,o,.22,.5)})],
   ['sauto','Share Auto Anna','🛺','cap',1,0,mel(24,2,[[0,0,2],[3,0,2],[5,0,1],[6,0,2],[9,-3,2],[11,0,1],[12,-1,2],[15,-1,2],[17,-1,1],[18,-2,2],[21,-3,2],[23,-3,1]],(t,o,f,d)=>V.putt(t,o,f,d*.85,.5))],
   ['kbass','Kuthu Bass','🔊','dj',0,0,mel(24,2,[[0,0,2],[3,0,2],[6,0,2],[9,0,2],[12,-1,3],[15,-1,2],[18,-2,3],[21,-3,3]],(t,o,f,d)=>V.sub(t,o,f,d*.8,.6))],
   ['morsing','Morsing Mama','🧲','vibhuti',1,.12,drum('M.mM.mM.mMmm M.mM.mMmmMmM',{M:(t,o)=>V.twang(t,o,146.8,.16,.4,2600),m:(t,o)=>V.twang(t,o,146.8,.1,.25,1500)})],
   ['nadas','Nadaswaram Periyappa','📯','vibhuti',1,.35,mel(24,4,[[0,7,3],[3,6,1],[4,7,2],[6,9,3],[9,8,1],[10,7,2],[12,6,3],[15,4,2],[17,6,1],[18,5,3],[21,4,3]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.2,p))],
   ['veena','Veena Akka','🪕','malli',0,.35,mel(24,3,[[0,0,2],[2,2,1],[3,4,3],[6,7,3],[9,4,2],[11,2,1],[12,-1,2],[14,1,1],[15,3,3],[18,-2,2],[20,0,1],[21,-3,2],[23,1,1]],(t,o,f,d)=>V.pluck(t,o,f,d+.35,.32,'sawtooth',8,-.03))],
   ['mass','Mass Entry BGM','😎','shades',1,.3,mel(24,3,[[0,0,3],[5,0,1],[6,0,3],[12,-1,3],[18,-2,3],[21,4,1],[22,6,1],[23,7,1]],(t,o,f,d)=>V.brass(t,o,f,d*.75,.34))],
   ['kuzhal','Kuzhal Thambi','🎶','band',0,.45,mel(24,4,[[0,11,2],[2,10,1],[3,11,3],[6,14,3],[9,13,1],[10,11,2],[12,10,3],[15,11,1],[16,13,2],[18,12,2],[20,10,1],[21,11,3]],(t,o,f,d,p)=>V.flute(t,o,f,d*.9,.22,p))],
   ['gaana','Gaana Keyboard','🎹','specs',0,.2,mel(24,4,[[0,7,1],[2,7,1],[3,9,1],[5,7,1],[6,6,1],[8,4,1],[9,6,1],[10,7,2],[12,6,1],[14,6,1],[15,8,1],[17,6,1],[18,5,1],[20,5,1],[21,4,1],[23,4,1]],(t,o,f,d,p)=>V.lead(t,o,f,d*.8,.15,p))],
   ['konna','Tha-Ka-Dhi-Mi Sir','🗣️','vibhuti',1,.12,syl(24,[[0,'t','a'],[1,'k','i'],[2,'t','a'],[3,'t','a'],[4,'k','i'],[5,'t','a'],[6,'t','a'],[7,'k','a'],[8,'d','i'],[9,'.','i'],[10,'t','a'],[12,'t','a'],[14,'d','i'],[16,'t','a'],[17,'k','i'],[18,'t','a'],[19,'d','i'],[20,'k','i'],[21,'t','a'],[22,'d','o',1.8]],147)],
   ['dei','Dei Machi','🤙','shades',1,.25,at(24,{9:dei,15:dei,21:(t,o)=>V.vox(t,o,240,.4,'a','e',.42,330)})],
   ['aiyo','Aiyo Paati','👵','bun',0,.3,at(24,{6:(t,o,sd)=>{V.vox(t,o,440,.14,'a','i',.36);V.vox(t+sd*2,o,392,.42,'o','o',.36,294);},18:(t,o)=>V.vox(t,o,440,.11,'a','i',.36),19:(t,o)=>V.vox(t,o,392,.11,'o','o',.36),20:(t,o)=>V.vox(t,o,392,.11,'o','o',.36),21:(t,o)=>V.vox(t,o,349,.11,'o','o',.36),22:(t,o)=>V.vox(t,o,330,.36,'o','u',.36,247)})],
   ['visil','FDFS Visil','🎬','shades',0,.3,at(24,{10:(t,o)=>V.whistle(t,o,1800,3200,.22),20:(t,o)=>V.whistle(t,o,2000,3400,.17),22:(t,o)=>V.whistle(t,o,3400,1800,.34)})],
   ['kaapi','Filter Kaapi','☕','malli',0,.3,at(24,{0:(t,o,sd)=>V.pour(t,o,sd*5,.3),18:(t,o)=>V.pour(t,o,.22,.28),20:(t,o)=>V.vox(t,o,196,.5,'a','a',.3,165)})]
  ],
  combos:[
   {id:'kuthu',need:['parai','nadas','dei'],name:'Marana Kuthu',title:'MARANA KUTHU!',sub:'Tharai local. Lungi-ya madichu kattu.',fx:'fire'},
   {id:'fdfs',need:['mass','visil','kai'],name:'FDFS',title:'FDFS! MASS ENTRY',sub:'Theatre-la visil parakkudhu.',fx:'paper'},
   {id:'kaapi',need:['kaapi','sruthi','veena'],name:'Kaapi Break',title:'KAAPI BREAK',sub:'Oru strong filter kaapi, sakkarai kammi.',fx:'rain'},
   {id:'sauto',need:['sauto','urumi','davara'],name:'Share Auto Race',title:'SHARE AUTO RACE',sub:'Konjam adjust pannunga.',fx:'auto'}
  ],
  bandA:['Kuthu Kumar','Maami\'s Mixie','Share Auto Shankar','Tea Kadai Raja','Thatha\'s Bullet','Mass Maha','Vadai Gang','IT Park Paandi','Semma Selvi','Marina Machans'],
  bandB:['& The Filter Kaapi Boys','Tharai Local Mix','feat. Paati\'s Aiyo','Unplugged (Current Cut)','& Sons, T. Nagar','First Day First Show','ft. Konjam Adjust Pannunga','& The Idli Steamers','Live From The Mottai Maadi','Vera Level Edition']
};
