'use client';

import { useState } from 'react';
import { Calendar, Download, Share2 } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30 days Oct 16 / 21 - Nov 14 / 21');

  const navTabs = ['overview', 'ppc', 'year-to-year', 'customize'];
  const navLabels = {
    'overview': 'Overview',
    'ppc': 'PPC',
    'year-to-year': 'Year to year...',
    'customize': 'Customize'
  };

  const summaryItems = [
    { label: 'Overview', value: '1,552', color: 'bg-blue-100 text-blue-900' },
    { label: 'Campaigns', value: '1,552', color: 'bg-purple-100 text-purple-900' },
    { label: 'Ad Group', value: '1,552', color: 'bg-pink-100 text-pink-900' },
    { label: 'Keywords', value: '1,552', color: 'bg-yellow-100 text-yellow-900' },
  ];

  const metricsCards = [
    {
      title: 'Orders Created',
      value: '$134,970',
      subtitle: '$128,451',
      change: '+12.98%',
      positive: true,
      dark: false,
    },
    {
      title: 'Total Sales',
      value: '$2,145,132.80',
      subtitle: '$2,141,564.20',
      change: '+4.98%',
      positive: true,
      dark: true,
    },
    {
      title: 'PPC Sales',
      value: '$890.00',
      subtitle: '$877.00',
      change: '+0.17%',
      positive: true,
      dark: false,
    },
    {
      title: 'Units Sales',
      value: '$151,740',
      subtitle: '$145,869',
      change: '',
      positive: null,
      dark: false,
    },
    {
      title: 'Organic Sales Ra...',
      value: '100.00%',
      subtitle: '100.00%',
      change: '+0.12%',
      positive: true,
      dark: false,
    },
  ];

  const highestACosCampaigns = [
    { name: 'B08NY9N3MT', spend: '$30.25', sales: '$149.85', acos: '$149.85', indicator: 'A' },
    { name: 'Campaign - 3...', spend: '$40.00', sales: '$134.00', acos: '$134.50', indicator: 'A' },
    { name: 'Research - Ac...', spend: '$43.55', sales: '$129.75', acos: '$125.00', indicator: 'M' },
    { name: 'B087C75QQJ', spend: '$45.85', sales: '$113.00', acos: '$119.45', indicator: 'M' },
    { name: 'House Numbe...', spend: '$54.00', sales: '$99.55', acos: '$85.00', indicator: 'A' },
  ];

  // Overview Tab Content
  const renderOverviewContent = () => (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Summary</h2>
            <span className="text-xs text-slate-400">2024</span>
          </div>
          <div className="space-y-2">
            {summaryItems.map((item) => (
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
            {highestACosCampaigns.map((campaign, idx) => (
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
        {metricsCards.map((card, idx) => (
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
                  {card.change} {card.positive ? '↑' : '↓'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Costs</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-slate-600">Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                <span className="text-slate-600">Exps</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-slate-600">Odds</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400 mb-4">Aug 21 - Sep 21</div>
          <div className="h-48 relative">
            <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
              <path d="M 0,80 Q 50,60 100,70 T 200,75 T 300,85 T 400,80" fill="none" stroke="#a78bfa" strokeWidth="2" />
              <path d="M 0,90 Q 50,70 100,80 T 200,85 T 300,95 T 400,90" fill="none" stroke="#f0abfc" strokeWidth="2" />
              <path d="M 0,100 Q 50,80 100,90 T 200,95 T 300,105 T 400,100" fill="none" stroke="#fde047" strokeWidth="2" />
              <circle cx="285" cy="85" r="4" fill="#a78bfa" />
              <text x="295" y="85" className="text-xs fill-purple-600 font-bold">4.25%</text>
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">ACoS vs TACoS</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                <span className="text-slate-600">Coasts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-slate-600">Sell</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400 mb-4">Aug 21 - Sep 21</div>
          <div className="h-48 flex items-end justify-around gap-8 px-8">
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-20">
                <div className="h-32 bg-gradient-to-t from-blue-300 to-blue-200 rounded-t-xl"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">8.15%</div>
              </div>
              <div className="text-xs text-slate-500 font-medium">31 Aug</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-20">
                <div className="h-40 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-xl"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">75.25%</div>
              </div>
              <div className="text-xs text-slate-500 font-medium">21 Sep</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // PPC Tab Content
  const renderPPCContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="text-sm font-medium mb-2">Total PPC Spend</div>
          <div className="text-3xl font-bold mb-1">$12,456</div>
          <div className="text-xs opacity-80">+8.3% vs last month</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="text-sm font-medium mb-2">PPC Revenue</div>
          <div className="text-3xl font-bold mb-1">$45,890</div>
          <div className="text-xs opacity-80">+12.1% vs last month</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="text-sm font-medium mb-2">ROAS</div>
          <div className="text-3xl font-bold mb-1">3.68</div>
          <div className="text-xs opacity-80">+0.4 vs last month</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="text-sm font-medium mb-2">Click Rate</div>
          <div className="text-3xl font-bold mb-1">2.45%</div>
          <div className="text-xs opacity-80">+0.3% vs last month</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Active Campaigns Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Campaign Name</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Impressions</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Clicks</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Spend</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Sales</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">ACoS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Brand Defense Campaign', impressions: '125,450', clicks: '3,245', spend: '$2,450', sales: '$8,920', acos: '27.5%' },
                { name: 'Category Targeting Pro', impressions: '98,230', clicks: '2,890', spend: '$1,980', sales: '$7,450', acos: '26.6%' },
                { name: 'Competitor Conquest', impressions: '87,650', clicks: '2,340', spend: '$1,850', sales: '$6,230', acos: '29.7%' },
                { name: 'Product Launch 2024', impressions: '76,430', clicks: '1,920', spend: '$1,560', sales: '$5,890', acos: '26.5%' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                  <td className="py-4 px-4 text-sm font-medium text-slate-900">{row.name}</td>
                  <td className="py-4 px-4 text-sm text-right text-slate-600">{row.impressions}</td>
                  <td className="py-4 px-4 text-sm text-right text-slate-600">{row.clicks}</td>
                  <td className="py-4 px-4 text-sm text-right text-slate-900 font-medium">{row.spend}</td>
                  <td className="py-4 px-4 text-sm text-right text-green-600 font-medium">{row.sales}</td>
                  <td className="py-4 px-4 text-sm text-right text-slate-900 font-bold">{row.acos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-6">PPC Trends (Last 30 Days)</h2>
        <div className="h-64 flex items-end justify-around gap-2">
          {Array.from({ length: 30 }).map((_, idx) => {
            const height = Math.random() * 200 + 50;
            return (
              <div key={idx} className="flex-1 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t hover:from-purple-600 hover:to-purple-400 transition-all cursor-pointer" style={{ height: `${height}px` }} title={`Day ${idx + 1}`} />
            );
          })}
        </div>
      </div>
    </div>
  );

  // Year to Year Tab Content
  const renderYearToYearContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Year-over-Year Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="text-sm text-slate-600 mb-2">2023 Total Revenue</div>
            <div className="text-4xl font-bold text-blue-600 mb-2">$1.8M</div>
            <div className="text-xs text-slate-500">Baseline Year</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="text-sm text-slate-600 mb-2">2024 Total Revenue</div>
            <div className="text-4xl font-bold text-purple-600 mb-2">$2.4M</div>
            <div className="text-xs text-green-600 font-semibold">+33.3% Growth</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="text-sm text-slate-600 mb-2">2025 Projection</div>
            <div className="text-4xl font-bold text-green-600 mb-2">$3.2M</div>
            <div className="text-xs text-green-600 font-semibold">+33.3% Expected</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Monthly Revenue Comparison</h2>
        <div className="h-80 flex items-end justify-around gap-4 px-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => {
            const height2023 = Math.random() * 150 + 100;
            const height2024 = height2023 * (1 + Math.random() * 0.4);
            return (
              <div key={month} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-end gap-1 w-full justify-center">
                  <div className="w-5 bg-gradient-to-t from-blue-400 to-blue-300 rounded-t hover:from-blue-500 hover:to-blue-400 transition-all cursor-pointer" style={{ height: `${height2023}px` }} title={`2023 - ${month}`} />
                  <div className="w-5 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t hover:from-purple-600 hover:to-purple-500 transition-all cursor-pointer" style={{ height: `${height2024}px` }} title={`2024 - ${month}`} />
                </div>
                <div className="text-xs text-slate-500 font-medium">{month}</div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-400"></div>
            <span className="text-sm text-slate-600">2023</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500"></div>
            <span className="text-sm text-slate-600">2024</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Growth Metrics</h3>
          <div className="space-y-4">
            {[
              { metric: 'Customer Acquisition', value2023: '1,245', value2024: '1,876', growth: '+50.7%' },
              { metric: 'Average Order Value', value2023: '$85.40', value2024: '$92.15', growth: '+7.9%' },
              { metric: 'Conversion Rate', value2023: '2.3%', value2024: '3.1%', growth: '+0.8%' },
              { metric: 'Customer Retention', value2023: '68%', value2024: '74%', growth: '+6%' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <div className="text-sm font-medium text-slate-700">{item.metric}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.value2023} → {item.value2024}</div>
                </div>
                <div className="text-green-600 font-bold text-lg">{item.growth}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Highlights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
              <div className="font-semibold text-green-900 mb-1">Best Quarter</div>
              <div className="text-sm text-green-700">Q4 2024 exceeded targets by 45%</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <div className="font-semibold text-blue-900 mb-1">Market Expansion</div>
              <div className="text-sm text-blue-700">Entered 3 new markets in 2024</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
              <div className="font-semibold text-purple-900 mb-1">Product Innovation</div>
              <div className="text-sm text-purple-700">Launched 12 new products successfully</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
              <div className="font-semibold text-orange-900 mb-1">Team Growth</div>
              <div className="text-sm text-orange-700">Team size increased from 45 to 67</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Customize Tab Content
  const renderCustomizeContent = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-2">Dashboard Customization</h2>
        <p className="text-purple-100">Personalize your analytics dashboard to fit your needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Widget Configuration</h3>
          <div className="space-y-4">
            {[
              { widget: 'Summary Cards', enabled: true },
              { widget: 'Top Products Chart', enabled: true },
              { widget: 'Campaign Performance', enabled: true },
              { widget: 'Cost Analysis', enabled: false },
              { widget: 'Revenue Trends', enabled: true },
              { widget: 'Customer Insights', enabled: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.enabled ? 'bg-green-100' : 'bg-slate-200'}`}>
                    <div className={`w-5 h-5 rounded ${item.enabled ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                  </div>
                  <span className="font-medium text-slate-900">{item.widget}</span>
                </div>
                <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${item.enabled ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-slate-300 text-slate-600 hover:bg-slate-400'}`}>
                  {item.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Display Preferences</h3>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Color Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Light', colors: ['bg-white', 'bg-slate-100', 'bg-slate-200'] },
                  { name: 'Dark', colors: ['bg-slate-800', 'bg-slate-700', 'bg-slate-600'] },
                  { name: 'Auto', colors: ['bg-gradient-to-r from-blue-400 to-purple-500'] },
                ].map((theme) => (
                  <button key={theme.name} className="p-4 border-2 border-slate-200 rounded-xl hover:border-purple-500 transition-all">
                    <div className="flex gap-1 mb-2">
                      {theme.colors.map((color, idx) => (
                        <div key={idx} className={`h-8 flex-1 rounded ${color}`}></div>
                      ))}
                    </div>
                    <div className="text-sm font-medium text-slate-700">{theme.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Default Date Range</label>
              <select className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none font-medium text-slate-700">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
                <option>Custom range</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Preferred Chart Style</label>
              <div className="grid grid-cols-2 gap-3">
                {['Line Charts', 'Bar Charts', 'Pie Charts', 'Area Charts'].map((chart) => (
                  <button key={chart} className="p-3 border-2 border-slate-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-sm font-medium text-slate-700">
                    {chart}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Export & Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Export to PDF', icon: '📄', color: 'from-red-400 to-red-500' },
            { name: 'Export to Excel', icon: '📊', color: 'from-green-400 to-green-500' },
            { name: 'Connect to API', icon: '🔌', color: 'from-blue-400 to-blue-500' },
            { name: 'Email Reports', icon: '📧', color: 'from-purple-400 to-purple-500' },
            { name: 'Slack Integration', icon: '💬', color: 'from-pink-400 to-pink-500' },
            { name: 'Webhook Setup', icon: '🔔', color: 'from-orange-400 to-orange-500' },
          ].map((option) => (
            <button key={option.name} className={`p-6 bg-gradient-to-br ${option.color} rounded-2xl text-white hover:shadow-xl transition-all transform hover:scale-105`}>
              <div className="text-4xl mb-2">{option.icon}</div>
              <div className="font-semibold">{option.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewContent();
      case 'ppc':
        return renderPPCContent();
      case 'year-to-year':
        return renderYearToYearContent();
      case 'customize':
        return renderCustomizeContent();
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div className="min-h-screen from-slate-50 via-white to-slate-100 p-4 md:p-8 font-sans mt-[72px]">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 w-fit">
            {navTabs.map((tab, index): any => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {navTabs[index]}
              </button>
            ))}
          </div>

          {/* Date Range & Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <Calendar size={16} />
              <span>{dateRange}</span>
            </button>
            <button className="p-2.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
              <Download size={18} className="text-slate-700" />
            </button>
            <button className="p-2.5 bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg">
              <Share2 size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Render Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
}