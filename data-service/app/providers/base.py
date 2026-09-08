from abc import ABC, abstractmethod
from app.schemas.market import MarketIndex


class BaseMarketDataProvider(ABC):
    """Abstract base class / interface for market data providers."""

    @abstractmethod
    def get_indices(self) -> list[MarketIndex]:
        """Retrieve market indices from the provider."""
        raise NotImplementedError
