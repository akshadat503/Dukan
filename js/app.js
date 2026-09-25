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
      history.pushState(null, '', `#${pageId}`);
    }

    updateActiveNav(pageId);
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
    initScrollSpy();

    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const startPage = resolvePageId(hash);
      if (startPage && startPage !== 'hero') {
        setTimeout(() => {
          scrollToSection(startPage, false);
        }, 150);
      }
    }
  }

  // -------------------------------------------------------------------------
  // GLOBAL EVENT DELEGATION FOR ALL [data-page] & ANCHOR LINKS
  // -------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    // If clicked inside a trigger-demo-modal or modal-close, let those handlers work
    if (e.target.closest('.trigger-demo-modal') || e.target.closest('.modal-close-btn')) {
      return;
    }

    // Check if clicked element or parent has data-page
    const pageTrigger = e.target.closest('[data-page]');
    if (pageTrigger) {
      const targetPage = pageTrigger.getAttribute('data-page');
      if (targetPage) {
        e.preventDefault();
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
  // WORKFLOW STEPPER INTERACTIONS (Step 01 - 05)
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
      desc: 'Dukaan assists in generating structured catalog fields: standardized product title, market-ready description, suggested craft category, verified material tags, and recommended pricing ranges.',
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

  workflowCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      workflowCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      if (workflowFocusTitle && workflowDetails[index]) {
        workflowFocusTitle.textContent = `${workflowDetails[index].num} — ${workflowDetails[index].title}`;
        workflowFocusDesc.textContent = workflowDetails[index].desc;
        workflowFocusTag.textContent = workflowDetails[index].tag;
      }
    });
  });

  // -------------------------------------------------------------------------
  // VIDEO DEMO MODAL
  // -------------------------------------------------------------------------
  const modalOverlay = document.getElementById('demo-modal');
  const openModalBtns = document.querySelectorAll('.trigger-demo-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');

  function openDemoModal() {
    if (modalOverlay) {
      modalOverlay.style.display = 'flex';
      requestAnimationFrame(() => modalOverlay.classList.add('active'));
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDemoModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        modalOverlay.style.display = 'none';
      }, 300);
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDemoModal();
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeDemoModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeDemoModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDemoModal();
      closeMobileDrawer();
    }
  });

  // -------------------------------------------------------------------------
  // BOOTSTRAP
  // -------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
