/* ==========================================================================
   OFFLINE-FIRST SIMULATOR JAVASCRIPT
   Interactive simulation demonstrating offline resilience & cloud synchronization
   ========================================================================== */

(function () {
  'use strict';

  let isOnline = false;
  let drafts = [
    { id: 'DFT-104', name: 'Terracotta Water Jug', craft: 'Clay Pottery', timestamp: '10:24 AM' },
    { id: 'DFT-105', name: 'Ikat Border Dupatta', craft: 'Handloom Silk', timestamp: '11:05 AM' },
    { id: 'DFT-106', name: 'Dhokra Brass Elephant Figurine', craft: 'Bell Metal', timestamp: '11:42 AM' }
  ];

  const statusIndicator = document.getElementById('sim-status-indicator');
  const statusText = document.getElementById('sim-status-text');
  const toggleBtn = document.getElementById('sim-toggle-btn');
  const toggleBtnText = document.getElementById('sim-toggle-btn-text');
  const phoneBanner = document.getElementById('sim-phone-banner');
  const phoneBannerTitle = document.getElementById('sim-banner-title');
  const phoneBannerSub = document.getElementById('sim-banner-sub');
  const queueCountBadge = document.getElementById('sim-queue-count');
  const syncBtn = document.getElementById('sim-sync-btn');
  const addDraftBtn = document.getElementById('sim-add-draft-btn');
  const logFeed = document.getElementById('sim-log-feed');
  const draftList = document.getElementById('sim-draft-list');

  function getTimestamp() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  function appendLog(tag, tagClass, message) {
    if (!logFeed) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="time">[${getTimestamp()}]</span> <span class="${tagClass}">[${tag}]</span> ${message}`;
    logFeed.appendChild(entry);
    logFeed.scrollTop = logFeed.scrollHeight;
  }

  function renderDrafts() {
    if (!draftList) return;
    draftList.innerHTML = '';
    
    if (drafts.length === 0) {
      draftList.innerHTML = '<li style="color: rgba(255,255,255,0.4); font-size: 0.85rem; padding: 12px 0;">No pending drafts. All catalogs synced with cloud!</li>';
      if (queueCountBadge) queueCountBadge.textContent = '0 Pending';
      return;
    }

    drafts.forEach((item, index) => {
      const li = document.createElement('li');
      li.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: rgba(255,255,255,0.04); border-radius: 8px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.06); font-size: 0.84rem;';
      li.innerHTML = `
        <div>
          <div style="font-weight: 700; color: white;">${item.name}</div>
          <div style="font-size: 0.74rem; color: #BDB0A8;">${item.craft} • Cached locally</div>
        </div>
        <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 999px; background: rgba(217, 119, 6, 0.2); color: #FBBF24; font-weight: 700;">Local Draft</span>
      `;
      draftList.appendChild(li);
    });

    if (queueCountBadge) {
      queueCountBadge.textContent = `${drafts.length} Pending`;
    }
  }

  function updateUI() {
    if (!statusIndicator) return;

    if (isOnline) {
      statusIndicator.className = 'sim-status-indicator online';
      statusText.innerHTML = '<strong style="color: #4ADE80;">Internet Available</strong> (Cloud Sync Ready)';
      toggleBtnText.textContent = 'Simulate Network Drop';
      
      phoneBanner.className = 'sim-banner online';
      phoneBannerTitle.textContent = 'Connection Active';
      phoneBannerSub.textContent = drafts.length > 0 
        ? `${drafts.length} pending listing(s) ready to synchronize.` 
        : 'All local drafts synced with cloud storage.';
      
      if (syncBtn) {
        syncBtn.disabled = drafts.length === 0;
        syncBtn.style.opacity = drafts.length === 0 ? '0.5' : '1';
        syncBtn.textContent = drafts.length > 0 ? 'Sync Now to Cloud' : 'All Listings Synced';
      }
    } else {
      statusIndicator.className = 'sim-status-indicator';
      statusText.innerHTML = '<strong style="color: #FBBF24;">Offline Mode</strong> (No Internet Detected)';
      toggleBtnText.textContent = 'Restore Internet Connection';
      
      phoneBanner.className = 'sim-banner offline';
      phoneBannerTitle.textContent = 'Offline Mode Active';
      phoneBannerSub.textContent = 'You can continue creating listings. Saved to device storage.';
      
      if (syncBtn) {
        syncBtn.disabled = true;
        syncBtn.style.opacity = '0.5';
        syncBtn.textContent = 'Sync Disabled (Offline)';
      }
    }

    renderDrafts();
  }

  function toggleNetwork() {
    isOnline = !isOnline;
    if (isOnline) {
      appendLog('NETWORK', 'tag-cloud', 'Network handshake established. Cloud backend reached.');
      if (drafts.length > 0) {
        appendLog('SYNC ENGINE', 'tag-sync', `Found ${drafts.length} unsynchronized records in local SQLite cache.`);
      }
    } else {
      appendLog('NETWORK', 'tag-offline', 'Network connection interrupted. Switching to local SQLite/Hive cache.');
      appendLog('OFFLINE AI', 'tag-offline', 'On-device draft pipeline armed. Cloud sync paused.');
    }
    updateUI();
  }

  function addLocalDraft() {
    const craftNames = [
      { name: 'Khurja Terracotta Glazed Bowl', craft: 'Ceramic Pottery' },
      { name: 'Chanderi Zari Border Stole', craft: 'Handloom Weaving' },
      { name: 'Bastar Tribal Brass Bell', craft: 'Dhokra Metal' },
      { name: 'Warli Hand-Painted Earthen Urn', craft: 'Folk Art' }
    ];
    const pick = craftNames[Math.floor(Math.random() * craftNames.length)];
    const newId = `DFT-${Math.floor(100 + Math.random() * 900)}`;
    const newDraft = { id: newId, name: pick.name, craft: pick.craft, timestamp: getTimestamp() };

    drafts.push(newDraft);

    appendLog('LOCAL DB', 'tag-offline', `Created local record [${newId}]: "${pick.name}".`);
    appendLog('DEVICE STORAGE', 'tag-offline', `Binary image + draft metadata cached securely on device.`);

    updateUI();
  }

  function syncToCloud() {
    if (!isOnline || drafts.length === 0) return;

    if (syncBtn) {
      syncBtn.disabled = true;
      syncBtn.textContent = 'Synchronizing...';
    }

    appendLog('SYNC ENGINE', 'tag-sync', `Initiating batch synchronization for ${drafts.length} items...`);

    setTimeout(() => {
      appendLog('FIREBASE', 'tag-cloud', 'Auth tokens verified. Batch write committed to Cloud Firestore.');
      appendLog('FIREBASE STORAGE', 'tag-cloud', 'Compressed product imagery uploaded to CDN bucket.');
      appendLog('GEMINI AI', 'tag-cloud', 'Google Gemini Vision enhanced tags & generated verified SEO metadata.');
      appendLog('SYNC SUCCESS', 'tag-cloud', `✓ All ${drafts.length} listings are now live in public digital storefront.`);
      
      drafts = [];
      updateUI();
    }, 1200);
  }

  // Event Listeners
  if (toggleBtn) toggleBtn.addEventListener('click', toggleNetwork);
  if (addDraftBtn) addDraftBtn.addEventListener('click', addLocalDraft);
  if (syncBtn) syncBtn.addEventListener('click', syncToCloud);

  // Initialize
  updateUI();
  appendLog('SYSTEM', 'tag-offline', 'Dukaan Offline Simulator initialized.');
  appendLog('ARCHITECTURE', 'tag-offline', 'Designed for offline-first AI-assisted listing workflows.');
})();
