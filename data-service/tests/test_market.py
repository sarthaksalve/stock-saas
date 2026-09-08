import unittest
from app.schemas.market import MarketIndex
from app.services.market_service import market_service


class TestMarketService(unittest.TestCase):
    def test_market_service_get_indices(self):
        indices = market_service.get_indices()
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


if __name__ == "__main__":
    unittest.main()
