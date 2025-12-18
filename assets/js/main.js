/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
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
    navmenu.addEventListener('click', function (e) {
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
    if (typed_strings && typeof Typed !== 'undefined') {
      const strings = typed_strings.split(',').map(s => s.trim());
      if (!window.typedInstance) {
        window.typedInstance = new Typed('.typed', {
          strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }
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
      handler: function (direction) {
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
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
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
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
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
  window.addEventListener('load', function (e) {
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
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
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

  //   new Swiper('.testimonials-slider', {
  //   loop: true,
  //   speed: 600,
  //   autoplay: {
  //     delay: 5000
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true
  //   }
  // });

  // --- Append this block to the end of assets/js/main.js ---
  // Force portfolio sliders to show 1 slide per view across the site (no per-page HTML edits needed)
  document.addEventListener('DOMContentLoaded', function () {
    // small delay to allow any automatic Swiper initialization to run first
    setTimeout(function () {
      document.querySelectorAll('.portfolio-details-slider').forEach(function (container) {
        try {
          var instance = container.swiper; // Swiper instance (if auto-initialized)
          if (instance) {
            // Apply our desired params and update the instance
            if (instance.params.slidesPerView !== 1 || instance.params.spaceBetween !== 20) {
              instance.params.slidesPerView = 1;
              instance.params.spaceBetween = 20;
              instance.update();
            }
          } else {
            // If the slider hasn't been initialized for some reason, init a safe swiper
            new Swiper(container, {
              loop: true,
              speed: 600,
              autoplay: { delay: 5000 },
              slidesPerView: 1,
              spaceBetween: 20,
              pagination: {
                el: container.querySelector('.swiper-pagination') || '.swiper-pagination',
                type: 'bullets',
                clickable: true
              }
            });
          }
        } catch (err) {
          // fail silently but log for debugging
          console && console.warn && console.warn('portfolio slider patch failed', err);
        }
      });
    }, 80); // 80ms is enough in most pages; increase to 250ms if your init runs late
  });

  // Detele from here up===========================


  // * Navmenu Scrollspy
  // */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    const offset = 180; // increased breathing room
    const position = window.scrollY + offset;
    let activeLink = null;

    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;

      if (navmenulink.hash === '#about') {
        const aboutSection = document.querySelector('#about');
        const statsSection = document.querySelector('#stats');
        if (aboutSection) {
          const start = aboutSection.offsetTop - 420;
          const aboutEnd = aboutSection.offsetTop + aboutSection.offsetHeight + 420;
          const statsEnd = statsSection ? statsSection.offsetTop + statsSection.offsetHeight + 420 : 0;
          const end = Math.max(aboutEnd, statsEnd);
          if (position >= start && position <= end) {
            activeLink = navmenulink;
          }
        }
        return;
      }

      const section = document.querySelector(navmenulink.hash);
      if (section && position >= (section.offsetTop - 360) && position <= (section.offsetTop + section.offsetHeight + 360)) {
        activeLink = navmenulink;
      }
    });

    document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Interactive tilt for stats cards
   */
  document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stats .stats-item');
    const MAX_TILT = 9;
    const activeCounters = new Map();
    const shadowTimers = new Map();

    function animateCounter(span) {
      const end = Number(span.dataset.purecounterEnd || span.textContent || 0);
      const durationSec = Number(span.dataset.purecounterDuration || 1);
      const duration = Math.max(durationSec * 1000, 200);
      const startTime = performance.now();

      if (activeCounters.has(span)) {
        cancelAnimationFrame(activeCounters.get(span));
      }

      span.textContent = '0';

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * end);
        span.textContent = value.toLocaleString();
        if (progress < 1) {
          const rafId = requestAnimationFrame(step);
          activeCounters.set(span, rafId);
        } else {
          span.textContent = end.toLocaleString();
          activeCounters.delete(span);
        }
      };

      const rafId = requestAnimationFrame(step);
      activeCounters.set(span, rafId);
    }

    statCards.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const percentX = (x / rect.width) - 0.5;
        const percentY = (y / rect.height) - 0.5;
        const tiltX = percentX * MAX_TILT;
        const tiltY = -percentY * MAX_TILT;

        card.style.setProperty('--tiltX', `${tiltX}deg`);
        card.style.setProperty('--tiltY', `${tiltY}deg`);
        card.style.setProperty('--lift', '-10px');
        card.style.setProperty('--scale', '1.1');
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tiltX', '0deg');
        card.style.setProperty('--tiltY', '0deg');
        card.style.setProperty('--lift', '0px');
        card.style.setProperty('--scale', '1');

        if (shadowTimers.has(card)) {
          clearTimeout(shadowTimers.get(card));
          shadowTimers.delete(card);
        }
        card.classList.remove('shadow-on');
      });

      card.addEventListener('mouseenter', () => {
        card.style.setProperty('--lift', '-8px');
        card.style.setProperty('--scale', '1.08');
        card.classList.add('shadow-on');

        const counter = card.querySelector('.purecounter');
        if (counter) {
          animateCounter(counter);
        }
      });
    });
  });

  /**
   * Mouse tracking on profile image with snake-like layer following
   */
  const profileImage = document.querySelector('.hero .hero-visual .profile-container .profile-image');
  const profileBg2 = document.querySelector('.hero .hero-visual .profile-container .profile-background-2');
  const profileBg = document.querySelector('.hero .hero-visual .profile-container .profile-background');
  const profileBg3 = document.querySelector('.hero .hero-visual .profile-container .profile-background-3');
  const profileBgSec = document.querySelector('.hero .hero-visual .profile-container .profile-background-secondary');

  if (profileImage) {
    profileImage.addEventListener('mousemove', function (e) {
      // Add mouse-move class to trigger transform
      profileImage.classList.add('mouse-move');
      profileBg2?.classList.add('snake-follow');
      profileBg?.classList.add('snake-follow');
      profileBg3?.classList.add('snake-follow');
      profileBgSec?.classList.add('snake-follow');
    });

    profileImage.addEventListener('mouseleave', function () {
      // Remove mouse-move class to reset position
      profileImage.classList.remove('mouse-move');
      profileBg2?.classList.remove('snake-follow');
      profileBg?.classList.remove('snake-follow');
      profileBg3?.classList.remove('snake-follow');
      profileBgSec?.classList.remove('snake-follow');
    });
  }

})();
