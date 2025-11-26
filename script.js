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
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".scroll_container");

  // 모바일일 때는 JS 스크롤 아예 사용하지 않음
  if (window.innerWidth <= 768) {
    return;
  }

  // PC일 때만 자동 스크롤 실행
  let scrollAmount = 0;

  function autoScroll() {
    scrollAmount += 1;
    scrollContainer.scrollLeft = scrollAmount;

    if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
      scrollAmount = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();
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