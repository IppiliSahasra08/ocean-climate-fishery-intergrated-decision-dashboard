import { useState } from 'react';
import { anomalyText, forecastSST, HIST_STOCK, HIST_CATCH } from '../data';
import { TemporalChart } from './Charts';

export default function OverviewTab({ regionKey, liveData }) {
  const [yearIdx, setYearIdx] = useState(6);
  const [metric, setMetric] = useState('sst');
  const anom = anomalyText(liveData);
  const forecast = forecastSST(regionKey, liveData.sst);

  return (
    <div>
      <div className={`anomaly-banner ${anom.level}`}>
        <span className="ab-icon">{anom.level === 'danger' ? '⚠' : anom.level === 'warning' ? '◈' : '✓'}</span>
        <span>{anom.msg}</span>
      </div>

      <div className="kpi-grid">
        {[
          {cls:'sst',label:'Sea Surf. Temp',val:liveData.sst,unit:'°C',delta:`+${liveData.anomaly_sst}°C vs avg`,dir:'up'},
          {cls:'stock',label:'Fish Stock',val:Math.round(liveData.fish_stock),unit:'T',delta:`${Math.round((liveData.fish_stock-HIST_STOCK[regionKey][0])/HIST_STOCK[regionKey][0]*100)}% since 2018`,dir:'down'},
          {cls:'catch',label:'Annual Catch',val:Math.round(liveData.catch),unit:'T',delta:`${Math.round((liveData.catch-HIST_CATCH[regionKey][0])/HIST_CATCH[regionKey][0]*100)}% since 2018`,dir:'down'},
          {cls:'oxygen',label:'Oxygen Level',val:liveData.oxygen,unit:'mg/L',delta:'Stable',dir:'neutral'},
          {cls:'score',label:'Sustain. Score',val:Math.round(liveData.sustainability_score),unit:'/100',delta:liveData.risk_level+' Risk',dir: liveData.risk_level==='High'?'up':liveData.risk_level==='Moderate'?'up':'down'},
        ].map(k => (
          <div key={k.cls} className={`kpi-card ${k.cls}`}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.val}<span className="kpi-unit">{k.unit}</span></div>
            <div className={`kpi-delta ${k.dir}`}>{k.dir==='up'?'▲':k.dir==='down'?'▼':'—'} {k.delta}</div>
          </div>
        ))}
      </div>

      <div className="panel" style={{marginBottom:16}}>
        <div className="panel-title">
          <span>Historical Trends 2018–2024</span>
          <div style={{display:'flex',gap:6}}>
            {['sst','catch','stock','score'].map(m => (
              <button key={m} onClick={()=>setMetric(m)} style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:'0.08em',textTransform:'uppercase',background: metric===m?'rgba(0,229,195,0.15)':'transparent',border:`1px solid ${metric===m?'rgba(0,229,195,0.4)':'rgba(255,255,255,0.1)'}`,color:metric===m?'#00e5c3':'#6b7a94',padding:'4px 10px',borderRadius:4,cursor:'pointer'}}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="timeline-row">
          <span className="timeline-label">{['2018','2019','2020','2021','2022','2023','2024'][yearIdx]}</span>
          <input type="range" min="0" max="6" value={yearIdx} onChange={e=>setYearIdx(Number(e.target.value))}/>
        </div>
        <TemporalChart regionKey={regionKey} metric={metric} yearIdx={yearIdx} />
      </div>

      <div className="panel" style={{ textAlign: 'center', padding: '32px 48px', maxWidth: '900px', margin: '0 auto' }}>
        <div className="panel-title" style={{ justifyContent: 'center', fontSize: 13 }}>
          <span>3-Month SST Forecast</span>
          <span className="panel-title-tag warn" style={{ marginLeft: 12 }}>Predictive</span>
        </div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:'#6b7a94',marginBottom:20}}>
          Based on recent warming trend
        </div>
        <div className="forecast-row" style={{ justifyContent: 'center', gap: '24px' }}>
          {forecast.map(f => (
            <div key={f.label} className="forecast-month" style={{ flex: '0 1 200px', padding: '20px' }}>
              <div className="fm-label" style={{ fontSize: 13 }}>{f.label}</div>
              <div className="fm-sst" style={{ fontSize: 24 }}>{f.sst}°C</div>
              <div className="fm-trend" style={{ fontSize: 12, marginTop: 8, color: f.trend==='▲'?'#ff5c5c':'#00e5c3'}}>{f.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
