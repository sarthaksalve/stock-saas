import { LucideIcon } from "lucide-react";

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
