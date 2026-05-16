"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CircleHelp,
  Database,
  FileText,
  FlaskConical,
  Home,
  Microscope,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Patient View", href: "/report", icon: User },
  { label: "Doctor Workspace", href: "/report", icon: Stethoscope },
  { label: "Research Lab", href: "/docking", icon: FlaskConical },
  { label: "Docking Experiments", href: "/docking", icon: Microscope },
  { label: "Reports", href: "/report", icon: FileText },
  { label: "Data Hub", href: "/dashboard", icon: Database },
  { label: "Settings", href: "/dashboard", icon: Settings },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed left-0 top-0 z-20 h-screen w-64 border-r border-slate-200 bg-white">
        <div className="flex h-20 items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-400 text-xl font-black text-white">
            β
          </div>
          <div className="text-2xl font-black tracking-tight">
            <span className="text-blue-700">BioDock</span>
            <span className="text-teal-500">Lab</span>
          </div>
        </div>

        <nav className="mt-4 space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (pathname === "/dashboard" && item.label === "Dashboard") ||
              (pathname === "/docking" && item.label === "Research Lab") ||
              (pathname === "/report" && item.label === "Patient View");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-4 right-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-teal-500" />
            <div>
              <div className="text-xs font-bold text-slate-500">시스템 상태</div>
              <div className="text-sm font-black text-teal-600">모든 시스템 정상</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">마지막 업데이트: 2025-05-20 09:30</p>
          <p className="mt-4 text-xs font-bold text-blue-600">상세 보기 〉</p>
        </div>
      </aside>

      <header className="fixed left-64 right-0 top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur">
        <div className="flex h-12 w-[520px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="검색 (환자, 화합물, 실험, 보고서 등)"
          />
          <span className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-400">⌘ K</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <Bell className="h-6 w-6 text-slate-600" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
              3
            </span>
          </div>
          <CircleHelp className="h-6 w-6 text-slate-600" />
          <div className="h-10 w-px bg-slate-200" />
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-slate-800 to-slate-500" />
            <div>
              <div className="text-sm font-black">김서연 박사</div>
              <div className="text-xs font-bold text-blue-600">Researcher</div>
            </div>
          </div>
        </div>
      </header>

      <main className="ml-64 pt-20">{children}</main>
    </div>
  );
}
