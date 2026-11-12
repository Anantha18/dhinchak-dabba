// Shaadi Season: a festival pack that unlocks after one pack is fully completed.
import {V,mkfq,drum,mel,chords,at} from '../js/engine.js';
const cheer=(t,o)=>[294,370,440].forEach((f,i)=>V.vox(t+i*.012,o,f,.42,'e','a',.3,f*1.06));
const clink=(t,o)=>V.steel(t,o,.3,1480);
const ding=(t,o)=>{V.bell(t,o,1318.5,.2,.7);V.bell(t+.09,o,1760,.2,.9);};
const shut=(t,o)=>{V.tak(t,o,.35,3000,.02);V.tak(t+.07,o,.3,2200,.03);};
export default {
  key:'s', L:32, bar:16, sd:60/110/4, sw:.1, fq:mkfq([0,2,4,5,7,9,10],5),
  title:'Shaadi Season', tag:'Baraat aa gayi · Naacho', lang:'en', pat:'zari',
  theme:{art:'lights',toran:'genda',f1:'#f5b301',f2:'#b3274a',f3:'#ff3d86',bg1:'#6e1a3e',bg2:'#3a1140'},
  ui:{play:'Bajao',pause:'Ruko',shuf:'Jugaad',clr:'Saaf karo',shr:'Share karo',rec:'Record',empty:'Khaali',muted:'CHUP',
    full:'Stage full hai. Kisi ko hatao.',pick:'Pehle neeche se ek sound chuno',
    silent:'Awaaz nahi aa rahi? Silent mode band karo aur dobara tap karo.',
    foot:'SHAADI SEASON  ·  YE CODE DAALO, YE GAANA BAJAO',
    hint:'Tap a sound to add it. Tap a player to mute. Four secret combos are hiding.',
    start:'Baraat shuru karo: tap Baraat Dholi below, then add a sound from each shelf.',
    cap:(b,c)=>`"${b}" ne Shaadi Season pe gaana drop kiya. Mix code: ${c}. Tumhari baraat isse better hai kya?`},
  groups:['Baraat','Sangeet','Dhun','Rishtedaar','Chhupa Rustam'],
  sounds:[
   ['dhol','Baraat Dholi','🥁','3 safa rani - dhol m',0,.08,drum('K.tkK.t.K.tkK.tt K.tkK.t.KtKtKttt',{K:(t,o)=>{V.kick(t,o,.95,170,52,.32);V.tak(t,o,.3,900);},t:(t,o)=>V.tak(t,o,.5,1000),k:(t,o)=>V.tak(t,o,.3,700,.04)})],
   ['dholki','Dholki Dadi','🪘','1 pallu haldi - tabla wo',0,.12,drum('D.g.n.g.D.gnn.g. D.g.n.g.DgnDgnnn',{D:(t,o)=>{V.ge(t,o,.7,110,1.4,.25);V.na(t,o,.4,700,.12);},g:(t,o)=>V.ge(t,o,.55,110,1.5,.2),n:(t,o)=>V.na(t,o,.45,700,.1)})],
   ['claps','Sangeet Aunty','👏','2 lowbun - - clap wi',0,.2,drum('..c...c...c.c.c. ..c...c...c.cccc',{c:(t,o)=>V.clap(t,o,.5)})],
   ['ghodi','Ghodi Wala','🐴','4 safa mor - cym m wood',0,.12,drum('h.h...h.h.h...h. h.h...h.h.h.hhh.',{h:(t,o)=>V.hoof(t,o,.55)})],
   ['ghungroo','Ghungroo Guddi','🔔','2 braid rani - cym wk',0,.2,drum('j.j.jjj.j.j.jjj. j.j.jjj.j.jjjjjj',{j:(t,o)=>V.jing(t,o,.36,.07)})],
   ['dj','DJ Babu','🔊','3 dj haldi - speaker d',0,0,mel(32,2,[[0,0,3],[4,0,1],[6,0,2],[10,0,2],[14,0,1],[16,3,3],[22,3,2],[24,4,3],[28,4,1],[30,-3,2]],(t,o,f,d)=>V.sub(t,o,f,d*.8,.6))],
   ['master','Band Master','🪗','4 cap maroon - box m',0,.25,chords(32,3,[[0,[0,2,4],6],[8,[0,2,4],6],[16,[3,5,7],7],[24,[4,6,8],6]],(t,o,fs,d)=>V.pad(t,o,fs,d,.1))],
   ['genset','Genset Bhaiya','⚙️','5 cap khaki - wheel m',0,0,mel(32,2,Array.from({length:16},(_,i)=>[i*2,0,2]),(t,o,f,d)=>V.putt(t,o,f,d*.85,.32))],
   ['sitar','Sitar Sasurji','🪕','3 pagri jamun - string mo',0,.3,mel(32,3,[[0,0,2],[2,4,2],[4,7,2],[6,4,2],[8,0,2],[10,4,2],[12,7,2],[14,9,2],[16,3,2],[18,5,2],[20,7,2],[22,5,2],[24,4,2],[26,6,2],[28,8,2],[30,6,2]],(t,o,f,d)=>V.pluck(t,o,f,d+.2,.24,'sawtooth',8,-.02))],
   ['pandit','Shagun Pandit','🧘','2 bald - - hum ot',0,.4,mel(32,3,[[0,0,7],[8,0,7],[16,3,7],[24,4,7]],(t,o,f,d)=>V.vox(t,o,f,d,'m','o',.24))],
   ['shehnai','Shehnai Chacha','📯','3 safa haldi - horn m',0,.35,mel(32,4,[[0,7,4],[4,9,2],[6,8,2],[8,7,4],[12,5,2],[14,4,2],[16,5,4],[20,7,2],[22,6,2],[24,4,4],[28,2,2],[30,4,2]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.19,p))],
   ['brass','Trumpet Tau','🎺','4 cap maroon - brass mf',0,.25,mel(32,4,[[2,0,1],[3,2,1],[4,4,2],[10,4,1],[11,2,1],[12,0,2],[18,3,1],[19,5,1],[20,7,2],[26,7,1],[27,6,1],[28,4,2],[30,4,1],[31,4,1]],(t,o,f,d)=>V.brass(t,o,f,d*.7,.26))],
   ['casio','Keys Cousin','🎹','1 side - - keys gk',0,.2,mel(32,5,[[0,0],[1,2],[2,4],[4,7,2],[8,4],[9,2],[10,0],[12,2,2],[16,3],[17,5],[18,7],[20,9,2],[24,8],[25,6],[26,4],[28,2,2]],(t,o,f,d,p)=>V.lead(t,o,f,d*.8,.12,p))],
   ['bansuri','Bansi Bhabhi','🎶','2 gajra - - flute wi',0,.45,mel(32,4,[[0,9,3],[4,7,3],[8,5,2],[10,4,2],[12,5,4],[16,10,3],[20,9,3],[24,8,2],[26,6,2],[28,4,4]],(t,o,f,d,p)=>V.flute(t,o,f,d*.9,.22,p))],
   ['saxo','Saxo Jija','🎷','4 curly - - brass d',0,.35,mel(32,3,[[0,4,3],[3,5,1],[4,7,4],[8,7,2],[10,5,2],[12,4,4],[16,7,3],[19,8,1],[20,10,4],[24,8,2],[26,7,2],[28,4,4]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.17,p))],
   ['cheer','Ek Aur Mama','🙌','3 pagri rani - clap mf',0,.3,at(32,{14:cheer,30:cheer})],
   ['khaana','Khaana Kaki','🍛','1 lowbun - - tiffin wif',0,.2,at(32,{4:clink,12:clink,20:clink,22:clink,28:clink})],
   ['lifafa','Lifafa Uncle','✉️','4 topi white - mic mog',0,.3,at(32,{8:ding,24:ding})],
   ['photo','Photo Bhaiya','📸','2 cap neel - whis d',0,.15,at(32,{6:shut,22:shut,23:shut})],
   ['phataka','Phataka Pappu','🎆','3 spike - - pom k',0,.35,at(32,{0:(t,o,sd)=>{V.whoosh(t,o,.25,sd*3,1);V.kick(t+sd*3,o,.6,200,60,.2);V.crackle(t+sd*3,o,.5,.5);},16:(t,o,sd)=>{V.whoosh(t,o,.25,sd*3,1);V.crackle(t+sd*3,o,.5,.4);}})],
   ['dulha','Dulha Bhai','🤴','2 safa gold maroon brass mz',0,.3,mel(32,4,[[0,0,2],[2,4,2],[4,7,4],[16,7,2],[18,9,2],[20,11,4]],(t,o,f,d)=>V.brass(t,o,f,d*.8,.2))]
  ],
  combos:[
   {id:'baraat',need:['dhol','brass','ghodi'],name:'Baraat Entry',title:'BARAAT ENTRY!',sub:'Ghodi nakhre kar rahi hai, dholi nahi.',fx:'fire'},
   {id:'sangeet',need:['dholki','claps','bansuri'],name:'Sangeet Night',title:'SANGEET NIGHT',sub:'Aunty squad ne stage le liya.',fx:'paper'},
   {id:'round',need:['dj','cheer','phataka'],name:'Aur Ek Round',title:'AUR EK ROUND!',sub:'DJ thak gaya, baraati nahi.',fx:'lamps'},
   {id:'khaana',need:['khaana','lifafa','shehnai'],name:'Khaana Khul Gaya',title:'KHAANA KHUL GAYA!',sub:'Lifafa do, plate lo.',fx:'rain',icon:'🍛'}
  ],
  bandA:['Ladke Wale','Ladki Wale','Baraati No. 1','Phupha Ji','Sangeet Squad','Mehendi Mandli','Dulhe Ke Dost','Buffet Battalion','Rasgulla Raiders','Door Ke Rishtedaar'],
  bandB:['& The Band Baja','Aur Unki Ghodi','feat. Naraaz Phupha','Unplugged (Genset Band)','& Sons Tent House','Ka Sangeet Remix','Muhurat Edition','ft. Bas Paanch Minute','& The Paneer Queue','Live From The Mandap']
};
