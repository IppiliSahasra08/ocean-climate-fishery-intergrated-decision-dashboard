import asyncio
from dotenv import load_dotenv
from live_data import fetch_live_region_data

# Load environment variables
load_dotenv()

async def test_live_data():
    regions = ["bay_of_bengal", "north_atlantic", "eastern_pacific", "arabian_sea"]
    for region in regions:
        print(f"\nTesting live data fetch for {region}...")
        try:
            data = await fetch_live_region_data(region)
            print(f"Success for {region}!")
            print(f"Indicators: {data}")
        except Exception as e:
            print(f"Failed for {region}: {e}")

if __name__ == "__main__":
    asyncio.run(test_live_data())
