from abc import ABC, abstractmethod
from app.schemas.market import MarketIndex, OHLCV, StockQuote


class StockNotFoundError(ValueError):
    """Raised when a requested stock symbol is not found or supported."""
    pass


class BaseMarketDataProvider(ABC):
    """Abstract base class / interface for market data providers."""

    @abstractmethod
    def get_indices(self) -> list[MarketIndex]:
        """Retrieve market indices from the provider."""
        raise NotImplementedError

    @abstractmethod
    def get_stock_quote(self, symbol: str) -> StockQuote:
        """Retrieve latest stock quote for a given symbol."""
        raise NotImplementedError

    @abstractmethod
    def get_stock_history(
        self,
        symbol: str,
        interval: str = "1d",
        limit: int = 30,
    ) -> list[OHLCV]:
        """Retrieve historical OHLCV data for a given symbol."""
        raise NotImplementedError
