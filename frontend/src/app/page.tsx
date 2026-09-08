import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MarketOverview from "@/components/dashboard/MarketOverview";
import AIInsight from "@/components/dashboard/AIInsight";
import PortfolioCard from "@/components/dashboard/PortfolioCard";
import TopStocks from "@/components/dashboard/TopStocks";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="min-h-screen flex-1">
          {/* Header */}
          <Header />

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
            <MarketOverview />

            {/* Bottom Grid */}
            <div className="grid gap-6 xl:grid-cols-3">
              {/* AI Insight */}
              <AIInsight />

              {/* Portfolio */}
              <PortfolioCard />
            </div>

            {/* Top Stocks */}
            <TopStocks />
          </section>
        </div>
      </div>
    </main>
  );
}