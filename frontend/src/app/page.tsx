"use client";

import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Search,
  TrendingUp,
  TrendingDown,
  BarChart3,
  BriefcaseBusiness,
  Eye,
  Settings,
  Sparkles,
  ArrowUpRight,
  Menu,
} from "lucide-react";

const marketData = [
  {
    name: "NIFTY 50",
    value: "24,685.40",
    change: "+0.82%",
    positive: true,
  },
  {
    name: "SENSEX",
    value: "80,312.65",
    change: "+0.71%",
    positive: true,
  },
  {
    name: "BANK NIFTY",
    value: "52,145.30",
    change: "-0.24%",
    positive: false,
  },
];

const topStocks = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: "₹2,945.20",
    change: "+2.41%",
    positive: true,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: "₹4,182.75",
    change: "+1.83%",
    positive: true,
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    price: "₹1,745.60",
    change: "+1.22%",
    positive: true,
  },
  {
    symbol: "INFY",
    name: "Infosys",
    price: "₹1,612.40",
    change: "-0.68%",
    positive: false,
  },
];

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Markets", icon: BarChart3 },
  { name: "Stocks", icon: TrendingUp },
  { name: "Screener", icon: Search },
  { name: "Portfolio", icon: BriefcaseBusiness },
  { name: "Watchlist", icon: Eye },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden min-h-screen w-64 border-r border-slate-800 bg-slate-900 lg:block">
          <div className="flex h-20 items-center gap-3 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
              <TrendingUp size={24} />
            </div>

            <div>
              <h1 className="text-lg font-bold">StockAI</h1>
              <p className="text-xs text-slate-400">Market Intelligence</p>
            </div>
          </div>

          <nav className="space-y-2 px-4 py-6">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${index === 0
                      ? "bg-emerald-500 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-8 w-64 px-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
              <Settings size={19} />
              Settings
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-h-screen flex-1">
          {/* Header */}
          <header className="flex h-20 items-center justify-between border-b border-slate-800 px-6 lg:px-10">
            <div className="flex items-center gap-4">
              <button className="lg:hidden">
                <Menu />
              </button>

              <div className="hidden items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 md:flex">
                <Search size={18} className="text-slate-400" />

                <input
                  placeholder="Search stocks..."
                  className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button className="relative text-slate-400 hover:text-white">
                <Bell size={21} />

                <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-emerald-500" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-semibold">
                  S
                </div>

                <div className="hidden md:block">
                  <p className="text-sm font-medium">Sarthak</p>
                  <p className="text-xs text-slate-400">Investor</p>
                </div>

                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>
          </header>

          {/* Dashboard */}
          <section className="p-6 lg:p-10">
            <div className="mb-8">
              <p className="text-sm text-slate-400">Monday, September 8</p>

              <h2 className="mt-2 text-3xl font-bold">
                Good afternoon, Sarthak 👋
              </h2>

              <p className="mt-2 text-slate-400">
                Here&apos;s what&apos;s happening in the Indian stock market.
              </p>
            </div>

            {/* Market Overview */}
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
                {marketData.map((market) => (
                  <div
                    key={market.name}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">{market.name}</p>

                      {market.positive ? (
                        <TrendingUp className="text-emerald-400" size={20} />
                      ) : (
                        <TrendingDown className="text-red-400" size={20} />
                      )}
                    </div>

                    <h4 className="mt-4 text-2xl font-bold">
                      {market.value}
                    </h4>

                    <p
                      className={`mt-2 text-sm ${market.positive
                          ? "text-emerald-400"
                          : "text-red-400"
                        }`}
                    >
                      {market.change} today
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid gap-6 xl:grid-cols-3">
              {/* AI Insight */}
              <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6 xl:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
                    <Sparkles size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold">AI Market Intelligence</h3>
                    <p className="text-sm text-slate-400">
                      Today&apos;s market analysis
                    </p>
                  </div>
                </div>

                <p className="mt-6 leading-7 text-slate-300">
                  Market sentiment is currently positive. Technology and energy
                  sectors are showing strength, while banking stocks are trading
                  with mixed momentum.
                </p>

                <button className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium transition hover:bg-emerald-400">
                  View Full AI Analysis
                </button>
              </div>

              {/* Portfolio */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Portfolio Value</p>

                <h3 className="mt-3 text-3xl font-bold">₹1,24,500</h3>

                <div className="mt-4 flex items-center gap-2 text-emerald-400">
                  <TrendingUp size={18} />
                  <span className="text-sm">+₹4,850 (4.05%)</span>
                </div>

                <div className="mt-6 border-t border-slate-800 pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Total Stocks</span>
                    <span>8</span>
                  </div>

                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-slate-400">Today's P&L</span>
                    <span className="text-emerald-400">+₹1,250</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Stocks */}
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-800 p-6">
                <div>
                  <h3 className="text-xl font-semibold">Top Stocks</h3>
                  <p className="text-sm text-slate-400">
                    Stocks with strong market activity
                  </p>
                </div>

                <button className="text-sm text-emerald-400">
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-800">
                {topStocks.map((stock) => (
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
                        className={`mt-1 text-sm ${stock.positive
                            ? "text-emerald-400"
                            : "text-red-400"
                          }`}
                      >
                        {stock.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}