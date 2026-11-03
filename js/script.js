
const WA = "923001234567";
const TEAM = [
 {focus:"Pregnancy Care", area:"Pregnancy", img:"images/prenatal.jpg", desc:"Antenatal visits, growth checks and birth planning, with time for every question.", langs:"Urdu, English", mode:"In person"},
 {focus:"Gynaecology", area:"Gynaecology", img:"images/clinic.jpg", desc:"Period problems, infections, pelvic pain and routine screening, handled privately.", langs:"Urdu, English", mode:"In person"},
 {focus:"Ultrasound & Scans", area:"Ultrasound", img:"images/ultrasound.jpg", desc:"Pregnancy and pelvic scans with reports explained before you leave.", langs:"Urdu, English", mode:"In person"},
 {focus:"PCOS & Hormonal Health", area:"Gynaecology", img:"images/wellness.jpg", desc:"Cycles, skin, hair and weight — a practical plan of medicine, food and movement.", langs:"Urdu, English", mode:"In person"},
 {focus:"After Birth & Breastfeeding", area:"Postnatal", img:"images/breastfeeding.jpg", desc:"Recovery checks, feeding support and newborn guidance in the first weeks.", langs:"Urdu, English", mode:"In person"},
 {focus:"Wellness & Nutrition", area:"Gynaecology", img:"images/nutrition.jpg", desc:"Iron, energy and everyday health — a food-first plan for a Pakistani kitchen.", langs:"Urdu, English", mode:"In person"},
];
const grid = document.getElementById("teamGrid");
function renderTeam(filter){
  if(!grid) return;
  const list = filter === "all" ? TEAM : TEAM.filter(t => t.area === filter);
  grid.innerHTML = list.map(t => `<div class="card"><div class="card-body"><img src="${t.img}" alt="${t.focus} care setting"><h3>${t.focus}</h3><p>${t.desc}</p><p><b>Languages:</b> ${t.langs}<br><b>Format:</b> ${t.mode}</p><a href="booking.html?service=${encodeURIComponent(t.focus)}" class="btn btn-outline">Book this care &rarr;</a></div></div>`).join("");
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}
renderTeam("all");
const filterBox = document.getElementById("teamFilter");
if(filterBox){
  filterBox.addEventListener("click", e => {
    const b = e.target.closest(".chip-btn"); if(!b) return;
    filterBox.querySelectorAll(".chip-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active"); renderTeam(b.dataset.f);
  });
}
const io = new IntersectionObserver(es => es.forEach(en => { if(en.isIntersecting){ en.target.classList.add("visible"); io.unobserve(en.target); } }), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
const params = new URLSearchParams(location.search);
const svc = document.getElementById("fService");
if(svc && params.get("service")){
  [...svc.options].forEach(o => { if(o.text.replace(/&/g,"&") === params.get("service") || o.text === params.get("service")) o.selected = true; });
  if([...svc.options].every(o => !o.selected)) svc.selectedIndex = 0;
}
const form = document.getElementById("bookForm");
if(form){
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("fName").value.trim();
    const phone = document.getElementById("fPhone").value.trim();
    const service = svc.value;
    const date = document.getElementById("fDate").value;
    const time = document.getElementById("fTime").value;
    const lang = document.getElementById("fLang").value;
    const ref = "NC-" + Math.floor(100000 + Math.random()*900000);
    const msg = `Hello NoorCare, I would like to book: ${service} on ${date} (${time}), language: ${lang}. Name: ${name}, phone: ${phone}. Booking ref: ${ref}`;
    const box = document.getElementById("bookResult");
    box.hidden = false;
    box.innerHTML = `Thank you, ${name}! Your booking reference is <b>${ref}</b>. Please tap below to confirm on WhatsApp — your slot is held once we reply.<br><br><a class="btn btn-rose" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">Confirm on WhatsApp &rarr;</a>`;
  });
}
const cf = document.getElementById("contactForm");
if(cf){ cf.addEventListener("submit", e => { e.preventDefault(); document.getElementById("contactResult").hidden = false; }); }
const ham = document.getElementById("hamburger");
if(ham){ ham.addEventListener("click", () => document.getElementById("nav").classList.toggle("open")); }
