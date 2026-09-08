import { Sparkles } from "lucide-react";
import { aiInsightData as defaultInsightData } from "@/data/mockMarketData";
import { AIInsightData } from "@/types/market";

interface AIInsightProps {
  insight?: AIInsightData;
}

export default function AIInsight({
  insight = defaultInsightData,
}: AIInsightProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6 xl:col-span-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
          <Sparkles size={20} />
        </div>

        <div>
          <h3 className="font-semibold">{insight.title}</h3>
          <p className="text-sm text-slate-400">{insight.subtitle}</p>
        </div>
      </div>

      <p className="mt-6 leading-7 text-slate-300">{insight.content}</p>

      <button className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium transition hover:bg-emerald-400">
        {insight.buttonText}
      </button>
    </div>
  );
}
