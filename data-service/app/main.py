from fastapi import FastAPI

app = FastAPI(
    title="Stock SaaS Data Service",
    version="0.1.0",
)


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "data-service",
    }
