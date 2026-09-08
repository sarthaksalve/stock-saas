from datetime import datetime, timezone
from app.providers.base import BaseMarketDataProvider
from app.schemas.market import MarketIndex


class MockMarketDataProvider(BaseMarketDataProvider):
    """Mock provider generating Indian market indices for testing and development."""

    def get_indices(self) -> list[MarketIndex]:
        """Return structured mock market indices data for NIFTY 50, SENSEX, and BANK NIFTY."""
        now = datetime.now(timezone.utc)
        return [
            MarketIndex(
                name="NIFTY 50",
                symbol="NIFTY50",
                value=24685.40,
                change=201.10,
                change_percent=0.82,
                timestamp=now,
            ),
            MarketIndex(
                name="SENSEX",
                symbol="SENSEX",
                value=80312.65,
                change=566.20,
                change_percent=0.71,
                timestamp=now,
            ),
            MarketIndex(
                name="BANK NIFTY",
                symbol="BANKNIFTY",
                value=52145.30,
                change=-125.60,
                change_percent=-0.24,
                timestamp=now,
            ),
        ]
