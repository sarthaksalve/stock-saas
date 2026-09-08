from datetime import datetime, timedelta, timezone
from app.providers.base import BaseMarketDataProvider, StockNotFoundError
from app.schemas.market import MarketIndex, OHLCV, StockQuote


class MockMarketDataProvider(BaseMarketDataProvider):
    """Mock provider generating Indian market indices, stock quotes, and historical OHLCV data."""

    _MOCK_STOCKS: dict[str, dict] = {
        "RELIANCE": {
            "symbol": "RELIANCE",
            "name": "Reliance Industries Limited",
            "price": 2945.20,
            "change": 69.30,
            "change_percent": 2.41,
            "volume": 12450000,
        },
        "TCS": {
            "symbol": "TCS",
            "name": "Tata Consultancy Services Limited",
            "price": 4182.75,
            "change": 75.20,
            "change_percent": 1.83,
            "volume": 3820000,
        },
        "INFY": {
            "symbol": "INFY",
            "name": "Infosys Limited",
            "price": 1612.40,
            "change": -11.00,
            "change_percent": -0.68,
            "volume": 8430000,
        },
        "HDFCBANK": {
            "symbol": "HDFCBANK",
            "name": "HDFC Bank Limited",
            "price": 1745.60,
            "change": 21.00,
            "change_percent": 1.22,
            "volume": 14200000,
        },
        "ICICIBANK": {
            "symbol": "ICICIBANK",
            "name": "ICICI Bank Limited",
            "price": 1215.50,
            "change": 14.20,
            "change_percent": 1.18,
            "volume": 9850000,
        },
    }

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

    def get_stock_quote(self, symbol: str) -> StockQuote:
        """Return latest stock quote for a supported symbol."""
        sym = symbol.strip().upper()
        if sym not in self._MOCK_STOCKS:
            raise StockNotFoundError(f"Stock symbol '{symbol}' is not supported")

        data = self._MOCK_STOCKS[sym]
        now = datetime.now(timezone.utc)
        return StockQuote(
            symbol=data["symbol"],
            name=data["name"],
            price=data["price"],
            change=data["change"],
            change_percent=data["change_percent"],
            volume=data["volume"],
            timestamp=now,
        )

    def get_stock_history(
        self,
        symbol: str,
        interval: str = "1d",
        limit: int = 30,
    ) -> list[OHLCV]:
        """Return deterministic realistic historical OHLCV data for a supported symbol."""
        sym = symbol.strip().upper()
        if sym not in self._MOCK_STOCKS:
            raise StockNotFoundError(f"Stock symbol '{symbol}' is not supported")

        data = self._MOCK_STOCKS[sym]
        base_price = data["price"]
        base_volume = data["volume"]

        now = datetime.now(timezone.utc).replace(second=0, microsecond=0)
        history: list[OHLCV] = []

        for i in range(limit - 1, -1, -1):
            if interval == "1h":
                candle_time = now - timedelta(hours=i)
            elif interval == "1w":
                candle_time = now - timedelta(weeks=i)
            else:  # default daily interval
                candle_time = now - timedelta(days=i)

            # Deterministic variation algorithm using symbol ASCII and index
            seed_factor = sum(ord(c) for c in sym) + (i * 17)
            trend = ((seed_factor % 31) - 15) / 1000.0  # -1.5% to +1.5%
            day_price = round(base_price * (1.0 + trend), 2)

            open_price = round(day_price * (1.0 - 0.003 * ((i % 3) - 1)), 2)
            close_price = round(day_price * (1.0 + 0.004 * ((i % 4) - 1.5)), 2)
            high_price = round(max(open_price, close_price) * 1.008, 2)
            low_price = round(min(open_price, close_price) * 0.992, 2)
            candle_vol = int(base_volume * (0.85 + 0.05 * (i % 7)))

            history.append(
                OHLCV(
                    timestamp=candle_time,
                    open=open_price,
                    high=high_price,
                    low=low_price,
                    close=close_price,
                    volume=candle_vol,
                )
            )

        return history
