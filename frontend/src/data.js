export const REGIONS = [
  { name: "Bay of Bengal", key: "bay_of_bengal", lat: 13, lng: 87, color: "rgba(0,229,195,0.55)", hoverColor: "rgba(0,255,200,0.9)" },
  { name: "North Atlantic", key: "north_atlantic", lat: 45, lng: -35, color: "rgba(0,149,255,0.45)", hoverColor: "rgba(60,180,255,0.9)" },
  { name: "Eastern Pacific", key: "eastern_pacific", lat: 0, lng: -115, color: "rgba(255,200,55,0.4)", hoverColor: "rgba(255,220,80,0.9)" },
  { name: "Arabian Sea", key: "arabian_sea", lat: 15, lng: 65, color: "rgba(255,92,92,0.45)", hoverColor: "rgba(255,120,100,0.9)" },
  { name: "Mediterranean Sea", key: "mediterranean_sea", lat: 35, lng: 18, color: "rgba(180,92,255,0.45)", hoverColor: "rgba(200,120,255,0.9)" },
  { name: "South China Sea", key: "south_china_sea", lat: 12, lng: 113, color: "rgba(255,140,55,0.45)", hoverColor: "rgba(255,160,80,0.9)" },
];

export const HIST_SST = {
  bay_of_bengal: [27.1, 27.8, 28.3, 28.9, 29.0, 29.2, 29.5],
  north_atlantic: [11.2, 11.9, 12.4, 13.1, 13.6, 14.2, 14.8],
  eastern_pacific: [19.8, 20.1, 20.4, 20.7, 20.9, 21.0, 21.2],
  arabian_sea: [24.9, 25.5, 26.1, 26.6, 27.0, 27.4, 27.8],
  mediterranean_sea: [20.5, 21.0, 21.5, 22.1, 22.4, 22.8, 23.3],
  south_china_sea: [27.5, 28.1, 28.6, 29.0, 29.5, 29.8, 30.2],
};

export const HIST_CATCH = {
  bay_of_bengal: [380, 365, 350, 340, 328, 318, 312],
  north_atlantic: [290, 265, 242, 225, 212, 204, 198],
  eastern_pacific: [310, 300, 285, 275, 268, 260, 256],
  arabian_sea: [340, 325, 315, 305, 297, 290, 285],
  mediterranean_sea: [210, 205, 195, 185, 178, 172, 168],
  south_china_sea: [520, 505, 490, 475, 455, 435, 415],
};

export const HIST_STOCK = {
  bay_of_bengal: [1650, 1520, 1410, 1320, 1260, 1210, 1180],
  north_atlantic: [1200, 1050, 940, 870, 810, 780, 760],
  eastern_pacific: [1680, 1600, 1530, 1480, 1420, 1370, 1340],
  arabian_sea: [1380, 1250, 1150, 1070, 1010, 960, 920],
  mediterranean_sea: [850, 790, 740, 690, 650, 620, 590],
  south_china_sea: [2100, 1950, 1820, 1700, 1610, 1540, 1480],
};

export const HIST_SCORE = {
  bay_of_bengal: [68, 61, 57, 53, 50, 49, 48],
  north_atlantic: [62, 55, 49, 44, 41, 39, 38],
  eastern_pacific: [74, 71, 68, 65, 63, 62, 61],
  arabian_sea: [65, 58, 53, 49, 45, 43, 42],
  mediterranean_sea: [58, 52, 47, 42, 39, 37, 35],
  south_china_sea: [64, 59, 55, 51, 48, 45, 44],
};

export const SEASONS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const SEASONAL_SST = {
  bay_of_bengal: [1.2,0.8,-0.3,-1.4,-0.8,0.9,2.1,2.3,1.8,0.7,-0.4,0.5],
  north_atlantic: [-2.1,-2.4,-1.8,-0.5,0.8,1.9,2.5,2.8,2.1,0.9,-0.8,-1.6],
  eastern_pacific: [0.3,0.1,-0.4,-0.9,-0.6,0.2,0.8,1.1,0.7,0.3,-0.1,0.1],
  arabian_sea: [0.8,1.1,0.6,-0.3,-1.2,-0.4,1.8,2.2,1.6,0.4,-0.3,0.1],
  mediterranean_sea: [-2.5,-2.8,-1.5,-0.2,1.1,2.5,3.8,4.1,2.9,1.5,0.2,-1.4],
  south_china_sea: [0.5,0.2,-0.1,-0.8,-0.4,0.8,1.5,1.8,1.2,0.6,0.1,0.4],
};

export const SEASONAL_CATCH = {
  bay_of_bengal: [85,90,95,110,100,60,40,45,70,105,115,110],
  north_atlantic: [70,65,60,75,95,120,130,125,110,85,65,60],
  eastern_pacific: [90,85,75,70,80,100,115,120,105,95,85,80],
  arabian_sea: [80,85,90,95,80,55,40,50,75,105,110,100],
  mediterranean_sea: [60,65,70,85,105,115,120,110,95,80,65,55],
  south_china_sea: [100,115,120,130,110,70,55,60,85,115,125,120],
};

