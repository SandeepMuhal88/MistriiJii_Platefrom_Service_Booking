const Dashboard = () => {
    return (
        <div className="anim-fade-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, track your platform analytics here.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 transition-all hover:shadow-md hover:border-gray-200 group">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-gray-500 font-medium text-sm text-transform: uppercase tracking-wider mb-1">Total Bookings</h3>
                            <p className="text-4xl font-black text-gray-800">245</p>
                        </div>
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">📅</div>
                    </div>
                </div>

                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 transition-all hover:shadow-md hover:border-gray-200 group">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-gray-500 font-medium text-sm text-transform: uppercase tracking-wider mb-1">Active Technicians</h3>
                            <p className="text-4xl font-black text-gray-800">42</p>
                        </div>
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">🛠️</div>
                    </div>
                </div>

                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 transition-all hover:shadow-md hover:border-gray-200 group">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-gray-500 font-medium text-sm text-transform: uppercase tracking-wider mb-1">Completed Jobs</h3>
                            <p className="text-4xl font-black text-gray-800">180</p>
                        </div>
                        <div className="p-4 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">✅</div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings Table Wrapper */}
            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                    <a href="/admin/bookings" className="text-orange-500 hover:text-orange-600 text-sm font-semibold flex items-center gap-1 group">
                        View all <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                            <tr>
                                <th className="py-3 px-4 font-semibold text-gray-600">Customer</th>
                                <th className="py-3 px-4 font-semibold text-gray-600">Service</th>
                                <th className="py-3 px-4 font-semibold text-gray-600">Date</th>
                                <th className="py-3 px-4 font-semibold text-gray-600 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4 font-semibold text-gray-900">Rahul Sharma</td>
                                <td className="py-4 px-4 text-gray-600"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium border border-gray-200">AC Repair</span></td>
                                <td className="py-4 px-4 text-gray-500 font-medium">10 Mar 2026</td>
                                <td className="py-4 px-4 text-right"><span className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-full text-xs font-bold uppercase tracking-wide">Confirmed</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4 font-semibold text-gray-900">Amit Kumar</td>
                                <td className="py-4 px-4 text-gray-600"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium border border-gray-200">Plumbing</span></td>
                                <td className="py-4 px-4 text-gray-500 font-medium">11 Mar 2026</td>
                                <td className="py-4 px-4 text-right"><span className="px-3 py-1 bg-yellow-50 text-yellow-600 border border-yellow-200 rounded-full text-xs font-bold uppercase tracking-wide">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard