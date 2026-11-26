const slides = [
  {
    "tag": "FIRST FLIGHT",
    "title": "Aerodash",
    "lead": "Fly a glowing wisp through Skyshore. See how many rings you can line up in a row.",
    "items": [
      [
        "Steer",
        "Mouse, WASD or arrow keys"
      ],
      [
        "Boost",
        "Hold Space for a burst of speed"
      ]
    ],
    "notes": "Hey, I’m Luke Sere. I’m a freshman at UAlbany studying cybersecurity and business management. This is Aerodash, a game by Bryce Newton and me. The easiest way to explain it is to put you in front of a ring. You steer this little glowing wisp, fly through, and look for the next one. You can learn most of the game in one flight."
  },
  {
    "tag": "GAME MODES",
    "title": "Same rings, different pressure",
    "lead": "Drift lets you miss a ring and take another shot. In Standard, you also have to watch what’s in your way.",
    "items": [
      [
        "Drift",
        "Slower flight, no obstacles, no game over."
      ],
      [
        "Standard",
        "Speed builds. Hits cost Integrity. Clean flying restores it."
      ]
    ],
    "notes": "I’d give somebody Drift for their first run. You can miss every ring while you figure out the mouse and still keep going. Standard is where I’d go for a challenge. Once the speed picks up, you have to decide whether that next ring is actually worth cutting across for."
  },
  {
    "tag": "DEMO",
    "title": "Watch the next ring",
    "lead": "Start in Drift. Try an orb, a ring and one short boost.",
    "items": [
      [
        "During the flight",
        "Collect the small orbs for points and Droplets. Fly through the rings to build a combo."
      ],
      [
        "At the end",
        "Choose Finish flight to see what the run earned."
      ]
    ],
    "notes": "I’m going to fly for a few seconds. Watch the little orbs as I move through them. Now I’m aiming for that bigger ring. I’ll hold Space for a second here so you can see how much faster the next one comes up. Okay, I’m going to finish the flight. Take a look at the Droplets on the results screen. That number is the next part of the project."
  },
  {
    "tag": "WORLD GENERATION",
    "title": "Where the next ring comes from",
    "lead": "The browser builds the course in sections as you fly.",
    "items": [
      [
        "Chunks",
        "The game generates the next stretch ahead of the player."
      ],
      [
        "Seed",
        "A starting value lets the generator reproduce a layout for testing."
      ],
      [
        "Rendering",
        "Three.js draws the 3D scene. HTML and CSS handle the menus."
      ]
    ],
    "notes": "You might assume there’s a really long level somewhere with every ring placed by hand. The game builds sections ahead of you as you move. It starts from a seed, so a layout can be generated again. That’s handy if a ring looks out of place and you want to check the same stretch twice."
  },
  {
    "tag": "THE REWARD BUG",
    "title": "Where did the 97 Droplets go?",
    "lead": "An earlier build showed the run reward on the results screen without adding it to the wallet.",
    "items": [
      [
        "Before the test flight",
        "2,260 Droplets"
      ],
      [
        "Flight reward",
        "+97 Droplets"
      ],
      [
        "After a refresh",
        "2,357 Droplets"
      ]
    ],
    "notes": "Here’s the bug I’d bring up if somebody asked what was tricky about this. You could see Droplets on the results screen and still have the same balance back in the hub. You’d never catch that from a screenshot. In a test of the fix, the wallet started at 2,260. The run paid 97. The wallet hit 2,357, and refreshing the page kept it there. Your run will earn a different amount."
  },
  {
    "tag": "CYBERSECURITY",
    "title": "Whose score is it?",
    "lead": "The wallet lives in localStorage on the player’s device.",
    "items": [
      [
        "Single-player",
        "Reopen the game in the same browser to keep playing with your progress."
      ],
      [
        "Competition",
        "A shared leaderboard would need a server to validate the result."
      ]
    ],
    "notes": "Here’s where my cybersecurity major comes into it. Refreshing proves the browser remembered the balance. It doesn’t prove the player earned it. The player controls that browser. For a single-player game, I’m fine with that tradeoff. If we added a leaderboard, I’d want the server to check the run before anyone got a spot on it."
  },
  {
    "tag": "NEXT PLAYTEST",
    "title": "Could you start without me?",
    "lead": "The next playtest I’d run starts with handing someone the link and letting them figure it out.",
    "items": [
      [
        "First minute",
        "Can a new player start a run and steer through a ring?"
      ],
      [
        "After the flight",
        "Can they find the reward and tell what it’s for?"
      ]
    ],
    "notes": "The business side for me is pretty simple. If I have to stand over your shoulder and explain which button starts the game, most people are going to close the tab. I’d like to hand this to someone who’s never seen it and watch where they hesitate. If you try it, tell me the first thing you had to stop and figure out. Thanks."
  }
];
let current = 0;
const slide = document.getElementById('slide');
const notes = document.getElementById('speaker-notes');
const dots = document.getElementById('slide-dots');
slides.forEach((item,index)=>{
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label',`Slide ${index+1}: ${item.title}`);
  button.addEventListener('click',()=>render(index));
  dots.append(button);
});
function render(index){
  current = Math.max(0,Math.min(slides.length-1,index));
  const data=slides[current];
  slide.replaceChildren();
  const overview=document.createElement('div');
  const tag=document.createElement('p');tag.className='slide-eyebrow';tag.textContent=data.tag;
  const title=document.createElement('h3');title.className='slide-title';title.textContent=data.title;
  const lead=document.createElement('p');lead.className='slide-lead';lead.textContent=data.lead;
  overview.append(tag,title,lead);
  const details=document.createElement('div');details.className='slide-details';
  for(const [heading,copy] of data.items){const item=document.createElement('div');item.className='slide-item';const bold=document.createElement('b');bold.textContent=heading;const paragraph=document.createElement('p');paragraph.textContent=copy;item.append(bold,paragraph);details.append(item);}
  slide.append(overview,details);
  if(current===2){const a=document.createElement('a');a.className='button primary';a.href='game/index.html?showcase=1';a.textContent='Launch the demo ↗';overview.append(a);}
  notes.textContent=data.notes;
  document.getElementById('slide-count').textContent=`${String(current+1).padStart(2,'0')} / 07`;
  document.getElementById('slide-prev').disabled=current===0;
  document.getElementById('slide-next').disabled=current===slides.length-1;
  [...dots.children].forEach((button,i)=>button.setAttribute('aria-current',String(i===current)));
  try{sessionStorage.setItem('aerodash.slide',String(current));}catch{}
}
document.getElementById('slide-prev').addEventListener('click',()=>render(current-1));
document.getElementById('slide-next').addEventListener('click',()=>render(current+1));
document.getElementById('slide-shell').addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();render(current+(event.key==='ArrowRight'?1:-1));}
});
document.getElementById('notes-toggle').addEventListener('click',event=>{notes.hidden=!notes.hidden;event.currentTarget.setAttribute('aria-pressed',String(!notes.hidden));});
document.getElementById('present-fullscreen').addEventListener('click',async event=>{try{const shell=document.getElementById('slide-shell');if(document.fullscreenElement)await document.exitFullscreen();else if(shell.requestFullscreen)await shell.requestFullscreen();else event.currentTarget.textContent='Use browser full screen';}catch{event.currentTarget.textContent='Use browser full screen';}});
let restored=0;try{restored=Number(sessionStorage.getItem('aerodash.slide'))||0;}catch{}
render(restored);
