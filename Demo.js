// ── HAMBURGER ──
function toggleMenu(){
  const h=document.getElementById('ham');
  const n=document.getElementById('navwrap');
  h.classList.toggle('open');
  n.classList.toggle('open');
}
function closeMenu(){
  document.getElementById('ham').classList.remove('open');
  document.getElementById('navwrap').classList.remove('open');
}

// ── RESULT DB ──
const db10={"1045231":{name:"Mohammad Aryan Khan",father:"Mohammad Salim Khan",mother:"Nasreen Bano",section:"A",subjects:[{sub:"Hindi",max:100,obt:82},{sub:"English",max:100,obt:74},{sub:"Mathematics",max:100,obt:91},{sub:"Science",max:100,obt:87},{sub:"Social Science",max:100,obt:78},{sub:"Sanskrit",max:100,obt:69}]},
"1045232":{name:"Aisha Fatima Siddiqui",father:"Abdul Rahman Siddiqui",mother:"Zubeda Begum",section:"B",subjects:[{sub:"Hindi",max:100,obt:95},{sub:"English",max:100,obt:88},{sub:"Mathematics",max:100,obt:77},{sub:"Science",max:100,obt:83},{sub:"Social Science",max:100,obt:92},{sub:"Sanskrit",max:100,obt:85}]},
"1045233":{name:"Rahul Sharma",father:"Rajesh Sharma",mother:"Sunita Sharma",section:"A",subjects:[{sub:"Hindi",max:100,obt:60},{sub:"English",max:100,obt:55},{sub:"Mathematics",max:100,obt:38},{sub:"Science",max:100,obt:52},{sub:"Social Science",max:100,obt:61},{sub:"Sanskrit",max:100,obt:44}]},
"1045234":{name:"Priya Gupta",father:"Suresh Gupta",mother:"Kavita Gupta",section:"C",subjects:[{sub:"Hindi",max:100,obt:89},{sub:"English",max:100,obt:91},{sub:"Mathematics",max:100,obt:96},{sub:"Science",max:100,obt:94},{sub:"Social Science",max:100,obt:88},{sub:"Sanskrit",max:100,obt:90}]}};
const db12={"2045101":{name:"Neha Verma",father:"Vinod Verma",mother:"Rekha Verma",stream:"Science (PCM)",subjects:[{sub:"Hindi",max:100,obt:79},{sub:"English",max:100,obt:83},{sub:"Physics",max:100,obt:88},{sub:"Chemistry",max:100,obt:85},{sub:"Mathematics",max:100,obt:92}]},
"2045102":{name:"Sameer Hussain",father:"Jabir Hussain",mother:"Rukhsana Begum",stream:"Arts",subjects:[{sub:"Hindi",max:100,obt:84},{sub:"English",max:100,obt:77},{sub:"History",max:100,obt:88},{sub:"Geography",max:100,obt:80},{sub:"Civics",max:100,obt:76}]},
"2045103":{name:"Anjali Singh",father:"Rajendra Singh",mother:"Manju Singh",stream:"Commerce",subjects:[{sub:"Hindi",max:100,obt:72},{sub:"English",max:100,obt:68},{sub:"Accountancy",max:100,obt:91},{sub:"Business Studies",max:100,obt:84},{sub:"Economics",max:100,obt:78}]},
"2045105":{name:"Divya Agarwal",father:"Anil Agarwal",mother:"Seema Agarwal",stream:"Science (PCM)",subjects:[{sub:"Hindi",max:100,obt:93},{sub:"English",max:100,obt:96},{sub:"Physics",max:100,obt:98},{sub:"Chemistry",max:100,obt:95},{sub:"Mathematics",max:100,obt:99}]}};

