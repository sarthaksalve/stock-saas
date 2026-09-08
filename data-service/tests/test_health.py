import asyncio
import unittest
from app.api.routes.health import health_check


class TestHealthRoute(unittest.TestCase):
    def test_health_check(self):
        res = asyncio.run(health_check())
        self.assertEqual(res, {"status": "healthy", "service": "data-service"})


if __name__ == "__main__":
    unittest.main()
