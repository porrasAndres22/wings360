


export default ({ summaryItems, highestACosCampaigns, metricsCards }: any) => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Summary Section */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Summary</h2>
                        <span className="text-xs text-slate-400">2024</span>
                    </div>
                    <div className="space-y-2">
                        {summaryItems.map((item: any) => (
                            <div
                                key={item.label}
                                className={`flex items-center justify-between p-4 rounded-2xl ${item.color} transition-all hover:scale-[1.02]`}
                            >
                                <span className="font-semibold text-sm">{item.label}</span>
                                <span className="font-bold text-lg">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top 5 Products */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Top 5 products by spend</h2>
                        <span className="text-xs text-slate-400">···</span>
                    </div>
                    <div className="text-center mb-6">
                        <div className="text-xs text-slate-500 mb-2">Total score</div>
                        <div className="text-5xl font-bold text-slate-900 mb-8">2,985</div>
                    </div>
                    <div className="relative h-48 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="70" fill="none" stroke="#e0e7ff" strokeWidth="35" />
                            <circle cx="100" cy="100" r="70" fill="none" stroke="#8b5cf6" strokeWidth="35" strokeDasharray="263" strokeDashoffset="65" transform="rotate(-90 100 100)" />
                            <circle cx="100" cy="100" r="70" fill="none" stroke="#fef08a" strokeWidth="35" strokeDasharray="263" strokeDashoffset="197" transform="rotate(60 100 100)" />
                            <text x="100" y="95" textAnchor="middle" className="text-sm font-bold fill-slate-900">$1,815.67</text>
                            <text x="100" y="110" textAnchor="middle" className="text-xs fill-slate-500">B07MCGRY7M</text>
                        </svg>
                    </div>
                </div>

                {/* Highest ACoS Campaigns */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Highest ACoS campaigns</h2>
                        <span className="text-xs text-slate-400">···</span>
                    </div>
                    <div className="space-y-1">
                        <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 font-medium mb-3 px-3">
                            <div>Campaign</div>
                            <div className="text-right">Spend</div>
                            <div className="text-right">Sales</div>
                            <div className="text-right">ACoS</div>
                        </div>
                        {highestACosCampaigns.map((campaign: any, idx: any) => (
                            <div key={idx} className="grid grid-cols-4 gap-2 items-center p-3 rounded-xl hover:bg-slate-50 transition-all">
                                <div className="flex items-center gap-2">
                                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${campaign.indicator === 'A' ? 'bg-pink-100 text-pink-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        {campaign.indicator}
                                    </span>
                                    <span className="text-sm font-medium text-slate-700 truncate">{campaign.name}</span>
                                </div>
                                <div className="text-right text-sm text-slate-600">{campaign.spend}</div>
                                <div className="text-right text-sm text-slate-600">{campaign.sales}</div>
                                <div className="text-right text-sm font-bold text-slate-900">{campaign.acos}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                {metricsCards.map((card: any, idx: any) => (
                    <div key={idx} className={`${card.dark ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white' : 'bg-white text-slate-900 border border-slate-200'} rounded-2xl p-5 shadow-lg transition-all hover:scale-[1.02]`}>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-xs font-semibold ${card.dark ? 'text-slate-300' : 'text-slate-500'}`}>{card.title}</h3>
                            <span className="text-xs text-slate-400">···</span>
                        </div>
                        <div className={`text-xs mb-1 ${card.dark ? 'text-slate-400' : 'text-slate-400'}`}>Oct 16 / 21 - Nov 14 / 21</div>
                        <div className="text-2xl font-bold mb-1">{card.value}</div>
                        <div className="flex items-center justify-between">
                            <span className={`text-sm ${card.dark ? 'text-slate-400' : 'text-slate-500'}`}>{card.subtitle}</span>
                            {card.change && (
                                <span className={`text-xs font-bold flex items-center gap-1 ${card.positive ? 'text-green-500' : 'text-red-500'}`}>
                                    {card.change}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}