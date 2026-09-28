/* ==========================================================================
   PHONE SHOWCASE COMPONENT JAVASCRIPT
   Renders 8 screens inside the phone chassis with real application visuals
   ========================================================================== */

(function () {
  'use strict';

  const screens = {
    splash: {
      title: '1. Welcome & Artisan Sign-in',
      desc: 'Multirole onboarding for Artisans, B2B Buyers, and Admins with ONDC & GeM integration and secure OTP authentication.',
      render: () => `
        <div style="height: 100%; width: 100%; overflow: hidden; background: #FAF7F2;">
          <img src="assets/images/img1.jpeg" alt="Welcome & Sign In" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;">
        </div>
      `
    },

    home: {
      title: '2. Artisan Home Dashboard',
      desc: 'Glanceable summary of live crafts, incoming buyer demands, monthly revenue, 1-minute craft listing, and quick actions.',
      render: () => `
        <div style="height: 100%; width: 100%; overflow: hidden; background: #FAF7F2;">
          <img src="assets/images/img2.jpeg" alt="Artisan Home Dashboard" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;">
        </div>
      `
    },

    capture: {
      title: '3. Add Craft — Photo & Presets',
      desc: 'Capture craft photos using device camera/gallery or choose from authentic regional craft presets.',
      render: () => `
        <div style="height: 100%; width: 100%; overflow: hidden; background: #FAF7F2;">
          <img src="assets/images/img3.jpeg" alt="Add Craft Photo & Presets" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;">
        </div>
      `
    },

    ai_catalog: {
      title: '4. AI Smart Catalog & Storytelling',
      desc: 'Gemini AI automatically generates trilingual catalogs, cultural heritage stories, and 100% fair artisan market pricing.',
      render: () => `
        <div style="height: 100%; width: 100%; overflow: hidden; background: #FAF7F2;">
          <img src="assets/images/img4.jpeg" alt="AI Smart Catalog" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;">
        </div>
      `
    },

    product_detail: {
      title: '5. My Products & Inventory',
      desc: 'Manage published catalog items with instant 360° views, heritage story tags, and real-time inventory status.',
      render: () => `
        <div style="height: 100%; width: 100%; overflow: hidden; background: #FAF7F2;">
          <img src="assets/images/img5.jpeg" alt="My Products & Inventory" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;">
        </div>
      `
    },

    storefront: {
      title: '6. ShilpSetu B2B Wholesale Discovery',
      desc: 'B2B marketplace for retail & institutional buyers to explore curated GI-tagged crafts, regional pottery, and handloom textiles.',
      render: () => `
        <div style="height: 100%; width: 100%; overflow: hidden; background: #FAF7F2;">
          <img src="assets/images/img6.jpeg" alt="B2B Wholesale Discovery" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;">
        </div>
      `
    },

    buyer_view: {
      title: '7. B2B Buyer Pehchan & Analytics',
      desc: 'Transparent procurement tracking zero middleman markups, realized margins, order consignments, and direct cluster sourcing.',
      render: () => `
        <div style="height: 100%; width: 100%; overflow: hidden; background: #FAF7F2;">
          <img src="assets/images/img7.jpeg" alt="Buyer Pehchan & Analytics" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;">
        </div>
      `
    },

    profile_sync: {
      title: '8. Artisan Profile & Digital Identity',
      desc: 'Verified digital artisan identity card with audio readout, active sales, verified bank linkage, and artisan support.',
      render: () => `
        <div style="height: 100%; width: 100%; overflow: hidden; background: #FAF7F2;">
          <img src="assets/images/img8.jpeg" alt="Artisan Profile & Digital Identity" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;">
        </div>
      `
    }
  };

  const container = document.getElementById('phone-screen-target');
  const screenTitleElem = document.getElementById('phone-screen-title');
  const screenDescElem = document.getElementById('phone-screen-desc');
  const navButtons = document.querySelectorAll('.app-screen-btn');
  const screenKeys = Object.keys(screens);

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 4000; // 4 seconds per screen as requested

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % screenKeys.length;
      showScreen(screenKeys[currentIndex], false);
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function showScreen(key, shouldResetTimer = true) {
    if (!screens[key] || !container) return;

    const newIdx = screenKeys.indexOf(key);
    if (newIdx !== -1) {
      currentIndex = newIdx;
    }

    // Smooth transition
    container.style.animation = 'none';
    container.offsetHeight; // trigger reflow
    container.style.animation = 'screenChangeFade 0.32s cubic-bezier(0.16, 1, 0.3, 1)';

    container.innerHTML = screens[key].render();
    if (screenTitleElem) screenTitleElem.textContent = screens[key].title;
    if (screenDescElem) screenDescElem.textContent = screens[key].desc;

    navButtons.forEach(btn => {
      if (btn.getAttribute('data-screen') === key) {
        btn.classList.add('active');
        // Keep active button visible in horizontal scroll on mobile
        if (btn.scrollIntoView && window.innerWidth <= 860) {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      } else {
        btn.classList.remove('active');
      }
    });

    if (shouldResetTimer) {
      startAutoplay();
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-screen');
      showScreen(key, true);
    });
  });

  // Start autoplay immediately on load
  startAutoplay();

  // Expose global for interactive buttons
  window.showPhoneScreen = (key) => showScreen(key, true);

  // Default initial screen (1. Welcome & Login)
  showScreen('splash', true);

})();
