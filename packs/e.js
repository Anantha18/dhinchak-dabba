// Telugu pack: teenmaar dappu beats and mass energy. All regional copy below NEEDS NATIVE REVIEW.
import {V,mkfq,drum,mel,chords,at} from '../js/engine.js';
const babu=(t,o,sd)=>{V.cons(t,o,'d',.3);V.vox(t+.015,o,220,.28,'a','a',.45);V.cons(t+sd*2,o,'d',.3);V.vox(t+sd*2+.015,o,196,.3,'u','u',.45,165);};
const ayyo=(t,o,sd)=>{V.vox(t,o,440,.14,'a','i',.36);V.vox(t+sd*2,o,392,.42,'o','o',.36,294);};
const clink=(t,o)=>V.steel(t,o,.3,1760);
const wh=(a,b,d)=>(t,o)=>V.whistle(t,o,a,b,d);
export default {
  key:'e', L:24, bar:12, sd:60/150/3, sw:0, fq:mkfq([0,1,4,5,7,8,11],-2),
  title:'Teenmaar Dabba', tag:'తెలుగు · Mass ante idhe', lang:'te', pat:'ikat',
  theme:{art:'ikat',toran:'genda',f1:'#ff6a2b',f2:'#ffc21a',f3:'#2fa84a',bg1:'#5e1f44'},
  ui:{play:'Kottu!',pause:'Aagu',shuf:'Kalupu',clr:'Clear chey',shr:'Share chey',rec:'Record',empty:'Khaali',muted:'MUTE', // NEEDS NATIVE REVIEW
    full:'Stage full. Evarinaina teesey.',pick:'Mundu kinda oka sound select chey', // NEEDS NATIVE REVIEW
    silent:'Sound raavatledha? Silent mode off chesi malli tap chey.', // NEEDS NATIVE REVIEW
    foot:'SOUND HORN  ·  EE CODE VEYYI, EE PAATA VINU', // NEEDS NATIVE REVIEW
    hint:'Sound meeda tap chey. Player ni tap chesi mute chey. Naalugu secret combos unnayi.', // NEEDS NATIVE REVIEW
    start:'Mundu oka beat: kinda Dappu Babai ni tap chey, tarvata prati shelf nunchi okati.', // NEEDS NATIVE REVIEW
    cap:(b,c)=>`"${b}" ippude Teenmaar Dabba lo oka track drop chesaru. Mix code: ${c}. Nee band deenni beat chestunda?`}, // NEEDS NATIVE REVIEW
  groups:['Dappu','Sruthi','Raagam','Mass','Secret Hero'], // NEEDS NATIVE REVIEW
  sounds:[
   ['dappu','Dappu Babai','🥁','5 mund sindoor - parai m',0,.08,drum('D.dD.dD.dDdd D.dD.dDdDDdD',{D:(t,o)=>{V.kick(t,o,.8,240,100,.16);V.tak(t,o,.4,600);},d:(t,o)=>V.tak(t,o,.5,1500,.045)})],
   ['dolu','Dolu Mama','🪘','4 band haldi - dhol mf',0,.12,drum('d..d..d.dd.. d..d..d.dd.d',{d:(t,o)=>V.ge(t,o,.8,90,1.35,.24)})],
   ['bathu','Bathukamma Akka','👏','2 gajra - - clap wi',0,.2,drum('c..c..c.c... c..c..c.c.cc',{c:(t,o)=>V.clap(t,o,.55)})],
   ['gajjelu','Gajjelu Papa','🔔','3 braid - - cym wk',0,.2,drum('j.jj.jj.jj.j j.jj.jj.jjjj',{j:(t,o)=>V.jing(t,o,.4,.08)})],
   ['tiffin','Tiffin Thammudu','🍱','2 spike - - tiffin k',0,.15,drum('s..s.Ss..s.S s..s.Ss.sS.S',{s:(t,o)=>V.steel(t,o,.33,880),S:(t,o)=>V.steel(t,o,.33,1174.7)})],
   ['sruthi','Sruthi Pinni','🪗','1 lowbun - - box wi',0,.3,chords(24,3,[[0,[0,2,4],11.5],[12,[0,2,4],11.5]],(t,o,fs,d)=>V.pad(t,o,fs,d,.085))],
   ['auto','Auto Babu','🛺','4 cap khaki - wheel m',0,0,mel(24,2,[[0,0,2],[3,0,2],[6,0,2],[9,0,1],[11,1,1],[12,0,2],[15,0,2],[18,-3,2],[21,-1,2]],(t,o,f,d)=>V.putt(t,o,f,d*.85,.5))],
   ['dj','DJ Dora','🔊','3 dj mor - speaker d',0,0,mel(24,2,[[0,0,2],[3,0,1],[5,0,1],[6,0,2],[9,0,2],[12,0,2],[15,0,1],[17,0,1],[18,-3,2],[21,-1,2]],(t,o,f,d)=>V.sub(t,o,f,d*.8,.6))],
   ['tambura','Tambura Tata','🪕','4 bald - - string ot',0,.35,mel(24,3,[[0,4,3],[3,7,3],[6,7,3],[9,0,3],[12,4,3],[15,7,3],[18,7,3],[21,0,3]],(t,o,f,d)=>V.pluck(t,o,f,d*1.6,.26,'sawtooth',9))],
   ['hmm','Hmm Swami','🧘','3 bald - - hum bot',0,.4,mel(24,3,[[0,0,11],[12,0,11]],(t,o,f,d)=>V.vox(t,o,f,d,'m','o',.24))],
   ['sannai','Sannai Mavayya','📯','5 mund white - horn mo',0,.35,mel(24,4,[[0,4,3],[3,5,1],[4,4,2],[6,7,3],[9,8,1],[10,7,2],[12,5,3],[15,4,2],[17,5,1],[18,4,3],[21,2,3]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.2,p))],
   ['veena','Veena Vadina','🪕','2 gajra - - string wi',0,.35,mel(24,3,[[0,7,2],[2,8,1],[3,7,3],[6,11,3],[9,8,2],[11,7,1],[12,5,2],[14,4,1],[15,5,3],[18,4,2],[20,2,1],[21,0,3]],(t,o,f,d)=>V.pluck(t,o,f,d+.35,.3,'sawtooth',8,-.03))],
   ['flute','Flute Bujji','🎶','3 band mor - flute k',0,.45,mel(24,5,[[0,4,2],[2,5,1],[3,7,3],[6,8,2],[8,7,1],[9,5,3],[12,4,3],[15,5,1],[16,7,2],[18,4,2],[20,2,1],[21,0,3]],(t,o,f,d,p)=>V.flute(t,o,f,d*.9,.18,p))],
   ['keys','Keyboard Chinna','🎹','2 side - - keys g',0,.2,mel(24,4,[[0,0,1],[1,1,1],[3,4,1],[4,5,1],[6,7,2],[9,5,1],[10,4,1],[12,7,1],[13,8,1],[15,7,1],[16,5,1],[18,4,2],[21,1,1],[22,0,2]],(t,o,f,d,p)=>V.lead(t,o,f,d*.8,.14,p))],
   ['band','Band Mestri','🎺','4 cap maroon - brass m',0,.25,mel(24,3,[[0,0,2],[5,0,1],[6,4,2],[12,7,2],[17,7,1],[18,5,2],[21,4,1],[22,1,1],[23,0,1]],(t,o,f,d)=>V.brass(t,o,f,d*.75,.3))],
   ['babu','Babu Garu','🙏','4 short - - whis mog',0,.25,at(24,{0:babu,12:babu})],
   ['mass','Mass Raja','😎','5 curly - - pom md',0,.3,at(24,{0:(t,o)=>{V.kick(t,o,.9,140,45,.4);V.clap(t,o,.4);},18:(t,o,sd)=>V.riser(t,o,.2,sd*5.6)})],
   ['eela','Eela Bava','😙','3 curly - - whis d',0,.3,at(24,{9:wh(1800,3200,.2),21:wh(2000,3400,.14),22:wh(3400,1800,.3)})],
   ['chai','Chai Chinnodu','☕','2 spike - - cup k',0,.25,at(24,{3:clink,15:clink,17:clink})],
   ['ayyo','Ayyo Ammamma','👵','1 bun - - gasp wogi',0,.3,at(24,{6:ayyo,18:ayyo})],
   ['hero','Hero Garu','🌟','4 crown - maroon whis mdz',0,.3,mel(24,4,[[0,0,2],[2,4,1],[3,7,3],[12,7,2],[14,8,1],[15,11,3]],(t,o,f,d)=>V.brass(t,o,f,d*.8,.22))]
  ],
  combos:[ // NEEDS NATIVE REVIEW
   {id:'teenmaar',need:['dappu','sannai','eela'],name:'Teenmaar',title:'TEENMAAR!',sub:'Road antha mana dance floor.',fx:'fire'},
   {id:'bathukamma',need:['bathu','gajjelu','veena'],name:'Bathukamma',title:'BATHUKAMMA',sub:'Poolatho panduga, paatatho sandadi.',fx:'bloom'},
   {id:'mass',need:['mass','band','dj'],name:'Mass Entry',title:'MASS ENTRY!',sub:'Theatre lo eelalu, bayata cutout.',fx:'paper'},
   {id:'chai',need:['chai','auto','babu'],name:'Irani Chai Break',title:'IRANI CHAI BREAK',sub:'Oka chai, rendu biscuits.',fx:'rain'}
  ],
  bandA:['Mass Maharajas','Pinni Gari Pulihora','Share Auto Sai','Chai Bandi Batch','Tata Gari Scooter','Biryani Brothers','Punugulu Gang','Hitech City Heroes','Ammamma Army','Tank Bund Toli'], // NEEDS NATIVE REVIEW
  bandB:['& The Dappu Boys','Tharaa Local Mix','feat. Ammamma Ayyo','Unplugged (Current Poyindi)','& Sons, Ameerpet','First Day First Show','ft. Rendu Nimishallo Vastunna','& The Idli Steamers','Live From The Terrace','Vere Level Edition'] // NEEDS NATIVE REVIEW
};
