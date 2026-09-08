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
