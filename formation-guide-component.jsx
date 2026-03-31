const { useState, useEffect, useRef } = React;

const P = {
  GK: {
    id:"GK",label:"GK",name:"Goalkeeper",
    base:{x:50,y:92},attack:{x:50,y:78},defense:{x:50,y:95},
    color:"#FFD700",role:"Last Line of Defense",
    zone:{x:24,y:78,w:52,h:20},
    baseDuties:["Your main job is to keep a clean sheet — do anything to prevent goals","Communicate constantly — direct defenders and highlight danger before it happens","Have good footwork — keep possession and play accurate balls to start attacks","Act as a sweeper when the defense pushes up — sprint out to clear balls over the top","Stay focused! You may not see the ball for long stretches but must be ready"],
    baseTip:"You're the eyes of the team. Never stop talking — even when the ball is far away!",
    attackDuties:["Push up off your line when the defense moves to the halfway line","Be ready to act as a sweeper — clear any ball played over our high defensive line","Distribute quickly and accurately — long balls or short to CBs to start attacks","Keep your concentration even though the ball will be far away most of the time","Communicate with CBs about where to position the defensive line"],
    attackTip:"When we attack, you're our last insurance policy. Stay alert and sweep behind the defense.",
    defenseDuties:["Organize the defensive wall — you see the whole field, tell them where to go","Be ready for shots — stay on your toes and get your positioning right","If they break through, come out strong and make yourself big","Communicate the offside line with your CBs — tell them when to step or drop","After a save, look to distribute quickly to start a counter-attack"],
    defenseTip:"Talk, talk, talk! Your voice is as important as your hands."
  },
  LCB: {
    id:"LCB",label:"LCB",name:"Left Center Back",
    base:{x:38,y:80},attack:{x:38,y:55},defense:{x:38,y:82},
    color:"#DC2626",role:"Defensive Rock",
    zone:{x:18,y:55,w:32,h:43},
    baseDuties:["You are one of the sole true defenders — protect the goal at all costs","Win tackles and headers — arrive at the ball before the striker","Stay patient — don't dive in! Be aware of space the striker wants to run into","Work as a unit with RCB, fullbacks, and CDM to plug gaps","Communicate with RCB on the offside trap — know when to step up or drop off"],
    baseTip:"Be brave, be strong, be smart. Your main job is to put your body on the line.",
    attackDuties:["Push up to the halfway line with the defense — trap them in their half","Keep your line with RCB — don't let gaps open between you two","Be comfortable on the ball — pass to CDM or fullbacks to start buildup","Be aware of the counter-attack — if we lose the ball, you're the last line","Communicate with GK about when to hold the high line or drop"],
    attackTip:"When we attack, hold that high line and be ready if things go wrong.",
    defenseDuties:["Win everything — headers, tackles, blocks. Nothing gets past you","Come across to cover the channel if the ball is played behind the left back","If second to the ball, hold off the striker and buy time for teammates to recover","Don't follow the striker everywhere — hold your position and protect the space","Intercept passes aimed at the space behind you — read the game"],
    defenseTip:"Stay calm. Don't chase — let the striker come to you, then win it."
  },
  RCB: {
    id:"RCB",label:"RCB",name:"Right Center Back",
    base:{x:62,y:80},attack:{x:62,y:55},defense:{x:62,y:82},
    color:"#DC2626",role:"Defensive Rock",
    zone:{x:50,y:55,w:32,h:43},
    baseDuties:["You are one of the sole true defenders — protect the goal at all costs","Win tackles and headers — arrive at the ball before the striker","Stay patient — don't dive in! Be aware of space the striker wants to run into","Work as a unit with LCB, fullbacks, and CDM to plug gaps","Communicate with LCB on the offside trap — know when to step up or drop off"],
    baseTip:"Work as a pair with your CB partner. You're stronger together.",
    attackDuties:["Push up to the halfway line with the defense — trap them in their half","Keep your line with LCB — don't let gaps open between you two","Be comfortable on the ball — pass to CDM or fullbacks to start buildup","Be aware of the counter-attack — if we lose the ball, you're the last line","If LCB goes to cover a channel, slide across to cover the center"],
    attackTip:"When we attack, hold that high line and be ready if things go wrong.",
    defenseDuties:["Win everything — headers, tackles, blocks. Nothing gets past you","Come across to cover the channel if the ball is played behind the right back","If second to the ball, hold off the striker and buy time for teammates to recover","Don't follow the striker everywhere — hold your position and protect the space","Intercept passes aimed at the space behind you — read the game"],
    defenseTip:"Stay calm. Don't chase — let the striker come to you, then win it."
  },
  LB: {
    id:"LB",label:"LB",name:"Left Back",
    base:{x:12,y:72},attack:{x:10,y:38},defense:{x:15,y:78},
    color:"#DC2626",role:"Attacking Defender",
    zone:{x:0,y:20,w:30,h:77},
    baseDuties:["You provide the team with width and passing options out wide","You're responsible for defending your flank AND supporting attacks","Create passing triangles with LCM and LW — your movement is key","You need to be very fit — up and down the pitch all game","Know when to go forward and when to stay back — timing is everything"],
    baseTip:"You need to be the fittest player on the pitch. Up and down, all game long.",
    attackDuties:["Overlap the LW — run past her and get behind the defense to put in crosses","Even if the pass doesn't come, your decoy run drags their defenders out of position","Provide width — give the midfielders space by stretching the field","Be good on the ball and keep possession — don't waste it with bad passes","The CDM will cover your position while you attack — trust the system"],
    attackTip:"When you overlap, be decisive. Get the cross in or make them respect your run.",
    defenseDuties:["Stay goal-side of the opposition winger — don't let them get behind you","Stop crosses into the box — that's your #1 defensive job","Call the LW back to help if you're getting overloaded 2v1","If isolated against two, slow them down — buy time for help to arrive","Communicate with LCB on the offside trap — stay in line"],
    defenseTip:"Be patient. Don't lunge — force the winger wide and wait for help."
  },
  RB: {
    id:"RB",label:"RB",name:"Right Back",
    base:{x:88,y:72},attack:{x:90,y:38},defense:{x:85,y:78},
    color:"#DC2626",role:"Attacking Defender",
    zone:{x:70,y:20,w:30,h:77},
    baseDuties:["You provide the team with width and passing options out wide","You're responsible for defending your flank AND supporting attacks","Create passing triangles with RCM and RW — your movement is key","You need to be very fit — up and down the pitch all game","Know when to go forward and when to stay back — timing is everything"],
    baseTip:"You need to be the fittest player on the pitch. Up and down, all game long.",
    attackDuties:["Overlap the RW — run past her and get behind the defense to put in crosses","Even if the pass doesn't come, your decoy run drags their defenders out of position","Provide width — give the midfielders space by stretching the field","Be good on the ball and keep possession — don't waste it with bad passes","The CDM will cover your position while you attack — trust the system"],
    attackTip:"When you overlap, be decisive. Get the cross in or make them respect your run.",
    defenseDuties:["Stay goal-side of the opposition winger — don't let them get behind you","Stop crosses into the box — that's your #1 defensive job","Call the RW back to help if you're getting overloaded 2v1","If isolated against two, slow them down — buy time for help to arrive","Communicate with RCB on the offside trap — stay in line"],
    defenseTip:"Be patient. Don't lunge — force the winger wide and wait for help."
  },
  HM: {
    id:"HM",label:"CDM",name:"Holding Midfielder",
    base:{x:50,y:62},attack:{x:50,y:52},defense:{x:50,y:70},
    color:"#1a1a1a",role:"The Shield",
    zone:{x:14,y:22,w:72,h:52},
    baseDuties:["You are crucial to the formation — you provide balance and security","Cover the gaps and spaces left by the rest of the team","Pick up the ball from the CBs and move it forward to start attacks","Drop into fullback positions when they go forward","Be good on the ball, calm in possession — you're the deepest midfielder"],
    baseTip:"You're the team's anchor. Without you doing your job, the whole formation falls apart.",
    attackDuties:["Cover for the fullbacks when they push forward — drop into their position","Pick up the ball from the CBs and pass it forward to the attacking players","Stay deeper than the other two midfielders — you're the safety net","Keep it simple — let LCM and RCM do the creative work further up","Be ready for the turnover — if we lose the ball, you're the first line of defense"],
    attackTip:"You're the reason the fullbacks can attack. Hold your position and let them go.",
    defenseDuties:["Occupy the hole just in front of the CBs — block the striker from finding space","Plug any holes that appear behind the fullbacks — slide across to cover","Sniff out danger — read passing lanes and intercept before they play through","Slow down the opposition's attack to give your team time to get back","If the other midfielders get pulled wide, hold the center — don't follow them"],
    defenseTip:"You're the wall in front of the defense. Stay central, stay disciplined."
  },
  LM: {
    id:"LM",label:"LCM",name:"Left Center Mid",
    base:{x:35,y:50},attack:{x:30,y:32},defense:{x:32,y:58},
    color:"#1a1a1a",role:"Engine Room",
    zone:{x:14,y:22,w:72,h:52},
    baseDuties:["You need to be very fit — you cover a huge amount of ground every game","Be good on the ball with good positioning on both sides of the ball","Work together with CDM and RCM as a trio — control the center of the pitch","Contribute to attack AND defense — you can't only do one","Don't get in each other's way — communicate so midfielders don't crowd the same space"],
    baseTip:"You do everything — attack, defend, carry the ball. You're the engine of the team.",
    attackDuties:["Carry the ball forward between the lines — dribble past opponents to connect play","Make runs past the striker to drag defenders out of position","Push forward to meet crosses on the edge of the box — you're expected to score too!","Support attacks on the left with LB and LW — create overloads","If you break through their midfield, drive at the defense or release a pass through"],
    attackTip:"When you get the ball between the lines, be dangerous. Drive forward!",
    defenseDuties:["Track back into your position — don't leave too much space behind you","Help the left side — if LB is beaten, you need to be there to cover","Press as part of the team — don't chase alone, work with CDM and RCM","Cut off passing lanes through the center — force them to play wide","If the winger needs help, get out wide — don't leave LB isolated"],
    defenseTip:"Track back first, then press. If you're caught upfield, the middle is exposed."
  },
  RM: {
    id:"RM",label:"RCM",name:"Right Center Mid",
    base:{x:65,y:50},attack:{x:70,y:32},defense:{x:68,y:58},
    color:"#1a1a1a",role:"Engine Room",
    zone:{x:14,y:22,w:72,h:52},
    baseDuties:["You need to be very fit — you cover a huge amount of ground every game","Have a high level of technical skill and close ball control in tight spaces","Work together with CDM and LCM as a trio — control the center of the pitch","Contribute to attack AND defense — you can't only do one","Quick decision-making — you often operate in small spaces in the attacking third"],
    baseTip:"You're the creative spark. Quick feet, quick brain — but always track back too.",
    attackDuties:["Be creative — play through tight spaces and create chances for the front three","Push forward to meet crosses at the edge of the box — get shots off","Make forward runs to open up space for others — your movement creates chances","Support attacks on the right with RB and RW — combine to overload the wing","Help alleviate the creative burden from the wingers by creating through the center"],
    attackTip:"You have more creative freedom — use it! But make smart decisions in tight spaces.",
    defenseDuties:["Track back into your position — don't leave too much space behind you","Help the right side — if RB is beaten, you need to be there to cover","Press as part of the team — don't chase alone, work with CDM and LCM","Cut off passing lanes through the center — force them to play wide","Don't get pulled out of position covering the flank — that leaves the center open"],
    defenseTip:"Track back first, then press. If you're caught upfield, the middle is exposed."
  },
  LF: {
    id:"LF",label:"LW",name:"Left Wing / Forward",
    base:{x:18,y:28},attack:{x:15,y:18},defense:{x:20,y:50},
    color:"#DC2626",role:"Creative Attacker",
    zone:{x:0,y:3,w:36,h:50},
    baseDuties:["Be tricky and speedy — comfortable dribbling and taking on defenders","Create goal-scoring chances for the striker and score yourself","Work well with LB behind you to overload the wing","Open up passing options with your movement — create width and depth","You must contribute on BOTH sides of the ball — attacking AND defending"],
    baseTip:"Your energy carries the game to the opponent. Be brave, be tricky, work hard.",
    attackDuties:["Be fearless with your creativity — constantly try to create chances","Overload the wing with LB — get crosses in or use the overlap as a decoy","Cut inside to drive at the defense — get a shot off or slip someone through","When the cross comes from the right side, make a run into the box to attack it","Your dribbling and movement should create havoc — make defenders unsure who to mark"],
    attackTip:"Take risks in the final third! This is where you're allowed to be creative and bold.",
    defenseDuties:["Track back to support LB — this is NOT optional, even when you're tired","Drop deeper to form a 4-5-1 shape if we're under sustained pressure","If you protect the fullback, they're forced to play through our packed center","Don't let the midfielders get pulled wide to cover your flank — that creates space inside","Press their right back when they try to build from the back"],
    defenseTip:"The best wingers work just as hard defending as attacking. No excuses."
  },
  CF: {
    id:"CF",label:"ST",name:"Center Forward / Striker",
    base:{x:50,y:20},attack:{x:50,y:12},defense:{x:50,y:35},
    color:"#DC2626",role:"Goal Scorer",
    zone:{x:28,y:3,w:44,h:42},
    baseDuties:["You are the team's main goalscorer — be a good finisher with great movement","Hold up the ball even when surrounded — be tough and bring teammates into play","One-touch passing must be accurate — you'll have very little time or space","Make runs behind the defense to stretch them and create space for teammates","Unlike other formations, in the 4-3-3 you ALSO have defensive pressing duties"],
    baseTip:"Even when you don't get the ball, your run helped a teammate. Movement is everything.",
    attackDuties:["Anticipate chances — be in the right place at the right time to finish","Hold the ball up with your back to goal to let midfielders and wingers join","Make runs in behind the defense — stretches them and creates space for everyone","When crosses come in, be first to the ball — attack it aggressively","Your movement pulls defenders around — even decoy runs help your teammates"],
    attackTip:"You don't need many touches. One chance, one goal — be clinical.",
    defenseDuties:["Press their center backs — don't let them play comfortable passes out","Force them to go long or make mistakes by closing down quickly","Your pressing triggers the rest of the team — when you go, everyone goes","Stay as the highest player so we have an outlet when we win the ball back","Don't chase all over the field — press smart, stay central, cut off passing lanes"],
    defenseTip:"Your press is what starts our defense. When you press hard, the whole team follows."
  },
  RF: {
    id:"RF",label:"RW",name:"Right Wing / Forward",
    base:{x:82,y:28},attack:{x:85,y:18},defense:{x:80,y:50},
    color:"#DC2626",role:"Creative Attacker",
    zone:{x:64,y:3,w:36,h:50},
    baseDuties:["Be tricky and speedy — comfortable dribbling and taking on defenders","Create goal-scoring chances for the striker and score yourself","Work well with RB behind you to overload the wing","Open up passing options with your movement — create width and depth","You must contribute on BOTH sides of the ball — attacking AND defending"],
    baseTip:"Your energy carries the game to the opponent. Be brave, be tricky, work hard.",
    attackDuties:["Be fearless with your creativity — constantly try to create chances","Overload the wing with RB — get crosses in or use the overlap as a decoy","Cut inside to drive at the defense — get a shot off or slip someone through","When the cross comes from the left side, make a run into the box to attack it","Your dribbling and movement should create havoc — make defenders unsure who to mark"],
    attackTip:"Take risks in the final third! This is where you're allowed to be creative and bold.",
    defenseDuties:["Track back to support RB — this is NOT optional, even when you're tired","Drop deeper to form a 4-5-1 shape if we're under sustained pressure","If you protect the fullback, they're forced to play through our packed center","Don't let the midfielders get pulled wide to cover your flank — that creates space inside","Press their left back when they try to build from the back"],
    defenseTip:"The best wingers work just as hard defending as attacking. No excuses."
  }
};

// ─── Arrows & Triangles ──────────────────────────────────────
const ATTACK_ARROWS = [
  {from:"LB",toX:10,toY:28,label:"Overlap"},{from:"RB",toX:90,toY:28,label:"Overlap"},
  {from:"LM",toX:25,toY:22,label:"Support"},{from:"RM",toX:75,toY:22,label:"Support"},
  {from:"HM",toX:50,toY:45,label:"Cover"},
  {from:"LF",toX:35,toY:12,label:"Cut inside"},{from:"RF",toX:65,toY:12,label:"Cut inside"},
];
const DEFENSE_ARROWS = [
  {from:"LF",toX:20,toY:50,label:"Track back"},{from:"RF",toX:80,toY:50,label:"Track back"},
  {from:"HM",toX:50,toY:70,label:"Shield CBs"},{from:"CF",toX:50,toY:35,label:"Press"},
];
const TRIANGLES = [
  {points:["LB","LM","LF"]},{points:["RB","RM","RF"]},{points:["LM","HM","RM"]},
];

// ─── Team Shape ──────────────────────────────────────────────
const SHAPE = {
  hp:{label:"High Press",tagline:"We have the ball — PUSH UP as a team!",
    coaching:["Defense pushes to the halfway line — trap them in their half!","Wingers stay HIGH and WIDE — stretch the other team apart","Midfield squeezes up tight — close the gap between lines","Striker presses their center backs — don't let them play out","GK acts as sweeper — ready to clear balls over the top"],
    pos:{GK:{x:50,y:68},LCB:{x:38,y:52},RCB:{x:62,y:52},LB:{x:14,y:50},RB:{x:86,y:50},HM:{x:50,y:42},LM:{x:32,y:33},RM:{x:68,y:33},LF:{x:15,y:18},CF:{x:50,y:14},RF:{x:85,y:18}}},
  mb:{label:"Mid Block",tagline:"Stay compact — but wingers DO NOT drop onto fullbacks!",
    coaching:["Defense holds around our own 18-yard box","Wingers stay AHEAD of fullbacks and WIDER — you're our outlet!","If wingers sit on top of fullbacks, we lose all our attacking shape","Midfield stays compact — protect the center of the field","Striker stays highest — ready to spring on turnovers"],
    pos:{GK:{x:50,y:90},LCB:{x:38,y:75},RCB:{x:62,y:75},LB:{x:14,y:72},RB:{x:86,y:72},HM:{x:50,y:60},LM:{x:33,y:52},RM:{x:67,y:52},LF:{x:12,y:42},CF:{x:50,y:32},RF:{x:88,y:42}}}
};

