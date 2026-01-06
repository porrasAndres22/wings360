import { useChangeOption } from "@/store";
import { Combine, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { ColorDealSchemaType as VariantType } from '@/interfaces';
import { colorDealSchema as cardVariantStyles } from '@/global'

interface MetricCardProps {
  id: string
  title: string;
  current: number | string;
  max: number | string;
  unit?: string;
  percentage: number;
  variant?: VariantType;
  dotCount?: number;
  cardNumber?: string;
  expiry?: string;
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
  cardNumber?: string;
  expiry?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  current,
  max,
  unit = "",
  percentage,
  variant = "light",
  dotCount = 10,
  cardNumber,
  expiry,
}) => {
  const { handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();

  const [animatedPercentage, setAnimatedPercentage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const filledDots = Math.round((percentage / 100) * dotCount);
  const styles = cardVariantStyles[variant] || cardVariantStyles.light;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Mask card number if provided
  const maskedCardNumber = cardNumber 
    ? `${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 8)} ${cardNumber.slice(8, 12)} ••••`
    : undefined;

  return (
    <div
      className={`${styles.card} ${styles.shadow} rounded-[28px] p-6 
        transition-all duration-500 ease-out cursor-pointer
        hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
        border border-white/40 backdrop-blur-sm
        relative overflow-hidden
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        localStorage.setItem("appSchema", id)
        handler("#36d0ca3bfe8d3596e9275c87b6ace9e67f1dd077")
      }}
    >
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon and Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${styles.iconBg} ${styles.iconColor} transition-all duration-500
                ${isHovered ? "rotate-12 scale-110" : ""}
              `}
            >
              <CreditCard className="w-5 h-5" />
            </div>
            <span
              className={`font-bold text-base ${styles.text} tracking-wide uppercase transition-all duration-300`}
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

        {/* Main Value - Large and prominent */}
        <div className="mb-4">
          <span
            className={`text-5xl font-bold tracking-tight ${styles.text}
              inline-block transition-all duration-500
              ${isHovered ? "scale-105" : ""}
            `}
          >
            ${typeof current === 'number' ? current.toLocaleString() : current}
          </span>
        </div>

        {/* Status Badge */}
        <div className="mb-5">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold 
              ${styles.percentage} transition-all duration-500
              ${isHovered ? "scale-105" : ""}
            `}
          >
            {animatedPercentage}% Active
          </span>
        </div>

        {/* Dot Progress Indicator */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: dotCount }).map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full transition-all duration-300 
                ${index < filledDots ? styles.dotsfilled : styles.dotsempty}
                ${isHovered ? "animate-bounce" : ""}
              `}
              style={{
                animationDelay: isHovered ? `${index * 50}ms` : "0ms",
                animationDuration: "0.6s",
                transform: isHovered && (index < filledDots) ? "scale(1.1)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Bottom Info - Card Number and Expiry */}
        <div className="flex items-end justify-between">
          <div>
            <div className={`text-xs ${styles.text} mb-1 opacity-60`}>
              Card Number
            </div>
            <div className={`text-sm font-medium ${styles.text}`}>
              {maskedCardNumber || `${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ••••`}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xs ${styles.text} mb-1 opacity-60`}>
              Exp
            </div>
            <div className={`text-sm font-medium ${styles.text}`}>
              {expiry || `••/••`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Metrics Data - Updated with card-like information
const metricsData: MetricData[] = [
  {
    id: "operations",
    title: "Operations",
    current: 21426,
    max: 30000,
    percentage: 85,
    variant: "light",
    cardNumber: "3253824311000000",
    expiry: "12/25",
  },
  {
    id: "data-transfer",
    title: "Data Transfer",
    current: 45200,
    max: 100000,
    unit: "GB",
    percentage: 45,
    variant: "lime",
    cardNumber: "5467123456780000",
    expiry: "08/26",
  },
  {
    id: "storage",
    title: "Storage",
    current: 25680,
    max: 51200,
    unit: "GB",
    percentage: 50,
    variant: "purple",
    cardNumber: "4532876543210000",
    expiry: "03/27",
  },
  {
    id: "active-users",
    title: "Users",
    current: 84320,
    max: 100000,
    percentage: 84,
    variant: "coral",
    cardNumber: "6011345678900000",
    expiry: "11/25",
  },
  {
    id: "cpu-usage",
    title: "CPU Usage",
    current: 67000,
    max: 100000,
    unit: "%",
    percentage: 67,
    variant: "cyan",
    cardNumber: "3782123456780000",
    expiry: "06/26",
  },
  {
    id: "memory",
    title: "Memory",
    current: 12400,
    max: 16000,
    unit: "GB",
    percentage: 78,
    variant: "indigo",
    cardNumber: "5234567890120000",
    expiry: "09/27",
  },
  {
    id: "network",
    title: "Network",
    current: 23400,
    max: 100000,
    unit: "Mbps",
    percentage: 23,
    variant: "amber",
    cardNumber: "4916123456780000",
    expiry: "04/26",
  },
  {
    id: "requests",
    title: "Requests",
    current: 156700,
    max: 200000,
    percentage: 78,
    variant: "rose",
    cardNumber: "6759012345670000",
    expiry: "07/25",
  },
  {
    id: "error-rate",
    title: "Error Rate",
    current: 2300,
    max: 100000,
    unit: "%",
    percentage: 2,
    variant: "emerald",
    cardNumber: "5412345678900000",
    expiry: "10/26",
  },
  {
    id: "uptime",
    title: "Uptime",
    current: 99900,
    max: 100000,
    unit: "%",
    percentage: 99,
    variant: "slate",
    cardNumber: "4024007102340000",
    expiry: "01/28",
  },
];

// Main Component
export default ({ permission }: {
  permission: {
    superAdmin: boolean
    admin: boolean
  }
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(metricsData.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMetrics = metricsData.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-slate-500 text-sm sm:text-base mb-2 font-medium">
            Manage and track your projects
          </p>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Project Dashboard
            </h1>

            <span className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-slate-700 to-slate-900 rounded-full shadow-lg">
              {
                permission.superAdmin ?
                  <>SuperAdmin</>
                  : permission.admin ?
                    <>Admin</>
                    : <></>
              }
            </span>
          </div>
        </div>

        {/* Navigation Controls */}
        {metricsData.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm text-slate-600 font-medium">
              Showing {startIndex + 1}-{Math.min(endIndex, metricsData.length)} of {metricsData.length} items
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${currentPage === 0
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${currentPage === totalPages - 1
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {currentMetrics.map((metric, index) => (
            <div
              key={metric.id}
              className="transform transition-all duration-500"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${index * 100}ms forwards`,
              }}
            >
              <MetricCard
                id={metric.id}
                title={metric.title}
                current={metric.current}
                max={metric.max}
                unit={metric.unit}
                percentage={metric.percentage}
                variant={metric.variant}
                dotCount={metric.dotCount}
                cardNumber={metric.cardNumber}
                expiry={metric.expiry}
              />
            </div>
          ))}
        </div>

        {/* Page Indicators */}
        {metricsData.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentPage
                    ? 'bg-slate-700 w-10'
                    : 'bg-slate-300 hover:bg-slate-400 w-2.5'
                  }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};