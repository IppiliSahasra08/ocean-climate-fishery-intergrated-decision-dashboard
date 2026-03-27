import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { REGIONS, MIGRATION_ROUTES } from '../data';

export default function GlobeScene({ onRegionClick }) {
  const mountRef = useRef(null);
  const worldRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [hoveredKey, setHoveredKey] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const world = Globe()
      (mountRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .atmosphereColor('#00e5c3')
      .atmosphereAltitude(0.18);

    worldRef.current = world;

    world
      .pointsData(REGIONS)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor(d => d === world._hoveredPoint ? d.hoverColor : d.color)
      .pointAltitude(0.04)
      .pointRadius(0.65)
      .pointsMerge(false)
      .onPointHover((pt, ev) => {
        world._hoveredPoint = pt;
        world.pointColor(d => d === pt ? d.hoverColor : d.color);
        world.pointRadius(d => d === pt ? 1.0 : 0.65);
        if (pt && ev) {
          // Temporarily mock the tooltip data for the globe 
          // (Can be updated with live data if passed down)
          setTooltip({ pt, x: ev.clientX, y: ev.clientY, d: {sst: 29.5, fish_stock: 1180, sustainability_score: 48} });
          setHoveredKey(pt.key);
        } else {
          setTooltip(null);
          setHoveredKey(null);
        }
      })
      .onPointClick(pt => { if (pt) onRegionClick(pt.key); });

    world
      .ringsData(REGIONS)
      .ringLat('lat')
      .ringLng('lng')
      .ringColor(d => t => `rgba(${d.key === 'north_atlantic' ? '0,149,255' : d.key === 'eastern_pacific' ? '255,200,55' : d.key === 'arabian_sea' ? '255,92,92' : '0,229,195'},${Math.max(0, 1 - t)})`)
      .ringMaxRadius(4)
      .ringPropagationSpeed(1.2)
      .ringRepeatPeriod(1800);

    world
      .arcsData(MIGRATION_ROUTES)
      .arcStartLat(d => d.startLat)
      .arcStartLng(d => d.startLng)
      .arcEndLat(d => d.endLat)
      .arcEndLng(d => d.endLng)
      .arcAltitude(0.015) // Keep it close to the surface, simulating swimming not flying
      .arcStroke(0.6)
      .arcDashLength(0.5)
      .arcDashGap(2)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(() => 3000 + Math.random() * 2000)
      .arcColor(d => {
        if (d.species === 'Whale') return ['#0ea5e9', '#0ea5e9']; // Blue
        if (d.species === 'Tuna') return ['#22c55e', '#22c55e']; // Green
        if (d.species === 'Shark') return ['#f59e0b', '#f59e0b']; // Yellow/Orange
        return ['#bdf285', '#bdf285']; // Mint
      });

    world
      .labelsData(REGIONS)
      .labelLat('lat')
      .labelLng('lng')
      .labelText('name')
      .labelSize(1.4)
      .labelDotRadius(0.4)
      .labelColor(d => hoveredKey === d.key ? '#fff' : 'rgba(255,255,255,0.6)')
      .labelResolution(2)
      .labelAltitude(0.055)
      .onLabelClick(d => onRegionClick(d.key));

    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.4;
    world.controls().enableDamping = true;
    world.pointOfView({ lat: 20, lng: 30, altitude: 2.2 });

    const onResize = () => {
      if (mountRef.current) {
        world.width(mountRef.current.clientWidth);
        world.height(mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', onResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div id="globe-scene">
      <div ref={mountRef} id="globe-mount"/>

      <div className="hud-header">
        <div className="logo">Ocean<span>Pulse</span></div>
        <div className="hud-status">
          <div>STATUS <b>LIVE</b></div>
          <div>REGIONS <b>{REGIONS.length}</b></div>
          <div>DATA <b>NOAA &middot; GFW</b></div>
          <div style={{marginTop:4,color:'rgba(255,255,255,0.2)',fontSize:10}}>
            {new Date().toUTCString().split(' ').slice(0,5).join(' ')}
          </div>
        </div>
      </div>

      <div className="globe-instruction">Click a region to explore</div>

      {tooltip && (
        <div className="globe-tooltip" style={{left: tooltip.x + 14, top: tooltip.y - 30, opacity: tooltip ? 1 : 0}}>
          <div className="tt-name">{tooltip.pt.name}</div>
          <div className="tt-row">SST <b>{tooltip.d.sst}°C</b></div>
          <div className="tt-row">Fish Stock <b>{tooltip.d.fish_stock}T</b></div>
          <div className="tt-row">Score <b style={{color: tooltip.d.sustainability_score >= 65 ? "#00e5c3" : tooltip.d.sustainability_score >= 45 ? "#ffc837" : "#ff5c5c"}}>{tooltip.d.sustainability_score}/100</b></div>
          <div className="tt-row" style={{marginTop:6,color:'rgba(255,255,255,0.3)',fontSize:10}}>Click to open dashboard &rarr;</div>
        </div>
      )}
    </div>
  );
}
