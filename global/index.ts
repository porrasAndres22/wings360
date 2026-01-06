import { ColorDealSchemaType, ColorDealSchema  } from '@/interfaces';


export const colorDealSchema: Record<ColorDealSchemaType, ColorDealSchema> = {
    light: {
        name: "light",
        card: "bg-gradient-to-br from-slate-50 via-white to-slate-100",
        text: "text-black",
        subtext: "text-slate-700",
        percentage: "text-emerald-600 bg-emerald-50 border border-emerald-100",
        iconBg: "bg-black",
        iconColor: "text-white",
        dotsfilled: "bg-black",
        dotsempty: "bg-slate-300/60",
        shadow: "shadow-xl shadow-blak-200/50"
    },
    lime: {
        name: "lime",
        card: "bg-gradient-to-br from-white via-white to-[#DEF1FB]",
        text: "text-sky-800",
        subtext: "text-slate-700",
        percentage: "text-sky-800 bg-[#9DD5F5]/50 border border-sky-500/30",
        iconBg: "bg-gradient-to-br from-[#005091] via-[#005091] to-[#005091]",
        iconColor: "text-[#DEF1FB]",
        dotsfilled: "bg-[#005091]",
        dotsempty: "bg-sky-[#DEF1FB]",
        shadow: "shadow-xl shadow-[#DEF1FB]"
    },
    purple: {
        name: "purple",
        card: "bg-gradient-to-br from-white via-white to-[#DFE5F9]",
        text: "text-[#001769]",
        subtext: "text-slate-700",
        percentage: "text-[#001769] bg-[#9FB3ED]/50 border border-white/30",
        iconBg: "bg-gradient-to-br from-[#001769] via-[#001769] to-[#001769]",
        iconColor: "text-[#DFE5F9]",
        dotsfilled: "bg-[#001769]",
        dotsempty: "bg-[#DFE5F9]",
        shadow: "shadow-xl shadow-[#DFE5F9]/50"
    },
    coral: {
        name: "coral",
        card: "bg-gradient-to-br from-white via-white to-[#D6EDF1]",
        text: "text-[#004A4D]",
        subtext: "text-slate-700",
        percentage: "text-[#004A4D] bg-[#85CAD6]/50 border border-white/30",
        iconBg: "bg-gradient-to-br from-[#004A4D] via-[#004A4D] to-[#004A4D]",
        iconColor: "text-[#D6EDF1]",
        dotsfilled: "bg-[#004A4D]",
        dotsempty: "bg-[#004A4D]/40",
        shadow: "shadow-xl shadow-[#D6EDF1]/50"
    },
    cyan: {
        name: "cyan",
        card: "bg-gradient-to-br from-white-50 via-white to-[#D0CBFF]",
        text: "text-[#0189F3]",
        subtext: "text-slate-700",
        percentage: "text-[#0189F3] bg-[#D0CBFF]/50 border border-[#0189F3]/30",
        iconBg: "bg-gradient-to-br from-[#0189F3] via-[#0189F3] to-[#0189F3]",
        iconColor: "text-[#D0CBFF]",
        dotsfilled: "bg-[#0189F3]",
        dotsempty: "bg-[#0189F3]/50",
        shadow: "shadow-xl shadow-[#D0CBFF]/50"
    },
    indigo: {
        name: "indigo",
        card: "bg-gradient-to-br from-indigo-50 via-white to-blue-50",
        text: "text-blue-400",
        subtext: "text-slate-700",
        percentage: "text-blue-600 bg-blue-400/40 border border-white/30",
        iconBg: "bg-gradient-to-br from-teal-500 via-blue-600 to-sky-500",
        iconColor: "text-white",
        dotsfilled: "bg-blue-400",
        dotsempty: "bg-blue-400/40",
        shadow: "shadow-xl shadow-indigo-200/50"
    },
    amber: {
        name: "amber",
        card: "bg-gradient-to-br from-amber-50 via-white to-yellow-50",
        text: "text-amber-300",
        subtext: "text-slate-700",
        percentage: "text-amber-600 bg-amber-600/20 border border-amber-600/30",
        iconBg: "bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400",
        iconColor: "text-slate-700",
        dotsfilled: "bg-amber-300",
        dotsempty: "bg-amber-300/50",
        shadow: "shadow-xl shadow-amber-200/50"
    },
    rose: {
        name: "rose",
        card: "bg-gradient-to-br from-pink-50 via-white to-rose-50",
        text: "text-rose-300",
        subtext: "text-slate-700",
        percentage: "text-rose-600 bg-rose-300/40 border border-white/30",
        iconBg: "bg-gradient-to-br from-rose-400 via-pink-500 to-red-500",
        iconColor: "text-white",
        dotsfilled: "bg-rose-300",
        dotsempty: "bg-rose-300/40",
        shadow: "shadow-xl shadow-rose-200/50"
    },
    emerald: {
        name: "emerald",
        card: "bg-gradient-to-br from-emerald-50 via-white to-green-50",
        text: "text-emerald-300",
        subtext: "text-slate-700",
        percentage: "text-emerald-600 bg-emerald-300/40 border border-white/30",
        iconBg: "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500",
        iconColor: "text-slate-700",
        dotsfilled: "bg-emerald-300",
        dotsempty: "bg-emerald-300/40",
        shadow: "shadow-xl shadow-emerald-200/50"
    },
    slate: {
        name: "slate",
        card: "bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100",
        text: "text-slate-600",
        subtext: "text-slate-700",
        percentage: "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30",
        iconBg: "bg-gradient-to-br from-slate-600 via-slate-700 to-zinc-800",
        iconColor: "text-white",
        dotsfilled: "bg-slate-600",
        dotsempty: "bg-slate-600/60",
        shadow: "shadow-xl shadow-slate-200/50"
    },
}