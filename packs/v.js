// Harvest festival pack for 13-14 January: one shelf each for Lohri, Uttarayan, Sankranti and Pongal.
// Unlocks after two packs are fully completed. Regional lines below NEED NATIVE REVIEW.
import {V,mkfq,drum,mel,chords,at} from '../js/engine.js';
const ho=(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.02,o,330,.18,'o','o',.45,300);};
const kapyo=(t,o,sd)=>{V.cons(t,o,'k',.32);V.vox(t+.02,o,294,.14,'a','a',.45);V.cons(t+sd*1.5,o,'t',.3);V.vox(t+sd*1.5+.02,o,330,.4,'o','o',.45,440);};
const crunch=(t,o)=>{V.crackle(t,o,.5,.06);V.wood(t,o,.3,700);};
export default {
  key:'v', L:32, bar:16, sd:60/104/4, sw:.12, fq:mkfq([0,2,4,7,9],0),
  title:'Fasal Fest', tag:'Lohri · Uttarayan · Sankranti · Pongal', lang:'en', pat:['phul','bandh','ikat','kolam','zari'],
  theme:{art:'sun',toran:'patang',f1:'#ffc21a',f2:'#ff6a2b',f3:'#2fa84a',bg1:'#7a3d14',bg2:'#4a1f3a'},
  ui:{play:'Bajao',pause:'Ruko',shuf:'Jugaad',clr:'Saaf karo',shr:'Share karo',rec:'Record',empty:'Khaali',muted:'CHUP',
    full:'Stage full hai. Kisi ko hatao.',pick:'Pehle neeche se ek sound chuno',
    silent:'Awaaz nahi aa rahi? Silent mode band karo aur dobara tap karo.',
    foot:'FASAL FEST  ·  YE CODE DAALO, YE GAANA BAJAO',
    hint:'Four festivals, one band. Tap a sound to add it. Four secret combos are hiding.',
    start:'Start with a beat: tap Lohri Dholi below, then borrow a player from each festival.',
    cap:(b,c)=>`"${b}" ne Fasal Fest pe gaana drop kiya. Mix code: ${c}. Happy Lohri, Uttarayan, Sankranti aur Pongal!`},
  groups:['Lohri','Uttarayan','Sankranti','Pongal','Secret'],
  sounds:[
   ['ldhol','Lohri Dholi','🥁','3 pagri sindoor - dhol mb',0,.08,drum('K..tK.tKt.tK.t.t K..tK.tKt.tKttKt',{K:(t,o)=>{V.kick(t,o,.95,160,50,.34);V.tak(t,o,.25,800);},t:(t,o)=>V.tak(t,o,.5,1150)})],
   ['bonfire','Bonfire Bebe','🔥','1 pallu rani - clap wo',0,.2,drum('x.x.x.x.x.x.x.x. x.x.x.x.x.x.x.x.',{x:(t,o)=>V.crackle(t,o,.32,.22)})],
   ['rewri','Rewri Raja','🍬','2 patka leaf - cym k',0,.2,drum('..j.j...j.j...j. ..j.j...j.jj.jj.',{j:(t,o)=>V.jing(t,o,.4,.08)})],
   ['tractor','Khet Tractor','🚜','4 pagri khaki - wheel mo',0,0,mel(32,2,[[0,0,2],[4,0,2],[8,0,2],[12,2,2],[16,0,2],[20,0,2],[24,-2,2],[28,-1,2],[30,-1,2]],(t,o,f,d)=>V.putt(t,o,f,d*.85,.5))],
   ['boli','Boliyan Bhabhi','🎤','2 braid - - mic wi',0,.25,at(32,{6:ho,14:ho,22:ho,30:ho})],
   ['manja','Manja Mama','🪁','3 gtopi rani - kite m',0,.3,at(32,{4:(t,o,sd)=>V.whoosh(t,o,.3,sd*5,1),20:(t,o,sd)=>V.whoosh(t,o,.3,sd*5,0)})],
   ['chikki','Chikki Chhotu','🥜','2 spike - - sticks k',0,.15,drum('w..w..w.w..w..w. w..w..w.w.ww.ww.',{w:(t,o)=>V.wood(t,o,.5,1000)})],
   ['agashi','Agashi DJ','🔊','4 dj haldi - speaker d',0,0,mel(32,2,[[0,0,3],[6,0,2],[10,0,2],[16,-1,3],[22,-1,2],[24,0,3],[28,2,2]],(t,o,f,d)=>V.sub(t,o,f,d*.8,.6))],
   ['undhiyu','Undhiyu Ba','🍲','1 bun - - pot wog',0,.12,drum('g...g.G...g.G... g...g.G..g.gG.G.',{g:(t,o)=>V.ghat(t,o,.55,165),G:(t,o)=>V.ghat(t,o,.7,247)})],
   ['kapyo','Kapyo Kaka','📣','4 gtopi mor - whis mf',0,.3,at(32,{12:kapyo,28:kapyo})],
   ['bull','Basava Garu','🐂','5 mund haldi - cym m',0,.25,drum('b...b..b....b... b...b..b..b.b.b.',{b:(t,o)=>{V.jing(t,o,.32,.15);V.bell(t,o,440,.1,.4);}})],
   ['haridasu','Haridasu Tata','🪕','4 mund sindoor - string ot',0,.4,mel(32,3,[[0,0,4],[4,2,4],[8,3,4],[12,2,4],[16,0,4],[20,-1,4],[24,0,8]],(t,o,f,d)=>V.vox(t,o,f,d*.95,'a','o',.22))],
   ['muggu','Muggu Akka','✨','2 gajra - - clap wi',0,.45,mel(32,5,[[0,0],[3,2],[6,3],[8,2],[11,0],[14,-1],[16,0],[19,2],[22,4],[24,3],[27,2],[30,0]],(t,o,f)=>V.bell(t,o,f,.12,.6))],
   ['sannai','Sannai Bava','📯','5 mund white - horn m',0,.35,mel(32,4,[[0,3,4],[4,4,2],[6,3,2],[8,2,4],[12,0,4],[16,2,4],[20,3,2],[22,4,2],[24,3,4],[28,2,2],[30,0,2]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.18,p))],
   ['dappu','Dappu Thammudu','🥁','3 band sindoor - parai k',0,.08,drum('D.dD..d.D.dD.dd. D.dD..d.D.dDdDdd',{D:(t,o)=>{V.kick(t,o,.7,240,100,.16);V.tak(t,o,.35,600);},d:(t,o)=>V.tak(t,o,.45,1500,.045)})],
   ['pongal','Pongal Paati','🍚','1 bun - - pot wogi',0,.3,at(32,{0:(t,o,sd)=>V.pour(t,o,sd*6,.28),24:(t,o)=>V.cooker(t,o,.3,.5)})],
   ['karumbu','Karumbu Kutty','🎋','3 spike - - sticks k',0,.15,at(32,{6:crunch,14:crunch,22:crunch,30:crunch})],
   ['nadas','Nadas Mama','📯','4 mund white - horn mot',0,.35,mel(32,4,[[0,4,3],[3,3,1],[4,4,4],[8,5,3],[11,4,1],[12,3,4],[16,2,4],[20,3,2],[22,2,2],[24,0,8]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.17,p))],
   ['thavil','Thavil Thambi','🪘','3 bald - - dhol mt',0,.12,drum('d.TT.Td.T.TTd.TT d.TT.Td.TdTTdTTT',{d:(t,o)=>V.ge(t,o,.75,95,1.3,.25),T:(t,o)=>{V.na(t,o,.4,1100,.07);V.tak(t,o,.22,1800,.03);}})],
   ['mani','Maattu Mani','🐄','5 mund haldi - cym m',0,.3,drum('....b.......b... ....b.......b.bb',{b:(t,o)=>V.bell(t,o,620,.16,.35)})],
   ['surya','Surya Sir','🌞','2 crown - haldi hum z',0,.5,chords(32,3,[[0,[0,2,4],15],[16,[1,3,5],15]],(t,o,fs,d)=>V.pad(t,o,fs,d,.1))]
  ],
  combos:[ // NEEDS NATIVE REVIEW
   {id:'lohri',need:['ldhol','bonfire','boli'],name:'Lohri Di Raat',title:'LOHRI DI RAAT!',sub:'Rewri, moongphali te dhol.',fx:'bonfire'},
   {id:'uttarayan',need:['manja','chikki','kapyo'],name:'Kapyo Chhe!',title:'KAPYO CHHE!',sub:'Aakhu aakash patang thi bharelu.',fx:'kites'},
   {id:'sankranti',need:['bull','haridasu','muggu'],name:'Sankranti Sambaralu',title:'SANKRANTI SAMBARALU',sub:'Muggulu, gobbemmalu, gangireddulu.',fx:'bloom'},
   {id:'pongal',need:['pongal','nadas','mani'],name:'Pongalo Pongal',title:'PONGALO PONGAL!',sub:'Paanai pongiduchu, veedu niraiyattum.',fx:'rain',icon:'🍚'}
  ],
  bandA:['Til Gud Gang','Patang Party','Ganne Ka Ras','Khichdi Collective','Bonfire Brigade','Kolam Crew','Chikki Champions','Sarson Squad','Pongal Paatis','Sankranti Stars'],
  bandB:['& The Harvest Horns','Aur Unki Patang','feat. Dadi Ki Rewri','Unplugged (Dhoop Mein)','& Sons Farms','Ka Fasal Remix','Makar Sankranti Edition','ft. Kai Baar Kata','& The Jaggery Breaks','Live From The Chhat']
};
