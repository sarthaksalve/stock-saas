import { TrendingDown, TrendingUp } from "lucide-react";
import { portfolioData as defaultPortfolioData } from "@/data/mockMarketData";
import { PortfolioSummary } from "@/types/market";

interface PortfolioCardProps {
  portfolio?: PortfolioSummary;
}

export default function PortfolioCard({
  portfolio = defaultPortfolioData,
}: PortfolioCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">Portfolio Value</p>

      <h3 className="mt-3 text-3xl font-bold">{portfolio.totalValue}</h3>

      <div
        className={`mt-4 flex items-center gap-2 ${
          portfolio.positive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {portfolio.positive ? (
          <TrendingUp size={18} />
        ) : (
          <TrendingDown size={18} />
        )}
        <span className="text-sm">
          {portfolio.changeAmount} ({portfolio.changePercentage})
        </span>
      </div>

      <div className="mt-6 border-t border-slate-800 pt-5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Total Stocks</span>
          <span>{portfolio.totalStocks}</span>
        </div>

        <div className="mt-3 flex justify-between text-sm">
          <span className="text-slate-400">Today&apos;s P&L</span>
          <span
            className={
              portfolio.todayPositive ? "text-emerald-400" : "text-red-400"
            }
          >
            {portfolio.todayPnL}
          </span>
        </div>
      </div>
    </div>
  );
}
