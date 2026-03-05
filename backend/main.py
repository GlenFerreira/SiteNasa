import os
import requests
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

NASA_API_KEY = os.getenv("NASA_API_KEY")

app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify the actual origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/apod")
async def get_apod(date: str = Query(..., pattern=r"^\d{4}-\d{2}-\d{2}$")):
    """
    Fetches the Astronomy Picture of the Day for a specific date.
    """
    if not NASA_API_KEY:
        raise HTTPException(status_code=500, detail="NASA_API_KEY not found in environment")

    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}&date={date}"
    
    try:
        # Attempting with default verification
        # If the user's environment has SSL issues, we can use verify=False as a last resort
        # for development, but it's better to fix the local certificates.
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.SSLError:
        # Fallback for development environments with SSL certification issues
        print("SSL Verification failed. Retrying without verification (not recommended for production).")
        try:
            response = requests.get(url, verify=False, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as inner_e:
            raise HTTPException(status_code=500, detail=f"SSL/Connection Error: {str(inner_e)}")
    except requests.exceptions.HTTPError as e:
        if response.status_code == 400:
            error_msg = response.json().get("msg", "Invalid request to NASA API")
            raise HTTPException(status_code=400, detail=error_msg)
        raise HTTPException(status_code=response.status_code, detail="NASA API Error")
    except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
