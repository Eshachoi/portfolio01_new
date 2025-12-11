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
//document.addEventListener("DOMContentLoaded", () => {
//  if (window.innerWidth > 768) {
//    const scrollContainer = document.querySelector('.scroll_container');
//    if (scrollContainer) {
//      const items = scrollContainer.innerHTML;
//      scrollContainer.innerHTML = items + items;
//    }
//  }
//});
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 768) {
    const scrollContainer = document.querySelector('.scroll_container');
    if (scrollContainer) {
      // 원본 아이템들을 복제
      const originalItems = Array.from(scrollContainer.children);
      
      // 2번 더 복제해서 총 3세트 만들기
      originalItems.forEach(item => {
        scrollContainer.appendChild(item.cloneNode(true));
      });
      originalItems.forEach(item => {
        scrollContainer.appendChild(item.cloneNode(true));
      });
      
      let scrollPosition = 0;
      const scrollSpeed = 0.5; // 스크롤 속도 조절
      let animationId;
      let isPaused = false;
      
      // 첫 번째 세트의 전체 너비 계산
      let setWidth = 0;
      for (let i = 0; i < originalItems.length; i++) {
        setWidth += scrollContainer.children[i].offsetWidth + 50; // gap 포함
      }
      
      function animate() {
        if (!isPaused) {
          scrollPosition += scrollSpeed;
          
          // 한 세트를 완전히 지나가면 처음으로 리셋
          if (scrollPosition >= setWidth) {
            scrollPosition = 0;
          }
          
          scrollContainer.scrollLeft = scrollPosition;
        }
        
        animationId = requestAnimationFrame(animate);
      }
      
      animate();
      
      // 마우스 호버 시 일시정지
      scrollContainer.addEventListener('mouseenter', () => {
        isPaused = true;
      });
      
      scrollContainer.addEventListener('mouseleave', () => {
        isPaused = false;
      });
    }
  }
});

//======Process 탭 (PC & Mobile)=========
//document.addEventListener("DOMContentLoaded", function () {
//  const tabs = document.querySelectorAll(".tab");
//  const contents = document.querySelectorAll(".tab_content");
//
//  if (!tabs.length || !contents.length) return;
//
//  const isMobile = window.innerWidth <= 768;
//
//  if (isMobile) {
//    // ========== 모바일 ==========
//    // 첫 번째 탭과 컨텐츠 활성화
//    tabs[0].classList.add("active");
//    contents[0].classList.add("active");
//    
//    tabs.forEach(tab => {
//      tab.addEventListener("click", function (e) {
//        e.stopPropagation();
//        
//        const targetID = this.dataset.target;
//        
//        // 모든 탭/컨텐츠 비활성화
//        tabs.forEach(t => t.classList.remove("active"));
//        contents.forEach(c => c.classList.remove("active"));
//        
//        // 클릭한 탭 활성화
//        this.classList.add("active");
//        const targetContent = document.getElementById(targetID);
//        if (targetContent) {
//          targetContent.classList.add("active");
//        }
//      });
//    });
//    
//  } else {
//    // ========== PC ==========
//    // 첫 번째 탭 활성화
//    tabs[0].classList.add("active");
//    
//    // 초기 상태: 모든 박스를 h4만 보이는 높이로 설정
//    contents.forEach((content, index) => {
//      const h4 = content.querySelector("h4");
//      if (h4) {
//        const h4Height = h4.scrollHeight + 60;
//        content.style.height = h4Height + "px";
//        content.classList.remove("open");
//        
//        // 첫 번째만 열린 상태로
//        if (index === 0) {
//          const contentBox = content.querySelector(".content_box");
//          if (contentBox) {
//            const fullHeight = contentBox.scrollHeight + 60;
//            content.style.height = fullHeight + "px";
//            content.classList.add("open");
//          }
//        }
//      }
//    });
//
//    // 탭 클릭 이벤트
//    tabs.forEach(tab => {
//      tab.addEventListener("click", function () {
//        const targetID = this.dataset.target;
//        
//        // 탭 활성화
//        tabs.forEach(t => t.classList.remove("active"));
//        this.classList.add("active");
//
//        // 컨텐츠 높이 조절
//        contents.forEach(content => {
//          const h4 = content.querySelector("h4");
//          const contentBox = content.querySelector(".content_box");
//          
//          if (!h4 || !contentBox) return;
//          
//          const h4Height = h4.scrollHeight + 60; 
//          const fullHeight = contentBox.scrollHeight + 60;
//
//          if (content.id === targetID) {
//            // 클릭한 탭 - 펼치기
//            content.classList.add("open");
//            content.style.height = fullHeight + "px";
//          } else {
//            // 다른 탭 - 접기
//            content.classList.remove("open");
//            content.style.height = h4Height + "px";
//          }
//        });
//      });
//    });
//  }
//});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab_content");

  if (!tabs.length || !contents.length) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // ========== 모바일 ==========
    tabs[0].classList.add("active");
    contents[0].classList.add("active");

    tabs.forEach(tab => {
      tab.addEventListener("click", function (e) {
        e.stopPropagation();
        
        const targetID = this.dataset.target;

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        this.classList.add("active");
        document.getElementById(targetID).classList.add("active");
      });
    });

  } else {
    // ========== PC ==========

    // 초기 상태 설정
    tabs[0].classList.add("active");

    contents.forEach((content, index) => {
      const h4 = content.querySelector("h4");
      const contentBox = content.querySelector(".content_box");

      if (!h4 || !contentBox) return;

      const h4Height = h4.scrollHeight + 60;  
      const fullHeight = contentBox.scrollHeight + 60;

      if (index === 0) {
        // 첫 번째 컨텐츠는 열림
        content.classList.add("open");
        content.style.height = fullHeight + "px";
      } else {
        // 다른 컨텐츠는 접힌 상태
        content.classList.remove("open");
        content.style.height = h4Height + "px";
      }
    });

    // 클릭 이벤트
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





// 스크롤페이드인 
// const content = document.getElementsByClassName("content");

// window.addEventListener("scroll", ()=>{
//     const winH = window.innerHeight;

//     for(let i = 0; i < content.length; i++){
//         const contentTop = content[i].getBoundingClientRect().top;
//         if(contentTop - winH < 0){
//             content[i].classList.add("in");
//         }else{
//             content[i].classList.remove("in");
//         }
//     }
// })