let curCls='10th';
function switchTab(c,btn){
  curCls=c;
  document.querySelectorAll('.rtab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('form-title').textContent=c==='10th'?'Class 10th — High School Result':'Class 12th — Intermediate Result';
  document.getElementById('roll-input').placeholder=c==='10th'?'e.g. 1045231':'e.g. 2045101';
  document.getElementById('roll-input').value='';
  hideAll();
}
function hideAll(){
  document.getElementById('r-card').classList.remove('show');
  document.getElementById('r-error').classList.remove('show');
  document.getElementById('r-loading').classList.remove('show');
}
function grade(p){
  if(p>=91)return{g:'A1',c:'ga1'};if(p>=81)return{g:'A2',c:'ga2'};
  if(p>=71)return{g:'B1',c:'gb1'};if(p>=61)return{g:'B2',c:'gb2'};
  if(p>=51)return{g:'C1',c:'gc1'};if(p>=41)return{g:'C2',c:'gc2'};
  if(p>=33)return{g:'D',c:'gd'};return{g:'F',c:'gf'};
}
async function fetchResult(){
  const roll=document.getElementById('roll-input').value.trim();
  if(!roll){document.getElementById('roll-input').focus();return;}
  hideAll();
  document.getElementById('r-loading').classList.add('show');
  document.getElementById('search-btn').disabled=true;
  try{
    document.getElementById('r-loading').classList.remove('show');
    const year=document.getElementById('year-select').value;
    const response=await fetch(`/api/results?class=${encodeURIComponent(curCls)}&roll=${encodeURIComponent(roll)}&year=${encodeURIComponent(year)}`);
    const s=await response.json();
    if(!response.ok){document.getElementById('r-error').classList.add('show');return;}
    document.getElementById('rc-name').textContent=s.name;
    document.getElementById('rc-meta').textContent=`Father: ${s.father} | ${s.stream||'Section: '+s.section}`;
    document.getElementById('rc-roll').textContent=roll;
    document.getElementById('rc-class').textContent='Class '+curCls+' | '+year;
    const tm=s.subjects.reduce((a,r)=>a+r.max,0);
    const to=s.subjects.reduce((a,r)=>a+r.obt,0);
    const pct=((to/tm)*100).toFixed(1);
    const fail=s.subjects.some(r=>(r.obt/r.max*100)<33);
    document.getElementById('rc-total').textContent=to+' / '+tm;
    document.getElementById('rc-percent').textContent=pct+'%';
    const b=document.getElementById('rc-badge');
    b.textContent=fail?'FAIL ✗':'PASS ✓';b.className='rc-badge'+(fail?' fail':'');
    let rows='';
    s.subjects.forEach(r=>{
      const sp=Math.round(r.obt/r.max*100);const gi=grade(sp);const ok=sp>=33;
      rows+=`<tr><td>${r.sub}</td><td style="text-align:center">${r.max}</td><td style="text-align:center;font-weight:600">${r.obt}</td><td style="text-align:center"><span class="gp ${gi.c}">${gi.g}</span></td><td style="text-align:center;color:${ok?'#155724':'#721c24'};font-weight:600">${ok?'Pass':'Fail'}</td></tr>`;
    });
    rows+=`<tr><td><strong>TOTAL</strong></td><td style="text-align:center"><strong>${tm}</strong></td><td style="text-align:center"><strong>${to}</strong></td><td style="text-align:center"><span class="gp ${grade(parseFloat(pct)).c}">${grade(parseFloat(pct)).g}</span></td><td style="text-align:center;color:${fail?'#721c24':'#155724'};font-weight:700">${fail?'✗ FAIL':'✓ PASS'}</td></tr>`;
    document.getElementById('rc-tbody').innerHTML=rows;
    document.getElementById('r-card').classList.add('show');
    document.getElementById('r-card').scrollIntoView({behavior:'smooth',block:'nearest'});
  }catch(error){
    document.getElementById('r-error').classList.add('show');
  }finally{
    document.getElementById('r-loading').classList.remove('show');
    document.getElementById('search-btn').disabled=false;
  }
}

function switchUni(t,btn){
  document.querySelectorAll('.utab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.upanel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('uni-'+t).classList.add('active');
}

async function submitAdm(){
  const n=document.getElementById('a-name').value.trim();
  const f=document.getElementById('a-father').value.trim();
  const p=document.getElementById('a-phone').value.trim();
  const c=document.getElementById('a-class').value;
  if(!n){alert('Please enter student name');return;}
  if(!f){alert("Please enter father's name");return;}
  if(!p||p.length<10){alert('Please enter valid 10-digit mobile number');return;}
  if(!c){alert('Please select class');return;}
  const button=document.querySelector('.adm-submit');
  button.disabled=true;
  try{
    const response=await fetch('/api/admissions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({studentName:n,fatherName:f,motherName:document.getElementById('a-mother').value,dateOfBirth:document.getElementById('a-dob').value,gender:document.getElementById('a-gender').value,className:c,previousSchool:document.getElementById('a-prev').value,phone:p,email:document.getElementById('a-email').value,address:document.getElementById('a-addr').value})});
    const result=await response.json();
    if(!response.ok) throw new Error(result.error);
    document.getElementById('adm-ok').style.display='block';
    button.style.display='none';
  }catch(error){alert(error.message||'Unable to submit enquiry. Please try again.');button.disabled=false;}
}

async function submitJob(){
  const n=document.getElementById('j-name').value.trim();
  const p=document.getElementById('j-phone').value.trim();
  const po=document.getElementById('j-post').value.trim();
  if(!n){alert('Please enter your name');return;}
  if(!po){alert('Please enter the post you are applying for');return;}
  if(!p||p.length<10){alert('Please enter valid 10-digit mobile number');return;}
  const button=document.querySelector('.jsub');
  button.disabled=true;
  try{
    const cv=document.getElementById('j-cv').files[0];
    const response=await fetch('/api/careers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,gender:document.getElementById('j-gen').value,post:po,phone:p,email:document.getElementById('j-email').value,previousInstitution:document.getElementById('j-prev').value,experience:document.getElementById('j-exp').value,qualification:document.getElementById('j-qual').value,address:document.getElementById('j-addr').value,cvName:cv?cv.name:''})});
    const result=await response.json();
    if(!response.ok) throw new Error(result.error);
    document.getElementById('j-ok').style.display='block';
    button.style.display='none';
  }catch(error){alert(error.message||'Unable to submit application. Please try again.');button.disabled=false;}
}

// ── SCROLL REVEAL ──
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}  });
},{threshold:0.1});
document.querySelectorAll('.rev').forEach(el=>obs.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
        const href = a.getAttribute('href');
        if(href === '#') return; // अगर सिर्फ # है तो कुछ मत करो
        const t=document.querySelector(href);
        if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
    });
});