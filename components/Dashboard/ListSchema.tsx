"use client";

import { Combine, GitPullRequestClosed } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";

// Types
type VariantType = "light" | "lime" | "purple" | "coral" | "cyan" | "indigo" | "amber" | "rose" | "emerald" | "slate";

interface DotIndicatorProps {
  filled: boolean;
  variant?: VariantType;
  index: number;
  isHovered: boolean;
}

interface MetricCardProps {
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
  title,
  current,
  max,
  unit = "",
  percentage,
  variant = "light",
  dotCount = 10,
}) => {
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Monitor your system metrics in real-time
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {metricsData.map((metric) => (
            <MetricCard
              key={metric.id}
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