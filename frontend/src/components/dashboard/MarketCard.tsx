import { TrendingDown, TrendingUp } from "lucide-react";
import { MarketIndex } from "@/types/market";

interface MarketCardProps {
  market: MarketIndex;
}

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{market.name}</p>

        {market.positive ? (
          <TrendingUp className="text-emerald-400" size={20} />
        ) : (
          <TrendingDown className="text-red-400" size={20} />
        )}
      </div>

      <h4 className="mt-4 text-2xl font-bold">{market.value}</h4>

      <p
        className={`mt-2 text-sm ${
          market.positive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {market.change} today
      </p>
    </div>
  );
}
