/* ============================================================
   talash Python — Application Logic
   Persian RTL Python learning platform (creator: Mahan Sharifi)
   ============================================================ */
(function(){
'use strict';

/* ---------------- shorthands ---------------- */
var app=document.getElementById('app');
var $=function(s,el){return (el||document).querySelector(s);};
var $$=function(s,el){return Array.prototype.slice.call((el||document).querySelectorAll(s));};
function esc(s){
  return String(s==null?'':s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
var FA_D='۰۱۲۳۴۵۶۷۸۹';
function faNum(v){return String(v).replace(/[0-9]/g,function(d){return FA_D[+d];});}
function normalize(s){
  return String(s||'').toLowerCase()
    .replace(/ي/g,'ی').replace(/ك/g,'ک')
    .replace(/[\u200c\u200e\u200f]/g,'')
    .replace(/[۰-۹]/g,function(d){return String(FA_D.indexOf(d));});
}

/* ---------------- icons ---------------- */
var ICON_PATHS={
  python:'<polyline points="8 6 3 12 8 18"/><polyline points="16 6 21 12 16 18"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  box:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="11"/>',
  terminal:'<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="12" x2="9.01" y2="12"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="9" y1="17" x2="9.01" y2="17"/><line x1="15" y1="17" x2="15.01" y2="17"/>',
  branch:'<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  loop:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  dict:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  func:'<path d="M18 4H6l6 8-6 8h12"/>',
  text:'<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
  rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  play:'<path d="M7 4l13 8-13 8V4z" fill="currentColor" stroke="none"/>',
  copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  search:'<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  menu:'<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  book:'<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
  clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  level:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  chevL:'<polyline points="15 18 9 12 15 6"/>',
  chevR:'<polyline points="9 18 15 12 9 6"/>',
  clipboard:'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 13l2 2 4-4"/>',
  refresh:'<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  warn:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  bulb:'<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  spark:'<path d="M12 3l1.9 5.8L20 12l-6.1 3.2L12 21l-1.9-5.8L4 12l6.1-3.2z"/>',
  chevD:'<polyline points="6 9 12 15 18 9"/>'
};
function icon(name,size){
  size=size||18;
  var p=ICON_PATHS[name]||ICON_PATHS.info;
  return '<svg viewBox="0 0 24 24" width="'+size+'" height="'+size+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';
}

/* ---------------- data ---------------- */
var RAW=window.TALASH_DATA||{lessons:[],quizzes:{}};
var LESSONS=(RAW.lessons||[]).slice().sort(function(a,b){return a.id-b.id;});
var QUIZZES=RAW.quizzes||{};
var TOTAL=LESSONS.length;
function byId(id){id=Number(id);for(var i=0;i<LESSONS.length;i++){if(LESSONS[i].id===id)return LESSONS[i];}return null;}
function qCount(id){return (QUIZZES[Number(id)]||[]).length;}

/* ---------------- progress (localStorage) ---------------- */
var PKEY='talash_progress_v1';
var CKEY='talash_code_v1';
var SKEY='talash_pending_code';
var DEFAULTS={completed:[],scores:{},lastLesson:1};
var progress=(function(){
  try{
    var raw=localStorage.getItem(PKEY);
    if(raw){
      var p=JSON.parse(raw);
      if(p&&typeof p==='object'){
        if(!Array.isArray(p.completed))p.completed=[];
        if(!p.scores||typeof p.scores!=='object')p.scores={};
        return {completed:p.completed,scores:p.scores,lastLesson:Number(p.lastLesson)||1};
      }
    }
  }catch(e){}
  return {completed:[],scores:{},lastLesson:1};
})();
function saveProgress(){try{localStorage.setItem(PKEY,JSON.stringify(progress));}catch(e){}}
function isDone(id){return progress.completed.indexOf(Number(id))!==-1;}
function pct(){return TOTAL?Math.round(progress.completed.length/TOTAL*100):0;}
function continueId(){
  if(!TOTAL)return 1;
  var start=Math.min(Math.max(progress.lastLesson||1,1),TOTAL);
  for(var i=0;i<TOTAL;i++){
    var id=((start-1+i)%TOTAL)+1;
    if(!isDone(id))return id;
  }
  return 1;
}

/* ---------------- python syntax highlight ---------------- */
var PY_RE=new RegExp(
  '(#[^\\n]*)'+                                                          /* 1 comment */
  '|("""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\')'+                          /* 2 triple string */
  '|((?:[rbufRBUF]{0,2})"(?:[^"\\\\\\n]|\\\\.)*"|(?:[rbufRBUF]{0,2})\'(?:[^\'\\\\\\n]|\\\\.)*\')'+ /* 3 string */
  '|\\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\\b'+ /* 4 keyword */
  '|\\b(print|input|len|range|int|float|str|bool|list|dict|set|tuple|type|sum|min|max|sorted|enumerate|zip|abs|round|reversed|any|all|append|insert|remove|pop|sort|reverse|keys|values|items|get|upper|lower|strip|replace|split|join|find|count|startswith|endswith|capitalize|randint|random)\\b'+ /* 5 builtin/fn */
  '|(\\b\\d+(?:\\.\\d+)?\\b)'                                            /* 6 number */
,'g');
function escHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function highlight(src){
  var out='',last=0,m;
  PY_RE.lastIndex=0;
  while((m=PY_RE.exec(src))!==null){
    if(m.index>last)out+=escHtml(src.slice(last,m.index));
    var cls=m[1]?'tk-com':m[2]?'tk-str':m[3]?'tk-str':m[4]?'tk-kw':m[5]?'tk-fn':'tk-num';
    out+='<span class="'+cls+'">'+escHtml(m[0])+'</span>';
    last=m.index+m[0].length;
    if(m[0].length===0)PY_RE.lastIndex++;
  }
  out+=escHtml(src.slice(last));
  return out;
}

/* ---------------- toast ---------------- */
function toast(msg,kind){
  kind=kind||'success';
  var stack=$('#toastStack');if(!stack)return;
  var t=document.createElement('div');
  t.className='toast '+kind;
  var ic=kind==='success'?'check':kind==='error'?'warn':'info';
  t.innerHTML=icon(ic,16)+'<span>'+esc(msg)+'</span>';
  stack.appendChild(t);
  requestAnimationFrame(function(){t.classList.add('show');});
  setTimeout(function(){
    t.classList.remove('show');
    setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},350);
  },3400);
}
function copyText(text){
  var done=function(){toast('کد در کلیپ‌بورد کپی شد.');};
  var fail=function(){toast('کپی خودکار ممکن نشد؛ لطفاً کد را دستی انتخاب و کپی کنید.','error');};
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(function(){
      try{legacyCopy(text);done();}catch(e){fail();}
    });
  }else{
    try{legacyCopy(text);done();}catch(e){fail();}
  }
}
function legacyCopy(text){
  var ta=document.createElement('textarea');
  ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
  document.body.appendChild(ta);ta.focus();ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

/* ---------------- code block builders ---------------- */
function codeBlock(s,opts){
  opts=opts||{};
  var hasOut=typeof s.output==='string'&&s.output.length>0;
  var title=opts.title||'main.py';
  var html='<div class="code-block">'
    +'<div class="code-head"><div class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>'
    +'<span class="code-title">'+esc(title)+'</span>'
    +'<div class="code-actions">'
    +'<button type="button" class="chip-btn" data-action="open-playground" data-code="'+esc(s.code)+'">'+icon('play',13)+'اجرا در محیط کد</button>'
    +'<button type="button" class="chip-btn" data-action="copy" data-code="'+esc(s.code)+'">'+icon('copy',13)+'کپی</button>'
    +'</div></div>'
    +'<pre class="code-body">'+highlight(s.code)+'</pre>';
  if(hasOut)html+='<div class="code-output"><span class="out-label">'+icon('terminal',13)+'خروجی برنامه</span><pre>'+esc(s.output)+'</pre></div>';
  if(s.explain)html+='<div class="code-explain">'+esc(s.explain)+'</div>';
  html+='</div>';
  return html;
}
function renderSection(s){
  if(!s||!s.type)return '';
  if(s.type==='text'){
    return '<section class="content-section"><h3>'+esc(s.title)+'</h3><div class="prose">'
      +(s.body||[]).map(function(p){return '<p>'+esc(p)+'</p>';}).join('')+'</div></section>';
  }
  if(s.type==='list'){
    return '<section class="content-section"><h3>'+esc(s.title)+'</h3><ul class="info-list">'
      +(s.items||[]).map(function(i){return '<li>'+esc(i)+'</li>';}).join('')+'</ul></section>';
  }
  if(s.type==='table'){
    return '<section class="content-section"><h3>'+esc(s.title)+'</h3><div class="table-wrap"><table class="data-table"><thead><tr>'
      +(s.head||[]).map(function(h){return '<th>'+esc(h)+'</th>';}).join('')
      +'</tr></thead><tbody>'
      +(s.rows||[]).map(function(r){return '<tr>'+(r||[]).map(function(c){return '<td>'+esc(c)+'</td>';}).join('')+'</tr>';}).join('')
      +'</tbody></table></div></section>';
  }
  if(s.type==='code'){
    return '<section class="content-section"><h3>'+esc(s.title)+'</h3>'+codeBlock(s)+'</section>';
  }
  if(s.type==='tip'||s.type==='warn'){
    return '<div class="tip-box '+s.type+'">'+icon(s.type==='tip'?'bulb':'warn',18)
      +'<div><h4>'+esc(s.title||'')+'</h4>'
      +(s.body||[]).map(function(p){return '<p>'+esc(p)+'</p>';}).join('')+'</div></div>';
  }
  return '';
}

/* ---------------- playground examples ---------------- */
var PLAY_EXAMPLES=[
  {name:'سلام دنیا',code:
'# اولین برنامه شما در talash Python\nprint("سلام دنیا!")\nprint("به محیط اجرای کد خوش آمدید")'},
  {name:'متغیرها و f-string',code:
'name = "سارا"\nage = 19\nscore = 18.5\n\nprint("نام:", name)\nprint("سن:", age)\nprint(f"{name} عزیز، میانگین ترم شما {score} شد")'},
  {name:'شرط‌ها (if / elif)',code:
'score = 17\n\nif score >= 17:\n    print("رتبه: عالی")\nelif score >= 14:\n    print("رتبه: خوب")\nelif score >= 10:\n    print("رتبه: قابل قبول")\nelse:\n    print("رتبه: نیاز به تلاش بیشتر")'},
  {name:'حلقه for',code:
'# جدول ضرب ۷\nfor i in range(1, 11):\n    print("7 x", i, "=", 7 * i)'},
  {name:'لیست‌ها',code:
'basket = ["نان", "شیر", "پنیر"]\nbasket.append("چای")\nbasket.remove("پنیر")\n\nprint("اقلام سبد:", basket)\nprint("تعداد اقلام:", len(basket))\n\nfor item in basket:\n    print("-", item)'},
  {name:'توابع',code:
'def greet(name, lang="fa"):\n    if lang == "fa":\n        return f"سلام، {name} جان!"\n    return f"Hello, {name}!"\n\ndef area(width, height):\n    return width * height\n\nprint(greet("ماهان"))\nprint(greet("Ali", "en"))\nprint("مساحت مستطیل:", area(4, 7))'},
  {name:'دیکشنری',code:
'phonebook = {\n    "مامان": "0912-111-2233",\n    "صادق": "0935-444-5566",\n}\n\nphonebook["رزا"] = "0901-777-8899"\n\nfor name, number in phonebook.items():\n    print(name, ":", number)\n\nprint("شماره صادق:", phonebook.get("صادق", "پیدا نشد"))'},
  {name:'بازی حدس عدد',code:
'# بازی حدس عدد — نسخه قابل اجرا در مرورگر\nsecret = 68\nguesses = [50, 75, 62, 68]\nattempts = 0\n\nfor guess in guesses:\n    attempts += 1\n    if guess < secret:\n        print(guess, ": بزرگ‌تر بگو")\n    elif guess > secret:\n        print(guess, ": کوچک‌تر بگو")\n    else:\n        print(guess, ": آفرین! درست حدس زدی")\n        break\n\nprint("تعداد تلاش‌ها:", attempts)'}
];
var HERO_CODE='# شروع سفر پایتون با talash\nname = "یار همیشگی"\nskills = ["متغیرها", "حلقه‌ها", "توابع"]\n\nfor skill in skills:\n    print(name, "یاد گرفت:", skill)\n\nprint("۱۲ درس تا سطح متوسط — آماده‌ای؟")';

/* ---------------- Pyodide worker ---------------- */
var PYODIDE_URL='https://cdn.jsdelivr.net/pyodide/v0.26.2/full/';
var WORKER_SRC=(
  "var PYURL="+JSON.stringify(PYODIDE_URL)+";\n"+
  "var bootPromise=null;\n"+
  "function boot(){\n"+
  "  if(bootPromise)return bootPromise;\n"+
  "  try{ importScripts(PYURL+'pyodide.js'); }\n"+
  "  catch(e){ bootPromise=null; postMessage({type:'fatal'}); throw e; }\n"+
  "  bootPromise=loadPyodide({indexURL:PYURL});\n"+
  "  return bootPromise;\n"+
  "}\n"+
  "self.onmessage=async function(ev){\n"+
  "  var d=ev.data;\n"+
  "  if(!d||d.type!=='run')return;\n"+
  "  try{\n"+
  "    var py=await boot();\n"+
  "    py.setStdout({batched:function(s){postMessage({type:'out',text:s});}});\n"+
  "    py.setStderr({batched:function(s){postMessage({type:'err',text:s});}});\n"+
  "    var r=await py.runPythonAsync(d.code);\n"+
  "    if(r!==undefined&&r!==null)postMessage({type:'out',text:String(r)});\n"+
  "    postMessage({type:'done'});\n"+
  "  }catch(e){\n"+
  "    var msg=(e&&e.message)?e.message:String(e);\n"+
  "    postMessage({type:'pyerror',text:msg});\n"+
  "  }\n"+
  "};\n"
);
var pyWorker=null,pyReady=false,runTimer=null,runSeq=0,currentExample=0,editorRefresh=null;

function ensureWorker(){
  if(pyWorker)return pyWorker;
  try{
    var blob=new Blob([WORKER_SRC],{type:'text/javascript'});
    pyWorker=new Worker(URL.createObjectURL(blob));
    pyWorker.onmessage=onWorkerMsg;
    pyWorker.onerror=function(){handleFatal();};
  }catch(e){pyWorker=null;return null;}
  return pyWorker;
}
function killWorker(){
  if(pyWorker){try{pyWorker.terminate();}catch(e){}}
  pyWorker=null;pyReady=false;
  if(runTimer){clearTimeout(runTimer);runTimer=null;}
}
function setPyStatus(state,text){
  var el=$('#edStatus'),t=$('#edStatusText');
  if(el)el.className='ed-status '+state;
  if(t)t.textContent=text;
}
function setRunning(on){
  var b=$('#runBtn');
  if(!b)return;
  if(on){b.disabled=true;b.innerHTML=icon('refresh',15)+' در حال اجرا...';}
  else{b.disabled=false;b.innerHTML=icon('play',15)+' اجرای کد';}
}
function consoleBody(){return $('#consoleBody');}
function addSysLine(text,cls){
  var body=consoleBody();if(!body)return;
  var span=document.createElement('span');
  span.className=cls||'sys';
  span.textContent=text;
  body.appendChild(span);
  body.scrollTop=body.scrollHeight;
}
function appendOut(text,cls){
  var body=consoleBody();if(!body)return;
  var span=document.createElement('span');
  if(cls)span.className=cls;
  span.textContent=text+'\n';
  body.appendChild(span);
  body.scrollTop=body.scrollHeight;
}
function clearConsole(withPlaceholder){
  var body=consoleBody();
  if(!body)return;
  body.innerHTML='';
  if(withPlaceholder!==false)addSysLine('# خروجی برنامه اینجا نمایش داده می‌شود. دکمه «اجرای کد» را بزنید.');
}
function handleFatal(){
  killWorker();
  setRunning(false);
  setPyStatus('ready','آماده');
  addSysLine('اتصال به اینترنت برقرار نشد و دانلود مفسر واقعی پایتون (Pyodide) ممکن نشد.','err');
  addSysLine('برای اجرای واقعی کد، اینترنت لازم است. تا زمانی که اتصال برقرار نشود هیچ خروجی نمایش داده نمی‌شود تا خروجی واقعی با خروجی فرضی اشتباه گرفته نشود.','warn');
}
function handlePyError(text){
  if(runTimer){clearTimeout(runTimer);runTimer=null;}
  setRunning(false);
  setPyStatus('ready','آماده');
  if(!pyReady&&/Fetch|Network|importScripts|loadPyodide|CDN|dynamically/i.test(text)){handleFatal();return;}
  appendOut(text,'err');
  var hints=[
    ['SyntaxError','خطای نوشتاری: احتمالاً پرانتز، کوتیشن یا دونقطه‌ای جا افتاده است.'],
    ['IndentationError','تورفتگی‌ها نامنظم است؛ همه خطوط یک بلوک باید فاصله یکسان داشته باشند.'],
    ['NameError','متغیری استفاده شده که قبلاً تعریف نشده است.'],
    ['TypeError','نوع داده با عملیات سازگار نیست؛ مثلاً جمع رشته و عدد.'],
    ['IndexError','ایندکس خارج از محدوده لیست یا رشته است.'],
    ['KeyError','کلید مورد نظر در دیکشنری وجود ندارد؛ از get استفاده کنید.'],
    ['ZeroDivisionError','تقسیم بر صفر ممکن نیست.'],
    ['ValueError','مقدار قابل تبدیل نیست؛ مثلاً int روی متن غیر عددی.'],
    ['EOFError','تابع input() در محیط مرورگر پشتیبانی نمی‌شود؛ این کد را در ترمینال یا VS Code اجرا کنید.']
  ];
  for(var i=0;i<hints.length;i++){
    if(text.indexOf(hints[i][0])!==-1){addSysLine('راهنما: '+hints[i][1]);break;}
  }
}
function finishRun(ok){
  if(runTimer){clearTimeout(runTimer);runTimer=null;}
  setRunning(false);
  setPyStatus('ready','آماده');
  if(ok)addSysLine('اجرای کد با موفقیت به پایان رسید.');
}
function onWorkerMsg(ev){
  var d=ev.data||{};
  if(d.type==='out'){pyReady=true;setPyStatus('running','در حال اجرا...');appendOut(d.text,'');}
  else if(d.type==='err'){pyReady=true;setPyStatus('running','در حال اجرا...');appendOut(d.text,'err');}
  else if(d.type==='done'){finishRun(true);}
  else if(d.type==='pyerror'){handlePyError(d.text);}
  else if(d.type==='fatal'){handleFatal();}
}
function runCode(){
  var ta=$('#code-input');
  if(!ta)return;
  if(!ensureWorker()){
    addSysLine('اجرای کد در این مرورگر ممکن نیست (Web Worker در دسترس نیست).','err');
    return;
  }
  clearConsole(false);
  if(/input\s*\(/.test(ta.value)){
    addSysLine('هشدار: این کد از input() استفاده می‌کند که در محیط مرورگر پشتیبانی نمی‌شود؛ برای اجرای واقعی آن را در ترمینال یا VS Code اجرا کنید.','warn');
  }
  if(pyReady){
    setPyStatus('running','در حال اجرا...');
    addSysLine('در حال اجرای کد...');
  }else{
    setPyStatus('loading','در حال آماده‌سازی پایتون...');
    addSysLine('در حال دانلود و آماده‌سازی مفسر واقعی پایتون (فقط بار اول؛ چند ثانیه طول می‌کشد)...');
  }
  setRunning(true);
  var seq=++runSeq;
  try{pyWorker.postMessage({type:'run',code:ta.value});}
  catch(e){handleFatal();return;}
  if(runTimer)clearTimeout(runTimer);
  runTimer=setTimeout(function(){
    if(seq!==runSeq)return;
    killWorker();
    setRunning(false);
    setPyStatus('ready','آماده');
    addSysLine('اجرای کد بیش از حد طول کشید و متوقف شد؛ احتمالاً یک حلقه بی‌نهایت ساخته‌اید. شرط حلقه را بررسی کنید.','err');
  },45000);
}

/* ---------------- editor ---------------- */
function initEditor(initialCode){
  var ta=$('#code-input'),hl=$('#hl'),gutter=$('#gutter');
  if(!ta||!hl||!gutter)return;
  ta.value=initialCode||'';
  var refresh=function(){
    hl.innerHTML=highlight(ta.value)+'\n';
    var lines=ta.value.split('\n').length,g='',i;
    for(i=1;i<=lines;i++)g+=i+'\n';
    gutter.textContent=g;
    try{localStorage.setItem(CKEY,ta.value);}catch(e){}
  };
  var sync=function(){
    hl.scrollTop=ta.scrollTop;hl.scrollLeft=ta.scrollLeft;
    gutter.scrollTop=ta.scrollTop;
  };
  ta.addEventListener('input',refresh);
  ta.addEventListener('scroll',sync);
  ta.addEventListener('keydown',function(e){
    if(e.key==='Tab'){
      e.preventDefault();
      var s=ta.selectionStart,en=ta.selectionEnd;
      ta.setRangeText('    ',s,en,'end');
      refresh();
    }
  });
  editorRefresh=refresh;
  refresh();sync();
  gutter.scrollTop=0;
}
function loadExample(i,silent){
  var ta=$('#code-input');
  if(!ta||!PLAY_EXAMPLES[i])return;
  ta.value=PLAY_EXAMPLES[i].code;
  currentExample=i;
  $$('.example-item').forEach(function(b,j){b.classList.toggle('active',j===i);});
  if(editorRefresh)editorRefresh();
  if(ta.scrollTop!==undefined){ta.scrollTop=0;if(editorRefresh)editorRefresh();}
  if(!silent)toast('مثال «'+PLAY_EXAMPLES[i].name+'» بارگذاری شد.','info');
}
function viewPlayground(){
  var list=PLAY_EXAMPLES.map(function(ex,i){
    return '<button type="button" class="example-item'+(i===currentExample?' active':'')+'" data-action="load-example" data-ex="'+i+'">'
      +'<span class="ex-ic">'+icon('python',14)+'</span>'+esc(ex.name)+'</button>';
  }).join('');
  return '<div class="container"><div class="pg-grid"><div class="pg-main">'
    +'<div class="pg-head"><div><h2>محیط اجرای کد پایتون</h2>'
    +'<p>کد بنویسید و واقعاً اجرا کنید؛ مفسر کامل پایتون (Pyodide) داخل مرورگر شما اجرا می‌شود و خروجیِ واقعیِ کد نمایش داده می‌شود.</p></div></div>'
    +'<div class="editor"><div class="editor-head">'
    +'<div class="ed-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>'
    +'<span class="ed-title">main.py</span>'
    +'<div class="ed-status" id="edStatus"><span class="dot"></span><span id="edStatusText">آماده</span></div>'
    +'</div><div class="editor-wrap"><div class="gutter" id="gutter">1</div>'
    +'<div class="code-area"><pre class="hl" id="hl"></pre>'
    +'<textarea id="code-input" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="ویرایشگر کد پایتون"></textarea></div></div></div>'
    +'<div class="toolbar">'
    +'<button type="button" class="btn btn-primary" id="runBtn" data-action="run-code">'+icon('play',15)+' اجرای کد</button>'
    +'<button type="button" class="btn btn-ghost btn-sm" data-action="clear-code">'+icon('trash',14)+' پاک کردن کد</button>'
    +'<button type="button" class="btn btn-ghost btn-sm" data-action="reset-code">'+icon('refresh',14)+' بازگرداندن مثال</button>'
    +'<span class="tb-note">'+icon('info',13)+' کلید Tab = تورفتگی کد</span></div>'
    +'<div class="console"><div class="console-head"><span class="console-title">خروجی — Output</span>'
    +'<button type="button" class="chip-btn danger console-clear" data-action="clear-output">'+icon('trash',12)+' پاک کردن خروجی</button></div>'
    +'<div class="console-body" id="consoleBody"></div></div>'
    +'<div class="pg-note">'+icon('info',14)+' اجرا کاملاً واقعی است و خروجی ساختگی نمایش داده نمی‌شود. دانلود مفسر برای بار اول به اینترنت نیاز دارد. تابع input() در محیط مرورگر پشتیبانی نمی‌شود؛ چنین کدهایی باید در ترمینال یا VS Code اجرا شوند.</div>'
    +'</div>'
    +'<aside class="examples-panel"><h4>'+icon('spark',15)+' نمونه کدهای آماده</h4><div class="examples-list">'+list+'</div></aside>'
    +'</div></div>';
}

/* ---------------- quiz ---------------- */
var quizState={lessonId:0,total:0,right:0,wrong:0,answered:{}};
var OPT_KEYS=['الف','ب','ج','د'];
function qCard(q,i){
  return '<div class="q-card" data-answer="'+Number(q.answer)+'">'
    +'<span class="q-num">سوال '+faNum(i+1)+' از '+faNum(quizState.total)+'</span>'
    +'<p class="q-text">'+esc(q.q)+'</p>'
    +'<div class="options">'
    +(q.options||[]).map(function(o,j){
      return '<button type="button" class="opt" data-action="quiz-answer" data-q="'+i+'" data-o="'+j+'">'
        +'<span class="o-key">'+OPT_KEYS[j]+'</span><span class="o-text">'+esc(o)+'</span><span class="o-mark"></span></button>';
    }).join('')
    +'</div>'
    +'<div class="explain-box"><b>پاسخ درست: '+OPT_KEYS[Number(q.answer)]+'</b> — '+esc(q.explain||'')+'</div>'
    +'</div>';
}
function viewQuiz(id){
  var l=byId(id);
  var qs=QUIZZES[Number(id)]||[];
  if(!l||!qs.length){
    return '<div class="container"><div class="quiz-wrap"><div class="quiz-top"><div>'
      +'<h2>آزمون پیدا نشد</h2><p class="qt-sub">برای این درس آزمونی ثبت نشده است.</p></div>'
      +'<a class="btn btn-ghost" href="#/lessons">بازگشت به درس‌ها</a></div></div></div>';
  }
  quizState={lessonId:Number(id),total:qs.length,right:0,wrong:0,answered:{}};
  var best=(progress.scores[Number(id)]||{}).best;
  return '<div class="container"><div class="quiz-wrap">'
    +'<div class="quiz-top"><div class="course-icon">'+icon(l.icon||'python',22)+'</div>'
    +'<div><h2>آزمون فصل: '+esc(l.title)+'</h2>'
    +'<p class="qt-sub">به هر سوال پاسخ بده؛ بلافاصله گزینه درست با توضیح کوتاه نمایش داده می‌شود و در پایان نمره‌ات را می‌بینی.</p></div>'
    +'<div class="qt-score"><div class="val">'+(best!=null?faNum(best)+'/'+faNum(qs.length):'—')+'</div><div class="lbl">بهترین نمره</div></div></div>'
    +'<div class="quiz-progress"><span id="quizScore" class="tb-crumb">۰ درست / ۰ غلط</span></div>'
    +qs.map(function(q,i){return qCard(q,i);}).join('')
    +'<div class="quiz-result" id="quizResult"></div>'
    +'</div></div>';
}
function answerQuiz(el){
  var card=el.closest('.q-card');
  if(!card||card.classList.contains('answered'))return;
  var qIndex=Number(el.dataset.q),oIndex=Number(el.dataset.o);
  var correct=Number(card.dataset.answer);
  card.classList.add('answered');
  $$('.opt',card).forEach(function(o,i){
    var m=o.querySelector('.o-mark');
    if(i===correct){o.classList.add('correct');if(m)m.innerHTML=icon('check',15);}
    else if(i===oIndex){o.classList.add('wrong');if(m)m.innerHTML=icon('x',15);}
  });
  quizState.answered[qIndex]=true;
  if(oIndex===correct)quizState.right++;else quizState.wrong++;
  var sc=$('#quizScore');
  if(sc)sc.textContent=faNum(quizState.right)+' درست / '+faNum(quizState.wrong)+' غلط';
  if(quizState.right+quizState.wrong===quizState.total)showQuizResult();
}
function showQuizResult(){
  var id=quizState.lessonId,total=quizState.total,score=quizState.right;
  if(!total)return;
  var p=Math.round(score/total*100);
  var s=progress.scores[id]||{best:0,attempts:0};
  s.last=score;s.best=Math.max(s.best||0,score);s.attempts=(s.attempts||0)+1;
  progress.scores[id]=s;saveProgress();
  var msg,color;
  if(p===100){msg='بی‌نظیر بود! به تسلط کامل رسیدی.';color='var(--green)';}
  else if(p>=80){msg='عالی! فقط چند قدم تا تسلط کامل مانده.';color='var(--green)';}
  else if(p>=60){msg='خوب بود؛ یک مرور کوتاه از درس نتیجه را بهتر می‌کند.';color='var(--amber)';}
  else{msg='اشکالی ندارد؛ درس را دوباره مرور کن و دوباره تلاش کن.';color='var(--red)';}
  var panel=$('#quizResult');if(!panel)return;
  panel.innerHTML='<div class="score-ring" style="background:conic-gradient('+color+' '+p+'%, #241546 0)">'
    +'<div class="sr-num">'+faNum(p)+'٪<small>نمره شما</small></div></div>'
    +'<div class="qr-title">'+esc(msg)+'</div>'
    +'<div class="qr-detail">'+faNum(score)+' پاسخ درست از '+faNum(total)+' سوال — بهترین نمره ثبت‌شده: <b>'+faNum(s.best)+' از '+faNum(total)+'</b></div>'
    +'<div class="qr-actions"><button type="button" class="btn btn-primary" data-action="quiz-retry">'+icon('refresh',15)+' تلاش دوباره</button>'
    +'<a class="btn btn-ghost" href="#/lessons/'+id+'">'+icon('book',15)+' بازگشت به درس</a></div>';
  panel.classList.add('show');
  panel.scrollIntoView({behavior:'smooth',block:'center'});
}

/* ---------------- home ---------------- */
function viewHome(){
  var totalEx=0,quizQ=0;
  LESSONS.forEach(function(l){totalEx+=(l.exercises||[]).length;});
  Object.keys(QUIZZES).forEach(function(k){quizQ+=(QUIZZES[k]||[]).length;});
  var cid=continueId();
  var continueLabel=isDone(cid)?'مرور درس‌ها':'ادامه یادگیری';
  if(!progress.completed.length)continueLabel='شروع یادگیری';
  var pathItems=LESSONS.map(function(l){
    return '<a class="path-item'+(isDone(l.id)?' done':'')+'" href="#/lessons/'+l.id+'">'
      +'<span class="p-num">'+faNum(l.id)+'</span>'
      +'<span class="p-info"><span class="p-title">'+esc(l.title)+'</span>'
      +'<span class="p-meta">'+esc(l.level)+' — '+esc(l.duration)+'</span></span>'
      +'<span class="p-state">'+icon(isDone(l.id)?'check':'chevL',16)+'</span></a>';
  }).join('');
  var features=[
    ['book','آموزش فارسی گام‌به‌گام','۱۲ درس کامل با زبانی ساده و مثال‌های ملموس؛ از نصب پایتون تا ساخت اولین پروژه واقعی.'],
    ['terminal','اجرای واقعی کد در مرورگر','محیط کدنویسی حرفه‌ای با هایلایت سینتکس که کدهای پایتون را با مفسر واقعی اجرا می‌کند؛ نه نمایش ساختگی.'],
    ['clipboard','آزمون چهارگزینه‌ای هر فصل','پس از هر درس با آزمون تعاملی دانسته‌هایت را بسنج؛ پاسخ درست با توضیح کوتاه نمایش داده می‌شود.'],
    ['level','پیگیری هوشمند پیشرفت','درس‌های تکمیل‌شده، نمرات آزمون و درصد پیشرفت کلی در مرورگر شما ذخیره می‌شود و هر وقت خواستی ادامه بده.'],
    ['eye','حالت تمرکز بدون حواس‌پرتی','با یک کلیک فقط متن درس را ببین؛ مناسب مطالعه عمیق و شب‌زنده‌داری‌های امتحان.'],
    ['spark','کاملاً رایگان و بدون ثبت‌نام','همه درس‌ها، تمرین‌ها و ابزارها رایگان‌اند؛ بدون حساب کاربری و محدودیت دسترسی.']
  ];
  var featureCards=features.map(function(f){
    return '<div class="feature-card"><div class="f-ic">'+icon(f[0],20)+'</div>'
      +'<h3 class="f-title">'+f[1]+'</h3><p class="f-desc">'+f[2]+'</p></div>';
  }).join('');
  var courseCards=LESSONS.map(function(l,i){
    return '<article class="course-card"><div class="cc-head"><div class="course-icon">'+icon(l.icon||'python',20)+'</div>'
      +(isDone(l.id)?'<span class="cc-badge">تکمیل شد</span>':'')
      +'</div><div class="cc-body"><h3>'+faNum(i+1)+'. '+esc(l.title)+'</h3><p>'+esc(l.description||'')+'</p>'
      +'<div class="cc-meta"><span class="cm">'+icon('level',13)+esc(l.level||'')+'</span>'
      +'<span class="cm">'+icon('clock',13)+esc(l.duration||'')+'</span>'
      +'<span class="cm">'+icon('clipboard',13)+faNum(qCount(l.id))+' سوال آزمون</span></div></div>'
      +'<div class="cc-foot"><a class="btn btn-soft" href="#/lessons/'+l.id+'">مشاهده درس '+icon('chevL',15)+'</a></div></article>';
  }).join('');
  var stat=faNum;
  return '<section class="hero"><div class="container hero-inner">'
    +'<div><span class="hero-badge">'+icon('zap',14)+' آموزش تعاملی پایتون به زبان فارسی</span>'
    +'<h1 class="hero-title">یادگیری پایتون از صفر، <span class="grad">به فارسی و با کدِ واقعی</span></h1>'
    +'<p class="hero-sub">talash Python یک مسیر کامل و گام‌به‌گام برای رسیدن از صفر به سطح متوسط پایتون است؛ با ۱۲ درس کامل، تمرین، آزمون و محیط اجرای واقعی کد در مرورگر — بدون نیاز به نصب هیچ چیز.</p>'
    +'<div class="hero-actions">'
    +'<a class="btn btn-primary btn-lg" href="#/lessons/'+cid+'">'+icon('play',16)+' '+continueLabel+'</a>'
    +'<a class="btn btn-ghost btn-lg" href="#/playground">'+icon('terminal',16)+' امتحان محیط کد</a></div>'
    +'<div class="hero-trust"><span>'+icon('check',14)+' کاملاً رایگان</span>'
    +'<span>'+icon('check',14)+' بدون نیاز به ثبت‌نام</span>'
    +'<span>'+icon('check',14)+' اجرای واقعی کد در مرورگر</span></div></div>'
    +'<div class="hero-visual"><div class="hv-card"><div class="hv-head"><span class="r"></span><span class="y"></span><span class="g"></span></div>'
    +'<pre class="hv-body">'+highlight(HERO_CODE)+'</pre></div>'
    +'<div class="hv-chip chip1">'+icon('check',14)+' پیشرفت خودکار ذخیره می‌شود</div>'
    +'<div class="hv-chip chip2">'+icon('terminal',14)+' خروجی واقعی، نه نمایشی</div></div>'
    +'</div></section>'
    +'<section class="section"><div class="container"><div class="stats-grid">'
    +'<div class="stat-card"><div class="stat-num">'+stat(TOTAL)+'</div><div class="stat-label">درس کامل فارسی</div></div>'
    +'<div class="stat-card"><div class="stat-num">'+stat(totalEx)+'</div><div class="stat-label">تمرین عملی برنامه‌نویسی</div></div>'
    +'<div class="stat-card"><div class="stat-num">'+stat(quizQ)+'</div><div class="stat-label">سوال آزمون چهارگزینه‌ای</div></div>'
    +'<div class="stat-card"><div class="stat-num">'+stat(PLAY_EXAMPLES.length)+'</div><div class="stat-label">نمونه کد آماده اجرا</div></div>'
    +'</div></div></section>'
    +'<section class="section"><div class="container"><div class="section-head">'
    +'<span class="kicker">مسیر یادگیری</span><h2 class="section-title">از نصب پایتون تا اولین پروژه واقعی</h2>'
    +'<p class="section-sub">درس‌ها طوری چیده شده‌اند که هر درس روی درس قبلی سوار شود؛ به ترتیب برو و بدون سردرگمی به سطح متوسط برس.</p></div>'
    +'<div class="path-list">'+pathItems+'</div></div></section>'
    +'<section class="section"><div class="container"><div class="section-head">'
    +'<span class="kicker">امکانات talash Python</span><h2 class="section-title">همه چیز برای یادگیری اصولی</h2>'
    +'<p class="section-sub">این سایت فقط متن نیست؛ یک محیط کامل تمرین و سنجش است که همه‌اش داخل مرورگر تو کار می‌کند.</p></div>'
    +'<div class="features-grid">'+featureCards+'</div></div></section>'
    +'<section class="section"><div class="container"><div class="section-head">'
    +'<span class="kicker">دوره‌های آموزشی</span><h2 class="section-title">۱۲ درس از مبتدی تا متوسط</h2>'
    +'<p class="section-sub">هر درس شامل آموزش مفهومی، نمونه کد با خروجی، تمرین عملی و آزمون چهارگزینه‌ای است.</p></div>'
    +'<div class="courses-grid">'+courseCards+'</div></div></section>'
    +'<section class="section"><div class="container"><div class="cta-banner">'
    +'<h3>همین امروز اولین خط کد پایتون‌ات را بنویس</h3>'
    +'<p>هیچ نصب و ثبت‌نامی لازم نیست؛ از درس اول شروع کن و ببین یادگیری چقدر می‌تواند ساده باشد.</p>'
    +'<div class="cta-actions"><a class="btn btn-primary btn-lg" href="#/lessons/1">'+icon('play',16)+' شروع یادگیری</a>'
    +'<a class="btn btn-ghost btn-lg" href="#/help">'+icon('help',16)+' راهنمای استفاده</a></div>'
    +'</div></div></section>';
}

/* ---------------- dashboard / lesson ---------------- */
function viewLessons(id){
  var l=byId(id);
  if(!l)l=LESSONS[0];
  id=l.id;
  var prev=byId(id-1),next=byId(id+1);
  var sidebar='<aside class="dash-sidebar" id="dashSidebar">'
    +'<div class="side-title">فهرست درس‌ها</div>'
    +'<div class="side-search"><svg class="s-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
    +'<input type="search" id="sideSearch" placeholder="جستجو در درس‌ها..." aria-label="جستجوی درس‌ها"></div>'
    +'<div class="side-progress"><div class="sp-row"><span>پیشرفت کلی</span><span class="sp-num" id="spNum">'+faNum(progress.completed.length)+' از '+faNum(TOTAL)+'</span></div>'
    +'<div class="progress-bar"><div class="progress-fill" style="width:'+pct()+'%"></div></div></div>'
    +'<nav class="lesson-list">'+LESSONS.map(function(ls){
      return '<a class="lesson-item'+(ls.id===id?' active':'')+(isDone(ls.id)?' done':'')+'" href="#/lessons/'+ls.id+'" data-lesson-id="'+ls.id+'">'
        +'<span class="l-num">'+faNum(ls.id)+'</span><span class="l-name">'+esc(ls.title)+'</span>'
        +'<span class="l-status">'+(isDone(ls.id)?icon('check',14):'')+'</span></a>';
    }).join('')+'</nav>'
    +'<button type="button" class="chip-btn danger side-reset" data-action="reset-progress">'+icon('refresh',13)+' بازنشانی پیشرفت</button>'
    +'</aside><div class="side-backdrop" data-action="toggle-sidebar"></div>';
  var goals=(l.goals&&l.goals.length)?'<div class="goals-box"><h4>'+icon('target',15)+' در این درس چه یاد می‌گیری؟</h4><ul>'
    +l.goals.map(function(g){return '<li>'+icon('check',13)+'<span>'+esc(g)+'</span></li>';}).join('')
    +'</ul></div>':'';
  var sections=(l.sections||[]).map(renderSection).join('');
  var exercises=(l.exercises&&l.exercises.length)?'<section class="content-section"><h3>تمرین‌های این درس</h3>'
    +l.exercises.map(function(ex,i){
      return '<div class="exercise-card"><span class="ex-tag">تمرین '+faNum(i+1)+'</span>'
        +'<p class="ex-q">'+esc(ex.q)+'</p>'
        +'<div class="ex-actions">'
        +'<button type="button" class="chip-btn" data-action="toggle-hint" data-target="hint-'+i+'">'+icon('bulb',13)+'نمایش راهنما</button>'
        +'<button type="button" class="chip-btn" data-action="toggle-hint" data-target="sol-'+i+'">'+icon('python',13)+'نمایش پاسخ</button>'
        +'</div>'
        +'<div class="ex-hint" id="hint-'+i+'"><b>راهنما:</b> '+esc(ex.hint||'')+'</div>'
        +'<div class="ex-solution" id="sol-'+i+'">'+codeBlock({code:ex.solution||''},{title:'solution.py'})+'</div>'
        +'</div>';
    }).join('')+'</section>':'';
  var qs=QUIZZES[id]||[];
  var sc=progress.scores[id];
  var markBtn='<div class="mark-row">'
    +'<button type="button" class="btn btn-primary btn-done'+(isDone(id)?' is-done':'')+'" id="markBtn" data-action="mark-done" data-id="'+id+'">'
    +icon('check',16)+(isDone(id)?' این درس تکمیل شده است':' درس را یاد گرفتم')+'</button>'
    +'<span class="mr-note">با زدن این دکمه، درس به پیشرفت شما اضافه و در همین مرورگر ذخیره می‌شود.</span></div>';
  var quizCta=qs.length?('<div class="quiz-cta"><div class="qc-info"><h4>آزمون چهارگزینه‌ای این فصل</h4>'
    +'<p>'+faNum(qs.length)+' سوال؛ پس از هر پاسخ، گزینه درست با توضیح کوتاه نمایش داده می‌شود.</p>'
    +(sc?'<span class="qc-score">بهترین نمره شما: '+faNum(sc.best)+' از '+faNum(qs.length)+'</span>':'')
    +'</div><a class="btn btn-soft" href="#/quiz/'+id+'">'+icon('clipboard',16)+'شروع آزمون</a></div>'):'';
  var navBtns='<div class="lesson-nav">'
    +(prev?'<a class="ln-btn" href="#/lessons/'+prev.id+'">'+icon('chevR',17)+'<span class="ln-label"><small>درس قبلی</small><span class="ln-title">'+esc(prev.title)+'</span></span></a>'
          :'<span class="ln-btn disabled">'+icon('chevR',17)+'<span class="ln-label"><small>درس قبلی</small><span class="ln-title">این اولین درس است</span></span></span>')
    +(next?'<a class="ln-btn next" href="#/lessons/'+next.id+'">'+icon('chevL',17)+'<span class="ln-label"><small>درس بعدی</small><span class="ln-title">'+esc(next.title)+'</span></span></a>'
          :'<span class="ln-btn next disabled">'+icon('chevL',17)+'<span class="ln-label"><small>درس بعدی</small><span class="ln-title">آخرین درس — تبریک!</span></span></span>')
    +'</div>';
  return '<div class="container"><div class="dash">'+sidebar
    +'<div class="dash-main">'
    +'<div class="dash-topbar">'
    +'<button type="button" class="icon-btn side-toggle" data-action="toggle-sidebar" aria-label="فهرست درس‌ها">'+icon('menu',18)+'</button>'
    +'<span class="tb-crumb">درس '+faNum(id)+' از '+faNum(TOTAL)+'</span>'
    +'<div class="tb-progress"><div class="progress-bar"><div class="progress-fill" id="tbFill" style="width:'+pct()+'%"></div></div>'
    +'<span class="tb-pct" id="tbPct">'+faNum(pct())+'٪</span></div>'
    +'<button type="button" class="chip-btn" data-action="focus-toggle">'+icon('eye',13)+'حالت تمرکز</button>'
    +'</div>'
    +'<article class="lesson-head"><div class="lh-top"><div class="course-icon">'+icon(l.icon||'python',22)+'</div>'
    +'<div><h2>'+esc(l.title)+'</h2><div class="lesson-meta">'
    +'<span class="cm">'+icon('level',13)+esc(l.level||'')+'</span>'
    +'<span class="cm">'+icon('clock',13)+esc(l.duration||'')+'</span>'
    +'<span class="cm">'+icon('book',13)+faNum((l.sections||[]).length)+' بخش آموزشی</span>'
    +'<span class="cm">'+icon('clipboard',13)+faNum(qCount(id))+' سوال آزمون</span>'
    +'</div></div></div>'+goals+'</article>'
    +'<div class="lesson-body">'+sections+exercises+'</div>'
    +markBtn+quizCta+navBtns
    +'</div></div></div>';
}

/* ---------------- about / help ---------------- */
function viewAbout(){
  return '<div class="container"><div class="about-wrap">'
    +'<div class="about-hero"><h2>درباره talash Python</h2>'
    +'<p>talash Python یک پلتفرم آموزشی فارسی برای یادگیری پایتون از صفر تا سطح متوسط است. باور ما ساده است: آموزش برنامه‌نویسی باید به زبان خودت، با مثال‌های قابل فهم و با امکان تمرینِ واقعی در همان لحظه باشد — نه فقط خواندنِ متن.</p></div>'
    +'<div class="creator-card"><div class="avatar">م ش</div>'
    +'<div class="creator-info"><h3>ماهان شریفی</h3>'
    +'<div class="creator-role">سازنده، طراح و مدرس talash Python</div>'
    +'<p>تمام محتوای آموزشی این دوره، تمرین‌ها، آزمون‌ها و طراحی این وب‌سایت توسط ماهان شریفی ساخته شده است؛ با این هدف که هر کسی در هر شهری از ایران و بدون هزینه بتواند مسیر یادگیری پایتون را از اولین خط کد تا اولین پروژه واقعی طی کند.</p>'
    +'<span class="creator-badge">'+icon('check',14)+' این وب‌سایت اثر مستقل ماهان شریفی است</span></div></div>'
    +'<div class="values-grid">'
    +'<div class="feature-card"><div class="f-ic">'+icon('book',20)+'</div><h3 class="f-title">آموزش از صفر مطلق</h3><p class="f-desc">هیچ پیش‌نیازی لازم نیست؛ همه مفاهیم از تعریف اولیه شروع می‌شوند و هر اصطلاح در اولین استفاده توضیح داده می‌شود.</p></div>'
    +'<div class="feature-card"><div class="f-ic">'+icon('terminal',20)+'</div><h3 class="f-title">یادگیری با عمل</h3><p class="f-desc">هر مفهوم بلافاصله با کد قابل اجرا همراه است؛ خواندن کافی نیست، باید کد بنویسی و خروجی را خودت ببینی.</p></div>'
    +'<div class="feature-card"><div class="f-ic">'+icon('spark',20)+'</div><h3 class="f-title">رایگان و بدون واسطه</h3><p class="f-desc">بدون ثبت‌نام، بدون تبلیغ و بدون هزینه؛ داده‌های تو هم فقط روی مرورگر خودت ذخیره می‌شود.</p></div>'
    +'</div>'
    +'<div class="section-head" style="text-align:center"><span class="kicker" style="justify-content:center">زیر ساخت</span><h3 class="section-title" style="font-size:21px">این سایت با چه چیزی ساخته شده؟</h3></div>'
    +'<div class="stack-chips"><span class="chip">HTML5</span><span class="chip">CSS3</span><span class="chip">JavaScript</span>'
    +'<span class="chip">Pyodide — پایتون ۳ واقعی در مرورگر</span><span class="chip">LocalStorage برای ذخیره پیشرفت</span>'
    +'<span class="chip">بدون نیاز به سرور</span></div>'
    +'</div></div>';
}
function viewHelp(){
  var steps=[
    ['از صفحه اصلی شروع کن','دکمه «شروع یادگیری» تو را مستقیم به درس اول می‌برد؛ یا از فهرست درس‌ها، هر درسی را انتخاب کن.'],
    ['درس را بخوان و کدها را اجرا کن','هر درس شامل توضیح مفهومی و نمونه کد است؛ دکمه «اجرا در محیط کد» بالای هر کد، همان کد را در محیط اجرا باز می‌کند.'],
    ['تمرین‌ها را خودت حل کن','قبل از دیدن راهنما یا پاسخ، حداقل چند دقیقه خودت تلاش کن؛ یادگیری واقعی همین‌جا اتفاق می‌افتد.'],
    ['آزمون فصل را بده','در پایان هر درس، آزمون چهارگزینه‌ای آن فصل را بده؛ پاسخ درست با توضیح نمایش داده می‌شود و بهترین نمره‌ات ذخیره می‌شود.'],
    ['دکمه «درس را یاد گرفتم» را بزن','این کار درس را در پیشرفت تو ثبت می‌کند و مسیر «ادامه یادگیری» را به‌روز می‌کند.']
  ];
  var faqs=[
    ['آیا پیشرفت من ذخیره می‌شود؟','بله؛ درس‌های تکمیل‌شده، نمرات آزمون و کد باز شما در حافظه محلی مرورگر (LocalStorage) ذخیره می‌شود و با بستن مرورگر هم می‌ماند. توجه: اگر داده‌های مرورگر را پاک کنید، پیشرفت هم پاک می‌شود.'],
    ['چرا کد من در محیط اجرا اجرا نمی‌شود؟','برای بار اول، مفسر پایتون (حدود ۱۰ مگابایت) از اینترنت دانلود می‌شود؛ پس اینترنت لازم است. ضمناً تابع input() در محیط مرورگر پشتیبانی نمی‌شود و کدهایی که از آن استفاده می‌کنند باید در ترمینال یا VS Code اجرا شوند.'],
    ['آیا استفاده از سایت هزینه دارد؟','نه؛ تمام درس‌ها، تمرین‌ها، آزمون‌ها و محیط اجرای کد کاملاً رایگان‌اند و ثبت‌نامی هم لازم نیست.'],
    ['حالت تمرکز چیست و چطور از آن خارج شوم؟','دکمه «حالت تمرکز» در نوار بالای هر درس، سربرگ، فوتر و فهرست درس‌ها را مخفی می‌کند تا فقط روی متن درس تمرکز کنی؛ برای خروج، کلید Esc یا دکمه «خروج از حالت تمرکز» را بزن.'],
    ['چطور از همان درسی که مانده ادامه بدهم؟','دکمه «ادامه یادگیری» در صفحه اصلی، همیشه تو را به درسی می‌برد که آخرین بار دیده‌ای؛ پیشرفت هم به‌صورت خودکار ذخیره می‌شود.'],
    ['چطور کدهای داخل درس‌ها را امتحان کنم؟','روی دکمه «اجرا در محیط کد» بالای هر بلوک کد بزن؛ همان کد در محیط اجرا باز می‌شود و می‌توانی آن را ویرایش و اجرا کنی.'],
    ['آیا می‌توانم پیشرفتم را از صفر شروع کنم؟','بله؛ دکمه «بازنشانی پیشرفت» پایین فهرست درس‌ها (و همین صفحه) همه داده‌ها را پاک می‌کند و مسیر از صفر شروع می‌شود.']
  ];
  return '<div class="container"><div class="help-wrap">'
    +'<div class="about-hero"><h2>راهنمای استفاده از talash Python</h2>'
    +'<p>پنج قدم ساده تا یادگیری اصولی پایتون؛ و پاسخ رایج‌ترین سوال‌ها.</p></div>'
    +'<div class="help-steps">'+steps.map(function(s,i){
      return '<div class="help-step"><div class="hs-num">'+faNum(i+1)+'</div><div><h4>'+s[0]+'</h4><p>'+s[1]+'</p></div></div>';
    }).join('')+'</div>'
    +'<h3 class="faq-title">'+icon('help',19)+' سوال‌های متداول</h3>'
    +faqs.map(function(f){
      return '<details class="faq-item"><summary>'+esc(f[0])+'<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="chev"><polyline points="6 9 12 15 18 9"/></svg></summary>'
        +'<div class="faq-body">'+f[1]+'</div></details>';
    }).join('')
    +'<div style="margin-top:26px"><button type="button" class="btn btn-danger-ghost" data-action="reset-progress">'+icon('refresh',15)+' بازنشانی کامل پیشرفت</button></div>'
    +'</div></div>';
}

/* ---------------- search ---------------- */
function hideSearch(){
  var box=$('#searchResults');
  if(box){box.hidden=true;}
}
function renderSearch(q){
  var box=$('#searchResults');if(!box)return;
  var nq=normalize(q);
  if(!q||nq.length<2){box.hidden=true;box.innerHTML='';return;}
  var res=LESSONS.filter(function(l){
    return normalize(l.title).indexOf(nq)!==-1||normalize(l.description||'').indexOf(nq)!==-1;
  }).slice(0,8);
  box.innerHTML=res.length?res.map(function(l){
    return '<a class="search-item" href="#/lessons/'+l.id+'">'
      +'<span class="si-title">'+esc(l.title)+'<span class="si-idx">درس '+faNum(l.id)+'</span></span>'
      +'<span class="si-desc">'+esc(l.description||'')+'</span></a>';
  }).join(''):'<div class="search-empty">درسی با این عنوان پیدا نشد.</div>';
  box.hidden=false;
}

/* ---------------- progress UI helpers ---------------- */
function updateProgressUI(){
  var fill=$('#tbFill');if(fill)fill.style.width=pct()+'%';
  var pe=$('#tbPct');if(pe)pe.textContent=faNum(pct())+'٪';
  var sp=$('#spNum');if(sp)sp.textContent=faNum(progress.completed.length)+' از '+faNum(TOTAL);
}
function markDone(id){
  var l=byId(id);if(!l)return;
  if(isDone(id)){toast('این درس قبلاً به درس‌های تکمیل‌شده اضافه شده است.','info');return;}
  progress.completed.push(Number(id));
  progress.lastLesson=Number(id);
  saveProgress();
  var btn=$('#markBtn');
  if(btn){btn.classList.add('is-done');btn.innerHTML=icon('check',16)+' درس تکمیل شد';}
  var li=$('.lesson-item[data-lesson-id="'+Number(id)+'"]');
  if(li){
    li.classList.add('done');
    var st=li.querySelector('.l-status');
    if(st)st.innerHTML=icon('check',14);
  }
  updateProgressUI();
  toast('آفرین! درس «'+l.title+'» به‌عنوان تکمیل‌شده ثبت شد.','success');
}
function toggleFocus(){
  var on=document.body.classList.toggle('focus-mode');
  var fx=$('#focusExit');
  if(fx)fx.hidden=!on;
  if(on)toast('حالت تمرکز فعال شد؛ برای خروج کلید Esc را بزن.','info');
}
function exitFocus(){
  document.body.classList.remove('focus-mode');
  var fx=$('#focusExit');
  if(fx)fx.hidden=true;
}
function resetProgress(){
  var ok=window.confirm('همه پیشرفت‌ها شامل درس‌های تکمیل‌شده و نمرات آزمون پاک شود؟ این کار قابل بازگشت نیست.');
  if(!ok)return;
  progress={completed:[],scores:{},lastLesson:1};
  saveProgress();
  toast('پیشرفت با موفقیت بازنشانی شد؛ مسیر از صفر شروع می‌شود.','success');
  render();
}

/* ---------------- router ---------------- */
function parseHash(){
  var h=(location.hash||'').replace(/^#\/?/,'');
  var parts=h.split('/').filter(function(x){return x!=='';});
  return {route:parts[0]||'home',param:parts[1]||''};
}
function render(){
  var r=parseHash();
  document.body.classList.remove('nav-open','side-open');
  hideSearch();
  if(!TOTAL){
    app.innerHTML='<div class="container" style="padding:70px 20px;text-align:center;color:var(--amber)">'
      +'خطا در بارگذاری محتوای درس‌ها؛ لطفاً صفحه را دوباره بارگذاری کنید.</div>';
    return;
  }
  var html='',navKey=r.route,title='talash Python | آموزش پایتون از صفر تا متوسط';
  if(r.route==='lessons'){
    var id=Number(r.param)||(progress.lastLesson||1);
    if(id<1||id>TOTAL)id=1;
    progress.lastLesson=id;saveProgress();
    html=viewLessons(id);navKey='lessons';
    var l=byId(id);if(l)title=l.title+' | talash Python';
  }else if(r.route==='playground'){
    html=viewPlayground();navKey='playground';title='محیط اجرای کد | talash Python';
  }else if(r.route==='quiz'){
    html=viewQuiz(Number(r.param)||1);title='آزمون | talash Python';
  }else if(r.route==='about'){
    html=viewAbout();navKey='about';title='درباره ما | talash Python';
  }else if(r.route==='help'){
    html=viewHelp();navKey='help';title='راهنما | talash Python';
  }else{
    html=viewHome();navKey='home';
  }
  app.innerHTML=html;
  document.title=title;
  $$('[data-nav]').forEach(function(a){
    a.classList.toggle('active',a.getAttribute('data-nav')===navKey);
  });
  app.classList.remove('page-enter');
  void app.offsetWidth;
  app.classList.add('page-enter');
  window.scrollTo(0,0);
  afterRender(r.route);
}
function afterRender(route){
  if(route==='lessons'){
    var ss=$('#sideSearch');
    if(ss){
      ss.addEventListener('input',function(){
        var nq=normalize(ss.value);
        $$('.lesson-item').forEach(function(a){
          var nameEl=a.querySelector('.l-name');
          var hit=!nq||(nameEl&&normalize(nameEl.textContent).indexOf(nq)!==-1);
          a.style.display=hit?'':'none';
        });
      });
    }
    var activeLi=$('.lesson-item.active');
    if(activeLi&&activeLi.scrollIntoView)activeLi.scrollIntoView({block:'nearest'});
  }
  if(route==='playground'){
    clearConsole(true);
    var initial=null,pending=null;
    try{pending=sessionStorage.getItem(SKEY);if(pending!=null){initial=pending;sessionStorage.removeItem(SKEY);}}catch(e){}
    if(initial==null){try{initial=localStorage.getItem(CKEY);}catch(e){}}
    if(!initial){initial=PLAY_EXAMPLES[0].code;currentExample=0;}
    initEditor(initial);
  }
}

/* ---------------- global events ---------------- */
app.addEventListener('click',function(e){
  var el=e.target.closest('[data-action]');
  if(!el)return;
  var action=el.getAttribute('data-action');
  if(action==='copy'){copyText(el.getAttribute('data-code')||'');}
  else if(action==='open-playground'){
    try{sessionStorage.setItem(SKEY,el.getAttribute('data-code')||'');}catch(err){}
    location.hash='#/playground';
  }
  else if(action==='mark-done'){markDone(Number(el.getAttribute('data-id')));}
  else if(action==='toggle-hint'){
    var t=document.getElementById(el.getAttribute('data-target'));
    if(t)t.classList.toggle('show');
  }
  else if(action==='quiz-answer'){answerQuiz(el);}
  else if(action==='quiz-retry'){render();}
  else if(action==='focus-toggle'){toggleFocus();}
  else if(action==='toggle-sidebar'){document.body.classList.toggle('side-open');}
  else if(action==='load-example'){loadExample(Number(el.getAttribute('data-ex')));}
  else if(action==='run-code'){runCode();}
  else if(action==='clear-code'){
    var ta=$('#code-input');
    if(ta){ta.value='';if(editorRefresh)editorRefresh();}
    toast('کد پاک شد؛ با «بازگرداندن مثال» می‌توانی دوباره شروع کنی.','info');
  }
  else if(action==='reset-code'){loadExample(currentExample);}
  else if(action==='clear-output'){clearConsole(true);}
  else if(action==='reset-progress'){resetProgress();}
});

(function init(){
  var gs=$('#globalSearch');
  if(gs){
    gs.addEventListener('input',function(){renderSearch(gs.value);});
  }
  var nav=$('#mainNav');
  if(nav)nav.addEventListener('click',function(){
    document.body.classList.remove('nav-open');
    var nt=$('#navToggle');if(nt)nt.setAttribute('aria-expanded','false');
  });
  var nt=$('#navToggle');
  if(nt)nt.addEventListener('click',function(){
    var open=document.body.classList.toggle('nav-open');
    nt.setAttribute('aria-expanded',open?'true':'false');
  });
  var fx=$('#focusExit');
  if(fx)fx.addEventListener('click',exitFocus);
  document.addEventListener('click',function(e){
    if(!e.target.closest('#searchBox'))hideSearch();
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      if(document.body.classList.contains('focus-mode'))exitFocus();
      else{
        document.body.classList.remove('nav-open','side-open');
        hideSearch();
      }
    }
  });
  window.addEventListener('hashchange',render);
  render();
})();

})();
