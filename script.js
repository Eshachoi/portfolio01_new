//======햄버거메뉴=========
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.querySelector('.open_btn');
  const closeBtn = document.querySelector('.close_btn');
  const navMenu = document.querySelector('.nav_menu');

  if (!openBtn || !closeBtn || !navMenu) {
    console.error('버튼이나 메뉴를 찾을 수 없습니다!');
    return;
  }

  // 메뉴 열기
  openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    navMenu.classList.add('active');
    closeBtn.style.display = 'block';
    openBtn.style.display = 'none';
    document.body.style.overflow = 'hidden';
  });

  // 메뉴 닫기
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    navMenu.classList.remove('active');
    closeBtn.style.display = 'none';
    openBtn.style.display = 'block';
    document.body.style.overflow = '';
  });

  // 메뉴 링크 클릭 시 닫기
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      closeBtn.style.display = 'none';
      openBtn.style.display = 'block';
      document.body.style.overflow = '';
    });
  });
});


//======헤더 스크롤 동작=========
let lastScroll = window.scrollY || 0;
const headerEl = document.querySelector('.header');

if (headerEl) {
  window.addEventListener('scroll', () => {
    const current = window.scrollY || 0;

    if (current > lastScroll && current > 80) {
      headerEl.classList.add('hidden');
    } else {
      headerEl.classList.remove('hidden');
    }
    lastScroll = current;
  });
}


//======About 텍스트 페이드 인=========
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


//======Portfolio 이미지 복제 (무한 스크롤용)=========
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 768) {
    const scrollContainer = document.querySelector('.scroll_container');
    if (scrollContainer) {
      const items = scrollContainer.innerHTML;
      scrollContainer.innerHTML = items + items;
    }
  }
});


//======Process 탭 (PC & Mobile)=========
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab_content");

  if (!tabs.length || !contents.length) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // 모바일: 첫 번째 탭과 컨텐츠 활성화
    tabs[0].classList.add("active");
    contents[0].classList.add("active");
    
    tabs.forEach(tab => {
      tab.addEventListener("click", function (e) {
        // 클릭 이벤트가 tab_inner나 num을 클릭해도 작동하도록
        e.stopPropagation();
        
        const targetID = this.dataset.target;
        
        // 모든 탭/컨텐츠 비활성화
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));
        
        // 클릭한 탭 활성화
        this.classList.add("active");
        const targetContent = document.getElementById(targetID);
        if (targetContent) {
          targetContent.classList.add("active");
        }
      });
    });
  } else {
    // PC: 높이 조절 방식
    contents.forEach(content => {
      const h4 = content.querySelector("h4");
      if (h4) {
        const h4Height = h4.scrollHeight + 60;
        content.style.height = h4Height + "px";
        content.classList.remove("open");
      }
    });

    tabs.forEach(tab => {
      tab.addEventListener("click", function () {
        const targetID = this.dataset.target;
        
        tabs.forEach(t => t.classList.remove("active"));
        this.classList.add("active");

        contents.forEach(content => {
          const h4 = content.querySelector("h4");
          const contentBox = content.querySelector(".content_box");
          
          if (!h4 || !contentBox) return;
          
          const h4Height = h4.scrollHeight + 60; 
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
  }
});


//======Rest 슬라이드쇼=========
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;
  
  let current = 0;

  function fadeSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  setInterval(fadeSlide, 7000);
});


//======스크롤 진행바 & Top 버튼=========
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".scroll_progress_bar");
  const scrollTopBtn = document.querySelector(".scroll_top_btn");

  // 스크롤 진행바
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.height = progress + "%";
    });
  }

  // Top 버튼
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});


//======헤더 스크롤 시 배경색 변경=========
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header_content");
  
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});
