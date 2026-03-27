import { useState, useEffect } from 'react';
import { REGIONS } from '../data';
import OverviewTab from './OverviewTab';
import PolicyTab from './PolicyTab';

export default function Dashboard({ regionKey, onBack }) {
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const r = REGIONS.find(r => r.key === regionKey);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    async function fetchRegionData() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/region-data?region=${regionKey}&live=true`);
        if (!res.ok) throw new Error("Failed response");
        const json = await res.json();
        
        // Enhance json response to match the dashboard's expected shape for visuals
        // Since main.py returns {indicators: {sst, oxygen...}, sustainability_score, risk_level, recommendation}
        const enriched = {
          ...json.indicators,
          sustainability_score: json.sustainability_score,
          risk_level: json.risk_level,
          recommendation: json.recommendation,
          // Calculate mock anomalies based on actual live SST vs historic constants
          thirty_yr_avg: 27.7,
        };
        // Just mock the anomaly dynamically
        enriched.anomaly_sst = +(enriched.sst - enriched.thirty_yr_avg).toFixed(1);

        if (isMounted) setLiveData(enriched);
      } catch (err) {
        console.error(err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchRegionData();
    
    return () => { isMounted = false; };
  }, [regionKey]);

  return (
    <div id="dashboard" className="open">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"/>
          <div className="loading-text">FETCHING LIVE DATA...</div>
        </div>
      )}
      
      {error && !loading && (
        <div className="loading-overlay" style={{background: 'rgba(50,10,10,0.95)'}}>
          <div className="loading-text" style={{color: '#ff5c5c'}}>ERROR CONNECTING TO BACKEND at 127.0.0.1:8000</div>
          <button className="dash-back" onClick={onBack}>RETURN</button>
        </div>
      )}

      <div className="dash-header">
        <button className="dash-back" onClick={onBack}>&larr; GLOBE</button>
        <div className="dash-region-name">
          <span>{r ? r.name.split(' ').map(w => w.toUpperCase()).join(' ') : ''}</span>
          <span> DASHBOARD</span>
        </div>
        <div className="dash-live-badge">
          <div className="live-dot"/>
          LIVE &middot; NOAA + GFW
        </div>
      </div>

      {!loading && liveData && !error && (
        <div className="dash-content">
          <OverviewTab regionKey={regionKey} liveData={liveData} />
          <hr style={{ border:'none', borderTop:'1px solid rgba(255,255,255,0.06)', margin: '32px 0'}} />
          <PolicyTab regionKey={regionKey} liveData={liveData} />
        </div>
      )}
    </div>
  );
}
