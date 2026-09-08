import { topStocks as defaultTopStocks } from "@/data/mockMarketData";
import { StockItem } from "@/types/market";

interface TopStocksProps {
  stocks?: StockItem[];
}

export default function TopStocks({
  stocks = defaultTopStocks,
}: TopStocksProps) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 p-6">
        <div>
          <h3 className="text-xl font-semibold">Top Stocks</h3>
          <p className="text-sm text-slate-400">
            Stocks with strong market activity
          </p>
        </div>

        <button className="text-sm text-emerald-400 hover:text-emerald-300 transition">
          View All
        </button>
      </div>

      <div className="divide-y divide-slate-800">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-5 transition hover:bg-slate-800/50"
          >
            <div>
              <h4 className="font-semibold">{stock.symbol}</h4>
              <p className="text-sm text-slate-400">{stock.name}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">{stock.price}</p>

              <p
                className={`mt-1 text-sm ${
                  stock.positive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stock.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
