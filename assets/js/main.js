/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

    /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  new Swiper('.testimonials-slider', {
  loop: true,
  speed: 600,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

  // ====================
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const loading = form.querySelector('.loading');
  const sent = form.querySelector('.sent-message');
  const errorBox = form.querySelector('.error-message');

  const WEBHOOK_URL = form.getAttribute('action');
  if (!WEBHOOK_URL || !WEBHOOK_URL.startsWith('https://')) {
    console.error('Invalid or missing webhook URL');
    return;
  }

  if (loading) loading.style.display = 'none';
  if (sent) sent.style.display = 'none';
  if (errorBox) errorBox.style.display = 'none';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (loading) loading.style.display = 'block';
    if (sent) sent.style.display = 'none';
    if (errorBox) {
      errorBox.textContent = '';
      errorBox.style.display = 'none';
    }

    const formData = new FormData(form);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Request failed');

      if (loading) loading.style.display = 'none';
      if (sent) sent.style.display = 'block';
      form.reset();
    } catch (err) {
      if (loading) loading.style.display = 'none';
      if (errorBox) {
        errorBox.textContent = 'Įvyko klaida. Bandykite dar kartą.';
        errorBox.style.display = 'block';
      }
    }
  });
  
 // ====================== 
// <script>
//   (function () {
//     const form = document.getElementById('contactForm');
//     if (!form) return;

//     const loading = form.querySelector('.loading');
//     const sent = form.querySelector('.sent-message');
//     const errorBox = form.querySelector('.error-message');

//     const WEBHOOK_URL = form.getAttribute('action');

//     // Ensure initial state
//     if (loading) loading.style.display = 'none';
//     if (sent) sent.style.display = 'none';
//     if (errorBox) errorBox.style.display = 'none';

//     form.addEventListener('submit', async (e) => {
//       e.preventDefault();

//       if (loading) loading.style.display = 'block';
//       if (sent) sent.style.display = 'none';
//       if (errorBox) {
//         errorBox.textContent = '';
//         errorBox.style.display = 'none';
//       }

//       const formData = new FormData(form);

//       try {
//         const res = await fetch(WEBHOOK_URL, {
//           method: 'POST',
//           body: formData
//         });

//         let payload = null;
//         const ct = res.headers.get('content-type') || '';
//         if (ct.includes('application/json')) {
//           payload = await res.json();
//         }

//         const ok = res.ok && (!payload || payload.status === 'OK');

//         if (ok) {
//           if (loading) loading.style.display = 'none';
//           if (sent) sent.style.display = 'block';
//           form.reset();
//         } else {
//           const msg = (payload && payload.message) || 'Įvyko klaida. Bandykite dar kartą.';
//           throw new Error(msg);
//         }
//       } catch (err) {
//         if (loading) loading.style.display = 'none';
//         if (errorBox) {
//           errorBox.textContent = err.message || 'Įvyko klaida. Bandykite dar kartą.';
//           errorBox.style.display = 'block';
//         }
//       }
//     });
//   })();
// </script>
// ====================
  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
