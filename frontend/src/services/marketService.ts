import { apiFetch } from "@/services/api";
import { ApiMarketIndex, MarketIndex } from "@/types/market";

export function formatMarketIndex(data: ApiMarketIndex): MarketIndex {
  const isPositive = data.change >= 0;
  const formattedValue = data.value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const sign = isPositive ? "+" : "";
  const formattedChange = `${sign}${data.change_percent.toFixed(2)}%`;

  return {
    name: data.name,
    value: formattedValue,
    change: formattedChange,
    positive: isPositive,
  };
}

export const marketService = {
  async getIndices(): Promise<ApiMarketIndex[]> {
    return apiFetch<ApiMarketIndex[]>("/api/v1/market/indices");
  },
};
