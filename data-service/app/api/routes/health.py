from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Health check endpoint to verify service status."""
    return {
        "status": "healthy",
        "service": "data-service",
    }
