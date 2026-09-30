try{var s=document.createElement("script");s.src="https://utest.me/vendor/html2canvas.min.js";s.async=true;(document.head||document.documentElement).appendChild(s);}catch(_){}
(function(){
function __rbiStartScript(){
(function(){
try{
// Marker for the native app's own WebView bridge: when the real tracker is
// present the bridge must NOT emit its own (coarser) completion signal, or a
// single tap would produce two and the two could disagree.
window.__synthTracker=1;
var EMBED=true;
var APP="https://utest.me";

var PICK_FRAMED=false;
try{PICK_FRAMED=!!(window.parent&&window.parent!==window);}catch(_){PICK_FRAMED=false;}
var PICK_LOADED=false;
function loadPicker(){
  if(PICK_LOADED)return;PICK_LOADED=true;
  try{var s=document.createElement("script");s.src=APP+"/api/embed/pick.js";s.async=true;(document.head||document.documentElement).appendChild(s);}catch(_){}
}
if(PICK_FRAMED){
  try{window.addEventListener("message",function(e){
    if(e.origin!==APP)return;
    if(e.data&&e.data.type==="synth-embed-pick")loadPicker();
  },false);}catch(_){}
  try{window.parent.postMessage({type:"synth-embed-hello",v:1},APP);}catch(_){}
}

// Read at run time in embed mode: one snippet serves every tester, so the id
// can only come from the URL the host framed this page with.
//
// window, not W: instrumentationCommon() is what assigns W, and it is
// spliced in BELOW this line. Reading W.location here threw on every embed
// load and the catch handed back "" — so the snippet has never once known its
// own session id. Invisible until now because the host re-stamps session_id
// on everything it forwards, which is also why nothing wrong reached the
// database; the value simply was not there to be used.
var SID=EMBED?(function(){
  var KEY="__utm_h";
  // Framed = inside the tester's flow. Read before anything else: it is what
  // separates a tester from one of the customer's ordinary visitors, and only
  // the tester's session may be remembered or recorded.
  var framed=false; try{framed=!!(window.parent&&window.parent!==window);}catch(_){framed=true;}
  var fromUrl=""; try{fromUrl=new URLSearchParams(window.location.search).get("h")||"";}catch(_){}
  if(fromUrl){ if(framed){try{window.sessionStorage.setItem(KEY,fromUrl);}catch(_){}} return fromUrl; }
  // The handshake rides the URL the host framed, and an ordinary link inside
  // the site drops it: the next document had no session id, switched its beats
  // off, and a Live URL study measured its ENTRY PAGE and nothing else — the
  // pages the tester actually walked to recorded no clicks, no screens and no
  // screenshot (observed on study c3b0118b, 2026-09-16: beats for "/" only,
  // while the About and product pages, where the task was actually done, were
  // blank). sessionStorage is the right scope for it: same origin, same tab,
  // cleared when the tab closes.
  if(!framed)return "";
  try{return window.sessionStorage.getItem(KEY)||"";}catch(_){return "";}
})():"";
var HOST="web";
var BEATS=true;
// An embedded page with no session id — neither in the url nor carried in
// this tab's sessionStorage — is not a tester's session. It is one of the
// customer's ordinary visitors — or the researcher's own picker frame — and
// beats have nowhere to go for either: there is no session to attach them to
// and, unframed, no parent to hand them to. Leaving them on made every real
// visitor of a connected site pay for a full html2canvas rasterisation of the
// page, thrown away the moment it finished. (The carry is written only while
// framed, so an ordinary visit can never turn it back on.)
if(EMBED&&!SID)BEATS=false;
var TOKEN="";
var URL="/api/human-beats";
// Both posts go out as text/plain with mode:"no-cors". The document is
// sandboxed without allow-same-origin, so to the browser these are
// cross-origin requests from a null origin: a JSON content type would trigger
// a CORS preflight the server does not answer, and no cookie is attached
// either way. text/plain is CORS-simple and needs no preflight; the server
// parses the body as JSON regardless of the header and authenticates on TOKEN.
// The response is opaque, which is fine — nothing here ever read it.
var PLAIN={"content-type":"text/plain"};
var T0=Date.now();
var q=[];
var sent=0; var CAP=500;
var MAXSCREENS=24; var nscreens=0;
// Mission index. Seeded from the URL so even the first beat carries it; the
// host can still correct it live via synth-mission (see below). Stays null for a
// prototype opened outside a tester flow, which then carries no mission tag.
var MI=null;

var W = window;
function vp(){return {w:W.innerWidth,h:W.innerHeight};}
function sh(){return document.documentElement.scrollHeight||document.body.scrollHeight||0;}
// Structural signature of the VISIBLE DOM (tag + id skeleton, hidden nodes
// skipped). Stable against text/class churn, but flips when a screen's layout
// changes — a route swap, a tab toggle, a modal. This is what lets a SPA
// prototype that never changes its URL still split into its real screens/flow.
function sig(){try{var els=document.body.getElementsByTagName("*");var n=els.length<1500?els.length:1500;var s="";for(var i=0;i<n;i++){var e=els[i];if(e!==document.body&&e.offsetParent===null)continue;s+=e.tagName+(e.id||"")+";";}var h=5381;for(var j=0;j<s.length;j++){h=(h*33+s.charCodeAt(j))|0;}return (h>>>0).toString(36);}catch(_){return "";}}
// An AUTHORED screen name (data-synth-screen on the visible container) beats
// every derived signal: it survives DOM churn because a human wrote it.
function screenName(){try{var active=document.querySelector("[data-synth-screen].active,.screen.active[data-synth-screen],.screen.active");if(active){var av=active.getAttribute("data-synth-screen")||active.getAttribute("data-screen")||active.id||"";if(av)return String(av).slice(0,120);}var ns=document.querySelectorAll("[data-synth-screen]");for(var i=0;i<ns.length;i++){var e=ns[i];if(e.offsetParent!==null||e===document.body){var v=e.getAttribute("data-synth-screen");if(v)return String(v).slice(0,120);}}}catch(_){}return "";}
// The visible member of a SCREEN-SWAP SET, named by its own id/data attribute.
//
// Why this exists: sig() is VIEWPORT-DEPENDENT, because it skips nodes whose
// offsetParent is null and responsive CSS hides different nodes at different
// widths. The goal picker previews a prototype in a narrow modal pane while the
// tester renders it at full window width, so a screen goal authored as a bare
// signature could never match at run time (and an element goal's scopeScreen
// silently killed the match the same way). A single-file prototype that swaps
// .screen / .view / .page containers in place has a much better address: WHICH
// container is showing. That is width-independent, survives text/layout churn,
// and both sides compute it identically.
//
// The set must look like a real swap set — two or more candidates with at least
// one hidden — and the visible one must be a container (>=8 descendants), which
// is what keeps a nav item carrying data-view from being mistaken for a screen.
function swapName(){try{var sels=["[data-synth-screen]",".screen",".view",".page",".step"];for(var i=0;i<sels.length;i++){var els=document.querySelectorAll(sels[i]);if(els.length<2)continue;var vis=null,hidden=0;for(var j=0;j<els.length;j++){var e=els[j];if(e.offsetParent!==null){if(!vis&&e.getElementsByTagName("*").length>=8)vis=e;}else hidden++;}if(vis&&hidden>0){var v=vis.getAttribute("data-synth-screen")||vis.getAttribute("data-screen")||vis.getAttribute("data-view")||vis.id||"";if(v)return String(v).slice(0,120);}}}catch(_){}return "";}
// The current screen's identity — the ScreenKey shape from packages/types.
//
// The name prefers the AUTHORED name, then the swap-set container's own id. Only
// the name is added here: bkey()/key() (beat + heatmap keys) stay
// signature-based, so this cannot move where an existing study's screenshots go.
function sk(){var n=screenName()||swapName();var o={path:location.pathname,hash:location.hash,sig:sig()};if(n)o.name=n;return o;}
/** Legacy beat/screenshot key (pathname + hash + DOM signature). */
function key(){return location.pathname+location.hash+"::"+sig();}
function norm(t){if(!t)return "";return String(t).replace(/\s+/g," ").replace(/^ | $/g,"").toLowerCase().slice(0,80);}
function esc(s){return String(s).replace(/["\\]/g,"\\$&");}
function add(list,v){if(v&&list.indexOf(v)===-1)list.push(v);}
var INTERACTIVE={a:1,button:1,input:1,select:1,textarea:1,label:1,summary:1};
var ROLES={button:1,link:1,tab:1,menuitem:1,option:1,checkbox:1,radio:1,switch:1};
function implicitRole(el){try{var t=el.tagName.toLowerCase();if(t==="a")return el.getAttribute("href")?"link":"";if(t==="button")return "button";if(t==="select")return "listbox";if(t==="textarea")return "textbox";if(t==="input"){var ty=(el.getAttribute("type")||"text").toLowerCase();if(ty==="submit"||ty==="button"||ty==="reset")return "button";if(ty==="checkbox")return "checkbox";if(ty==="radio")return "radio";return "textbox";}}catch(_){}return "";}
/**
 * The element the participant MEANT to use. A tap usually lands on an inner
 * <span>/<img>, so walk up to 5 ancestors for the nearest control (or an
 * explicit data-synth-goal, which always wins).
 */
function target(el){var n=el,d=0;while(n&&n.nodeType===1&&d<5){try{if(n.getAttribute("data-synth-goal"))return n;var t=n.tagName.toLowerCase();if(INTERACTIVE[t])return n;var r=n.getAttribute("role");if(r&&ROLES[r.toLowerCase()])return n;if(n.getAttribute("onclick"))return n;}catch(_){}n=n.parentElement;d++;}return el;}
/** Capped structural fallback (:nth-of-type chain) — last-resort selector. */
function structural(el){try{var parts=[],n=el,d=0;while(n&&n.nodeType===1&&n!==document.body&&d<4){var t=n.tagName.toLowerCase();if(n.id){parts.unshift("#"+n.id);break;}var i=1,s=n;while((s=s.previousElementSibling)){if(s.tagName===n.tagName)i++;}parts.unshift(t+":nth-of-type("+i+")");n=n.parentElement;d++;}return parts.length?parts.join(">"):"";}catch(_){return "";}}
/**
 * ElementFingerprint: ordered selector candidates (most stable first) plus the
 * accessible text / role / aria-label. A match on the other end is a non-empty
 * selector intersection, so several candidates make the goal survive a
 * responsive re-render that changes only some of them.
 */
function fp(raw){
  var el=target(raw);
  var sel=[],text="",role="",aria="",goal="";
  // Selectors come from the TARGET ONLY. Collecting them from ancestors too
  // would put the screen container's own id (#detail) in the list, and a
  // selector intersection would then match EVERY click on that screen — the
  // exact false positive this contract exists to avoid. The ancestor walk that
  // finds the real control already happened in target().
  try{
    var t0=el.tagName.toLowerCase();
    var g0=el.getAttribute("data-synth-goal");
    if(g0){goal=String(g0).slice(0,120);add(sel,'[data-synth-goal="'+esc(g0)+'"]');}
    var tid=el.getAttribute("data-testid");
    if(tid)add(sel,'[data-testid="'+esc(tid)+'"]');
    if(el.id)add(sel,"#"+el.id);
    var nm=el.getAttribute("name");
    if(nm)add(sel,t0+'[name="'+esc(nm)+'"]');
    var al0=el.getAttribute("aria-label");
    if(al0){add(sel,t0+'[aria-label="'+esc(al0)+'"]');aria=al0;}
  }catch(_){}
  // Accessible text / role / aria DO walk up: a button's label often lives on a
  // wrapper, and an ancestor may carry the declared goal attribute.
  var n=el,d=0;
  while(n&&n.nodeType===1&&d<5){
    try{
      if(!goal){var g=n.getAttribute("data-synth-goal");if(g)goal=String(g).slice(0,120);}
      if(!aria){var al=n.getAttribute("aria-label");if(al)aria=al;}
      if(!role){var r=n.getAttribute("role")||implicitRole(n);if(r)role=String(r).toLowerCase();}
      if(!text){var tx=n.innerText||n.textContent||"";if(tx&&tx.length<=160)text=tx;}
    }catch(_){}
    n=n.parentElement;d++;
  }
  // Positional fallback, anchored at the nearest ancestor id — specific enough
  // to identify one node, unlike a bare ancestor id.
  add(sel,structural(el));
  var out={sel:sel.slice(0,8),text:norm(text)};
  if(role)out.role=role;
  if(aria)out.aria=norm(aria);
  if(goal)out.goal=goal;
  return out;
}
/**
 * Same-origin child frames are instrumented by attaching to their document
 * directly (cheaper and race-free vs re-injecting the script). A cross-origin
 * child is invisible to us — flagged so authoring can warn instead of shipping
 * a goal that silently never fires.
 */
var FRAMES_UNSUPPORTED=false;
function eachFrameDoc(fn){
  try{
    var fs=document.getElementsByTagName("iframe");
    for(var i=0;i<fs.length;i++){
      var d=null;
      try{d=fs[i].contentDocument;}catch(_){d=null;}
      if(d&&d.addEventListener){if(!fs[i].__synthBound){fs[i].__synthBound=1;fn(d);}}
      else FRAMES_UNSUPPORTED=true;
    }
  }catch(_){}
}
function watchFrames(fn){
  eachFrameDoc(fn);
  var n=0;
  var t=setInterval(function(){eachFrameDoc(fn);if(++n>10)clearInterval(t);},1000);
}

// The postMessage TARGET, and the origin inbound host messages must come
// from. In embed mode both are our app, not the page we are running on.
var ORIGIN=EMBED?APP:W.location.origin;
/**
 * The ANALYTICS screen key (beats + base screenshots). An AUTHORED name
 * (data-synth-screen) wins so the dashboard labels a screen "Cart" instead of
 * an opaque DOM signature — and so a web session and a NATIVE session of the
 * same prototype land on the same key (the mobile app reports authored names
 * too, so their screens/paths/heatmaps merge instead of splitting in two).
 * Falls back to the legacy path+hash+signature key when nothing is authored.
 *
 * Deliberately coarser than key(): completion signals keep the finer key, since
 * a goal may match on the DOM signature alone.
 */
function bkey(){var n=screenName();return n?n:key();}
/**
 * Did this tap land on something ACTIONABLE? The DOM equivalent of "inside a
 * Figma hotspot". Interactive tag / ARIA role / inline onclick / declared goal,
 * or a cursor:pointer anywhere in the ancestor chain — that last one is how
 * real prototypes mark a clickable <div>.
 *
 * A false negative here is corrected behaviorally in onUse (a tap that changes
 * the screen was obviously handled), so this never has to guess at a
 * prototype's JS wiring.
 */
function isInteractive(el){
  var n=el,d=0;
  while(n&&n.nodeType===1&&d<5){
    try{
      if(n.getAttribute("data-synth-goal"))return true;
      if(INTERACTIVE[n.tagName.toLowerCase()])return true;
      var r=n.getAttribute("role");
      if(r&&ROLES[r.toLowerCase()])return true;
      if(n.getAttribute("onclick"))return true;
      var cs=W.getComputedStyle?W.getComputedStyle(n):null;
      if(cs&&cs.cursor==="pointer")return true;
    }catch(_){}
    n=n.parentElement;d++;
  }
  return false;
}
/**
 * One transport for both hosts. The web flow gets a structured object (same
 * origin, so no serialization loss); the native WebView gets the JSON string
 * its bridge requires. Posting to a window that isn't framed is a no-op.
 */
function post(payload){
  try{if(W.parent&&W.parent!==W)W.parent.postMessage(payload,ORIGIN);}catch(_){}
  try{if(W.ReactNativeWebView)W.ReactNativeWebView.postMessage(JSON.stringify(payload));}catch(_){}
}
function signal(kind,extra){
  var p={type:"synth-signal",v:1,kind:kind,screen:sk(),ts:Date.now()};
  if(extra){for(var k in extra){if(Object.prototype.hasOwnProperty.call(extra,k))p[k]=extra[k];}}
  if(FRAMES_UNSUPPORTED)p.framesUnsupported=true;
  post(p);
}
var SCREEN=bkey();
// Screen signals are emitted only on CHANGE, so the runtime's "the screen must
// differ from the arm-time screen" guard stays meaningful and a stream of
// identical keys can't spam the host.
//
// Dedup MUST include the authored/swap screen NAME, not just path+hash+sig.
// Many single-file prototypes hide inactive screens with visibility:hidden /
// opacity (still in layout → offsetParent stays set → sig() does not flip).
// The goal picker already keys on name; without it here, a Mission goal of
// kind:"screen"/name:"time" never receives a second synth-signal and never
// auto-completes.
var lastSent="";
function emitScreen(force){
  var s=sk();
  var k=s.path+s.hash+"::"+s.sig+"::"+(s.name||"");
  if(!force&&k===lastSent)return;
  lastSent=k;
  signal("screen");
}
function push(b){ if(!BEATS)return; if(sent+q.length>=CAP)return; b.t=Date.now()-T0; b.path=SCREEN; b.scrollY=W.scrollY||0; b.scrollH=sh(); var v=vp(); b.vw=v.w; b.vh=v.h; if(MI!=null)b.mi=MI; q.push(b); ensureCap(SCREEN); }
// Full-page base screenshot for a SPECIFIC screen key (once). Same-origin only →
// html2canvas can rasterize the page; POST to /api/human-base for the heatmap
// background. The key is passed in (not read from the mutable global) so a
// capture is always stored under the screen it was scheduled for — the screen
// can advance before the async snapshot fires. full_height is the canvas's own
// height (its true pixel height) so overlays land on the image exactly.
//
// The POST is deliberately NOT keepalive: the Fetch standard caps a keepalive
// request body at 64 KiB, and a full-page JPEG regularly exceeds that — the
// browser then aborts the request with no error the page can see, so text-heavy
// or wide screens silently ended up with no heatmap background at all ("no
// preview" in the report) while small screens looked fine. A base capture is not
// tied to unload, so it has no need of keepalive.
//
// Best-effort; never blocks the tester.
var capd={}, capPending={};
/**
 * Release a screen so a LATER beat on it can try again. Both flags have to go:
 * capd gates capBase, capPending gates ensureCap, and clearing only the first
 * left a screen whose capture failed once permanently un-capturable for the rest
 * of the session — which is exactly the screen a mission completes on, whose
 * first attempt is the one most likely to be cut short.
 */
function capRetry(k){ if(capd[k])nscreens--; capd[k]=false; capPending[k]=false; }
function capBase(k){
  if(!BEATS||capd[k]||!W.html2canvas||nscreens>=MAXSCREENS)return;
  capd[k]=true; nscreens++;
  var w=W.innerWidth;
  try{
    W.html2canvas(document.body,{backgroundColor:"#ffffff",scale:1,useCORS:true,logging:false,width:w,windowWidth:w}).then(function(cv){
      var img=cv.toDataURL("image/jpeg",0.7);
      var base={session_id:SID,session_token:TOKEN,screen_path:k,image:img,vw:w,full_height:cv.height||sh()};
      // Same reasoning as the beat flush: the host owns the endpoint. The 64KiB
      // keepalive cap that shaped the fetch below does not apply to a
      // structured-clone postMessage, so a full-page JPEG crosses intact.
      if(EMBED){post({type:"synth-base",v:1,base:base});return;}
      fetch("/api/human-base",{method:"POST",mode:"no-cors",headers:PLAIN,body:JSON.stringify(base)}).catch(function(){capRetry(k);});
    }).catch(function(){capRetry(k);});
  }catch(_){capRetry(k);}
}
function schedCap(k){var n=0;(function w(){if(W.html2canvas)return capBase(k);if(n++>25)return;setTimeout(w,400);})();}
// Screenshot each screen the tester actually touches, keyed EXACTLY like its
// beats so the report can join them — fired on the first beat for a screen (a
// short delay lets a just-entered screen finish rendering). This is what
// guarantees every screen in the path has a preview (no orphaned captures).
//
// The delay is kept as short as a CSS transition allows on purpose: the screen a
// mission COMPLETES on is torn out of the DOM the moment the host advances the
// task, so every millisecond here is a millisecond the goal screen might not get
// its background.
function ensureCap(k){ if(!BEATS||capd[k]||capPending[k])return; capPending[k]=1; setTimeout(function(){schedCap(k);},250); }
// Re-evaluate the current screen; on a change, freeze the new key and record the
// transition in the flow (the navigate beat also schedules the new screen's
// screenshot via push → ensureCap).
//
// screen_enter is what the dashboard measures TIME ON SCREEN from (t_ms deltas
// between consecutive enters) — the same field the Figma graph player emits.
// The screen SIGNAL is emitted unconditionally: it dedupes on the finer key(),
// so a DOM change that bkey() collapses still reaches a signature-based goal.
function sync(){
  var k=bkey();
  if(k!==SCREEN){SCREEN=k;push({kind:"navigate",event:"screen_enter"});}
  emitScreen(false);
}
var syncT=null;
function schedSync(){if(syncT)clearTimeout(syncT);syncT=setTimeout(function(){syncT=null;sync();},650);}
/**
 * A tap can swap the visible screen with NO url change (tab, modal, DOM
 * replacement) and the swap may be behind a transition. Re-check at three
 * points: fast enough that completion feels instant, late enough that a 400ms
 * animation can't hide the new screen. emitScreen dedupes, so at most one
 * signal per real change.
 */
function probe(){setTimeout(function(){sync();},120);setTimeout(function(){sync();},400);setTimeout(function(){sync();},900);}

/**
 * One handler for click AND touchstart, deduped inside 350ms.
 *
 * Both are needed: prototyping tools call preventDefault() on touch to stop
 * native scroll/zoom, which suppresses the synthetic click WebKit would fire —
 * so touch-only prototypes are invisible to a click listener. Where both fire,
 * the second is dropped.
 */
var lastTap=0, lastTapEl=null;
/**
 * Keep the prototype in the frame. A link with target="_blank" would open a new
 * tab (or, under the tester frame's sandbox, do nothing at all) and the
 * participant would lose the task; rewriting to _self means the same link just
 * navigates in place, where the tracker is still listening.
 */
function keepInFrame(el){try{var n=el,d=0;while(n&&n.nodeType===1&&d<5){if(n.tagName.toLowerCase()==="a"){var t=n.getAttribute("target");if(t&&t.toLowerCase()!=="_self")n.setAttribute("target","_self");return;}n=n.parentElement;d++;}}catch(_){}}
function onUse(e,doc){
  var now=Date.now();
  var el=e.target&&e.target.nodeType===1?e.target:null;
  if(now-lastTap<350&&el===lastTapEl)return;
  lastTap=now; lastTapEl=el;
  if(el)keepInFrame(el);
  var pt=e.touches&&e.touches[0]?e.touches[0]:e;
  var x=Math.round(pt.clientX||0), y=Math.round(pt.clientY||0);
  var r=el?el.getBoundingClientRect():null;
  /**
   * hotspot vs misclick — the same distinction the Figma graph player records,
   * so "Misclick rate" and the heatmap's Successful / Misclicks filters mean
   * the same thing for an uploaded HTML prototype.
   *
   * A tap on nothing actionable is PROVISIONALLY a misclick, then upgraded to a
   * hotspot if the screen changes within 950ms: a delegated JS listener on a
   * plain <div> is invisible to the DOM walk, but a screen change proves the
   * prototype handled the tap. flush() holds an undecided beat back for one
   * cycle so the upgrade lands before the beat is sent.
   */
  var beat={kind:"click",event:el&&isInteractive(el)?"hotspot":"misclick",x:x,y:y,
        bx:r?Math.round(r.left):null,by:r?Math.round(r.top):null,
        bw:r?Math.round(r.width):null,bh:r?Math.round(r.height):null,
        label:(el&&(el.innerText||el.getAttribute&&el.getAttribute("aria-label"))||"").slice(0,80)};
  push(beat);
  // The verdict is resolved by flush(), which compares the screen key then
  // against _ps — NOT by a timer here. A hidden or backgrounded tab throttles
  // timers to seconds, and a timer that fires after the hold window would ship
  // the tap still labelled a misclick even though the screen had moved.
  if(BEATS&&beat.event==="misclick"){beat._p=1;beat._pt=Date.now();beat._ps=SCREEN;}
  // Phase 34 (legacy): the click-area hit-test in the tester flow. Kept so
  // existing studies with an expected_target_area keep auto-completing.
  post({type:"synth-click",point:{x:x,y:y},screen_path:location.pathname,viewport:vp(),ts:Date.now()});
  // The completion signal: which control was used, on which screen.
  if(el){try{signal("element",{el:fp(el)});}catch(_){}}
  probe();
  schedSync();
}
function bind(doc){
  try{
    doc.addEventListener("click",function(e){onUse(e,doc);},true);
    doc.addEventListener("touchstart",function(e){onUse(e,doc);},true);
  }catch(_){}
}
bind(document);
watchFrames(bind);

var st=null;
W.addEventListener("scroll",function(){ if(st)return; st=setTimeout(function(){st=null;push({kind:"scroll"});},250);},true);
function nav(){
  // Phase 36 (legacy): pathname-only screen change. Superseded by synth-signal
  // (which carries hash + signature + authored name) but still emitted.
  post({type:"synth-screen-change",screen_path:location.pathname,viewport:vp(),ts:Date.now()});
  sync();
  emitScreen(false);
}
W.addEventListener("popstate",nav);
W.addEventListener("hashchange",nav);
["pushState","replaceState"].forEach(function(m){var o=history[m];if(o)history[m]=function(){var r=o.apply(this,arguments);try{nav();}catch(_){}return r;};});
/**
 * The declared convention — a prototype can end the task itself:
 *   parent.postMessage({type:"synth-task-complete", name:"checkout-done"}, "*")
 * (also accepted from a same-origin child frame, which posts to this window).
 */
W.addEventListener("message",function(e){
  try{
    var d=e.data;
    if(!d)return;
    /**
     * Which mission block is running (same-origin host only). Every subsequent
     * beat carries it as mi, exactly like the native app does, so the
     * dashboard can segment beats PER MISSION. This iframe is not remounted
     * between missions (its src never changes), so the server's t_ms-drop
     * heuristic could otherwise never split them and every mission after the
     * first would show an empty path.
     */
    if(d.type==="synth-mission"){
      if(e.origin===ORIGIN&&typeof d.index==="number"&&d.index>=0)MI=Math.floor(d.index);
      return;
    }
    if(d.type!=="synth-task-complete")return;
    signal("declared",{name:typeof d.name==="string"?String(d.name).slice(0,120):undefined});
  }catch(_){}
});
/**
 * Send what is queued, settling any click still awaiting its hotspot/misclick
 * verdict (_p): if the screen has moved on since the tap (_ps), the prototype
 * handled it and it becomes a hotspot; otherwise it stays a misclick once the
 * 1100ms window has passed. Undecided and still fresh → hold for one cycle.
 *
 * Resolving HERE rather than on a timer is deliberate: this runs on the flush
 * tick, on visibility change and on unload, so the verdict cannot be lost to
 * timer throttling in a background tab.
 *
 * A BEACON flush (tab hiding / unload) settles everything immediately — losing
 * the beat is worse than shipping a provisional label.
 */
function flush(beacon){
  if(!BEATS||!q.length)return;
  var now=Date.now(), batch=[], keep=[];
  for(var i=0;i<q.length;i++){
    var b=q[i];
    if(b._p&&b._ps!==SCREEN)b.event="hotspot";
    else if(!beacon&&b._p&&now-b._pt<1100){keep.push(b);continue;}
    delete b._p; delete b._pt; delete b._ps; batch.push(b);
  }
  q=keep;
  if(!batch.length)return;
  sent+=batch.length;
  // Embed: the host frame is same-origin with the endpoint and already holds
  // the tester's session, so it does the POST. Nothing is dropped on unload
  // either — a postMessage is synchronous, where a fetch would be racing
  // teardown.
  if(EMBED){post({type:"synth-beats",v:1,session_id:SID,beats:batch});return;}
  var body=JSON.stringify({session_id:SID,session_token:TOKEN,beats:batch});
  try{
    if(beacon&&navigator.sendBeacon){navigator.sendBeacon(URL,new Blob([body],{type:"text/plain"}));}
    else{fetch(URL,{method:"POST",mode:"no-cors",headers:PLAIN,body:body,keepalive:true}).catch(function(){});}
  }catch(_){}
}
if(BEATS)setInterval(function(){flush(false);},2000);
// Keep trying the CURRENT screen's background. ensureCap is a no-op once a
// capture is in flight or done, so this only ever retries a screen whose attempt
// failed (capRetry cleared its flags) or that produced no beat of its own. The
// screen a mission ENDS on is exactly that case: nothing more is clicked there,
// so without a sweep its one attempt is also its only attempt.
if(BEATS)setInterval(function(){ensureCap(SCREEN);},3000);
// The ENTRY screen as a screen_enter beat. Without it the first screen has no
// enter to measure dwell FROM, so the screen the task starts on would be the one
// screen with no "avg. time on screen" — the opposite of useful.
setTimeout(function(){SCREEN=bkey();push({kind:"navigate",event:"screen_enter"});},50);
// Safety net: capture the initial screen even if it produced no beat yet, once
// the DOM has settled and html2canvas is ready.
setTimeout(function(){ensureCap(SCREEN);},1200);
// The ENTRY screen, announced once the first paint settles. The host records it
// as the arm-time key: a later screen signal only completes a task if it differs
// from this one, which is what stops a goal authored on the entry screen from
// finishing the task the moment it starts.
setTimeout(function(){emitScreen(true);},60);
setTimeout(function(){emitScreen(false);},700);
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")flush(true);});
W.addEventListener("beforeunload",function(){flush(true);});
W.addEventListener("pagehide",function(){flush(true);});
}catch(_){/* tracking is best-effort */}
})();
}
if(document.body){__rbiStartScript();}
else{document.addEventListener("DOMContentLoaded",__rbiStartScript);}
})();