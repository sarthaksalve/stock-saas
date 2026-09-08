"use client";

import { Settings, TrendingUp } from "lucide-react";
import { navItems as defaultNavItems } from "@/data/mockMarketData";
import { NavItem } from "@/types/market";

interface SidebarProps {
  items?: NavItem[];
  activeItem?: string;
}

export default function Sidebar({
  items = defaultNavItems,
  activeItem = "Dashboard",
}: SidebarProps) {
  return (
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
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.name === activeItem;

          return (
            <button
              key={item.name}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
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
  );
}
