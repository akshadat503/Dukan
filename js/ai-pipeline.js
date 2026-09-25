/* ==========================================================================
   AI INTELLIGENCE PIPELINE JAVASCRIPT
   Interactive pipeline showing multimodal AI transformation for 3 Indian crafts
   ========================================================================== */

(function () {
  'use strict';

  const craftSamples = {
    textile: {
      name: 'Handwoven Ikat & Chanderi Textile',
      category: 'Handloom / Traditional Weaving',
      image: 'assets/images/craft-textile.jpg',
      artisanInput: 'Handcrafted pure cotton & silk textile woven on pit looms using traditional tie-dye technique.',
      visionTokens: ['warp_weft_pattern', 'geometric_ikat_motifs', 'natural_indigo_madder_dye', 'handloom_selvedge'],
      outputName: 'Heritage Handwoven Ikat Silk-Cotton Dupatta',
      outputCategory: 'Handloom / Traditional Textiles',
      outputMaterials: 'Mulberry Silk (40%), Organic Desi Cotton (60%), Natural Madder Dyes',
      outputDescription: 'A finely woven handcrafted textile created using traditional artisan tie-dye techniques passed down through generations. Features distinct geometric motifs and breathable natural hand-spun weave.',
      listingStatus: 'Market Ready (GI Craft Tagged)',
      suggestedPrice: '₹1,850 – ₹2,400'
    },

    pottery: {
      name: 'Hand-Thrown Terracotta Water Vessel',
      category: 'Terracotta / Earthenware',
      image: 'assets/images/craft-pottery.jpg',
      artisanInput: 'Clay urn shaped on manual potter wheel, hand-engraved with floral patterns, sun-baked and kiln-fired.',
      visionTokens: ['earthen_red_clay', 'potter_wheel_concentric_ribs', 'incised_floral_relief', 'evaporative_porosity'],
      outputName: 'Hand-Sculpted Terracotta Clay Water Vessel (Matka)',
      outputCategory: 'Terracotta Craft / Earthen Tableware',
      outputMaterials: 'Natural Alluvial Clay, Terracotta Mineral Pigment, River Sand',
      outputDescription: 'A masterfully hand-thrown clay vessel sculpted on traditional potter wheels. Designed with porous natural clay walls providing organic evaporative water cooling, adorned with hand-chiseled folk motifs.',
      listingStatus: 'Market Ready (Eco-Friendly / Plastic-Free)',
      suggestedPrice: '₹650 – ₹850'
    },

    brass: {
      name: 'Lost-Wax Dhokra Bell Metal Figurine',
      category: 'Bell Metal / Tribal Folk Art',
      image: 'assets/images/craft-brass.jpg',
      artisanInput: 'Bastar tribal bronze figurine made with ancient lost-wax casting and beeswax wire winding technique.',
      visionTokens: ['lost_wax_cire_perdue', 'bell_metal_brass_alloy', 'spiral_wax_threads', 'tribal_musician_motif'],
      outputName: 'Traditional Bastar Dhokra Brass Musician on Elephant',
      outputCategory: 'Tribal Metal Craft / Dhokra Heritage',
      outputMaterials: 'Recycled Brass Alloy, Beeswax Core, Clay Mould Residue',
      outputDescription: 'An authentic non-ferrous metal casting created through the 4,000-year-old cire-perdue (lost wax) process. Every piece is completely unique, exhibiting the signature rhythmic coil-work of Bastar tribal artisans.',
      listingStatus: 'Market Ready (Collector Craft / Provenance Verified)',
      suggestedPrice: '₹2,200 – ₹3,100'
    }
  };

  const tabs = document.querySelectorAll('.craft-tab-btn');
  const previewImg = document.getElementById('ai-craft-preview-img');
  const artisanInputElem = document.getElementById('ai-craft-raw-input');
  const visionTokensElem = document.getElementById('ai-vision-tokens');
  const outNameElem = document.getElementById('ai-out-name');
  const outCategoryElem = document.getElementById('ai-out-category');
  const outMaterialsElem = document.getElementById('ai-out-materials');
  const outDescElem = document.getElementById('ai-out-desc');
  const outStatusElem = document.getElementById('ai-out-status');
  const outPriceElem = document.getElementById('ai-out-price');

  function updateCraftView(craftKey) {
    const data = craftSamples[craftKey];
    if (!data) return;

    if (previewImg) previewImg.src = data.image;
    if (artisanInputElem) artisanInputElem.textContent = data.artisanInput;

    if (visionTokensElem) {
      visionTokensElem.innerHTML = '';
      data.visionTokens.forEach(token => {
        const span = document.createElement('span');
        span.className = 'catalog-tag';
        span.textContent = `#${token}`;
        visionTokensElem.appendChild(span);
      });
    }

    if (outNameElem) outNameElem.textContent = data.outputName;
    if (outCategoryElem) outCategoryElem.textContent = data.outputCategory;
    if (outMaterialsElem) outMaterialsElem.textContent = data.outputMaterials;
    if (outDescElem) outDescElem.textContent = data.outputDescription;
    if (outStatusElem) outStatusElem.textContent = data.listingStatus;
    if (outPriceElem) outPriceElem.textContent = data.suggestedPrice;

    tabs.forEach(tab => {
      if (tab.getAttribute('data-craft') === craftKey) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-craft');
      updateCraftView(key);
    });
  });

  // Initial display: textile
  updateCraftView('textile');

})();
