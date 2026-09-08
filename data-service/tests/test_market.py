import asyncio
import unittest
from datetime import datetime, timezone
from fastapi import HTTPException
from app.api.routes.market import get_stock_history, get_stock_quote
from app.providers.base import BaseMarketDataProvider, StockNotFoundError
from app.providers.mock_provider import MockMarketDataProvider
from app.schemas.market import MarketIndex, OHLCV, StockQuote
from app.services.market_service import MarketService, market_service


class CustomTestProvider(BaseMarketDataProvider):
    """Custom provider for testing provider injection in MarketService."""

    def get_indices(self) -> list[MarketIndex]:
        return [
            MarketIndex(
                name="TEST INDEX",
                symbol="TEST",
                value=1000.0,
                change=10.0,
                change_percent=1.0,
                timestamp=datetime.now(timezone.utc),
            )
        ]

    def get_stock_quote(self, symbol: str) -> StockQuote:
        if symbol.upper() == "CUSTOM":
            return StockQuote(
                symbol="CUSTOM",
                name="Custom Stock",
                price=500.0,
                change=5.0,
                change_percent=1.0,
                volume=100000,
                timestamp=datetime.now(timezone.utc),
            )
        raise StockNotFoundError(f"Stock {symbol} not found")

    def get_stock_history(
        self,
        symbol: str,
        interval: str = "1d",
        limit: int = 30,
    ) -> list[OHLCV]:
        if symbol.upper() == "CUSTOM":
            return [
                OHLCV(
                    timestamp=datetime.now(timezone.utc),
                    open=490.0,
                    high=510.0,
                    low=485.0,
                    close=500.0,
                    volume=100000,
                )
                for _ in range(limit)
            ]
        raise StockNotFoundError(f"Stock {symbol} not found")


class TestMarketProviderAndService(unittest.TestCase):
    def test_mock_provider_get_indices(self):
        provider = MockMarketDataProvider()
        indices = provider.get_indices()
        self.assertEqual(len(indices), 3)

        symbols = [idx.symbol for idx in indices]
        self.assertIn("NIFTY50", symbols)
        self.assertIn("SENSEX", symbols)
        self.assertIn("BANKNIFTY", symbols)

    def test_get_reliance_stock_quote(self):
        quote = market_service.get_stock_quote("RELIANCE")
        self.assertIsInstance(quote, StockQuote)
        self.assertEqual(quote.symbol, "RELIANCE")
        self.assertEqual(quote.name, "Reliance Industries Limited")
        self.assertGreater(quote.price, 0)
        self.assertGreater(quote.volume, 0)
        self.assertIsNotNone(quote.timestamp)

    def test_get_stock_quote_case_insensitive(self):
        quote = market_service.get_stock_quote("tcs")
        self.assertEqual(quote.symbol, "TCS")
        self.assertEqual(quote.name, "Tata Consultancy Services Limited")

    def test_get_stock_history_ohlcv(self):
        history = market_service.get_stock_history("RELIANCE", limit=10)
        self.assertEqual(len(history), 10)

        for candle in history:
            self.assertIsInstance(candle, OHLCV)
            self.assertGreaterEqual(candle.high, candle.open)
            self.assertGreaterEqual(candle.high, candle.close)
            self.assertLessEqual(candle.low, candle.open)
            self.assertLessEqual(candle.low, candle.close)
            self.assertGreater(candle.volume, 0)

    def test_history_limit_parameter_behavior(self):
        history_5 = market_service.get_stock_history("INFY", limit=5)
        self.assertEqual(len(history_5), 5)

        history_30 = market_service.get_stock_history("INFY", limit=30)
        self.assertEqual(len(history_30), 30)

    def test_unsupported_stock_symbol_handling(self):
        with self.assertRaises(StockNotFoundError):
            market_service.get_stock_quote("INVALID_XYZ")

        with self.assertRaises(StockNotFoundError):
            market_service.get_stock_history("INVALID_XYZ")

    def test_market_service_custom_provider_injection(self):
        custom_provider = CustomTestProvider()
        service = MarketService(provider=custom_provider)

        indices = service.get_indices()
        self.assertEqual(len(indices), 1)

        quote = service.get_stock_quote("CUSTOM")
        self.assertEqual(quote.symbol, "CUSTOM")

        history = service.get_stock_history("CUSTOM", limit=7)
        self.assertEqual(len(history), 7)

    def test_route_unsupported_symbol_404(self):
        with self.assertRaises(HTTPException) as ctx:
            asyncio.run(get_stock_quote("UNKNOWN_STOCK"))
        self.assertEqual(ctx.exception.status_code, 404)

        with self.assertRaises(HTTPException) as ctx_hist:
            asyncio.run(get_stock_history("UNKNOWN_STOCK"))
        self.assertEqual(ctx_hist.exception.status_code, 404)


if __name__ == "__main__":
    unittest.main()
