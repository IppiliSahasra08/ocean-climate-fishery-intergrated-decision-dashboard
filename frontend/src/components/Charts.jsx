import { useState, useRef, useEffect } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';
import { HIST_SST, HIST_CATCH, HIST_STOCK, HIST_SCORE, SEASONAL_CATCH, SEASONAL_SST, SEASONS, REGIONS, scoreColor, lerp } from '../data';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0A2E27', titleFont: {family:"'Space Mono', monospace",size:11}, bodyFont: {family:"'Space Mono', monospace",size:11}, borderColor:'rgba(0,0,0,0.1)', borderWidth:1 } },
  scales: {
    x: { grid: {color:'rgba(0,0,0,0.05)'}, ticks: {color:'#6b7a94', font:{family:"'Space Mono', monospace",size:10}} },
    y: { grid: {color:'rgba(0,0,0,0.05)'}, ticks: {color:'#6b7a94', font:{family:"'Space Mono', monospace",size:10}} },
  }
};

export function TemporalChart({ regionKey, metric, yearIdx }) {
  const years = ["2018","2019","2020","2021","2022","2023","2024"];
  const dataMap = { sst: HIST_SST, catch: HIST_CATCH, stock: HIST_STOCK, score: HIST_SCORE };
  const colorMap = { sst: "#ff5c5c", catch: "#0095ff", stock: "#00e5c3", score: "#ffc837" };
  const labelMap = { sst: "SST (°C)", catch: "Catch (T)", stock: "Fish Stock (T)", score: "Sustainability Score" };

  const d = dataMap[metric][regionKey];
  const highlighted = d.map((v, i) => i <= yearIdx ? v : null);

  const data = {
    labels: years,
    datasets: [{
      data: d, borderColor: 'rgba(0,0,0,0.1)', borderWidth: 1.5, fill: false, pointRadius: 0, tension: 0.4
    }, {
      data: highlighted, borderColor: colorMap[metric], borderWidth: 2.5,
      fill: { target: 'origin', above: colorMap[metric] + '18' },
      pointBackgroundColor: colorMap[metric], pointRadius: d.map((_,i) => i === yearIdx ? 5 : 0),
      tension: 0.4
    }]
  };

  const options = {
    ...CHART_DEFAULTS, 
    plugins: { 
      ...CHART_DEFAULTS.plugins, 
      tooltip: { ...CHART_DEFAULTS.plugins.tooltip, callbacks: { label: (c) => ` ${c.raw} ${labelMap[metric]}` } } 
    }
  }

  return <div style={{height: 160}}><Line data={data} options={options} /></div>;
}

export function SeasonalHeatmap({ regionKey }) {
  const maxCatch = Math.max(...SEASONAL_CATCH[regionKey]);
  const minCatch = Math.min(...SEASONAL_CATCH[regionKey]);
  const maxSST = Math.max(...SEASONAL_SST[regionKey]);
  const minSST = Math.min(...SEASONAL_SST[regionKey]);

  function catchColor(v) {
    const t = (v - minCatch) / (maxCatch - minCatch);
    const r = Math.round(lerp(20, 0, t));
    const g = Math.round(lerp(60, 229, t));
    const b = Math.round(lerp(100, 195, t));
    return `rgba(${r},${g},${b},${0.3 + t * 0.5})`;
  }
  function sstColor(v) {
    const t = (v - minSST) / (maxSST - minSST);
    const r = Math.round(lerp(0, 255, t));
    const g = Math.round(lerp(100, 92, t));
    const b = Math.round(lerp(255, 92, t));
    return `rgba(${r},${g},${b},${0.3 + t * 0.5})`;
  }

  return (
    <div>
      <div style={{marginBottom: 16}}>
        <div style={{display:'flex', gap:16, marginBottom:8}}>
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:'#6b7a94',letterSpacing:'0.1em'}}>CATCH INTENSITY</span>
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:'#6b7a94',letterSpacing:'0.1em',marginLeft:'auto'}}>LOW &rarr; HIGH</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'40px repeat(12,1fr)',gap:3}}>
          <div style={{gridColumn:'1',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:6,fontFamily:"'Space Mono',monospace",fontSize:9,color:'#6b7a94'}}>CATCH</div>
          {SEASONAL_CATCH[regionKey].map((v,i) => (
            <div key={i} title={`${SEASONS[i]}: ${v}T`} style={{aspectRatio:'1',borderRadius:3,background:catchColor(v),cursor:'pointer',transition:'transform 0.15s'}}
              onMouseEnter={e=>e.target.style.transform='scale(1.2)'} onMouseLeave={e=>e.target.style.transform='scale(1)'} />
          ))}
          <div style={{gridColumn:'1',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:6,fontFamily:"'Space Mono',monospace",fontSize:9,color:'#6b7a94'}}>SST</div>
          {SEASONAL_SST[regionKey].map((v,i) => (
            <div key={i} title={`${SEASONS[i]}: ${v > 0 ? '+' : ''}${v}°C`} style={{aspectRatio:'1',borderRadius:3,background:sstColor(v),cursor:'pointer',transition:'transform 0.15s'}}
              onMouseEnter={e=>e.target.style.transform='scale(1.2)'} onMouseLeave={e=>e.target.style.transform='scale(1)'} />
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'40px repeat(12,1fr)',gap:3,marginTop:4}}>
          <div/>
          {SEASONS.map(s => <div key={s} style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:'#4a5568',textAlign:'center'}}>{s.toUpperCase()}</div>)}
        </div>
      </div>
    </div>
  );
}

