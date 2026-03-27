import { useState } from 'react';
import { FLEET_DATA } from '../data';

function PolicySimulator({ regionKey, liveData }) {
  const [reduction, setReduction] = useState(15);
  // Replicating basic logic embedded in the backend simulator endpoint for instant client-side preview
  const simScore = Math.min(100, Math.round(liveData.sustainability_score + reduction * 0.4));
  const simStock = Math.round(liveData.fish_stock + (liveData.catch * reduction / 100) * 0.5);
  const simCatch = Math.round(liveData.catch * (1 - reduction / 100));

  return (
    <div className="sim-grid">
      <div>
        <div className="panel-title" style={{marginBottom:12}}>Catch Reduction</div>
        <div className="timeline-row">
          <span className="timeline-label">{reduction}%</span>
          <input type="range" min="0" max="50" value={reduction} onChange={e=>setReduction(Number(e.target.value))} />
        </div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:'#4a5568',marginTop:6}}>
          Drag slider to simulate policy impact
        </div>
      </div>
      <div>
        {[
          {k:"Catch Volume", from: Math.round(liveData.catch)+"T", to: simCatch+"T", better: simCatch < liveData.catch},
          {k:"Fish Stock", from: Math.round(liveData.fish_stock)+"T", to: simStock+"T", better: simStock > liveData.fish_stock},
          {k:"Sustain. Score", from: Math.round(liveData.sustainability_score)+"/100", to: simScore+"/100", better: simScore > liveData.sustainability_score},
        ].map(r => (
          <div key={r.k} className="sim-result-row">
            <span className="sim-result-key">{r.k}</span>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:'#6b7a94'}}>{r.from} &rarr; </span>
            <span className={`sim-result-val ${r.better?'better':'worse'}`}>{r.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PolicyTab({ regionKey, liveData }) {
  const recLevel = liveData.sustainability_score >= 65 ? 'ok' : liveData.sustainability_score >= 45 ? 'high' : 'critical';
  const recommendations = {
    critical: "Critical sustainability risk. Immediate large-scale catch reduction (>40%) and urgent restoration measures required. Consider seasonal fishing bans and expanded marine protected area coverage. Coordinate with regional fishery management organizations for emergency response protocols.",
    high: "High ecosystem stress detected. Implement 25–40% catch reduction over the next 6 months. Strengthen monitoring of fish stock recovery zones and enforce gear restrictions for trawling fleets. Introduce carbon footprint levies on high-emission vessel types.",
    ok: "Current fishing levels are within sustainable parameters. Maintain existing catch quotas with quarterly reviews. Continue ecosystem health monitoring. Invest in selective fishing gear programs to reduce bycatch and improve habitat resilience.",
  };

  return (
    <div>
      <div className={`rec-card ${recLevel} pulsate-card`}>
        <div className="rec-header">Policy Recommendation — {liveData.risk_level} Risk</div>
        <div className="rec-text">{recommendations[recLevel]}</div>
      </div>

      <div className="panel" style={{marginBottom:16}}>
        <div className="panel-title">
          <span>Policy Simulator</span>
          <span className="panel-title-tag">Interactive</span>
        </div>
        <PolicySimulator regionKey={regionKey} liveData={liveData} />
      </div>

      <div className="panel">
        <div className="panel-title">
          <span>Fleet Activity & Carbon Footprint</span>
          <span className="panel-title-tag warn">GFW Data</span>
        </div>
        <table className="fleet-table">
          <thead>
            <tr>
              <th>Vessel Type</th>
              <th>Vessels</th>
              <th>Fishing Hours</th>
              <th>Est. CO₂ (T)</th>
              <th style={{width:'120px'}}>Intensity</th>
            </tr>
          </thead>
          <tbody>
            {FLEET_DATA[regionKey].map(row => {
              const maxH = Math.max(...FLEET_DATA[regionKey].map(r=>r.hours));
              const pct = row.hours / maxH;
              return (
                <tr key={row.type}>
                  <td>{row.type}</td>
                  <td>{row.vessels.toLocaleString()}</td>
                  <td>{row.hours.toLocaleString()}</td>
                  <td>{row.co2.toLocaleString()}</td>
                  <td>
                    <div className="bar-cell">
                      <div className="bar-bg">
                        <div className="bar-fill" style={{width:`${pct*100}%`,background:'linear-gradient(90deg,#0095ff,#00e5c3)'}}/>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
