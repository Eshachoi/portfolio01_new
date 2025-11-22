//햄버거메뉴
const navArea = document.querySelector('.nav_area');
const openBtn = document.querySelector('.open_btn');
const closeBtn = document.querySelector('.close_btn');
const navMenu = document.querySelector('.nav_menu');

function openMenu() {
  navArea.classList.add('menu-open');
  navMenu.classList.add('active');
  // 더 이상 body overflow 숨기지 않는다!
}

function closeMenu() {
  navArea.classList.remove('menu-open');
  navMenu.classList.remove('active');
}

openBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

//about text fade in
// About 텍스트 페이드 인
document.addEventListener("scroll", () => {
  const lines = document.querySelectorAll(".about_text p.line");
  const about = document.querySelector("#about");
  const center = window.innerHeight / 2;

  lines.forEach((line, index) => {
    const lineRect = line.getBoundingClientRect();
    const distance = Math.abs(lineRect.top - center);

    // 🔥 여기를 키우면 ‘보이는 범위’가 넓어짐
    const maxDist = 600; // 기존 250 → 600 (더 천천히 사라짐)

    let t = 1 - Math.min(distance / maxDist, 1);

    const opacity = t;
    const translateY = 40 * (1 - t);

    line.style.opacity = opacity;
    line.style.transform = `translateY(${translateY}px)`;
  });
});




//process
document.addEventListener("DOMContentLoaded", () => {
  
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab_content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-target");

      contents.forEach(c => c.classList.remove("active"));
      tabs.forEach(t => t.classList.remove("active"));   

      tab.classList.add("active");

      const selected = document.getElementById(target);
      selected.classList.add("active");
    });
  });

});


//portfolio hirizontal scroll
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".scroll_container");
  if (!container || window.innerWidth <= 768) return;

  let speed = 1;
  let isPaused = false;

  // li 6개 불러오기
  let items = Array.from(container.children);
  const gap = parseFloat(getComputedStyle(container).gap) || 0;

  // 원본 width 계산
  let itemWidths = items.map(li => li.getBoundingClientRect().width);
  let originalWidth = itemWidths.reduce((a, b) => a + b, 0) + gap * (items.length - 1);

  // 2세트 구성 (총 12개)
  items.forEach(item => container.appendChild(item.cloneNode(true)));

  let position = 0;

  container.addEventListener("mouseenter", () => { isPaused = true; });
  container.addEventListener("mouseleave", () => { isPaused = false; });

  function loop() {
    if (!isPaused) position -= speed;

    // reset 순간을 "순간이동"이 아니라 "연결점 이동"으로 처리 → 부드러움 100%
    if (Math.abs(position) >= originalWidth) {
      position += originalWidth;
    }

    container.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(loop);
  }

  loop();
});












//rest 
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let current = 0;

  function fadeSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  setInterval(fadeSlide, 7000);
});

//top btn & scroll progress bar
document.addEventListener("DOMContentLoaded", () => {

  /* --- 스크롤 진행바 기능 --- */
  const progressBar = document.querySelector(".scroll_progress_bar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.height = progress + "%";
  });

  /* --- Top 버튼 기능 --- */
  document.querySelector(".scroll_top_btn").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});

/* ==========================
   PROCESS — SINGLE TAB VIEW
========================== */
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab_content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {

    // 탭 active 초기화
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 컨텐츠 초기화
    contents.forEach(c => c.classList.remove('active'));

    // 클릭한 해당 인덱스만 오픈
    contents[index].classList.add('active');
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header_content");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});