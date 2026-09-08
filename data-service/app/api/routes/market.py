from fastapi import APIRouter
from app.schemas.market import MarketIndex
from app.services.market_service import market_service

router = APIRouter(prefix="/api/v1/market", tags=["Market"])


@router.get("/indices", response_model=list[MarketIndex])
async def get_market_indices() -> list[MarketIndex]:
    """Retrieve current indices data for major Indian markets."""
    return market_service.get_indices()
