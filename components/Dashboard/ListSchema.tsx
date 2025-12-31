"use client";

import { useChangeOption } from "@/store";
import { useAuth } from "@clerk/nextjs";
import { Combine } from "lucide-react";
import { useState, useEffect } from "react";

// Types
type VariantType = "light" | "lime" | "purple" | "coral" | "cyan" | "indigo" | "amber" | "rose" | "emerald" | "slate";

interface MetricCardProps {
  id: string
  title: string;
  current: number | string;
  max: number | string;
  unit?: string;
  percentage: number;
  variant?: VariantType;
  dotCount?: number;
}

interface VariantStyle {
  card: string;
  text: string;
  subtext: string;
  percentage: string;
  iconBg: string;
  iconColor: string;
  dotsfilled: string
  dotsempty: string
}

// Metric Data
interface MetricData {
  id: string;
  title: string;
  current: number | string;
  max: number | string;
  unit?: string;
  percentage: number;
  variant: VariantType;
  dotCount?: number;
}

// Variant Styles
const variantStyles: Record<VariantType, VariantStyle> = {
  light: {
    card: "bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200/50",
    text: "text-slate-700",
    subtext: "text-slate-500",
    percentage: "text-emerald-600 bg-emerald-50 border border-emerald-100",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    dotsfilled: "bg-slate-800",
    dotsempty: "bg-slate-300/60",
  },
  lime: {
    card: "bg-gradient-to-br from-lime-300 via-lime-400 to-yellow-300",
    text: "text-slate-800",
    subtext: "text-slate-700",
    percentage: "text-emerald-800 bg-emerald-400/30 border border-emerald-500/30",
    iconBg: "bg-white/30",
    iconColor: "text-slate-700",
    dotsfilled: "bg-slate-800",
    dotsempty: "bg-lime-300/50",
  },
  purple: {
    card: "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500",
    text: "text-white",
    subtext: "text-purple-100",
    percentage: "text-white bg-white/20 border border-white/30",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    dotsfilled: "bg-white",
    dotsempty: "bg-purple-400/40",
  },
  coral: {
    card: "bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500",
    text: "text-white",
    subtext: "text-orange-100",
    percentage: "text-white bg-white/20 border border-white/30",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    dotsfilled: "bg-white",
    dotsempty: "bg-orange-300/40",
  },
  cyan: {
    card: "bg-gradient-to-br from-cyan-300 via-teal-400 to-emerald-400",
    text: "text-slate-800",
    subtext: "text-slate-700",
    percentage: "text-teal-800 bg-teal-600/20 border border-teal-600/30",
    iconBg: "bg-white/30",
    iconColor: "text-slate-700",
    dotsfilled: "bg-slate-800",
    dotsempty: "bg-cyan-300/50",
  },
  indigo: {
    card: "bg-gradient-to-br from-indigo-500 via-blue-600 to-sky-500",
    text: "text-white",
    subtext: "text-blue-100",
    percentage: "text-white bg-white/20 border border-white/30",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    dotsfilled: "bg-white",
    dotsempty: "bg-blue-400/40",
  },
  amber: {
    card: "bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400",
    text: "text-slate-800",
    subtext: "text-amber-800",
    percentage: "text-amber-900 bg-amber-600/20 border border-amber-600/30",
    iconBg: "bg-white/30",
    iconColor: "text-slate-700",
    dotsfilled: "bg-slate-800",
    dotsempty: "bg-amber-300/50",
  },
  rose: {
    card: "bg-gradient-to-br from-rose-400 via-pink-500 to-red-500",
    text: "text-white",
    subtext: "text-rose-100",
    percentage: "text-white bg-white/20 border border-white/30",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    dotsfilled: "bg-white",
    dotsempty: "bg-rose-300/40",
  },
  emerald: {
    card: "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500",
    text: "text-white",
    subtext: "text-emerald-100",
    percentage: "text-white bg-white/20 border border-white/30",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    dotsfilled: "bg-white",
    dotsempty: "bg-emerald-300/40",
  },
  slate: {
    card: "bg-gradient-to-br from-slate-600 via-slate-700 to-zinc-800",
    text: "text-white",
    subtext: "text-slate-300",
    percentage: "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30",
    iconBg: "bg-white/10",
    iconColor: "text-white",
    dotsfilled: "bg-emerald-400",
    dotsempty: "bg-slate-600/60",
  },
};

