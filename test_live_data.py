import asyncio
from dotenv import load_dotenv
from live_data import fetch_live_region_data

# Load environment variables
load_dotenv()

async def test_live_data():
    print("Testing live data fetch for bay_of_bengal...")
    try:
        data = await fetch_live_region_data("bay_of_bengal")
        print("Success!")
        print(f"Indicators: {data}")
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_live_data())