function lerp(a,b,t){return a+(b-a)*t}
function getShapeCoords(id,v){const h=SHAPE.hp.pos[id],m=SHAPE.mb.pos[id],t=v/100;return{x:lerp(h.x,m.x,t),y:lerp(h.y,m.y,t)}}

// ─── Components ──────────────────────────────────────────────
function PlayerDot({pos,pd,coords,isSel,onClick}){
  return(<g onClick={()=>onClick(pos)} style={{cursor:"pointer"}}>
    <circle cx={`${coords.x}%`} cy={`${coords.y}%`} r={isSel?18:14} fill={pd.color}
      stroke={isSel?"#fff":"rgba(0,0,0,0.3)"} strokeWidth={isSel?3:1.5}
      style={{transition:"cx 0.4s ease,cy 0.4s ease,r 0.3s ease",filter:isSel?"drop-shadow(0 0 12px rgba(220,38,38,0.6))":"drop-shadow(0 2px 4px rgba(0,0,0,0.3))"}}/>
    <text x={`${coords.x}%`} y={`${coords.y}%`} textAnchor="middle" dominantBaseline="central"
      fill={pd.color==="#FFD700"?"#000":"#fff"} fontSize="9" fontWeight="800"
      fontFamily="'Barlow Condensed',sans-serif" letterSpacing="0.5"
      style={{transition:"all 0.4s ease",pointerEvents:"none"}}>{pd.label}</text>
  </g>)
}
function GhostDot({pd,base}){
  return <circle cx={`${base.x}%`} cy={`${base.y}%`} r="12" fill="none"
    stroke={pd.color==="#1a1a1a"?"rgba(26,26,26,0.25)":"rgba(220,38,38,0.2)"}
    strokeWidth="1.5" strokeDasharray="3 3"/>
}
function Arrow({from,toX,toY,label,color}){
  return(<g style={{opacity:0.7}}>
    <line x1={`${from.x}%`} y1={`${from.y}%`} x2={`${toX}%`} y2={`${toY}%`}
      stroke={color} strokeWidth="2" strokeDasharray="6 4"
      markerEnd={`url(#arrow-${color==="#DC2626"?"red":"blue"})`}
      style={{animation:"dashMove 1.5s linear infinite"}}/>
    <text x={`${(from.x+toX)/2}%`} y={`${(from.y+toY)/2-2}%`} textAnchor="middle" fill={color}
      fontSize="8" fontWeight="700" fontFamily="'Barlow Condensed',sans-serif"
      style={{textTransform:"uppercase",letterSpacing:"1px"}}>{label}</text>
  </g>)
}
function Triangle({tri,cm}){
  const pts=tri.points.map(id=>({x:(cm[id].x/100)*500,y:(cm[id].y/100)*700}));
  return <path d={`M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} L ${pts[2].x} ${pts[2].y} Z`}
    fill="rgba(220,38,38,0.12)" stroke="rgba(220,38,38,0.5)" strokeWidth="2" strokeDasharray="6 4"
    style={{animation:"pulse 2s ease-in-out infinite",transition:"all 0.5s ease"}}/>
}
function CompactZone({cm}){
  const dY=Math.max(cm.LCB.y,cm.RCB.y,cm.LB.y,cm.RB.y);
  const fY=Math.min(cm.LF.y,cm.CF.y,cm.RF.y);
  return <rect x="20" y={(fY/100)*700} width="460" height={((dY-fY)/100)*700}
    fill="rgba(220,38,38,0.06)" stroke="rgba(220,38,38,0.15)" strokeWidth="1" strokeDasharray="8 4" rx="4"
    style={{transition:"all 0.4s ease"}}/>
}
function GapBracket({fb,w,side}){
  const gap=Math.abs(w.y-fb.y),good=gap>=18,color=good?"#22c55e":"#ef4444";
  const bx=side==="left"?8:492,y1=(fb.y/100)*700,y2=(w.y/100)*700;
  return(<g style={{transition:"all 0.4s ease"}}>
    <line x1={bx} y1={y1} x2={bx} y2={y2} stroke={color} strokeWidth="2" strokeDasharray="4 3"/>
    <line x1={bx-4} y1={y1} x2={bx+4} y2={y1} stroke={color} strokeWidth="2"/>
    <line x1={bx-4} y1={y2} x2={bx+4} y2={y2} stroke={color} strokeWidth="2"/>
    <text x={bx} y={(y1+y2)/2+4} textAnchor="middle" fill={color} fontSize="11" fontWeight="800"
      fontFamily="'Barlow Condensed',sans-serif">{good?"✓":"✗"}</text>
  </g>)
}
function FieldLines(){
  return(<g stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none">
    <rect x="20" y="20" width="460" height="660" rx="2"/>
    <line x1="20" y1="350" x2="480" y2="350"/>
    <circle cx="250" cy="350" r="60"/><circle cx="250" cy="350" r="3" fill="rgba(255,255,255,0.5)"/>
    <rect x="130" y="20" width="240" height="115"/><rect x="175" y="20" width="150" height="45"/>
    <circle cx="250" cy="100" r="3" fill="rgba(255,255,255,0.4)"/>
    <rect x="130" y="565" width="240" height="115"/><rect x="175" y="635" width="150" height="45"/>
    <circle cx="250" cy="600" r="3" fill="rgba(255,255,255,0.4)"/>
    <rect x="200" y="8" width="100" height="12" rx="2" strokeWidth="2" stroke="rgba(255,255,255,0.5)"/>
    <rect x="200" y="680" width="100" height="12" rx="2" strokeWidth="2" stroke="rgba(255,255,255,0.5)"/>
    <path d="M 185 135 A 60 60 0 0 0 315 135"/><path d="M 185 565 A 60 60 0 0 1 315 565"/>
    <path d="M 20 30 A 10 10 0 0 0 30 20"/><path d="M 470 20 A 10 10 0 0 0 480 30"/>
    <path d="M 30 680 A 10 10 0 0 0 20 670"/><path d="M 480 670 A 10 10 0 0 0 470 680"/>
  </g>)
}

