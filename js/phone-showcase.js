/* ==========================================================================
   PHONE SHOWCASE COMPONENT JAVASCRIPT
   Renders 8 screens inside the phone chassis with descriptive metadata
   ========================================================================== */

(function () {
  'use strict';

  const screens = {
    splash: {
      title: 'Splash & Vernacular Welcome',
      desc: 'Simple, respectful onboarding in Hindi, English, and regional languages designed for artisans with varying digital literacy levels.',
      render: () => `
        <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 28px 18px 20px; background: linear-gradient(180deg, #FBF8F4 0%, #F5ECE0 100%); text-align: center;">
          <div style="margin-top: 30px;">
            <div style="width: 58px; height: 58px; margin: 0 auto 14px; border-radius: 16px; background: linear-gradient(135deg, #C85A32, #D9822B); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 8px 20px rgba(200,90,50,0.35);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <h3 style="font-size: 1.45rem; font-weight: 800; color: #211915; margin-bottom: 4px;">दुकान • Dukaan</h3>
            <p style="font-size: 0.78rem; font-weight: 700; color: #C85A32; letter-spacing: 0.05em; text-transform: uppercase;">हस्तशिल्प से डिजिटल बाज़ार तक</p>
          </div>

          <div style="background: white; border-radius: 18px; padding: 18px 14px; border: 1px solid rgba(74,54,43,0.1); box-shadow: 0 4px 16px rgba(45,30,20,0.06);">
            <div style="font-size: 0.78rem; font-weight: 700; color: #564841; margin-bottom: 10px;">अपनी भाषा चुनें / Select Language</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div style="padding: 10px; border-radius: 10px; background: #C85A32; color: white; font-weight: 700; font-size: 0.84rem;">हिंदी (Hindi)</div>
              <div style="padding: 10px; border-radius: 10px; background: #FAF7F2; border: 1px solid #E1A793; color: #211915; font-weight: 600; font-size: 0.84rem;">English</div>
              <div style="padding: 10px; border-radius: 10px; background: #FAF7F2; border: 1px solid #E1A793; color: #211915; font-weight: 600; font-size: 0.84rem;">मराठी (Marathi)</div>
              <div style="padding: 10px; border-radius: 10px; background: #FAF7F2; border: 1px solid #E1A793; color: #211915; font-weight: 600; font-size: 0.84rem;">বাংলা (Bengali)</div>
            </div>
            <button style="width: 100%; margin-top: 14px; padding: 11px; border-radius: 999px; background: #211712; color: white; font-weight: 700; font-size: 0.85rem;">आगे बढ़ें • Continue</button>
          </div>

          <div style="font-size: 0.68rem; color: #7E6E66;">Smart India Hackathon 2026 • Team Melody's</div>
        </div>
      `
    },

    home: {
      title: 'Artisan Home Dashboard',
      desc: 'Glanceable summary of listed crafts, pending offline sync items, and direct voice or camera cataloging triggers.',
      render: () => `
        <div style="padding: 16px 14px; background: #FAF7F2; min-height: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <div style="font-size: 0.72rem; color: #7E6E66; font-weight: 600;">नमस्ते • Welcome back</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: #211915;">रमेश कुम्हार (Ramesh)</div>
            </div>
            <div style="width: 34px; height: 34px; border-radius: 50%; background: #F6E6DF; display: flex; align-items: center; justify-content: center; color: #C85A32; font-weight: 800; font-size: 0.85rem; border: 1.5px solid #E1A793;">RK</div>
          </div>

          <!-- Quick Stats Banner -->
          <div style="background: linear-gradient(135deg, #211712, #33241C); border-radius: 14px; padding: 14px; color: white; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.72rem; color: #E5A93C; font-weight: 700; text-transform: uppercase;">मेरा डिजिटल स्टोर (Storefront)</span>
              <span style="font-size: 0.68rem; background: rgba(46,125,82,0.3); color: #4ADE80; padding: 2px 6px; border-radius: 4px; font-weight: 700;">सक्रिय • Active</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 6px;">
              <div>
                <div style="font-size: 1.35rem; font-weight: 800;">14</div>
                <div style="font-size: 0.68rem; color: #BDB0A8;">सूचीबद्ध उत्पाद (Listed)</div>
              </div>
              <div>
                <div style="font-size: 1.35rem; font-weight: 800; color: #F3B04A;">3</div>
                <div style="font-size: 0.68rem; color: #BDB0A8;">लोकल ड्राफ्ट (Offline Queue)</div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div style="font-size: 0.75rem; font-weight: 800; color: #564841; margin-bottom: 8px; text-transform: uppercase;">त्वरित क्रिया • Quick Actions</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
            <div style="background: white; border-radius: 10px; padding: 12px; border: 1px solid #EDC9BC; display: flex; align-items: center; gap: 8px;">
              <div style="width: 28px; height: 28px; border-radius: 8px; background: #F6E6DF; display: flex; align-items: center; justify-content: center; color: #C85A32;">📷</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #211915;">फ़ोटो खीचें<br><span style="font-weight: 500; font-size: 0.65rem; color: #7E6E66;">Add Photo</span></div>
            </div>
            <div style="background: white; border-radius: 10px; padding: 12px; border: 1px solid #EDC9BC; display: flex; align-items: center; gap: 8px;">
              <div style="width: 28px; height: 28px; border-radius: 8px; background: #FEF3E2; display: flex; align-items: center; justify-content: center; color: #D9822B;">🎙️</div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #211915;">बोलकर बताएं<br><span style="font-weight: 500; font-size: 0.65rem; color: #7E6E66;">Voice Input</span></div>
            </div>
          </div>

          <!-- Recent Products Mini Feed -->
          <div style="font-size: 0.75rem; font-weight: 800; color: #564841; margin-bottom: 8px; text-transform: uppercase;">हालिया उत्पाद • Recent Listings</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="background: white; border-radius: 10px; padding: 8px 10px; border: 1px solid rgba(74,54,43,0.08); display: flex; align-items: center; gap: 10px;">
              <img src="assets/images/craft-pottery.jpg" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover;">
              <div style="flex: 1;">
                <div style="font-size: 0.78rem; font-weight: 700; color: #211915;">Terracotta Matka (Clay)</div>
                <div style="font-size: 0.68rem; color: #2E7D52; font-weight: 600;">₹450 • Live on Storefront</div>
              </div>
            </div>
            <div style="background: white; border-radius: 10px; padding: 8px 10px; border: 1px solid rgba(74,54,43,0.08); display: flex; align-items: center; gap: 10px;">
              <img src="assets/images/craft-brass.jpg" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover;">
              <div style="flex: 1;">
                <div style="font-size: 0.78rem; font-weight: 700; color: #211915;">Dhokra Elephant Figurine</div>
                <div style="font-size: 0.68rem; color: #D97706; font-weight: 600;">₹1,250 • Offline Draft Cached</div>
              </div>
            </div>
          </div>
        </div>
      `
    },

    capture: {
      title: 'Product Image & Audio Capture',
      desc: 'Artisans simply take a photo and can optionally describe their product in their native spoken tongue.',
      render: () => `
        <div style="height: 100%; display: flex; flex-direction: column; background: #110E0C; color: white; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #F3B04A;">उत्पाद फ़ोटो लें (Camera)</span>
            <span style="font-size: 0.7rem; background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 999px;">AI Assist Ready</span>
          </div>

          <div style="flex: 1; border-radius: 14px; position: relative; overflow: hidden; border: 2px dashed rgba(229,169,60,0.5); display: flex; align-items: center; justify-content: center;">
            <img src="assets/images/craft-pottery.jpg" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95);">
            <div style="position: absolute; inset: 20px; border: 1px solid rgba(255,255,255,0.4); border-radius: 10px; pointer-events: none;"></div>
            <div style="position: absolute; bottom: 12px; background: rgba(0,0,0,0.65); backdrop-filter: blur(6px); padding: 4px 12px; border-radius: 999px; font-size: 0.7rem; color: #4ADE80; font-weight: 600;">
              ✓ Object Frame Detected
            </div>
          </div>

          <!-- Bottom Voice / Capture Controls -->
          <div style="padding-top: 14px;">
            <div style="background: rgba(255,255,255,0.06); border-radius: 12px; padding: 10px 12px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: #D9822B; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">🎙️</div>
              <div style="font-size: 0.72rem; color: #BDB0A8;">"यह मिट्टी का सुराही है, हाथ से तराशा हुआ..."<br><span style="color: #F3B04A; font-weight: 700;">Voice Recorded • 4.2s</span></div>
            </div>
            <button style="width: 100%; padding: 11px; border-radius: 999px; background: linear-gradient(135deg, #C85A32, #D9822B); color: white; font-weight: 800; font-size: 0.85rem;">
              AI विश्लेषण शुरू करें (Analyze with AI)
            </button>
          </div>
        </div>
      `
    },

    ai_catalog: {
      title: 'AI Smart Cataloging Generation',
      desc: 'Google Gemini analyzes craft visuals and audio transcript to extract category, craft technique, materials, and suggested description.',
      render: () => `
        <div style="padding: 16px 14px; background: #FAF7F2; min-height: 100%;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 0.7rem; font-weight: 800; background: #F6E6DF; color: #C85A32; padding: 3px 8px; border-radius: 999px;">AI Processing Complete</span>
          </div>

          <div style="background: white; border-radius: 12px; padding: 12px; border: 1px solid #EDC9BC; margin-bottom: 12px;">
            <div style="font-size: 0.68rem; font-weight: 800; color: #C85A32; text-transform: uppercase;">शीर्षक • Title</div>
            <div style="font-size: 0.95rem; font-weight: 800; color: #211915; margin: 2px 0 6px;">Hand-Sculpted Terracotta Water Vessel</div>
            <div style="font-size: 0.72rem; color: #7E6E66;">पारंपरिक मिट्टी का नक्काशीदार कलश (Matka)</div>
          </div>

          <div style="background: white; border-radius: 12px; padding: 12px; border: 1px solid #EDC9BC; margin-bottom: 12px;">
            <div style="font-size: 0.68rem; font-weight: 800; color: #C85A32; text-transform: uppercase;">श्रेणी व सामग्री • Category & Material</div>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
              <span style="font-size: 0.68rem; background: #FAF7F2; border: 1px solid #E1A793; padding: 2px 8px; border-radius: 4px; font-weight: 600;">Earthenware Pottery</span>
              <span style="font-size: 0.68rem; background: #FAF7F2; border: 1px solid #E1A793; padding: 2px 8px; border-radius: 4px; font-weight: 600;">Natural Red Clay</span>
              <span style="font-size: 0.68rem; background: #FAF7F2; border: 1px solid #E1A793; padding: 2px 8px; border-radius: 4px; font-weight: 600;">Hand-Wheel Thrown</span>
            </div>
          </div>

          <div style="background: white; border-radius: 12px; padding: 12px; border: 1px solid #EDC9BC; margin-bottom: 14px;">
            <div style="font-size: 0.68rem; font-weight: 800; color: #C85A32; text-transform: uppercase;">AI विवरण • Story & Description</div>
            <p style="font-size: 0.74rem; color: #564841; line-height: 1.45; margin-top: 4px;">
              Crafted from fine clay sourced from local riverbeds, this terracotta vessel features traditional floral carvings that provide natural evaporative cooling.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button style="padding: 10px; border-radius: 8px; background: #F6E6DF; color: #8E3416; font-size: 0.76rem; font-weight: 700;">बदलें (Edit)</button>
            <button style="padding: 10px; border-radius: 8px; background: #C85A32; color: white; font-size: 0.76rem; font-weight: 700;">स्वीकारें (Save)</button>
          </div>
        </div>
      `
    },

    product_detail: {
      title: 'Structured Product Details & Provenance',
      desc: 'Transparent pricing, origin authenticity, artisan badge, and export-ready dimensional attributes.',
      render: () => `
        <div style="background: #FAF7F2; min-height: 100%;">
          <img src="assets/images/craft-textile.jpg" style="width: 100%; height: 160px; object-fit: cover;">
          <div style="padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <span style="font-size: 0.68rem; background: #EAF5EE; color: #2E7D52; font-weight: 800; padding: 2px 8px; border-radius: 999px;">GI Tag Authenticated</span>
              <span style="font-size: 1.1rem; font-weight: 800; color: #C85A32;">₹2,400</span>
            </div>
            <h4 style="font-size: 0.98rem; font-weight: 800; color: #211915; margin-bottom: 4px;">Handloom Chanderi Silk Saree</h4>
            <div style="font-size: 0.72rem; color: #7E6E66; margin-bottom: 12px;">By Shanti Devi • Maheshwar Cluster</div>

            <div style="background: white; border-radius: 10px; padding: 10px; border: 1px solid #EDC9BC; margin-bottom: 12px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.72rem;">
                <div><strong style="color: #564841;">Weave:</strong> Traditional Handloom</div>
                <div><strong style="color: #564841;">Zari:</strong> Electroplated Gold</div>
                <div><strong style="color: #564841;">Length:</strong> 6.2 Meters</div>
                <div><strong style="color: #564841;">Craft Days:</strong> 18 Days</div>
              </div>
            </div>

            <button style="width: 100%; padding: 10px; border-radius: 999px; background: #211712; color: white; font-weight: 700; font-size: 0.8rem;">
              स्टोरफ़्रंट पर देखें (View on Storefront)
            </button>
          </div>
        </div>
      `
    },

    storefront: {
      title: 'Artisan Digital Storefront',
      desc: 'Mobile-first clean public storefront showcasing the artisan’s collection, story, and craft legacy.',
      render: () => `
        <div style="padding: 14px; background: #FAF7F2; min-height: 100%;">
          <div style="text-align: center; padding-bottom: 14px; border-bottom: 1px solid #EDC9BC; margin-bottom: 12px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 6px; background: #C85A32; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
              SD
            </div>
            <div style="font-size: 1rem; font-weight: 800; color: #211915;">Shanti Devi Weaves</div>
            <div style="font-size: 0.7rem; color: #7E6E66;">Chanderi, Madhya Pradesh • Traditional Master Weaver</div>
          </div>

          <div style="font-size: 0.72rem; font-weight: 800; color: #564841; text-transform: uppercase; margin-bottom: 8px;">उपलब्ध कलाकृतियां • Available Crafts (8)</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div style="background: white; border-radius: 10px; overflow: hidden; border: 1px solid #EDC9BC;">
              <img src="assets/images/craft-textile.jpg" style="width: 100%; height: 75px; object-fit: cover;">
              <div style="padding: 6px 8px;">
                <div style="font-size: 0.7rem; font-weight: 700; color: #211915;">Ikat Silk Dupatta</div>
                <div style="font-size: 0.68rem; color: #C85A32; font-weight: 700;">₹1,650</div>
              </div>
            </div>
            <div style="background: white; border-radius: 10px; overflow: hidden; border: 1px solid #EDC9BC;">
              <img src="assets/images/craft-brass.jpg" style="width: 100%; height: 75px; object-fit: cover;">
              <div style="padding: 6px 8px;">
                <div style="font-size: 0.7rem; font-weight: 700; color: #211915;">Dhokra Figurine</div>
                <div style="font-size: 0.68rem; color: #C85A32; font-weight: 700;">₹1,850</div>
              </div>
            </div>
          </div>
        </div>
      `
    },

    buyer_view: {
      title: 'Buyer View & Direct Market Linkage',
      desc: 'Enables potential retail, wholesale, or corporate buyers to connect directly with the artisan without exploitative middlemen.',
      render: () => `
        <div style="padding: 14px; background: #FAF7F2; min-height: 100%;">
          <div style="background: white; border-radius: 12px; padding: 12px; border: 1px solid #EDC9BC; margin-bottom: 12px;">
            <span style="font-size: 0.65rem; background: #EFF6FF; color: #1D4ED8; font-weight: 800; padding: 2px 6px; border-radius: 4px;">Direct Buyer Portal</span>
            <div style="font-size: 0.92rem; font-weight: 800; color: #211915; margin: 4px 0 2px;">Handmade Terracotta Pottery Set</div>
            <div style="font-size: 0.72rem; color: #7E6E66;">Artisan: Ramesh Kumhar • Gorakhpur Craft Guild</div>
          </div>

          <div style="background: white; border-radius: 12px; padding: 12px; border: 1px solid #EDC9BC; margin-bottom: 12px;">
            <div style="font-size: 0.72rem; font-weight: 800; color: #564841; margin-bottom: 6px;">ऑर्डर या पूछताछ भेजें (Direct Inquiry)</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <div style="padding: 8px 10px; background: #FAF7F2; border-radius: 6px; font-size: 0.72rem; color: #564841;">Looking for 50 pieces for corporate gift event. Can you customize logo?</div>
              <button style="padding: 9px; border-radius: 999px; background: #25D366; color: white; font-size: 0.78rem; font-weight: 700; border: none; display: flex; align-items: center; justify-content: center; gap: 6px;">
                💬 WhatsApp पर बात करें (Direct WhatsApp)
              </button>
            </div>
          </div>

          <div style="font-size: 0.68rem; color: #7E6E66; text-align: center;">
            Dukaan connects buyers directly to rural artisans with transparent pricing.
          </div>
        </div>
      `
    },

    profile_sync: {
      title: 'Profile & Device Sync Dashboard',
      desc: 'Monitors on-device storage, cached drafts, network synchronization health, and catalog export status.',
      render: () => `
        <div style="padding: 16px 14px; background: #FAF7F2; min-height: 100%;">
          <div style="font-size: 1rem; font-weight: 800; color: #211915; margin-bottom: 12px;">ऑफ़लाइन सिंक स्थिति (Sync Status)</div>

          <div style="background: white; border-radius: 12px; padding: 12px; border: 1px solid #EDC9BC; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.72rem; font-weight: 700; color: #564841;">डिवाइस मेमोरी (Device Storage)</span>
              <span style="font-size: 0.72rem; font-weight: 800; color: #2E7D52;">सुरक्षित • Safe</span>
            </div>
            <div style="width: 100%; height: 6px; background: #F6E6DF; border-radius: 999px; overflow: hidden; margin-bottom: 4px;">
              <div style="width: 32%; height: 100%; background: #C85A32;"></div>
            </div>
            <div style="font-size: 0.66rem; color: #7E6E66;">3 ड्राफ्ट (Offline) • 12 सिंक उत्पाद (Synced)</div>
          </div>

          <div style="background: white; border-radius: 12px; padding: 12px; border: 1px solid #EDC9BC; margin-bottom: 14px;">
            <div style="font-size: 0.72rem; font-weight: 800; color: #C85A32; margin-bottom: 6px;">बॅकअप और क्लाउड (Cloud Backup)</div>
            <div style="font-size: 0.72rem; color: #564841; margin-bottom: 8px;">Network: Firebase Firestore & Google Gemini Vision pipeline</div>
            <button style="width: 100%; padding: 8px; border-radius: 8px; background: #F6E6DF; color: #8E3416; font-size: 0.74rem; font-weight: 700;">
              मैन्युअल सिंक करें (Manual Sync Check)
            </button>
          </div>

          <div style="font-size: 0.68rem; color: #7E6E66; text-align: center;">
            Artisan ID: DUK-ART-88219 • Verified Craft Guild Member
          </div>
        </div>
      `
    }
  };

  const container = document.getElementById('phone-screen-target');
  const screenTitleElem = document.getElementById('phone-screen-title');
  const screenDescElem = document.getElementById('phone-screen-desc');
  const navButtons = document.querySelectorAll('.app-screen-btn');

  function showScreen(key) {
    if (!screens[key] || !container) return;

    container.innerHTML = screens[key].render();
    if (screenTitleElem) screenTitleElem.textContent = screens[key].title;
    if (screenDescElem) screenDescElem.textContent = screens[key].desc;

    navButtons.forEach(btn => {
      if (btn.getAttribute('data-screen') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-screen');
      showScreen(key);
    });
  });

  // Default initial screen
  showScreen('ai_catalog');

})();
