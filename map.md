---
layout: page
title: Map
subtitle: Find Upstate NY Trails
---

<div class="nyt-trail-widget">
    <div class="nyt-container">
        <div class="nyt-header">
            <div class="nyt-filters">
                <span class="nyt-filter-label">Filter by type:</span>
                <button class="nyt-filter-button all active" data-category="all">All Trails</button>
                <button class="nyt-filter-button hiking" data-category="hiking">Hiking Trails</button>
                <button class="nyt-filter-button biking" data-category="biking">Biking Trails</button>
            </div>
        </div>
        <div class="nyt-map" id="nyt-map"></div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const trails = [
        {
            id: 1,
            name: "Bradley's Lookout & The Pinnacle",
            type: "hiking",
            lat: 43.557024,
            lng: -73.681616,
            description: "Easy family hike with two Lake George overlook options",
            links: [
                { text: "Bradley's Lookout", url: "/2023/10/21/Bradleys-Lookout" },
                { text: "The Pinnacle", url: "/2016/07/02/The-Pinnacle" }
            ]
        },    
        {
            id: 2,
            name: "Baker Mountain",
            type: "hiking",
            lat: 44.331405,
            lng: -74.115836,
            description: "Short but steep hike with High Peaks views",
            link: "/2021/08/14/Baker-Mountain"
        },
        {
            id: 3,
            name: "Shelving Rock Falls",
            type: "hiking",
            lat: 43.5530,
            lng: -73.5965,
            description: "Short hike to beautiful waterfall in Lake George Wild Forest",
            link: "/2020/08/07/Shelving-Rock-Falls"
        },
        {
            id: 4,
            name: "Roaring Brook Falls",
            type: "hiking",
            lat: 44.150387,
            lng: -73.767696,
            description: "Easy access waterfall in Adirondack wilderness",
            link: "/2019/02/09/Roaring-Brook-Falls"
        },
        {
            id: 5,
            name: "Spruce Mountain",
            type: "hiking",
            lat: 43.216373,
            lng: -73.906211,
            description: "Fire tower with views (3 miles round trip)",
            link: "/2018/05/20/Spruce-Mountain"
        },
        {
            id: 6,
            name: "Cat & Thomas Mountains",
            type: "hiking",
            lat: 43.603889,
            lng: -73.692500,
            description: "Lake George double summit hike",
            link: "/2016/08/13/Cat-and-Thomas-Mountains"
        },
        {
            id: 7,
            name: "Schumann Preserve at Pilot Knob",
            type: "hiking",
            lat: 43.471634,
            lng: -73.625985,
            description: "Easy Lake George preserve trails",
            link: "/2016/08/07/Pilot-Knob"
        },
        {
            id: 8,
            name: "Black Mountain",
            type: "hiking",
            lat: 43.603889,
            lng: -73.692500,
            description: "Fire tower with 360° Lake George views (6 miles)",
            link: "/2016/07/22/Black-Mountain"
        },
        {
            id: 9,
            name: "Poke-O-Moonshine",
            type: "hiking",
            lat: 44.389246,
            lng: -73.507423,
            description: "Classic Adirondack cliff hike (multiple routes)",
            link: "/2016/07/18/Poke-O-Moonshine"
        },
        {
            id: 10,
            name: "Deer Leap (Tongue Mountain)",
            type: "hiking",
            lat: 43.661326,
            lng: -73.544811,
            description: "Steep overlook on Tongue Mountain Range",
            link: "/2016/06/25/Deer-Leap"
        },
        {
            id: 11,
            name: "Inman Pond",
            type: "hiking",
            lat: 43.489081,
            lng: -73.570163,
            description: "Easy pond loop in Lake George area",
            link: "/2016/05/15/Inman-Pond"
        },
        {
            id: 12,
            name: "Prospect Mountain",
            type: "hiking",
            lat: 43.42553938947501,
            lng: -73.72009037302082,
            description: "Historic trail with incline railway ruins",
            link: "/2016/05/08/Prospect-Mountain"
        },
        {
            id: 13,
            name: "Sleeping Beauty Mountain",
            type: "hiking",
            lat: 43.5495,
            lng: -73.5559,
            description: "Popular Lake George hike with dramatic cliffs",
            link: "/2016/04/24/Sleeping-Beauty-Mountain"
        },
        {
            id: 14,
            name: "Shelving Rock Mountain",
            type: "hiking",
            lat: 43.5500,
            lng: -73.5833,
            description: "Lake George Wild Forest summit",
            link: "/2016/04/23/Shelving-Rock-Mountain"
        },
        {
            id: 15,
            name: "Hadley Mountain",
            type: "hiking",
            lat: 43.37386,
            lng: -73.95063,
            description: "Fire tower with Hudson Valley views (1.5 miles)",
            link: "/2016/04/23/Hadley-Mountain"
        },
        {
            id: 16,
            name: "Buck Mountain",
            type: "hiking",
            lat: 43.509238,
            lng: -73.631144,
            description: "Challenging Lake George summit",
            link: "/2016/04/02/Buck-Mountain"
        },
        {
            id: 17,
            name: "Helderberg Hudson Rail Trail",
            type: "biking",
            lat: 42.6052,
            lng: -73.8267,
            description: "9.8-mile flat paved rail trail (Delmar parking)",
            link: "/2018/07/22/Albany-County-Rail-Trail"
        },
        {
            id: 18,
            name: "Saratoga National Historical Park",
            type: "biking",
            lat: 43.0138,
            lng: -73.6510,
            description: "Historic battlefield bike paths",
            link: "/2016/09/19/Saratoga-Battlefield"
        },
        {
            id: 19,
            name: "Mohawk-Hudson Bike-Hike Trail",
            type: "biking",
            lat: 42.776838013968,
            lng: -73.82468856770342,
            description: "Multi-use rail trail along Mohawk River",
            link: "/2016/06/04/Mohawk-Hudson-Bike-Hike-Trail"
        },
        {
            id: 20,
            name: "Zim Smith Trail",
            type: "biking",
            lat: 42.919306,
            lng: -73.746602,
            description: "10+ mile rail trail network",
            link: "/2016/04/09/Zim-Smith-Trail"
        },
        {
            id: 21,
            name: "Overlook Mountain",
            type: "hiking",
            lat: 42.071094,
            lng: -74.122661,
            description: "Fire tower with ruins (3 miles RT)",
            link: "/2018/07/22/Overlook-Mountain"
        },
        {
            id: 22,
            name: "Graphite Range Community Forest",
            type: "hiking",
            lat: 43.139455,
            lng: -73.768393,
            description: "New community forest trails",
            link: "/2025/01/18/Graphite-Range-Community-Forest"
        },
        {
            id: 23,
            name: "Colonie Town Park",
            type: "hiking",
            lat: 42.7952541954362,
            lng: -73.74486179735592,
            description: "Extensive suburban trail network",
            link: "/2024/02/19/Colonie-Town-Park"
        },
        {
            id: 24,
            name: "Swift Wetland Preserve",
            type: "hiking",
            lat: 42.61605,
            lng: -73.8560833333,
            description: "Boardwalk wetland trails",
            link: "/2023/02/20/Swift-Wetland-Preserve"
        },
        {
            id: 25,
            name: "Five Rivers Environmental Center",
            type: "hiking",
            lat: 42.6097338461417,
            lng: -73.89008407498632,
            description: "Interpretive trails (easy)",
            link: "/2019/02/09/Five-Rivers-Environmental-Education-Center"
        },
        {
            id: 26,
            name: "Peebles Island State Park",
            type: "hiking",
            lat: 42.7843,
            lng: -73.68015,
            description: "Riverside trails at Hudson confluence",
            link: "/2020/06/27/Peebles-Island-State-Park"
        },
        {
            id: 27,
            name: "Severance Hill",
            type: "hiking",
            lat: 43.8627,
            lng: -73.7548,
            description: "Short Adirondack hike to Schroon Lake views (1.2 miles, 740 ft gain)",
            link: "/2023/09/09/Severance-Hill"
        }
    ];

    const map = L.map('nyt-map').setView([42.6526, -73.7562], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const hikingMarkers = L.featureGroup();
    const bikingMarkers = L.featureGroup();

    const hikingIcon = L.divIcon({
        html: `<div style="background: rgba(232, 121, 74, 0.9); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">🥾</div>`,
        iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -16]
    });

    const bikingIcon = L.divIcon({
        html: `<div style="background: rgba(50, 184, 198, 0.9); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">🚴</div>`,
        iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -16]
    });

    trails.forEach(trail => {
        const popupContent = `
            <div class="nyt-trail-popup">
                <h3>${trail.name}</h3>
                ${trail.links ? trail.links.map(l => 
                    `<a href="${l.url}" target="_blank">${l.text} →</a>`
                ).join('') : `<a href="${trail.link}" target="_blank">View Details →</a>`}
            </div>
        `;
        
        const icon = trail.type === 'hiking' ? hikingIcon : bikingIcon;
        const marker = L.marker([trail.lat, trail.lng], { icon }).bindPopup(popupContent);
        
        if (trail.type === 'hiking') hikingMarkers.addLayer(marker);
        else bikingMarkers.addLayer(marker);
    });

    hikingMarkers.addTo(map);
    bikingMarkers.addTo(map);

    document.querySelectorAll('.nyt-filter-button').forEach(button => {
        button.addEventListener('click', e => {
            document.querySelectorAll('.nyt-filter-button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            map.removeLayer(hikingMarkers);
            map.removeLayer(bikingMarkers);
            
            const category = e.target.dataset.category;
            if (category === 'all') {
                hikingMarkers.addTo(map);
                bikingMarkers.addTo(map);
            } else if (category === 'hiking') {
                hikingMarkers.addTo(map);
            } else if (category === 'biking') {
                bikingMarkers.addTo(map);
            }
        });
    });

    const allMarkers = L.featureGroup([hikingMarkers, bikingMarkers]);
    map.fitBounds(allMarkers.getBounds(), { padding: [50, 50] });
});
</script>
