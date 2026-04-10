---
layout: page
title: Trail Locator
subtitle: Find Upstate NY Trails
---

<div class="nyt-trail-widget">
  <div class="nyt-container">
    <div class="nyt-header">
      <div class="nyt-filters">
        <span class="nyt-filter-label">Filter by type</span>
        <button class="nyt-filter-button all active" data-category="all">All</button>
        <button class="nyt-filter-button hiking" data-category="hiking">Hiking</button>
        <button class="nyt-filter-button biking" data-category="biking">Biking</button>
      </div>

      <div class="nyt-filters nyt-difficulty-filters" style="margin-top: 10px;">
        <span class="nyt-filter-label">Difficulty</span>
        <button class="nyt-filter-button diff active" data-difficulty="all">All</button>
        <button class="nyt-filter-button diff" data-difficulty="easy">Easy</button>
        <button class="nyt-filter-button diff" data-difficulty="moderate">Moderate</button>
        <button class="nyt-filter-button diff" data-difficulty="difficult">Difficult</button>
      </div>
    </div>

    <div class="nyt-map" id="nyt-map"></div>
  </div>
</div>

<script type="application/json" id="trails-data">
{{ site.data.trails | jsonify }}
</script>

<script type="module">
document.addEventListener('DOMContentLoaded', async function () {
  await import('https://cdn.jsdelivr.net/npm/leaflet-gpx@2.2.0/gpx.js');

  const trails = JSON.parse(document.getElementById('trails-data').textContent);
  const map = L.map('nyt-map').setView([42.6526, -73.7562], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'OpenStreetMap contributors'
  }).addTo(map);

  const hikingMarkers = L.featureGroup();
  const bikingMarkers = L.featureGroup();

  const hikingIcon = L.divIcon({
    html: `<div style="background:rgba(232,121,74,0.9);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.2);">🥾</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    className: ''
  });

  const bikingIcon = L.divIcon({
    html: `<div style="background:rgba(50,184,198,0.9);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.2);">🚴</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    className: ''
  });

  const trailMarkers = [];
  let currentTypeFilter = 'all';
  let currentDifficultyFilter = 'all';
  let activeGpxLayer = null;
  let activeGpxTrailId = null;

  function removeActiveGpx() {
    if (activeGpxLayer) {
      map.removeLayer(activeGpxLayer);
      activeGpxLayer = null;
      activeGpxTrailId = null;
    }
  }

  trails.forEach(trail => {
    const types = Array.isArray(trail.type) ? trail.type : [trail.type];
    const isBoth = types.length > 1;

    let popupContent = `<div class="nyt-trail-popup"><h3>${trail.name}</h3>`;
    if (trail.description) popupContent += `<p>${trail.description}</p>`;
    if (trail.difficulty) {
      popupContent += `<div><strong>Difficulty:</strong> ${trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1)}</div>`;
    }
    if (isBoth) popupContent += `<div><strong>Types:</strong> ${types.join(', ')}</div>`;

    if (trail.links && trail.links.length) {
      popupContent += trail.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.text}</a>`).join('');
    } else if (trail.link) {
      popupContent += `<a href="${trail.link}" target="_blank" rel="noopener noreferrer">View Details</a>`;
    }

    popupContent += `</div>`;

    const initialIcon = types.includes('hiking') ? hikingIcon : bikingIcon;

    const marker = L.marker([trail.lat, trail.lng], { icon: initialIcon })
      .bindPopup(popupContent);

    marker.on('click', function() {
      if (activeGpxTrailId !== trail.id) removeActiveGpx();
      if (!trail.gpx) return;
      if (activeGpxTrailId === trail.id) return;

      activeGpxTrailId = trail.id;
      activeGpxLayer = new L.GPX(trail.gpx, {
        async: true,
        polyline_options: {
          color: '#21808d',
          weight: 5,
          opacity: 1,
          lineCap: 'round'
        },
        markers: {
          startIcon: null,
          endIcon: null
        }
      })
      .on('loaded', function(event) {
        map.fitBounds(event.target.getBounds(), { padding: [30, 30] });
      })
      .on('error', function() {
        activeGpxLayer = null;
        activeGpxTrailId = null;
      })
      .addTo(map);
    });

    trailMarkers.push({ marker, trail, types, isBoth });

    types.forEach(type => {
      if (type === 'hiking') hikingMarkers.addLayer(marker);
      if (type === 'biking') bikingMarkers.addLayer(marker);
    });
  });

  hikingMarkers.addTo(map);
  bikingMarkers.addTo(map);

  function matchesFilters(item) {
    const { trail, types } = item;

    if (currentDifficultyFilter !== 'all') {
      if (!trail.difficulty || trail.difficulty !== currentDifficultyFilter) return false;
    }

    if (currentTypeFilter === 'all') return true;
    if (currentTypeFilter === 'hiking') return types.includes('hiking');
    if (currentTypeFilter === 'biking') return types.includes('biking');
    return true;
  }

  function applyFiltersAndIcons() {
    map.removeLayer(hikingMarkers);
    map.removeLayer(bikingMarkers);
    hikingMarkers.clearLayers();
    bikingMarkers.clearLayers();

    trailMarkers.forEach(item => {
      const { marker, types, isBoth } = item;

      if (isBoth) {
        if (currentTypeFilter === 'biking') {
          marker.setIcon(bikingIcon);
        } else {
          marker.setIcon(hikingIcon);
        }
      }

      if (matchesFilters(item)) {
        if (types.includes('hiking')) hikingMarkers.addLayer(marker);
        if (types.includes('biking')) bikingMarkers.addLayer(marker);
      }
    });

    if (currentTypeFilter === 'all') {
      hikingMarkers.addTo(map);
      bikingMarkers.addTo(map);
    } else if (currentTypeFilter === 'hiking') {
      hikingMarkers.addTo(map);
    } else if (currentTypeFilter === 'biking') {
      bikingMarkers.addTo(map);
    }

    if (activeGpxTrailId) {
      const activeTrailStillVisible = trailMarkers.some(item => item.trail.id === activeGpxTrailId && matchesFilters(item));
      if (!activeTrailStillVisible) removeActiveGpx();
    }
  }

  document.querySelectorAll('.nyt-filter-button:not(.diff)').forEach(button => {
    button.addEventListener('click', e => {
      document.querySelectorAll('.nyt-filter-button:not(.diff)').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentTypeFilter = e.target.dataset.category;
      applyFiltersAndIcons();
    });
  });

  document.querySelectorAll('.nyt-filter-button.diff').forEach(button => {
    button.addEventListener('click', e => {
      document.querySelectorAll('.nyt-filter-button.diff').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentDifficultyFilter = e.target.dataset.difficulty;
      applyFiltersAndIcons();
    });
  });

  const allMarkers = L.featureGroup([hikingMarkers, bikingMarkers]);
  if (allMarkers.getBounds().isValid()) {
    map.fitBounds(allMarkers.getBounds(), { padding: [50, 50] });
  }
});
</script>