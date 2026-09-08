from app.providers.base import BaseMarketDataProvider
from app.providers.mock_provider import MockMarketDataProvider
from app.schemas.market import MarketIndex


class MarketService:
    """Service layer coordinating market data business logic using pluggable providers."""

    def __init__(self, provider: BaseMarketDataProvider | None = None) -> None:
        self.provider: BaseMarketDataProvider = provider or MockMarketDataProvider()

    def get_indices(self) -> list[MarketIndex]:
        """Fetch current major Indian market indices using the configured provider."""
        return self.provider.get_indices()


market_service = MarketService()
