import { useState } from 'react';
import GlobeScene from './components/GlobeScene';
import Dashboard from './components/Dashboard';

export default function App() {
  const [activeRegion, setActiveRegion] = useState(null);

  return (
    <>
      <GlobeScene onRegionClick={setActiveRegion} />
      {activeRegion && (
        <Dashboard regionKey={activeRegion} onBack={() => setActiveRegion(null)} />
      )}
    </>
  );
}
