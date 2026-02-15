from fastapi import FastAPI, Query, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from typing import Optional
import json
import os

from scoring import sustainability_score, risk_level, recommendation
from live_data import fetch_live_region_data  # your live API fetch function


import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

print("NOAA_API_TOKEN:", os.getenv("NOAA_API_TOKEN"))

app = FastAPI(title="Ocean–Climate–Fishery Integrated Decision Dashboard Backend")

DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")


def load_local_region_data(region: str) -> dict:
    try:
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to load local data source.")

    region_key = region.lower().replace(" ", "_")
    if region_key not in data:
        raise HTTPException(status_code=404, detail=f"Region '{region}' not found in local data.")

    return data[region_key]


# Exception handlers

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "path": str(request.url)}
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"errors": exc.errors(), "body": exc.body}
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "details": str(exc)}
    )


# API endpoints

@app.get("/region-data")
async def get_region_data(
    region: str = Query(..., description="Region name, e.g. 'bay_of_bengal'"),
    live: bool = Query(False, description="Use live API data if true")
):
    """
    Get region indicators, sustainability score, risk level, and recommendation.
    Supports live API data if live=true.
    """
    if live:
        indicators = await fetch_live_region_data(region)
    else:
        indicators = load_local_region_data(region)

    score = sustainability_score(
        fish_stock=indicators["fish_stock"],
        sst=indicators["sst"],
        oxygen=indicators["oxygen"]
    )
    risk = risk_level(score)
    rec = recommendation(score, indicators["catch"])

    response = {
        "region": region,
        "indicators": indicators,
        "sustainability_score": score,
        "risk_level": risk,
        "recommendation": rec
    }
    return JSONResponse(content=response)


@app.get("/simulate-policy")
async def simulate_policy(
    region: str = Query(..., description="Region name, e.g. 'bay_of_bengal'"),
    reduction: float = Query(..., ge=0, le=100, description="Catch reduction percentage (0-100)"),
    live: bool = Query(False, description="Use live API data if true")
):
    """
    Simulate policy changes with optional live data.
    """
    if live:
        indicators = await fetch_live_region_data(region)
    else:
        indicators = load_local_region_data(region)

    original_catch = indicators["catch"]
    reduced_catch = original_catch * (1 - reduction / 100)
    catch_diff = original_catch - reduced_catch
    fish_stock_increase = catch_diff * 0.5
    new_fish_stock = indicators["fish_stock"] + fish_stock_increase

    new_score = sustainability_score(
        fish_stock=new_fish_stock,
        sst=indicators["sst"],
        oxygen=indicators["oxygen"]
    )
    new_rec = recommendation(new_score, reduced_catch)

    response = {
        "region": region,
        "reduction_percent": reduction,
        "new_fish_stock": round(new_fish_stock, 2),
        "new_score": new_score,
        "recommendation": new_rec
    }
    return JSONResponse(content=response)


# Run with: python main.py (Windows-friendly)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
