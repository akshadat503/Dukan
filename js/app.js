/* ==========================================================================
   MAIN APPLICATION JAVASCRIPT — STREAMLINED 6-PAGE NAVIGATION
   Clean, user-friendly page switcher without page reload or scrolling overlap.
   ========================================================================== */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // PAGE REGISTRY & BACKWARD-COMPATIBLE ALIASES
  // -------------------------------------------------------------------------
  const VALID_PAGES = [
    'hero',
    'problem-solution',
    'workflow',
    'technology',
    'app-showcase',
    'team'
  ];

  const PAGE_ALIASES = {
    'home': 'hero',
    'problem': 'problem-solution',
    'solution': 'problem-solution',
    'ai-pipeline': 'workflow',
    'offline-ai': 'technology',
    'tech-stack': 'technology',
    'architecture': 'technology',
    'market-linkage': 'problem-solution',
    'value-prop': 'problem-solution',
    'impact': 'problem-solution',
    'demo': 'team'
  };

  function resolvePageId(id) {
    if (!id) return 'hero';
    const cleanId = id.replace('#', '');
    if (VALID_PAGES.includes(cleanId)) return cleanId;
    if (PAGE_ALIASES[cleanId]) return PAGE_ALIASES[cleanId];
    return 'hero';
  }

  // -------------------------------------------------------------------------
  // MOBILE DRAWER CONTROLLER
  // -------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  function openMobileDrawer() {
    if (navMenu) navMenu.classList.add('mobile-open');
    if (mobileToggle) mobileToggle.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (navMenu) navMenu.classList.remove('mobile-open');
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMobileDrawer() {
    if (navMenu && navMenu.classList.contains('mobile-open')) {
      closeMobileDrawer();
    } else {
      openMobileDrawer();
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileDrawer();
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileDrawer);
  }

  // -------------------------------------------------------------------------
  // NAVBAR & ACTIVE STATE CONTROLLER
  // -------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');

  function updateActiveNav(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPage = link.getAttribute('data-page');
      if (linkPage === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // -------------------------------------------------------------------------
  // SMOOTH SCROLL TO SECTION (WITH STICKY NAVBAR OFFSET)
  // -------------------------------------------------------------------------
  function scrollToSection(requestedId, updateHash = true) {
    const pageId = resolvePageId(requestedId);
    const target = document.getElementById(pageId);
    if (!target) return;

    // Close mobile drawer if open
    closeMobileDrawer();

    if (pageId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const navHeight = (navbar ? navbar.offsetHeight : 70) + 12;
      const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }

    if (updateHash) {
      history.replaceState(null, '', `#${pageId}`);
    }

    updateActiveNav(pageId);

    // Auto-play video when arriving at Page 2, pause when leaving
    if (pageId === 'problem-solution') {
      setTimeout(playJudgeVideo, 300);
    } else {
      pauseJudgeVideo();
    }
  }

  // -------------------------------------------------------------------------
  // SCROLLSPY (TRACKS ACTIVE SECTION ON SCROLL)
  // -------------------------------------------------------------------------
  function initScrollSpy() {
    const sectionElements = VALID_PAGES.map(id => document.getElementById(id)).filter(Boolean);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateActiveNav(entry.target.id);
            if (entry.target.id === 'problem-solution') {
              playJudgeVideo();
            } else {
              pauseJudgeVideo();
            }
          }
        });
      }, {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.05
      });

      sectionElements.forEach(sec => observer.observe(sec));
    }

    window.addEventListener('scroll', () => {
      if (navbar) {
        if (window.scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Edge cases: top of page and bottom of page
      if (window.scrollY < 80) {
        updateActiveNav('hero');
      } else if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 80)) {
        updateActiveNav('team');
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // INITIALIZE ON LOAD
  // -------------------------------------------------------------------------
  function init() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Always reset to top on page reload to prevent jumping down to app-showcase
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }

    initScrollSpy();
    initJudgeVideo();
    initWorkflowStepper();
    initScrollSlideAnimations();
    initExploreImagesModal();
    updateActiveNav('hero');
  }

  // -------------------------------------------------------------------------
  // GLOBAL EVENT DELEGATION FOR ALL [data-page] & ANCHOR LINKS
  // -------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    // Check if clicked element or parent has data-page
    const pageTrigger = e.target.closest('[data-page]');
    if (pageTrigger) {
      const targetPage = pageTrigger.getAttribute('data-page');
      if (targetPage) {
        e.preventDefault();
        if (targetPage === 'problem-solution') {
          // Direct user gesture: immediately play with sound
          playJudgeVideo();
        }
        scrollToSection(targetPage);
        return;
      }
    }

    // Check for standard in-page hash links (e.g. href="#problem-solution")
    const hashLink = e.target.closest('a[href^="#"]');
    if (hashLink) {
      const href = hashLink.getAttribute('href');
      if (href && href.length > 1 && !hashLink.classList.contains('trigger-demo-modal')) {
        const targetId = href.substring(1);
        if (VALID_PAGES.includes(targetId) || PAGE_ALIASES[targetId]) {
          e.preventDefault();
          const resolved = resolvePageId(targetId);
          if (resolved === 'problem-solution') {
            playJudgeVideo();
          }
          scrollToSection(targetId);
        }
      }
    }
  });

  // Handle browser back/forward history navigation
  window.addEventListener('popstate', () => {
    const currentHash = window.location.hash;
    scrollToSection(resolvePageId(currentHash), false);
  });

  // -------------------------------------------------------------------------
  // WORKFLOW STEPPER INTERACTIONS (Step 01 - 05) WITH 4-SECOND TIMER
  // -------------------------------------------------------------------------
  const workflowCards = document.querySelectorAll('.workflow-card');
  const workflowDetails = [
    {
      num: '01',
      title: 'Capture',
      desc: 'The artisan captures a photo of their handcrafted piece using their smartphone camera or selects media from device gallery. Vernacular voice notes can be recorded alongside to capture authentic cultural story and process details.',
      tag: 'Step 1: Input Acquisition'
    },
    {
      num: '02',
      title: 'Understand',
      desc: 'Multimodal Gemini AI parses visual patterns, textures, motifs, and audio notes to identify the craft tradition (e.g., Dhokra lost-wax casting, Khurja pottery, Ikat weaving) and extracts core design attributes.',
      tag: 'Step 2: Contextual Analysis'
    },
    {
      num: '03',
      title: 'Create',
      desc: 'ShilpSetu assists in generating structured catalog fields: standardized product title, market-ready description, suggested craft category, verified material tags, and recommended pricing ranges.',
      tag: 'Step 3: Catalog Synthesis'
    },
    {
      num: '04',
      title: 'Store',
      desc: 'The listing is committed as a structured JSON entry into local SQLite storage immediately. When a mobile network connection is detected, the sync engine securely pushes changes to Cloud Firestore.',
      tag: 'Step 4: Resilient Storage'
    },
    {
      num: '05',
      title: 'Connect',
      desc: 'The finalized product is published to the artisan\'s digital micro-storefront and made discoverable to retail buyers, institutional curators, and direct patrons via WhatsApp linkage.',
      tag: 'Step 5: Market Linkage'
    }
  ];

  const workflowFocusTitle = document.getElementById('workflow-focus-title');
  const workflowFocusDesc = document.getElementById('workflow-focus-desc');
  const workflowFocusTag = document.getElementById('workflow-focus-tag');

  let currentWorkflowStep = 0;
  let workflowAutoplayTimer = null;

  function selectWorkflowStep(index) {
    if (!workflowCards.length || !workflowCards[index]) return;
    workflowCards.forEach(c => {
      c.classList.remove('active');
    });
    const activeCard = workflowCards[index];
    activeCard.classList.add('active');
    currentWorkflowStep = index;

    if (workflowFocusTitle && workflowDetails[index]) {
      workflowFocusTitle.textContent = `${workflowDetails[index].num} — ${workflowDetails[index].title}`;
      workflowFocusDesc.textContent = workflowDetails[index].desc;
      workflowFocusTag.textContent = workflowDetails[index].tag;
    }
  }

  function nextWorkflowStep() {
    currentWorkflowStep = (currentWorkflowStep + 1) % workflowCards.length;
    selectWorkflowStep(currentWorkflowStep);
  }

  function startWorkflowAutoplay() {
    stopWorkflowAutoplay();
    workflowAutoplayTimer = setInterval(() => {
      nextWorkflowStep();
    }, 4000);
  }

  function stopWorkflowAutoplay() {
    if (workflowAutoplayTimer) {
      clearInterval(workflowAutoplayTimer);
      workflowAutoplayTimer = null;
    }
  }

  function resetWorkflowAutoplay() {
    stopWorkflowAutoplay();
    startWorkflowAutoplay();
  }

  function initWorkflowStepper() {
    workflowCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        selectWorkflowStep(index);
        resetWorkflowAutoplay();
      });
    });

    startWorkflowAutoplay();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileDrawer();
    }
  });

  // -------------------------------------------------------------------------
  // SCROLL-TRIGGERED SLIDING EFFECTS (ENHANCED — ALL SECTIONS)
  // -------------------------------------------------------------------------
  function initScrollSlideAnimations() {
    // 1. Elements that already have explicit scroll-slide classes in HTML
    const explicitSlides = document.querySelectorAll(
      '.scroll-slide, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up, .scroll-fade'
    );

    // 2. Cards & grid items — slide up with stagger
    const cardSelectors = [
      '.problem-card', '.solution-card', '.workflow-card',
      '.tech-card', '.home-feature-card', '.team-member-card',
      '.team-card', '.timeline-phase-card',
      '.floating-badge'
    ];

    // 3. Section-level elements — slide up (headings, labels, paragraphs)
    const sectionElements = document.querySelectorAll(
      '.section-label, .heading-section, .heading-hero, .subheading-lead, .subheading-hero'
    );

    // 4. Bigger containers/panels — slide up
    const containerElements = document.querySelectorAll(
      '.problem-solution-grid, .video-showcase-split, .workflow-focus-panel, ' +
      '.ai-pipeline-grid, .ai-craft-tabs, .arch-diagram-wrapper, ' +
      '.ecosystem-chain, .app-showcase-nav, .problem-quote-banner, ' +
      '.team-grid, .tech-stack-grid, .home-feature-cards, ' +
      '.workflow-stepper, .table-comparison'
    );

    // 5. Scale-up elements — images, phone mockups
    const scaleElements = document.querySelectorAll(
      '.phone-chassis, .ai-preview-card, .ai-catalog-result, .video-split-frame, .video-container'
    );

    // 6. Button groups
    const buttonGroups = document.querySelectorAll(
      '.hero-cta-group, .video-split-buttons, .cta-buttons-row'
    );

    // 7. Badge rows
    const badgeRows = document.querySelectorAll(
      '.hero-badges-row, .hero-highlights'
    );

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      document.querySelectorAll('.scroll-slide, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up, .scroll-fade')
        .forEach(el => el.classList.add('is-scrolled-in'));
      return;
    }

    const slideObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-scrolled-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    });

    function observeWithClass(el, cls, delayClass) {
      if (!el.classList.contains('scroll-slide') &&
          !el.classList.contains('scroll-slide-left') &&
          !el.classList.contains('scroll-slide-right') &&
          !el.classList.contains('scroll-scale-up') &&
          !el.classList.contains('scroll-fade')) {
        el.classList.add(cls);
      }
      if (delayClass) el.classList.add(delayClass);
      slideObserver.observe(el);
    }

    // Observe explicit slides
    explicitSlides.forEach(el => slideObserver.observe(el));

    // Cards with stagger
    cardSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, idx) => {
        observeWithClass(el, 'scroll-slide', `delay-${(idx % 6) + 1}`);
      });
    });

    // Section headings & labels — slide up
    sectionElements.forEach(el => observeWithClass(el, 'scroll-slide'));

    // Containers — slide up
    containerElements.forEach(el => observeWithClass(el, 'scroll-slide'));

    // Scale-up elements
    scaleElements.forEach(el => observeWithClass(el, 'scroll-scale-up'));

    // Button groups — fade in
    buttonGroups.forEach(el => observeWithClass(el, 'scroll-fade', 'delay-3'));

    // Badge rows — fade in
    badgeRows.forEach(el => observeWithClass(el, 'scroll-fade', 'delay-2'));
  }

  // -------------------------------------------------------------------------
  // JUDGE VIDEO PLAYER & AUDIO HANDLER (PAGE 2)
  // -------------------------------------------------------------------------
  function showUnmuteBadge() {
    const badge = document.getElementById('video-unmute-btn');
    if (badge) badge.style.display = 'inline-flex';
  }

  function hideUnmuteBadge() {
    const badge = document.getElementById('video-unmute-btn');
    if (badge) badge.style.display = 'none';
  }

  function unmuteVideoSound() {
    const video = document.getElementById('judge-demo-video');
    if (!video) return;
    video.muted = false;
    video.volume = 1.0;
    hideUnmuteBadge();
  }

  function playJudgeVideo() {
    const video = document.getElementById('judge-demo-video');
    if (!video) return;
    video.playsInline = true;

    // Always attempt unmuted playback first
    video.muted = false;
    video.volume = 1.0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        hideUnmuteBadge();
      }).catch(() => {
        // If unmuted autoplay was blocked by browser security policy without prior user interaction:
        video.muted = true;
        video.play().then(() => {
          showUnmuteBadge();
        }).catch(() => {});
      });
    }
  }

  function pauseJudgeVideo() {
    const video = document.getElementById('judge-demo-video');
    if (video && !video.paused) {
      video.pause();
    }
  }

  function initJudgeVideo() {
    const video = document.getElementById('judge-demo-video');
    const filePicker = document.getElementById('judge-video-file-picker');
    const unmuteBtn = document.getElementById('video-unmute-btn');

    if (!video) return;

    // Default to unmuted with full volume
    video.muted = false;
    video.volume = 1.0;

    if (unmuteBtn) {
      unmuteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        unmuteVideoSound();
        video.play().catch(() => {});
      });
    }

    video.addEventListener('click', () => {
      if (video.muted) {
        unmuteVideoSound();
      }
    });

    video.addEventListener('volumechange', () => {
      if (!video.muted && video.volume > 0) {
        hideUnmuteBadge();
      }
    });

    video.addEventListener('play', () => {
      if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
      }
    });

    // Global listener: on user interaction anywhere on page, unmute video if it was playing muted
    const unlockOnGesture = () => {
      if (video && video.muted) {
        unmuteVideoSound();
      }
    };
    window.addEventListener('click', unlockOnGesture, { passive: true });
    window.addEventListener('touchstart', unlockOnGesture, { passive: true });
    window.addEventListener('keydown', unlockOnGesture, { passive: true });

    if (filePicker) {
      filePicker.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const fileUrl = URL.createObjectURL(file);
          video.src = fileUrl;
          video.load();
          video.muted = false;
          video.volume = 1.0;
          video.play().then(() => {
            hideUnmuteBadge();
          }).catch(() => {});
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // EXPLORE IMAGES HORIZONTAL SLIDING GALLERY MODAL
  // -------------------------------------------------------------------------
  function initExploreImagesModal() {
    const modal = document.getElementById('explore-images-modal');
    const openBtn = document.getElementById('btn-explore-images');
    const closeBtn = document.getElementById('explore-modal-close-btn');
    const track = document.getElementById('explore-slider-track');
    const prevBtn = document.getElementById('explore-prev-btn');
    const nextBtn = document.getElementById('explore-next-btn');
    const counter = document.getElementById('explore-slide-counter');
    const dots = document.querySelectorAll('.explore-nav-dot');
    const slides = document.querySelectorAll('.explore-slide');
    const totalSlides = slides.length || 8;

    if (!modal || !openBtn) return;

    let currentSlide = 0;
    let autoSlideTimer = null;
    const SLIDE_INTERVAL = 4000; // 4 seconds auto-slide

    function goToSlide(index, restartTimer = true) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
      }

      if (counter) {
        const formattedNum = String(currentSlide + 1).padStart(2, '0');
        const formattedTotal = String(totalSlides).padStart(2, '0');
        counter.textContent = `${formattedNum} / ${formattedTotal}`;
      }

      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
          if (dot.scrollIntoView && window.innerWidth <= 860) {
            dot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        } else {
          dot.classList.remove('active');
        }
      });

      if (restartTimer && modal.classList.contains('active')) {
        startAutoSlide();
      }
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        nextSlide();
      }, SLIDE_INTERVAL);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function openModal(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      goToSlide(0);
      startAutoSlide();
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      stopAutoSlide();
    }

    openBtn.addEventListener('click', openModal);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });
    });

    // Close on backdrop click (outside modal content)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Touch swipe gesture support on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = document.getElementById('explore-slider-viewport');

    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }, { passive: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    });
  }

  // -------------------------------------------------------------------------
  // BOOTSTRAP
  // -------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
