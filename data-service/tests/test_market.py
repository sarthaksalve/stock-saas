import unittest
from datetime import datetime, timezone
from app.providers.base import BaseMarketDataProvider
from app.providers.mock_provider import MockMarketDataProvider
from app.schemas.market import MarketIndex
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


class TestMarketProviderAndService(unittest.TestCase):
    def test_mock_provider_get_indices(self):
        provider = MockMarketDataProvider()
        indices = provider.get_indices()
        self.assertEqual(len(indices), 3)

        symbols = [idx.symbol for idx in indices]
        self.assertIn("NIFTY50", symbols)
        self.assertIn("SENSEX", symbols)
        self.assertIn("BANKNIFTY", symbols)

        for idx in indices:
            self.assertIsInstance(idx, MarketIndex)
            self.assertTrue(idx.name)
            self.assertGreater(idx.value, 0)
            self.assertIsNotNone(idx.timestamp)

    def test_market_service_default_provider(self):
        indices = market_service.get_indices()
        self.assertEqual(len(indices), 3)
        self.assertIsInstance(market_service.provider, MockMarketDataProvider)

    def test_market_service_custom_provider_injection(self):
        custom_provider = CustomTestProvider()
        service = MarketService(provider=custom_provider)
        indices = service.get_indices()

        self.assertEqual(len(indices), 1)
        self.assertEqual(indices[0].name, "TEST INDEX")
        self.assertEqual(indices[0].symbol, "TEST")


if __name__ == "__main__":
    unittest.main()