// ─── Main ────────────────────────────────────────────────────
function App(){
  const [mode,setMode]=useState("base");
  const [sel,setSel]=useState(null);
  const [tri,setTri]=useState(false);
  const [slider,setSlider]=useState(0);
  const ref=useRef(null);
  useEffect(()=>{if(sel&&ref.current)ref.current.scrollIntoView({behavior:"smooth",block:"nearest"})},[sel]);

  function gc(id){const p=P[id];if(mode==="shape")return getShapeCoords(id,slider);if(mode==="attack")return p.attack;if(mode==="defense")return p.defense;return p.base}
  const cm={};Object.keys(P).forEach(id=>{cm[id]=gc(id)});
  const arrows=mode==="attack"?ATTACK_ARROWS:mode==="defense"?DEFENSE_ARROWS:[];
  const ac=mode==="attack"?"#DC2626":"#3B82F6";
  const sLabel=slider<50?"High Press":"Mid Block";
  const sPhase=slider<50?SHAPE.hp:SHAPE.mb;

  // Mode-specific duties/tip for selected player
  function getDuties(id){
    const p=P[id];
    if(mode==="attack")return{duties:p.attackDuties,tip:p.attackTip,label:"When We Attack"};
    if(mode==="defense")return{duties:p.defenseDuties,tip:p.defenseTip,label:"When They Attack"};
    return{duties:p.baseDuties,tip:p.baseTip,label:"Your Role"};
  }

  const mi={
    base:{title:"Base Formation",desc:"Starting positions — where each player lines up at kickoff"},
    attack:{title:"Attacking Shape",desc:"How players move when we have the ball"},
    defense:{title:"Defensive Shape",desc:"How players shift when the other team has the ball"},
    shape:{title:`Team Shape: ${sLabel}`,desc:sPhase.tagline},
  };

  return(
    <div style={{fontFamily:"'Barlow Condensed','Segoe UI',sans-serif",background:"linear-gradient(145deg,#0a0a0a 0%,#1a1a1a 50%,#0d0d0d 100%)",color:"#f5f5f5",minHeight:"100vh",padding:0,margin:0}}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Oswald:wght@700&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes dashMove{to{stroke-dashoffset:-20}}
        @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .mb{padding:8px 4px;border:2px solid #333;background:transparent;color:#999;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all .3s;flex:1;min-width:0;white-space:nowrap}
        .mb:hover{border-color:#DC2626;color:#DC2626}.mb.a{background:#DC2626;border-color:#DC2626;color:#fff}
        .tb{padding:8px 16px;border:1px solid #333;background:transparent;color:#777;font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all .3s;border-radius:4px}
        .tb.on{background:rgba(220,38,38,.15);border-color:#DC2626;color:#DC2626}
        .di{padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:flex-start;gap:10px}.di:last-child{border-bottom:none}
        .ss{-webkit-appearance:none;appearance:none;width:100%;height:10px;border-radius:5px;outline:none;background:linear-gradient(90deg,#DC2626 0%,#661111 50%,#333 100%);cursor:pointer}
        .ss::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;border-radius:50%;background:#DC2626;cursor:grab;border:3px solid #fff;box-shadow:0 2px 10px rgba(220,38,38,.5)}
        .ci{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;background:rgba(255,255,255,.03);border-radius:6px;border:1px solid #222}
      `}</style>

      {/* Header */}
      <div style={{padding:"24px 20px 16px",borderBottom:"3px solid #DC2626",background:"linear-gradient(180deg,rgba(220,38,38,.1) 0%,transparent 100%)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"#DC2626",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"#fff",fontFamily:"'Oswald',sans-serif"}}>W</div>
          <div style={{fontSize:11,fontWeight:700,color:"#DC2626",textTransform:"uppercase",letterSpacing:3}}>Warrior Girls SC</div>
        </div>
        <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:32,fontWeight:700,margin:"8px 0 4px",letterSpacing:1,lineHeight:1,textTransform:"uppercase"}}>4-3-3 Formation Guide</h1>
        <p style={{fontSize:14,color:"#999",margin:0,fontWeight:400,letterSpacing:.5}}>Tap any player to learn their role</p>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #222"}}>
        {["base","attack","defense","shape"].map((m,i)=>(
          <button key={m} className={`mb ${mode===m?"a":""}`}
            onClick={()=>{setMode(m);setSel(null)}} style={{borderRadius:0,borderRight:i<3?"none":undefined}}>
            {m==="base"?"⚽ Positions":m==="attack"?"⚔️ Attack":m==="defense"?"🛡️ Defend":"📏 Shape"}
          </button>
        ))}
      </div>

      {/* Info Bar */}
      <div style={{padding:"12px 20px",background:"rgba(220,38,38,.05)",borderBottom:"1px solid #1a1a1a"}}>
        <div style={{fontSize:16,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:"#DC2626",marginBottom:2}}>{mi[mode].title}</div>
        <div style={{fontSize:13,color:"#888"}}>{mi[mode].desc}</div>
      </div>

      {mode==="attack"&&(<div style={{padding:"8px 20px",display:"flex",justifyContent:"flex-end"}}>
        <button className={`tb ${tri?"on":""}`} onClick={()=>setTri(!tri)}>△ Passing Triangles {tri?"ON":"OFF"}</button>
      </div>)}

      {mode==="shape"&&(<div style={{padding:"16px 20px 8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontSize:12,fontWeight:800,color:slider<50?"#DC2626":"#555",textTransform:"uppercase",letterSpacing:2,transition:"color .3s"}}>⬆ High Press</span>
          <span style={{fontSize:12,fontWeight:800,color:slider>=50?"#DC2626":"#555",textTransform:"uppercase",letterSpacing:2,transition:"color .3s"}}>Mid Block ⬇</span>
        </div>
        <input type="range" className="ss" min="0" max="100" value={slider} onChange={e=>setSlider(Number(e.target.value))}/>
        <div style={{textAlign:"center",marginTop:10,fontSize:13,color:"#777",fontWeight:600}}>↔ Drag to move the whole team up and down the field</div>
      </div>)}

      {/* Field */}
      <div style={{padding:"12px"}}>
        <svg viewBox="0 0 500 700" style={{width:"100%",maxWidth:520,margin:"0 auto",display:"block",borderRadius:8,overflow:"hidden",border:"2px solid #222"}} preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 Z" fill="#DC2626"/></marker>
            <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 Z" fill="#3B82F6"/></marker>
            <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a5e1a"/><stop offset="50%" stopColor="#1d6b1d"/><stop offset="100%" stopColor="#165016"/></linearGradient>
            <pattern id="gr" patternUnits="userSpaceOnUse" width="500" height="40"><rect width="500" height="20" fill="rgba(255,255,255,.015)"/></pattern>
          </defs>
          <rect width="500" height="700" fill="url(#fg)" rx="6"/><rect width="500" height="700" fill="url(#gr)" rx="6"/>
          <FieldLines/>
          <text x="250" y="50" textAnchor="middle" fill="rgba(255,255,255,.2)" fontSize="12" fontWeight="700" fontFamily="'Barlow Condensed',sans-serif" letterSpacing="4">ATTACKING →</text>
          <text x="250" y="665" textAnchor="middle" fill="rgba(255,255,255,.2)" fontSize="12" fontWeight="700" fontFamily="'Barlow Condensed',sans-serif" letterSpacing="4">← DEFENDING</text>

          {mode==="shape"&&<CompactZone cm={cm}/>}
          {mode==="shape"&&<><GapBracket fb={cm.LB} w={cm.LF} side="left"/><GapBracket fb={cm.RB} w={cm.RF} side="right"/></>}
          {mode==="attack"&&tri&&TRIANGLES.map((t,i)=><Triangle key={i} tri={t} cm={cm}/>)}
          {(mode==="attack"||mode==="defense")&&Object.entries(P).map(([k,pd])=><GhostDot key={`g-${k}`} pd={pd} base={pd.base}/>)}

          {/* Zone highlight */}
          {sel&&P[sel].zone&&(()=>{
            const z=P[sel].zone,px=(z.x/100)*500,py=(z.y/100)*700,pw=(z.w/100)*500,ph=(z.h/100)*700;
            const c=P[sel].color;
            const fc=c==="#FFD700"?"rgba(255,215,0,.12)":c==="#1a1a1a"?"rgba(255,255,255,.08)":"rgba(220,38,38,.12)";
            const sc=c==="#FFD700"?"rgba(255,215,0,.5)":c==="#1a1a1a"?"rgba(255,255,255,.3)":"rgba(220,38,38,.45)";
            return(<g><rect x={px} y={py} width={pw} height={ph} fill={fc} stroke={sc} strokeWidth="2.5" strokeDasharray="8 4" rx="6" style={{animation:"pulse 2.5s ease-in-out infinite"}}/>
              <text x={px+pw/2} y={py+16} textAnchor="middle" fill={sc} fontSize="10" fontWeight="800" fontFamily="'Barlow Condensed',sans-serif" letterSpacing="2" style={{textTransform:"uppercase"}}>{P[sel].label} Zone</text></g>)
          })()}

          {arrows.map((a,i)=><Arrow key={i} from={cm[a.from]} toX={a.toX} toY={a.toY} label={a.label} color={ac}/>)}
          {Object.entries(P).map(([k,pd])=><PlayerDot key={k} pos={k} pd={pd} coords={cm[k]} isSel={sel===k} onClick={setSel}/>)}
        </svg>
      </div>

      {/* Detail Panel */}
      {sel&&(()=>{
        const d=getDuties(sel),p=P[sel];
        const headerBg=mode==="attack"?"linear-gradient(90deg,#DC2626,#991b1b)":mode==="defense"?"linear-gradient(90deg,#1e40af,#1e3a8a)":"linear-gradient(90deg,#DC2626,#991b1b)";
        return(
        <div ref={ref} style={{margin:"0 12px 20px",background:"linear-gradient(135deg,#111,#1a1a1a)",border:`2px solid ${mode==="defense"?"#3B82F6":"#DC2626"}`,borderRadius:8,overflow:"hidden",animation:"slideUp .3s ease"}}>
          <div style={{padding:"16px 20px",background:headerBg,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,textTransform:"uppercase",lineHeight:1.1}}>{p.name}</div>
              <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.7)",textTransform:"uppercase",letterSpacing:2}}>{p.role}</div>
            </div>
            <button onClick={()=>setSel(null)} style={{width:32,height:32,borderRadius:"50%",background:"rgba(0,0,0,.3)",border:"none",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          <div style={{padding:"16px 20px"}}>
            <div style={{fontSize:11,fontWeight:700,color:mode==="defense"?"#60a5fa":"#DC2626",textTransform:"uppercase",letterSpacing:2,marginBottom:10}}>{d.label}</div>
            {d.duties.map((duty,i)=>(
              <div key={i} className="di">
                <span style={{color:mode==="defense"?"#60a5fa":"#DC2626",fontSize:14,fontWeight:800,minWidth:20,textAlign:"center"}}>{i+1}</span>
                <span style={{fontSize:14,color:"#ccc",lineHeight:1.4}}>{duty}</span>
              </div>
            ))}
          </div>
          <div style={{margin:"0 16px 16px",padding:"12px 16px",background:mode==="defense"?"rgba(59,130,246,.08)":"rgba(220,38,38,.08)",borderLeft:`3px solid ${mode==="defense"?"#3B82F6":"#DC2626"}`,borderRadius:"0 6px 6px 0"}}>
            <div style={{fontSize:10,fontWeight:700,color:mode==="defense"?"#60a5fa":"#DC2626",textTransform:"uppercase",letterSpacing:2,marginBottom:4}}>Coach's Tip</div>
            <div style={{fontSize:14,color:"#ddd",fontStyle:"italic",lineHeight:1.5}}>"{d.tip}"</div>
          </div>
        </div>)
      })()}

      {/* Coaching Points */}
      {!sel&&(<div style={{padding:"20px",borderTop:"1px solid #222"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#DC2626",textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>
          {mode==="base"&&"Formation Keys"}{mode==="attack"&&"Attacking Principles"}{mode==="defense"&&"Defensive Principles"}{mode==="shape"&&`${sLabel} — Coaching Points`}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {mode==="base"&&[
            {icon:"⚡",text:"ENERGY! This formation demands high intensity and off-the-ball movement"},
            {icon:"🔺",text:"4 defenders, 3 midfielders, 3 forwards — designed to be offensive"},
            {icon:"🔗",text:"Players form triangles all over the pitch for quick passing options"},
            {icon:"🏃‍♀️",text:"Everyone has a job in attack AND defense — no passengers"},
            {icon:"🔄",text:"Tactically flexible — can shift to 4-5-1 defending or 3-4-3 attacking"},
          ].map((item,i)=><div key={i} className="ci"><span style={{fontSize:18}}>{item.icon}</span><span style={{fontSize:14,color:"#bbb"}}>{item.text}</span></div>)}
          {mode==="attack"&&[
            {icon:"⬆️",text:"Defense pushes to the halfway line — trap them with 7 players attacking"},
            {icon:"↗️",text:"Fullbacks overlap wingers to create 2v1s and get crosses in"},
            {icon:"🔄",text:"Constant movement and position switches — confuse who marks who"},
            {icon:"△",text:"Passing triangles arise all over the pitch to dominate possession"},
            {icon:"📐",text:"Width from wingers stretches the defense and creates gaps for midfielders"},
            {icon:"📦",text:"Crosses need bodies in the box — opposite winger and a midfielder must be there"},
          ].map((item,i)=><div key={i} className="ci"><span style={{fontSize:18}}>{item.icon}</span><span style={{fontSize:14,color:"#bbb"}}>{item.text}</span></div>)}
          {mode==="defense"&&[
            {icon:"⬆️",text:"Press together as a TEAM — one player chasing alone is useless"},
            {icon:"🧱",text:"Compress the space — force them to go long or make mistakes"},
            {icon:"🛡️",text:"CDM plugs holes behind fullbacks and blocks the striker's space"},
            {icon:"🔒",text:"Wingers can drop to form 4-5-1 under pressure — but stay ahead of fullbacks!"},
            {icon:"⚠️",text:"Watch for balls over the top! CBs and GK must be ready for counter-attacks"},
            {icon:"📢",text:"If they switch the ball across the field, the whole team must shift together"},
          ].map((item,i)=><div key={i} className="ci"><span style={{fontSize:18}}>{item.icon}</span><span style={{fontSize:14,color:"#bbb"}}>{item.text}</span></div>)}
          {mode==="shape"&&sPhase.coaching.map((text,i)=><div key={i} className="ci">
            <span style={{color:"#DC2626",fontSize:14,fontWeight:800,minWidth:20,textAlign:"center"}}>{i+1}</span>
            <span style={{fontSize:14,color:"#bbb",lineHeight:1.4}}>{text}</span></div>)}
        </div>
        {mode==="shape"&&(<div style={{marginTop:16,padding:"14px 16px",background:"rgba(220,38,38,.08)",borderLeft:"4px solid #DC2626",borderRadius:"0 8px 8px 0"}}>
          <div style={{fontSize:11,fontWeight:800,color:"#DC2626",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>Key Concept: Winger Spacing</div>
          <div style={{fontSize:14,color:"#ccc",lineHeight:1.6}}>
            {slider<50?"In the high press, wingers are our HIGHEST outfield players on the flanks. They press the opponent's fullbacks and cut off easy passes out wide. The whole team squeezes up behind them — no big gaps between the lines. The defense pushes to the halfway line to trap them."
              :"In the mid block, wingers MUST stay AHEAD of the fullbacks — not right next to them! If a winger drops onto the fullback, we lose our outlet and become a flat line of 6 across the back. That's NOT a 4-3-3 anymore. Wingers stay higher and wider so when we win the ball, we have someone to play to immediately."}
          </div>
          <div style={{marginTop:12,display:"flex",gap:12}}>
            <div style={{flex:1,padding:"10px",borderRadius:6,background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.3)",textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#22c55e",textTransform:"uppercase",letterSpacing:1}}>✓ Correct</div>
              <div style={{fontSize:12,color:"#aaa",marginTop:3}}>LW ahead + wider than LB</div>
              <div style={{fontSize:12,color:"#aaa"}}>RW ahead + wider than RB</div>
            </div>
            <div style={{flex:1,padding:"10px",borderRadius:6,background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#ef4444",textTransform:"uppercase",letterSpacing:1}}>✗ Wrong</div>
              <div style={{fontSize:12,color:"#aaa",marginTop:3}}>Winger on top of fullback</div>
              <div style={{fontSize:12,color:"#aaa"}}>Creates a flat 6 across the back</div>
            </div>
          </div>
        </div>)}
      </div>)}

      <div style={{padding:"16px 20px",borderTop:"1px solid #1a1a1a",textAlign:"center",color:"#444",fontSize:11,letterSpacing:1,textTransform:"uppercase"}}>
        Warrior Girls SC • 4-3-3 Tactical Guide
      </div>
    </div>
  )
}
