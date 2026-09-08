import {
  BarChart3,
  BriefcaseBusiness,
  Eye,
  LayoutDashboard,
  Search,
  TrendingUp,
} from "lucide-react";
import {
  AIInsightData,
  MarketIndex,
  NavItem,
  PortfolioSummary,
  StockItem,
  UserProfile,
} from "@/types/market";

export const marketData: MarketIndex[] = [
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

export const topStocks: StockItem[] = [
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

export const navItems: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Markets", icon: BarChart3 },
  { name: "Stocks", icon: TrendingUp },
  { name: "Screener", icon: Search },
  { name: "Portfolio", icon: BriefcaseBusiness },
  { name: "Watchlist", icon: Eye },
];

export const portfolioData: PortfolioSummary = {
  totalValue: "₹1,24,500",
  changeAmount: "+₹4,850",
  changePercentage: "4.05%",
  positive: true,
  totalStocks: 8,
  todayPnL: "+₹1,250",
  todayPositive: true,
};

export const aiInsightData: AIInsightData = {
  title: "AI Market Intelligence",
  subtitle: "Today's market analysis",
  content:
    "Market sentiment is currently positive. Technology and energy sectors are showing strength, while banking stocks are trading with mixed momentum.",
  buttonText: "View Full AI Analysis",
};

export const userProfile: UserProfile = {
  name: "Sarthak",
  role: "Investor",
  avatarLetter: "S",
};
