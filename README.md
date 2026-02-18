# Ocean–Climate–Fishery Integrated Decision Dashboard

An interactive, data-driven dashboard designed for real-time monitoring of ocean health and fishery sustainability. This project integrates live satellite and vessel data to provide actionable insights for maritime decision-making.

## 🚀 Key Features

- **Interactive 3D Globe**: Select specific maritime regions (Bay of Bengal, North Atlantic, Eastern Pacific) using an interactive visualization built with Globe.gl.
- **Live Data Integration**:
    - **NOAA ERDDAP**: Real-time Sea Surface Temperature (SST) and ocean metrics.
    - **Global Fishing Watch (GFW)**: Live monitoring of fishing effort and vessel activity.
- **Sustainability Scoring**: Automated calculation of sustainability scores based on fish stock estimates, temperature trends, and oxygen levels.
- **Decision Support**: Real-time risk level assessment and policy recommendations (e.g., catch reduction suggestions).
- **Policy Simulation**: Simulate the impact of catch reductions on future fish stock levels.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript, [Globe.gl](https://globe.gl/)
- **Backend**: Python 3.x, [FastAPI](https://fastapi.tiangolo.com/), Uvicorn
- **APIs**: NOAA ERDDAP, GFW API v3
- **Tools**: `httpx` for async requests, `python-dotenv` for configuration.

## 📋 Prerequisites

- Python 3.8+
- Active API tokens for:
    - [NOAA ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
    - [Global Fishing Watch](https://globalfishingwatch.org/our-apis/)

## ⚙️ Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/IppiliSahasra08/ocean-climate-fishery-intergrated-decision-dashboard.git
   cd ocean-climate-fishery-intergrated-decision-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment**:
   Create a `.env` file in the root directory and add your API tokens:
   ```env
   NOAA_API_TOKEN=your_noaa_token
   GFW_API_TOKEN=your_gfw_token
   ```

4. **Run the Backend**:
   ```bash
   python main.py
   ```
   The API will be available at `http://127.0.0.1:8000`. You can view the automated documentation at `/docs`.

5. **Launch the Dashboard**:
   Open `index.html` in any modern web browser.

## 📂 Project Structure

- `main.py`: FastAPI server defining endpoints for data retrieval and simulation.
- `live_data.py`: Core logic for fetching and processing data from NOAA and GFW.
- `scoring.py`: Mathematical models for sustainability and risk scoring.
- `index.html` & `script.js`: Interactive globe interface.
- `dashboard.html`: Regional data visualization and analysis interface.
- `data.json`: Local fallback data for offline testing.

## 🧪 Testing

You can verify the live data integration independently by running:
```bash
python test_live_data.py
```