const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  current,
  max,
  unit = "",
  percentage,
  variant = "light",
  dotCount = 10,
}) => {
  const { handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();

  const [animatedPercentage, setAnimatedPercentage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const filledDots = Math.round((percentage / 100) * dotCount);
  const styles = variantStyles[variant];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div
      className={`${styles.card} rounded-3xl p-5 sm:p-6 md:p-5 lg:p-4 shadow-lg 
        transition-all duration-500 ease-out cursor-pointer
        hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
        ${isHovered ? "ring-2 ring-white/30 ring-offset-2 ring-offset-transparent" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        localStorage.setItem("appSchema", id)
        handler("#36d0ca3bfe8d3596e9275c87b6ace9e67f1dd077")
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`p-2 sm:p-2.5 rounded-xl ${styles.iconBg} transition-all duration-500
              ${isHovered ? "rotate-12 scale-110" : ""}
            `}
          >
            <span className={`${styles.iconColor} transition-all duration-300`}>
              <Combine />
            </span>
          </div>
          <span
            className={`font-semibold text-sm sm:text-base ${styles.text} transition-all duration-300
              ${isHovered ? "tracking-wide" : ""}
            `}
          >
            {title}
          </span>
        </div>
        <button
          className={`p-1.5 rounded-lg hover:bg-black/5 transition-all duration-300 ${styles.text}
            ${isHovered ? "rotate-90" : ""}
          `}
          aria-label="More options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Main Value */}
      <div className="mb-2 md:mb-1 overflow-hidden">
        <span
          className={`text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold tracking-tight ${styles.text}
            inline-block transition-all duration-500
            ${isHovered ? "scale-105 translate-x-1" : ""}
          `}
        >
          {current}
        </span>
        <span
          className={`text-base sm:text-lg md:text-xl ml-1 ${styles.subtext} opacity-70 
            inline-block transition-all duration-500
            ${isHovered ? "opacity-100 translate-x-1" : ""}
          `}
        >
          /{max}{unit && ` ${unit}`}
        </span>
      </div>

      {/* Percentage Badge */}
      <div className="mb-4 md:mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs sm:text-sm font-semibold 
            ${styles.percentage} transition-all duration-500
            ${isHovered ? "scale-110 shadow-lg" : ""}
          `}
        >
          {animatedPercentage}%
        </span>
      </div>

      {/* Dot Progress Indicator */}
      <div className="flex gap-1.5 sm:gap-2 flex-wrap">
        {Array.from({ length: dotCount }).map((_, index) => (
          <div
            key={index}
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full transition-all duration-300 ${index < filledDots ? styles.dotsfilled : styles.dotsempty} ${isHovered ? "animate-bounce" : ""
              }`}
            style={{
              animationDelay: isHovered ? `${index * 50}ms` : "0ms",
              animationDuration: "0.6s",
              transform: isHovered && (index < filledDots) ? "scale(1.1)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const metricsData: MetricData[] = [
  {
    id: "operations",
    title: "Operations",
    current: 780,
    max: 1000,
    percentage: 82,
    variant: "light",
    dotCount: 10,
  },
  {
    id: "data-transfer",
    title: "Data Transfer",
    current: 163,
    max: "512.0",
    unit: "MB",
    percentage: 68,
    variant: "lime",
    dotCount: 10,
  },
  {
    id: "storage",
    title: "Storage",
    current: 45,
    max: 100,
    unit: "GB",
    percentage: 45,
    variant: "purple",
    dotCount: 10,
  },
  {
    id: "active-users",
    title: "Active Users",
    current: "1.2K",
    max: "2K",
    percentage: 60,
    variant: "coral",
    dotCount: 10,
  },
  {
    id: "cpu-usage",
    title: "CPU Usage",
    current: 73,
    max: 100,
    unit: "%",
    percentage: 73,
    variant: "cyan",
    dotCount: 10,
  },
  {
    id: "memory",
    title: "Memory",
    current: 12.4,
    max: 16,
    unit: "GB",
    percentage: 78,
    variant: "indigo",
    dotCount: 10,
  },
  {
    id: "bandwidth",
    title: "Bandwidth",
    current: 850,
    max: 1000,
    unit: "Mbps",
    percentage: 85,
    variant: "amber",
    dotCount: 10,
  },
  {
    id: "api-requests",
    title: "API Requests",
    current: "8.5K",
    max: "10K",
    percentage: 85,
    variant: "rose",
    dotCount: 10,
  },
  {
    id: "error-rate",
    title: "Error Rate",
    current: 2.3,
    max: 100,
    unit: "%",
    percentage: 2,
    variant: "emerald",
    dotCount: 10,
  },
  {
    id: "uptime",
    title: "Uptime",
    current: 99.9,
    max: 100,
    unit: "%",
    percentage: 99,
    variant: "slate",
    dotCount: 10,
  },
];

// Main Component
export default () => {

  const { has }: { has: any } = useAuth()

  return (
    <div className="min-h-screen from-slate-100 via-gray-50 to-slate-200 p-4 sm:p-6 md:p-8 lg:p-12 animate__animated animate__fadeIn">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-slate-500 text-sm sm:text-base mb-1">
            Manage and track your projects
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Project Dashboard
            </h1>

            <span className="px-4 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-full">
              {
                has({ permission: 'org:testpermission:soysuperadmin' }) && has({ permission: 'org:testpermission:soyadmin' }) ?
                  <>SuperAdmin</>
                  : has({ permission: 'org:testpermission:soysuperadmin' }) && has({ permission: 'org:testpermission:soyadmin' }) ?
                    <>Admin</>
                    : <></>
              }
            </span>


          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {metricsData.map((metric) => (
            <MetricCard
              key={metric.id}
              id={metric.id}
              title={metric.title}
              current={metric.current}
              max={metric.max}
              unit={metric.unit}
              percentage={metric.percentage}
              variant={metric.variant}
              dotCount={metric.dotCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


// Icons
const OperationsIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const DataTransferIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const StorageIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const UsersIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CpuIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const MemoryIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" />
    <path d="M6 2v4M10 2v4M14 2v4M18 2v4M6 18v4M10 18v4M14 18v4M18 18v4" />
  </svg>
);

const NetworkIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const RequestsIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const ErrorsIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const UptimeIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);