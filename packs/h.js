import {V,mkfq,drum,mel,chords,at,syl} from '../js/engine.js';
function hoi(t,o){V.cons(t,o,'h',.3);V.vox(t+.02,o,330,.16,'o','i',.45,300);}
function chai(t,o){V.cons(t,o,'c',.3);V.vox(t+.04,o,247,.2,'a','i',.36);}
function dei(t,o){V.cons(t,o,'d',.35);V.vox(t+.015,o,260,.22,'e','i',.5,200);}
export default {
  // display names and looks; ids and order above never change (mix codes depend on them)
  pat:'madhu',
  cast:{
    dhol:['Dhol Dada','3 pagri rani - dhol mf'],
    tabla:['Tabla Tau','2 topi white - tabla mo'],
    cooker:['Cooker Kaki','1 lowbun - - cooker wi'],
    tiffin:['Dabba Didi','2 braid - - tiffin w'],
    taali:['Taali Tai','4 gajra - - clap wi'],
    tanpura:['Tanpura Nani','1 bun - - string wog'],
    harmonium:['Baja Chacha','3 topi white - box m'],
    auto:['Auto Ustaad','4 cap khaki - wheel m'],
    djbass:['DJ Dhamaka','2 dj rani - speaker d'],
    hmm:['Hmm Baba','3 bald - - hum bot'],
    tumbi:['Tumbi Paaji','2 pagri mor - string m'],
    sitar:['Sharmaji Beta','1 side - - string gk'],
    shehnai:['Shehnai Phupha','3 safa rani - horn m'],
    brass:['Band Bhaiya','4 cap maroon - brass m'],
    bansuri:['Bansi Bhai','2 band mor - flute'],
    bols:['Taka Dhin Dadu','3 bald - - mic mog'],
    balle:['Balle Bebe','1 pallu haldi - clap wo'],
    haww:['Haww Aunty','2 lowbun - - gasp wi'],
    chai:['Chai Chotu','4 spike - - cup k'],
    horn:['Pom Pom Pappu','3 curly - - pom d'],
  },
  key:'h', L:32, bar:16, sd:60/104/4, sw:.14, fq:mkfq([0,2,4,5,7,9,10]),
  title:'Dhinchak Dabba', tag:'Awaaz neeche nahi hogi', lang:'en',
  ui:{play:'Bajao',pause:'Ruko',shuf:'Jugaad',clr:'Saaf karo',shr:'Share karo',rec:'Record',full:'Stage full hai. Kisi ko hatao.',pick:'Pehle neeche se ek sound chuno',silent:'Awaaz nahi aa rahi? Silent mode band karo aur dobara tap karo.',foot:'HORN OK PLEASE  ·  YE CODE DAALO, YE GAANA BAJAO',empty:'Khaali',muted:'CHUP',
      hint:'Tap a sound to add it. Tap a player to mute. Four secret combos are hiding.',
      start:'Start with a beat: tap Dhol Dada below, then add a sound from each shelf.',
      cap:(b,c)=>`"${b}" ne abhi Dhinchak Dabba pe gaana drop kiya. Mix code: ${c}. Tera band isse better hai kya?`},
  groups:['Taal','Sur','Dhun','Masala'],
  demo:[0,-1,7,-1,10,-1,16],
  sounds:[
   ['dhol','Dhol Uncle','🥁','turban',1,.08,drum('K..tK.t.K..tK.tt K..tK.t.K.tKt.tt',{K:(t,o)=>{V.kick(t,o,.95,170,55,.32);V.tak(t,o,.3,900);},t:(t,o)=>V.tak(t,o,.5,950)})],
   ['tabla','Tabla Tinku','🪘','band',0,.12,drum('D.g.n.t.n.k.D.n. D.g.n.tkn.k.DgnD',{D:(t,o)=>{V.ge(t,o,.7);V.na(t,o,.45,587);},g:(t,o)=>V.ge(t,o,.6,80,1.7),n:(t,o)=>V.na(t,o,.5,587),t:(t,o)=>V.na(t,o,.4,880,.1),k:(t,o)=>V.tak(t,o,.3,600,.04)})],
   ['cooker','Cooker Aunty','♨️','bun',0,.1,drum('..h...h...h...h. ..h...h...h.W...',{h:(t,o)=>V.hiss(t,o,.32,.06),W:(t,o)=>V.cooker(t,o,.4,.55)})],
   ['tiffin','Tiffin Tak-Tak','🍱','cap',1,.15,drum('s..s..S...s.S... s..s..S..s.sS.S.',{s:(t,o)=>V.steel(t,o,.35,880),S:(t,o)=>V.steel(t,o,.35,1174.7)})],
   ['taali','Shaadi Taali','👏','bun',0,.2,drum('....c.......c... ....c.......c.cc',{c:(t,o)=>V.clap(t,o,.55)})],
   ['tanpura','Tanpura Didi','🪕','malli',0,.35,mel(32,3,[[0,-3,4],[4,0,4],[8,0,4],[12,-7,4],[16,-3,4],[20,0,4],[24,0,4],[28,-7,4]],(t,o,f,d)=>V.pluck(t,o,f,d*1.7,.3,'sawtooth',9))],
   ['harmonium','Harmonium Chacha','🪗','cap',1,.25,chords(32,3,[[0,[0,2,4],6],[8,[0,2,4],6],[16,[-1,1,3],7],[24,[0,2,4],3],[28,[0,2,4],3]],(t,o,fs,d)=>V.pad(t,o,fs,d,.11))],
   ['auto','Auto Bhaiya','🛺','cap',1,0,mel(32,2,[[0,0,2],[3,0,2],[6,0,1],[8,0,2],[11,0,2],[14,-3,2],[16,-1,2],[19,-1,2],[22,-1,1],[24,0,2],[27,0,2],[30,-3,2]],(t,o,f,d)=>V.putt(t,o,f,d*.85,.5))],
   ['djbass','DJ Wala Bass','🔊','dj',0,0,mel(32,2,[[0,0,3],[6,0,2],[10,0,2],[14,0,1],[16,-1,3],[22,-1,2],[24,0,3],[28,0,1],[30,-3,2]],(t,o,f,d)=>V.sub(t,o,f,d*.8,.6))],
   ['hmm','Hmm Baba','🧘','vibhuti',1,.4,mel(32,3,[[0,0,7],[8,-3,7],[16,-1,7],[24,0,7]],(t,o,f,d)=>V.vox(t,o,f,d,'m','o',.26))],
   ['tumbi','Tumbi Paaji','🎸','turban',1,.15,mel(32,5,[[0,0],[1,0],[3,0],[4,2],[6,0],[8,0],[9,0],[11,0],[12,4],[13,2],[14,0],[16,0],[17,0],[19,0],[20,2],[22,0],[24,-1],[26,-1],[28,0],[29,2],[30,0]],(t,o,f)=>V.pluck(t,o,f,.17,.24,'square',6,.02))],
   ['sitar','Sharma Ji Ka Beta','🤓','specs',0,.35,mel(32,3,[[0,4,2],[2,5,2],[4,7,4],[8,6,2],[10,5,2],[12,4,4],[16,3,2],[18,4,2],[20,6,4],[24,5,2],[26,4,2],[28,2,2],[30,0,2]],(t,o,f,d)=>{V.pluck(t,o,f,d+.3,.32,'sawtooth',8,-.03);V.pluck(t,o,f*2,d+.1,.07,'sawtooth',6);})],
   ['shehnai','Shehnai Phupha','📯','turban',1,.35,mel(32,4,[[0,7,6],[6,8,2],[8,7,4],[12,5,2],[14,4,2],[16,6,6],[22,5,2],[24,4,4],[28,2,2],[30,4,2]],(t,o,f,d,p)=>V.reed(t,o,f,d*.95,.2,p))],
   ['brass','Baraat Band','🎺','cap',1,.25,mel(32,3,[[4,4,1],[6,7,1],[7,7,2],[12,4,1],[14,7,2],[20,3,1],[22,6,1],[23,6,2],[28,4,1],[29,5,1],[30,7,2]],(t,o,f,d)=>V.brass(t,o,f,d*.7,.3))],
   ['bansuri','Bansuri Bro','🎶','band',0,.45,mel(32,4,[[0,9,3],[4,8,1],[5,7,3],[8,5,2],[10,4,2],[12,5,4],[16,6,3],[20,5,1],[21,4,3],[24,2,2],[26,4,2],[28,7,4]],(t,o,f,d,p)=>V.flute(t,o,f,d*.9,.26,p))],
   ['bols','Taka-Dhimi Bhai','🗣️','band',1,.12,syl(32,[[0,'t','a'],[1,'k','a'],[2,'d','i'],[3,'.','i'],[4,'t','a'],[5,'k','a'],[6,'d','o'],[7,'.','u'],[10,'t','a'],[11,'k','a'],[12,'d','i'],[13,'.','i'],[16,'t','a'],[18,'d','i'],[20,'t','a'],[21,'k','a'],[22,'d','i'],[23,'.','i'],[24,'t','a'],[25,'k','a'],[26,'t','a'],[27,'k','a'],[28,'d','i',2.5]],147)],
   ['balle','Balle Squad','🙌','turban',1,.25,at(32,{4:hoi,12:hoi,20:hoi,26:(t,o)=>V.vox(t,o,294,.4,'o','e',.42,392),30:hoi})],
   ['haww','Log Kya Kahenge','😱','bun',0,.3,at(32,{8:(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.03,o,300,.55,'a','o',.36,560);},24:(t,o)=>{V.cons(t,o,'h',.3);V.vox(t+.03,o,300,.75,'a','o',.36,600);},29:(t,o)=>V.tak(t,o,.3,2400,.02),30:(t,o)=>V.tak(t,o,.3,2400,.02)})],
   ['chai','Chai-Chai Wala','☕','cap',1,.2,at(32,{0:chai,3:chai,16:(t,o)=>{V.cons(t,o,'c',.3);V.vox(t+.04,o,220,.85,'a','i',.36,330);},22:chai})],
   ['horn','Horn OK Please','📢','shades',1,.15,at(32,{14:(t,o)=>V.horn(t,o,.09),15:(t,o)=>V.horn(t,o,.09),26:(t,o)=>V.horn(t,o,.09),28:(t,o)=>V.horn(t,o,.42)})]
  ],
  combos:[
   {id:'baraat',need:['dhol','brass','horn'],name:'Baraat Mode',title:'BARAAT AA GAYI!',sub:'Ghodi ready hai. Naagin dance compulsory.',fx:'fire'},
   {id:'chai',need:['chai','tanpura','bansuri'],name:'Chai Pe Charcha',title:'CHAI PE CHARCHA',sub:'Baarish, pakode, aur ek cutting.',fx:'rain'},
   {id:'log',need:['haww','cooker','harmonium'],name:'Log Kya Kahenge',title:'LOG KYA KAHENGE?!',sub:'Poori colony dekh rahi hai.',fx:'eyes'},
   {id:'jugaad',need:['auto','horn','tiffin'],name:'Jugaad Express',title:'JUGAAD EXPRESS',sub:'Meter se nahi chalega, bhaiya.',fx:'auto'}
  ],
  bandA:['Sharma Ji Ka Beta','Pados Wali Aunty','Jugaadu Engineer','Bade Papa','Chintu','Door Ke Rishtedaar','Chai Tapri','Baraati No. 1','Monday Ka Mood','Golgappa Gang'],
  bandB:['& The Pressure Cookers','Aur Unka Dhol','feat. Log Kya Kahenge','Unplugged (Light Chali Gayi)','& Sons Pvt. Ltd.','Ka Asli Remix','Shaadi Season Edition','ft. 5 Minute Mein Aa Raha Hoon','& The Chai Breaks','Live From The Terrace']
};