export const FLEET_DATA = {
  bay_of_bengal: [{type:"Trawlers", vessels:284, hours:48200, co2: 38400},{type:"Gillnetters",vessels:892,hours:31600,co2:15800},{type:"Longliners",vessels:145,hours:19800,co2:9900},{type:"Purse seiners",vessels:67,hours:14200,co2:11400}],
  north_atlantic: [{type:"Trawlers",vessels:412,hours:62100,co2:49700},{type:"Longliners",vessels:198,hours:28400,co2:14200},{type:"Purse seiners",vessels:89,hours:18900,co2:15100},{type:"Gillnetters",vessels:224,hours:21800,co2:10900}],
  eastern_pacific: [{type:"Purse seiners",vessels:156,hours:41200,co2:33000},{type:"Trawlers",vessels:348,hours:55100,co2:44100},{type:"Longliners",vessels:167,hours:24600,co2:12300},{type:"Gillnetters",vessels:512,hours:28900,co2:14500}],
  arabian_sea: [{type:"Trawlers",vessels:321,hours:52800,co2:42200},{type:"Gillnetters",vessels:768,hours:38400,co2:19200},{type:"Longliners",vessels:112,hours:16700,co2:8400},{type:"Purse seiners",vessels:44,hours:11200,co2:8900}],
  mediterranean_sea: [{type:"Trawlers",vessels:215,hours:42100,co2:33600},{type:"Purse seiners",vessels:82,hours:15400,co2:12300},{type:"Longliners",vessels:104,hours:12200,co2:6100},{type:"Gillnetters",vessels:140,hours:18300,co2:9150}],
  south_china_sea: [{type:"Trawlers",vessels:512,hours:81200,co2:64900},{type:"Purse seiners",vessels:210,hours:38400,co2:30700},{type:"Gillnetters",vessels:1024,hours:45200,co2:22600},{type:"Longliners",vessels:240,hours:32100,co2:16050}],
};

export function scoreColor(score) {
  if (score >= 65) return "#00e5c3";
  if (score >= 45) return "#ffc837";
  return "#ff5c5c";
}

export function riskClass(risk) { 
  return risk === "Low" ? "low" : risk === "High" ? "high" : "moderate"; 
}

export function lerp(a, b, t) { 
  return a + (b - a) * t; 
}

export function anomalyText(d) {
  if (d.anomaly_sst >= 2) return { msg: `SST is ${d.anomaly_sst}°C above the 30-year average — significant thermal stress detected`, level: "danger" };
  if (d.anomaly_sst >= 1) return { msg: `SST is ${d.anomaly_sst}°C above the 30-year average — warming trend in progress`, level: "warning" };
  return { msg: `SST is within normal range (${d.anomaly_sst > 0 ? "+" : ""}${d.anomaly_sst}°C vs 30-yr avg)`, level: "good" };
}

export function forecastSST(key, liveSst) {
  const base = liveSst;
  const trend = (HIST_SST[key][6] - HIST_SST[key][5]);
  return [1,2,3].map((m, i) => ({
    label: ["1mo","2mo","3mo"][i],
    sst: +(base + trend * (i + 1)).toFixed(2),
    trend: trend > 0 ? "▲" : "▼",
  }));
}

// Oceanic Migration Routes (Realistic routes avoiding landmasses)
export const MIGRATION_ROUTES = [
  // Humpback Whales (Antarctica to Pacific/Indian/Atlantic)
  { startLat: -60, startLng: -110, endLat: -10, endLng: -140, species: 'Whale' },
  { startLat: -60, startLng: 0, endLat: -15, endLng: -25, species: 'Whale' },
  { startLat: -55, startLng: 80, endLat: -15, endLng: 60, species: 'Whale' },
  // Bluefin Tuna (Pacific migration)
  { startLat: 30, startLng: 140, endLat: 35, endLng: -125, species: 'Tuna' },
  { startLat: -10, startLng: 150, endLat: -20, endLng: 170, species: 'Tuna' },
  { startLat: 40, startLng: -50, endLat: 35, endLng: -20, species: 'Tuna' }, // Atlantic tuna
  // Great White Sharks (California to Hawaii - "White Shark Cafe")
  { startLat: 37, startLng: -122, endLat: 22, endLng: -135, species: 'Shark' },
  { startLat: -35, startLng: 18, endLat: -40, endLng: 110, species: 'Shark' }, // South Africa to Australia
  // Leatherback Sea Turtles (Indonesia to California, Atlantic routes)
  { startLat: -5, startLng: 130, endLat: 35, endLng: -125, species: 'Turtle' },
  { startLat: 10, startLng: -80, endLat: 40, endLng: -60, species: 'Turtle' },
  // Arctic Tern (Oceanic routes)
  { startLat: 65, startLng: -30, endLat: -65, endLng: -20, species: 'Tern' },
  { startLat: 60, startLng: 170, endLat: -60, endLng: 150, species: 'Tern' },
  // Atlantic Salmon
  { startLat: 60, startLng: -40, endLat: 55, endLng: -10, species: 'Salmon' }
];