export function CorrelationMatrix({ regionKey }) {
  const labels = ["SST","CATCH","STOCK","SCORE"];
  const matrices = {
    bay_of_bengal: [1, -0.72, -0.89, -0.84, -0.72, 1, 0.91, 0.78, -0.89, 0.91, 1, 0.82, -0.84, 0.78, 0.82, 1],
    north_atlantic: [1, -0.68, -0.91, -0.88, -0.68, 1, 0.87, 0.75, -0.91, 0.87, 1, 0.86, -0.88, 0.75, 0.86, 1],
    eastern_pacific: [1, -0.61, -0.85, -0.79, -0.61, 1, 0.92, 0.81, -0.85, 0.92, 1, 0.88, -0.79, 0.81, 0.88, 1],
    arabian_sea: [1, -0.74, -0.93, -0.86, -0.74, 1, 0.89, 0.77, -0.93, 0.89, 1, 0.84, -0.86, 0.77, 0.84, 1],
  };
  const mat = matrices[regionKey];

  function corrColor(v) {
    if (v === 1) return 'rgba(255,255,255,0.12)';
    const abs = Math.abs(v);
    if (v > 0) return `rgba(0,229,195,${abs * 0.7})`;
    return `rgba(255,92,92,${abs * 0.7})`;
  }

  return (
    <div>
      <div style={{display:'grid', gridTemplateColumns:'40px repeat(4,1fr)', gap:3}}>
        <div/>
        {labels.map(l => <div key={l} style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:'#6b7a94',textAlign:'center',paddingBottom:3}}>{l}</div>)}
        {labels.map((row,ri) => [
          <div key={'l'+ri} style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:'#6b7a94',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:4}}>{row}</div>,
          ...labels.map((_,ci) => {
            const v = mat[ri*4+ci];
            return <div key={ri+'_'+ci} style={{aspectRatio:'1',borderRadius:3,background:corrColor(v),display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Space Mono',monospace",fontSize:10,color:'rgba(255,255,255,0.8)',cursor:'default'}} title={`${row} vs ${labels[ci]}: ${v.toFixed(2)}`}>{v === 1 ? '—' : v.toFixed(2)}</div>
          })
        ])}
      </div>
      <div style={{marginTop:12,fontFamily:"'Space Mono',monospace",fontSize:10,color:'#4a5568',lineHeight:1.7}}>
        Strong negative correlation between rising SST and fish stock decline.
      </div>
    </div>
  );
}

export function RiskQuadrant() {
  const regionColors = ['#00e5c3','#0095ff','#ffc837','#ff5c5c'];
  const data = {
    datasets: REGIONS.map((r,i) => ({
      label: r.name,
      data: [{
        x: Math.random() * 2 + 0.5, // Mock anomaly proxy
        y: (HIST_CATCH[r.key][0] - HIST_CATCH[r.key][6]) / HIST_CATCH[r.key][0] * 100,
      }],
      backgroundColor: regionColors[i],
      borderColor: regionColors[i],
      pointRadius: 10,
      pointHoverRadius: 14,
    }))
  };

  const options = {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      legend: { display: true, position: 'bottom', labels: { color: '#6b7a94', font:{family:"'Space Mono',monospace",size:10}, boxWidth: 10, padding: 12 } },
      tooltip: { ...CHART_DEFAULTS.plugins.tooltip, callbacks: {
        label: (c) => ` ${c.dataset.label}: SST+${c.parsed.x.toFixed(1)}°C, Catch-${c.parsed.y.toFixed(1)}%`
      }}
    },
    scales: {
      x: { ...CHART_DEFAULTS.scales.x, title:{display:true,text:'SST Anomaly (°C)',color:'#6b7a94',font:{family:"'Space Mono',monospace",size:10}}, min:0, max:3 },
      y: { ...CHART_DEFAULTS.scales.y, title:{display:true,text:'Catch Decline (%)',color:'#6b7a94',font:{family:"'Space Mono',monospace",size:10}}, min:0, max:35 },
    }
  }

  return <div style={{position:'relative',height:240}}><Scatter data={data} options={options}/></div>;
}

export function SustainabilityGauge({ score }) {
  const clamp = Math.min(Math.max(score, 0), 100);
  const angle = -135 + (clamp / 100) * 270;
  const r = 54;
  const cx = 70, cy = 70;
  function polarToXY(deg, radius) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }
  function arc(startDeg, endDeg, radius) {
    const s = polarToXY(startDeg, radius);
    const e = polarToXY(endDeg, radius);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  }
  const c = scoreColor(score);
  const needle = polarToXY(angle, 42);
  return (
    <svg width="140" height="90" viewBox="0 0 140 90">
      <path d={arc(-135,135,r)} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="10" strokeLinecap="round"/>
      <path d={arc(-135,-135+(clamp/100)*270,r)} fill="none" stroke={c} strokeWidth="10" strokeLinecap="round" style={{filter:`drop-shadow(0 0 4px ${c}80)`}}/>
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="4" fill={c}/>
    </svg>
  );
}
