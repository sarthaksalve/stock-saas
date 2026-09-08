"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ArrowUpRight, RefreshCw } from "lucide-react";
import MarketCard from "@/components/dashboard/MarketCard";
import { marketService } from "@/services/marketService";
import { ApiMarketIndex, MarketIndex } from "@/types/market";

interface MarketOverviewProps {
  initialMarkets?: (MarketIndex | ApiMarketIndex)[];
}

export default function MarketOverview({
  initialMarkets,
}: MarketOverviewProps) {
  const [markets, setMarkets] = useState<(MarketIndex | ApiMarketIndex)[] | null>(
    initialMarkets || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialMarkets);
  const [error, setError] = useState<string | null>(null);

  const fetchIndices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await marketService.getIndices();
      setMarkets(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load live market data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialMarkets) {
      fetchIndices();
    }
  }, [initialMarkets]);

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Market Overview</h3>
          <p className="text-sm text-slate-400">Major Indian market indices</p>
        </div>

        <button className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition">
          View Markets
          <ArrowUpRight size={16} />
        </button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex h-[148px] animate-pulse flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 rounded bg-slate-800" />
                <div className="h-5 w-5 rounded-full bg-slate-800" />
              </div>
              <div className="h-7 w-32 rounded bg-slate-800" />
              <div className="h-4 w-24 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-red-500/20 bg-slate-900 p-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <AlertCircle className="shrink-0 text-red-400" size={20} />
            <div>
              <p className="text-sm font-medium text-slate-200">
                Unable to load live market data
              </p>
              <p className="text-xs text-slate-400">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchIndices}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-700"
          >
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {markets?.map((market) => (
            <MarketCard key={market.name} market={market} />
          ))}
        </div>
      )}
    </div>
  );
}
