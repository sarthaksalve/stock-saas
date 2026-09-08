from datetime import datetime
from pydantic import BaseModel, Field


class MarketIndex(BaseModel):
    name: str = Field(..., description="Name of the market index")
    symbol: str = Field(..., description="Ticker/Symbol identifier of the index")
    value: float = Field(..., description="Current index value")
    change: float = Field(..., description="Absolute point change")
    change_percent: float = Field(..., description="Percentage change")
    timestamp: datetime = Field(..., description="Timestamp of the market data")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "NIFTY 50",
                "symbol": "NIFTY50",
                "value": 24685.40,
                "change": 201.10,
                "change_percent": 0.82,
                "timestamp": "2026-09-08T14:20:00Z",
            }
        }
    }


class StockQuote(BaseModel):
    symbol: str = Field(..., description="Stock ticker symbol")
    name: str = Field(..., description="Company name")
    price: float = Field(..., description="Current trading price")
    change: float = Field(..., description="Price change amount")
    change_percent: float = Field(..., description="Price change percentage")
    volume: int = Field(..., description="Trading volume")
    timestamp: datetime = Field(..., description="Quote timestamp")

    model_config = {
        "json_schema_extra": {
            "example": {
                "symbol": "RELIANCE",
                "name": "Reliance Industries Limited",
                "price": 2945.20,
                "change": 69.30,
                "change_percent": 2.41,
                "volume": 12450000,
                "timestamp": "2026-09-08T14:20:00Z",
            }
        }
    }


class OHLCV(BaseModel):
    timestamp: datetime = Field(..., description="Candle start timestamp")
    open: float = Field(..., description="Opening price")
    high: float = Field(..., description="Highest price during period")
    low: float = Field(..., description="Lowest price during period")
    close: float = Field(..., description="Closing price")
    volume: int = Field(..., description="Trading volume during period")

    model_config = {
        "json_schema_extra": {
            "example": {
                "timestamp": "2026-09-08T00:00:00Z",
                "open": 2920.00,
                "high": 2960.50,
                "low": 2910.00,
                "close": 2945.20,
                "volume": 12450000,
            }
        }
    }
