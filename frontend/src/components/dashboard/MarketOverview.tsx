import { ArrowUpRight } from "lucide-react";
import MarketCard from "@/components/dashboard/MarketCard";
import { marketData as defaultMarketData } from "@/data/mockMarketData";
import { MarketIndex } from "@/types/market";

interface MarketOverviewProps {
  markets?: MarketIndex[];
}

export default function MarketOverview({
  markets = defaultMarketData,
}: MarketOverviewProps) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Market Overview</h3>
          <p className="text-sm text-slate-400">
            Major Indian market indices
          </p>
        </div>

        <button className="flex items-center gap-2 text-sm text-emerald-400">
          View Markets
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {markets.map((market) => (
          <MarketCard key={market.name} market={market} />
        ))}
      </div>
    </div>
  );
}
