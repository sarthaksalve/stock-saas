from fastapi import APIRouter, HTTPException, Query, status
from app.providers.base import StockNotFoundError
from app.schemas.market import MarketIndex, OHLCV, StockQuote
from app.services.market_service import market_service

router = APIRouter(prefix="/api/v1/market", tags=["Market"])


@router.get("/indices", response_model=list[MarketIndex])
async def get_market_indices() -> list[MarketIndex]:
    """Retrieve current indices data for major Indian markets."""
    return market_service.get_indices()


@router.get("/stocks/{symbol}", response_model=StockQuote)
async def get_stock_quote(symbol: str) -> StockQuote:
    """Retrieve real-time/latest quote for an individual stock symbol."""
    try:
        return market_service.get_stock_quote(symbol)
    except StockNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.get("/stocks/{symbol}/history", response_model=list[OHLCV])
async def get_stock_history(
    symbol: str,
    interval: str = Query(
        default="1d",
        description="Time interval for candles (e.g., 1d, 1h, 1w)",
    ),
    limit: int = Query(
        default=30,
        ge=1,
        le=500,
        description="Number of historical candles to return (1 to 500)",
    ),
) -> list[OHLCV]:
    """Retrieve historical OHLCV candlestick data for an individual stock symbol."""
    try:
        return market_service.get_stock_history(
            symbol=symbol,
            interval=interval,
            limit=limit,
        )
    except StockNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
