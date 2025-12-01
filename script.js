//======햄버거메뉴=========
// menu toggle
const openBtn = document.querySelector('.open_btn');
const closeBtn = document.querySelector('.close_btn');
const navMenu = document.querySelector('.nav_menu');

if (openBtn && closeBtn && navMenu) {
  openBtn.addEventListener('click', () => {
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    navMenu.setAttribute('aria-hidden', 'false');
  });

  closeBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
    navMenu.setAttribute('aria-hidden', 'true');
  });

  // 닫기: 오버레이 바깥 클릭으로 닫기 (선택)
  navMenu.addEventListener('click', (e) => {
    if (e.target === navMenu) {
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      navMenu.setAttribute('aria-hidden', 'true');
    }
  });
}

// 헤더 스크롤 동작: 아래로 스크롤하면 숨김, 위로 스크롤하면 표시
let lastScroll = window.scrollY || 0;
const headerEl = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const current = window.scrollY || 0;
  if (!headerEl) return;

  if (current > lastScroll && current > 80) {
    // 스크롤 다운
    headerEl.classList.add('hidden');
  } else {
    // 스크롤 업
    headerEl.classList.remove('hidden');
  }
  lastScroll = current;
});




//about text fade in
// About 텍스트 페이드 인
document.addEventListener("DOMContentLoaded", () => {
    const aboutText = document.querySelector(".about_text");

    if (!aboutText) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    aboutText.classList.add("show");
                }
            });
        },
        { threshold: 0.25 }
    );

    observer.observe(aboutText);
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
/*****************************************
 * Portfolio Scroll - Auto Scroll 제거 버전
 * PC/Mobile 모두 자동 스크롤 없음
 * 콘텐츠 부족하면 복제해서 폭만 늘림
 *****************************************/
/*****************************************
 * Portfolio Scroll - PC만 복제 / 모바일 NO
 *****************************************/










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
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab_content");

    // 처음 로딩 시: 모든 박스를 h4만 보이는 높이로 세팅
    contents.forEach(content => {
        const h4Height = content.querySelector("h4").scrollHeight + 60; // 패딩 포함
        content.style.height = h4Height + "px";
        content.classList.remove("open");
    });

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const targetID = this.dataset.target;

            // 탭 활성화
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            contents.forEach(content => {
                const contentBox = content.querySelector(".content_box");
                const h4Height = content.querySelector("h4").scrollHeight + 60; 
                const fullHeight = contentBox.scrollHeight + 60;

                if (content.id === targetID) {
                    content.classList.add("open");
                    content.style.height = fullHeight + "px";
                } else {
                    content.classList.remove("open");
                    content.style.height = h4Height + "px";
                }
            });
        });
    });
});







// 최초 실행
setupTabs();

// 화면 크기 변경 시 PC <-> 모바일 자동 재설정
window.addEventListener("resize", () => {
  setupTabs();
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header_content");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});