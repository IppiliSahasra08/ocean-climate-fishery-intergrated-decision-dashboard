// Define simplified polygon coordinates for major oceans
// Adjusted to avoid hitting land masses as much as possible
const oceanPolygons = [
  {
    name: "Bay of Bengal",
    key: "bay_of_bengal",
    coords: [
      [5, 78], [22, 78], [22, 95], [5, 95], [5, 78]
    ],
    color: 'rgba(32, 178, 170, 0.4)'
  },
  {
    name: "North Atlantic",
    key: "north_atlantic",
    coords: [
      [30, -60], [60, -60], [60, -10], [30, -10], [30, -60]
    ],
    color: 'rgba(0, 255, 255, 0.3)'
  },
  {
    name: "Eastern Pacific",
    key: "eastern_pacific",
    coords: [
      [10, -130], [50, -130], [50, -70], [10, -70], [10, -130]
    ],
    color: 'rgba(0, 100, 255, 0.3)'
  }
];

// Initialize the Globe
const world = Globe()
  (document.getElementById('globe-container'))
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')

  // Add Polygons (Borders)
  .polygonsData(oceanPolygons)
  .polygonCapColor('color')
  .polygonSideColor(() => 'rgba(0, 50, 100, 0.1)')
  .polygonStrokeColor(() => '#111')
  .polygonAltitude(0.01)
  .onPolygonHover(hoverD => {
    world
      .polygonCapColor(d => d === hoverD ? 'rgba(255, 255, 255, 0.8)' : d.color) // Bright highlight on hover
      .polygonAltitude(d => d === hoverD ? 0.05 : 0.01); // Lift slightly on hover
  })
  .onPolygonClick(d => {
    // Open Dashboard with the region key as a parameter
    window.location.href = `dashboard.html?region=${encodeURIComponent(d.key)}`;
  })

  // Add Labels (Text)
  .labelsData(oceanPolygons)
  .labelLat(d => {
    // Calculate rough center lat for label
    const lats = d.coords.map(c => c[0]);
    return (Math.min(...lats) + Math.max(...lats)) / 2;
  })
  .labelLng(d => {
    // Calculate rough center lng for label
    const lngs = d.coords.map(c => c[1]);
    return (Math.min(...lngs) + Math.max(...lngs)) / 2;
  })
  .labelText(d => d.name)
  .labelSize(2.0)
  .labelDotRadius(0.5)
  .labelColor(() => 'white')
  .labelResolution(2)
  .onLabelClick(d => {
    // Also allow clicking the text label to navigate
    window.location.href = `dashboard.html?region=${encodeURIComponent(d.key)}`;
  });

// Add rotation
world.controls().autoRotate = false;
world.controls().autoRotateSpeed = 0.5;

// Initial View
world.pointOfView({ lat: 0, lng: -100, altitude: 2.5 });

// Responsive
window.addEventListener('resize', () => {
  world.width(window.innerWidth);
  world.height(window.innerHeight);
});
