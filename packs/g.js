// Gujarati pack: garba and dandiya in a six-beat cycle. All regional copy below NEEDS NATIVE REVIEW.
import {V,mkfq,drum,mel,chords,at} from '../js/engine.js';
const kem=(t,o,sd)=>{V.cons(t,o,'k',.3);V.vox(t+.02,o,330,.13,'e','m',.42);V.cons(t+sd*1.5,o,'c',.3);V.vox(t+sd*1.5+.04,o,294,.3,'o','o',.42,247);};
const halo=(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.03,o,330,.34,'a','o',.45,294);};
const crunch=(t,o)=>{V.crackle(t,o,.5,.07);V.steel(t,o,.22,1320);};
const wh=(a,b,d)=>(t,o)=>V.whistle(t,o,a,b,d);
export default {
  key:'g', L:24, bar:12, sd:60/126/3, sw:0, fq:mkfq([0,2,3,5,7,9,10],3),
  title:'Garba Gully', tag:'ગુજરાતી · Aavo ne ramva', lang:'gu', pat:'bandh',
  theme:{art:'bandhani',toran:'bulbs',f1:'#ff3d86',f2:'#ffc21a',f3:'#4a86ff',bg1:'#6a1f5e'},
  ui:{play:'Vagado',pause:'Ubha raho',shuf:'Halavo',clr:'Saaf karo',shr:'Share karo',rec:'Record',empty:'Khaali',muted:'CHUP', // NEEDS NATIVE REVIEW
    full:'Stage full chhe. Koi ne hatavo.',pick:'Pehla niche thi ek sound pasand karo', // NEEDS NATIVE REVIEW
    silent:'Avaaj nathi aavto? Silent mode bandh kari fari tap karo.', // NEEDS NATIVE REVIEW
    foot:'HORN OK PLEASE  ·  AA CODE NAKHO, AA GEET VAGADO', // NEEDS NATIVE REVIEW
    hint:'Sound par tap karo. Player par tap karine chup karavo. Chaar secret combo santaya chhe.', // NEEDS NATIVE REVIEW
    start:'Pehla beat: niche Dholi Bhai par tap karo, pachhi darek shelf mathi ek lo.', // NEEDS NATIVE REVIEW
    cap:(b,c)=>`"${b}" e hamna Garba Gully par geet drop karyu. Mix code: ${c}. Taru band aana thi saru chhe?`}, // NEEDS NATIVE REVIEW
  groups:['Taal','Sur','Dhun','Masti','Chhupo Rustam'], // NEEDS NATIVE REVIEW
  sounds:[
   ['dhol','Dholi Bhai','🥁','3 gtopi rani - dhol m',0,.08,drum('K..K.tK..Ktt K..K.tK.tKtt',{K:(t,o)=>{V.kick(t,o,.9,150,58,.26);V.tak(t,o,.25,700);},t:(t,o)=>V.tak(t,o,.5,1200,.05)})],
   ['dandiya','Dandiya Diku','🥢','2 braid - - sticks wk',0,.15,drum('w..w.ww..w.w w..w.ww.ww.w',{w:(t,o)=>V.wood(t,o,.55,1500)})],
   ['taali','Taali Ben','👏','1 pallu rani - clap wi',0,.2,drum('c.c.c....... c.c.c.....cc',{c:(t,o)=>V.clap(t,o,.55)})],
   ['manjira','Manjira Masi','🔔','2 lowbun - - cym wi',0,.2,drum('j.jj.jj.jj.j j.jj.jj.jjjj',{j:(t,o)=>V.jing(t,o,.4,.09)})],
   ['thali','Thali Kaka','🍽️','4 gtopi mor - tiffin mf',0,.15,drum('s..S..s..S.. s..S..s.sS.S',{s:(t,o)=>V.steel(t,o,.32,990),S:(t,o)=>V.steel(t,o,.32,1320)})],
   ['peti','Peti Dada','🪗','3 topi white - box mo',0,.3,chords(24,3,[[0,[0,2,4],11.5],[12,[-1,1,3],5.5],[18,[0,2,4],5.5]],(t,o,fs,d)=>V.pad(t,o,fs,d,.09))],
   ['ektaro','Ektaro Bapu','🪕','4 mund sindoor - string mo',0,.3,mel(24,3,[[0,0,3],[3,4,3],[6,0,3],[9,4,3],[12,0,3],[15,4,3],[18,0,3],[21,4,2]],(t,o,f,d)=>V.pluck(t,o,f,d*1.3,.28,'sawtooth',9))],
   ['bass','Bass Bhai','🔊','2 dj haldi - speaker d',0,0,mel(24,2,[[0,0,2],[3,0,2],[6,0,2],[9,4,2],[12,-1,2],[15,-1,2],[18,0,2],[21,-3,3]],(t,o,f,d)=>V.sub(t,o,f,d*.8,.6))],
   ['scooty','Scooty Ben','🛵','1 lowbun - - wheel wd',0,0,mel(24,2,[[0,0,2],[3,0,1],[5,0,1],[6,0,2],[9,0,2],[12,-1,2],[15,-1,1],[17,-1,1],[18,0,2],[21,-3,2]],(t,o,f,d)=>V.putt(t,o,f,d*.85,.5))],
   ['hmm','Hmm Maharaj','🧘','3 bald - - hum ot',0,.4,mel(24,3,[[0,0,11],[12,-1,5],[18,0,5]],(t,o,f,d)=>V.vox(t,o,f,d,'m','o',.24))],
   ['shehnai','Shehnai Fua','📯','3 safa haldi - horn m',0,.35,mel(24,4,[[0,4,3],[3,5,1],[4,4,2],[6,7,3],[9,6,1],[10,4,2],[12,3,3],[15,4,2],[17,3,1],[18,2,3],[21,0,3]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.19,p))],
   ['vansali','Vansali Vir','🎶','2 gtopi mor - flute k',0,.45,mel(24,4,[[0,7,2],[2,8,1],[3,9,3],[6,11,3],[9,9,1],[10,8,2],[12,7,3],[15,8,1],[16,9,2],[18,7,2],[20,6,1],[21,4,3]],(t,o,f,d,p)=>V.flute(t,o,f,d*.9,.22,p))],
   ['casio','Keys Kaka','🎹','4 side - - keys mg',0,.2,mel(24,4,[[0,4],[1,4],[3,5],[4,4],[6,2],[7,2],[9,4],[10,2],[12,0],[13,0],[15,2],[16,4],[18,5],[19,4],[21,2],[22,0]],(t,o,f,d,p)=>V.lead(t,o,f,d*.8,.14,p))],
   ['ravan','Taar Rana','🎻','5 safa sindoor - string m',0,.4,mel(24,3,[[0,7,6],[6,9,3],[9,8,3],[12,6,6],[18,5,3],[21,4,3]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.14,p))],
   ['band','Band Baja Bhai','🎺','4 cap maroon - brass m',0,.25,mel(24,3,[[3,4,1],[5,7,1],[9,4,1],[10,7,2],[15,3,1],[17,6,1],[21,4,1],[22,5,1],[23,7,1]],(t,o,f,d)=>V.brass(t,o,f,d*.75,.28))],
   ['kem','Kem Chho Kaki','👋','1 bun - - whis wog',0,.25,at(24,{0:kem,12:kem})],
   ['halo','Halo Halo Toli','🙌','3 gtopi haldi - clap m',0,.25,at(24,{9:halo,21:halo})],
   ['fafda','Fafda Fuva','🥨','4 topi white - tiffin mof',0,.2,at(24,{3:crunch,15:crunch,16:crunch})],
   ['patang','Patang Pintu','🪁','2 spike - - kite k',0,.3,at(24,{6:(t,o,sd)=>V.whoosh(t,o,.3,sd*4,1),18:(t,o,sd)=>V.whoosh(t,o,.3,sd*4,0)})],
   ['whistle','Whistle Viru','😙','3 curly - - whis d',0,.3,at(24,{10:wh(1800,3200,.2),22:wh(3200,1800,.3)})],
   ['garbo','Garbo Rani','🪔','1 crown - rani clap wiz',0,.45,mel(24,5,[[0,0],[2,2],[3,4],[5,7],[6,4],[8,2],[9,0],[11,2],[12,-1],[14,1],[15,3],[17,6],[18,4],[20,2],[21,0],[23,2]],(t,o,f)=>V.bell(t,o,f,.11,.5))]
  ],
  combos:[ // NEEDS NATIVE REVIEW
   {id:'garba',need:['dhol','taali','shehnai'],name:'Garba Ni Raat',title:'GARBA NI RAAT!',sub:'Nav raat, nav outfit, zero sleep.',fx:'lamps'},
   {id:'dandiya',need:['dandiya','casio','halo'],name:'Dandiya Dhamaal',title:'DANDIYA DHAMAAL',sub:'Stick sambhalo, aangli bachao.',fx:'paper'},
   {id:'uttarayan',need:['patang','thali','whistle'],name:'Uttarayan',title:'UTTARAYAN!',sub:'Agashi par aakhu gaam.',fx:'kites'},
   {id:'nasto',need:['fafda','kem','peti'],name:'Nasto Time',title:'NASTO TIME',sub:'Fafda-jalebi vagar savar na pade.',fx:'rain',icon:'🫖'}
  ],
  bandA:['Garba Queens','Fafda Jalebi','Kaka Na Dandiya','Sheri Na Chhokra','Thepla Toli','Masi Ni Mandli','Undhiyu United','Dhokla Dynamos','Navratri Night Owls','Agashi Gang'], // NEEDS NATIVE REVIEW
  bandB:['& The Dandiya Sticks','Ane Emno Dhol','feat. Kaki Ni Commentary','Unplugged (Light Gai)','& Sons Traders','Nu Asli Remix','Navratri Edition','ft. Be Minute Ma Aavyo','& The Chaa Breaks','Live From The Agashi'] // NEEDS NATIVE REVIEW
};
