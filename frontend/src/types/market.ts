import { LucideIcon } from "lucide-react";

export interface ApiMarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  change_percent: number;
  timestamp: string;
}

export interface ApiStockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
  timestamp: string;
}

export interface ApiOHLCV {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface StockItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  positive: boolean;
}

export interface NavItem {
  name: string;
  icon: LucideIcon;
}

export interface PortfolioSummary {
  totalValue: string;
  changeAmount: string;
  changePercentage: string;
  positive: boolean;
  totalStocks: number;
  todayPnL: string;
  todayPositive: boolean;
}

export interface AIInsightData {
  title: string;
  subtitle: string;
  content: string;
  buttonText: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarLetter: string;
}
