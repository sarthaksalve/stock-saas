"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { userProfile as defaultUserProfile } from "@/data/mockMarketData";
import { UserProfile } from "@/types/market";

interface HeaderProps {
  user?: UserProfile;
}

export default function Header({ user = defaultUserProfile }: HeaderProps) {
  return (
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
            {user.avatarLetter}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-slate-400">{user.role}</p>
          </div>

          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
