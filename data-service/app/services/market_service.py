from app.providers.base import BaseMarketDataProvider
from app.providers.mock_provider import MockMarketDataProvider
from app.schemas.market import MarketIndex, OHLCV, StockQuote


class MarketService:
    """Service layer coordinating market data business logic using pluggable providers."""

    def __init__(self, provider: BaseMarketDataProvider | None = None) -> None:
        self.provider: BaseMarketDataProvider = provider or MockMarketDataProvider()

    def get_indices(self) -> list[MarketIndex]:
        """Fetch current major Indian market indices using the configured provider."""
        return self.provider.get_indices()

    def get_stock_quote(self, symbol: str) -> StockQuote:
        """Fetch latest quote for a given stock symbol."""
        return self.provider.get_stock_quote(symbol)

    def get_stock_history(
        self,
        symbol: str,
        interval: str = "1d",
        limit: int = 30,
    ) -> list[OHLCV]:
        """Fetch historical OHLCV data for a given stock symbol."""
        return self.provider.get_stock_history(
            symbol=symbol,
            interval=interval,
            limit=limit,
        )


market_service = MarketService()
