import { TrendingUp, TrendingDown, Users, Ticket, Store, ArrowRight, MoreHorizontal, ShoppingBag } from 'lucide-react';

export default function BusinessDashboard() {
    const stats = [
        {
            icon: <ShoppingBag className="w-6 h-6 text-pink-500" />,
            amount: "$5,240",
            label: "Earned this month",
            trend: { value: "50%", isPositive: true },
            bgColor: "bg-pink-50"
        },
        {
            icon: <Users className="w-6 h-6 text-amber-500" />,
            amount: "3045",
            label: "Monthly visitors",
            trend: { value: "80%", isPositive: false },
            bgColor: "bg-amber-50"
        },
        {
            icon: <Ticket className="w-6 h-6 text-blue-500" />,
            amount: "3045",
            label: "Voucher Issued",
            trend: { value: "30%", isPositive: true },
            bgColor: "bg-blue-50"
        }
    ];

    const orders = [
        { id: "653518", customer: "Murphy, Kathryn", total: "13.23 EUR", paid: true, status: "Open" },
        { id: "449003", customer: "Miles, Floyd", total: "13.23 EUR", paid: true, status: "Closed" },
        { id: "651535", customer: "Fox, Robert", total: "13.23 EUR", paid: true, status: "Open" },
        { id: "267400", customer: "McKinney, Marvin", total: "13.23 EUR", paid: true, status: "Closed" },
        { id: "487441", customer: "Simmons, Brooklyn", total: "13.23 EUR", paid: true, status: "Open" }
    ];

    const topCustomers = [
        { name: "Murphy, Kathryn", company: "Louis Vuitton" },
        { name: "Miles, Floyd", company: "Apple" },
        { name: "Fox, Robert", company: "McDonald's" },
        { name: "McKinney, Marvin", company: "Starbucks" },
        { name: "Simmons, Brooklyn", company: "Gillette" }
    ];

    const stores = [
        {
            name: "Starbuck",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
            totalSales: "$2,340",
            voucherOffered: "24"
        },
        {
            name: "Mc Donald's",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
            totalSales: "$2,340",
            voucherOffered: "24"
        }
    ];

    return (
        <div className="min-h-screen from-slate-50 via-blue-50/30 to-purple-50/20 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Stats */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Store className="w-6 h-6" />
                        Business Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 group hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-3xl font-bold text-slate-900 mb-1">
                                            {stat.amount}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            {stat.label}
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {stat.trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                        {stat.trend.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Orders and Top Customers */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* New Orders - Takes 2 columns on large screens */}
                    <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                New Orders
                            </h3>
                            <button className="text-purple-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                                View all
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">Order Number</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">Customer</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">Total</th>
                                        <th className="text-center py-3 px-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">Paid</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">Status</th>
                                        <th className="text-center py-3 px-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-2 text-sm text-slate-600">{order.id}</td>
                                            <td className="py-4 px-2 text-sm text-slate-900 font-medium">{order.customer}</td>
                                            <td className="py-4 px-2 text-sm text-purple-600 font-semibold">{order.total}</td>
                                            <td className="py-4 px-2 text-center">
                                                {order.paid && <span className="text-green-500 text-xl">✓</span>}
                                            </td>
                                            <td className="py-4 px-2">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Open'
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-center">
                                                <button className="text-slate-400 hover:text-slate-700 transition-colors">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Top Customer - Takes 1 column */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Top Customer
                            </h3>
                            <button className="text-purple-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                                View all
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {topCustomers.map((customer, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 -mx-2 px-2 rounded-lg transition-colors">
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-900 text-sm">{customer.name}</div>
                                    </div>
                                    <div className="text-sm text-slate-600">{customer.company}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Store Overview */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Store className="w-6 h-6" />
                            Store Overview
                        </h2>
                        <button className="text-purple-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stores.map((store, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src={store.logo}
                                            alt={store.name}
                                            className="w-12 h-12 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">{store.name}™</h4>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                            <ShoppingBag className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 mb-1">Total sales</div>
                                            <div className="text-xl font-bold text-slate-900">{store.totalSales}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                            <Ticket className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 mb-1">Voucher offered</div>
                                            <div className="text-xl font-bold text-slate-900">{store.voucherOffered}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 px-4 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                        <Store className="w-4 h-4" />
                                        Manage shop
                                    </button>
                                    <button className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-sm hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                        <ArrowRight className="w-4 h-4" />
                                        Visit shop
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}