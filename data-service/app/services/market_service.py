from datetime import datetime, timezone
from app.schemas.market import MarketIndex


class MarketService:
    """Service layer handling market data business logic and sources."""

    @staticmethod
    def get_indices() -> list[MarketIndex]:
        """Fetch current major Indian market indices data."""
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


market_service = MarketService()
