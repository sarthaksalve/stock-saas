import { TrendingDown, TrendingUp } from "lucide-react";
import { ApiMarketIndex, MarketIndex } from "@/types/market";

interface MarketCardProps {
  market: MarketIndex | ApiMarketIndex;
}

export default function MarketCard({ market }: MarketCardProps) {
  const isApiData = typeof market.value === "number";

  const displayName = market.name;
  const isPositive = isApiData
    ? (market as ApiMarketIndex).change >= 0
    : (market as MarketIndex).positive;

  const displayValue = isApiData
    ? (market as ApiMarketIndex).value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : (market as MarketIndex).value;

  const displayChange = isApiData
    ? `${isPositive ? "+" : ""}${(market as ApiMarketIndex).change_percent.toFixed(2)}%`
    : (market as MarketIndex).change;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{displayName}</p>

        {isPositive ? (
          <TrendingUp className="text-emerald-400" size={20} />
        ) : (
          <TrendingDown className="text-red-400" size={20} />
        )}
      </div>

      <h4 className="mt-4 text-2xl font-bold">{displayValue}</h4>

      <p
        className={`mt-2 text-sm ${
          isPositive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {displayChange} today
      </p>
    </div>
  );
}
