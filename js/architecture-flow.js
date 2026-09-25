/* ==========================================================================
   ARCHITECTURE FLOW JAVASCRIPT
   Interactive layer filtering and data flow inspection for SIH presentation
   ========================================================================== */

(function () {
  'use strict';

  const filterButtons = document.querySelectorAll('.arch-filter-btn');
  const nodes = document.querySelectorAll('.arch-node');

  function setLayerFilter(filterType) {
    nodes.forEach(node => {
      const layer = node.getAttribute('data-layer');
      if (filterType === 'all' || layer === filterType || node.classList.contains(filterType)) {
        node.style.opacity = '1';
        node.style.transform = 'scale(1)';
        node.style.borderColor = 'rgba(229, 169, 60, 0.4)';
      } else {
        node.style.opacity = '0.32';
        node.style.transform = 'scale(0.98)';
        node.style.borderColor = 'rgba(255, 255, 255, 0.05)';
      }
    });

    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterType) {
        btn.classList.add('active');
        btn.style.background = 'var(--saffron-500)';
        btn.style.color = '#211712';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'rgba(255, 255, 255, 0.08)';
        btn.style.color = 'white';
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      setLayerFilter(filter);
    });
  });

  // Default
  setLayerFilter('all');

})();
