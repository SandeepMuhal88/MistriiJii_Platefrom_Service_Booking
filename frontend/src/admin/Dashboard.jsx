const Dashboard = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">

            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">MistriJii</h2>

                <ul className="space-y-4">
                    <li className="hover:text-orange-400 cursor-pointer">Dashboard</li>
                    <li className="hover:text-orange-400 cursor-pointer">Bookings</li>
                    <li className="hover:text-orange-400 cursor-pointer">Technicians</li>
                    <li className="hover:text-orange-400 cursor-pointer">Services</li>
                    <li className="hover:text-orange-400 cursor-pointer">Customers</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-10">

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-gray-500">Total Bookings</h3>
                        <p className="text-3xl font-bold mt-2">245</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-gray-500">Active Technicians</h3>
                        <p className="text-3xl font-bold mt-2">42</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-gray-500">Completed Jobs</h3>
                        <p className="text-3xl font-bold mt-2">180</p>
                    </div>

                </div>

                {/* Recent Bookings Table */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

                    <table className="w-full text-left">

                        <thead className="border-b">
                            <tr>
                                <th className="py-2">Customer</th>
                                <th className="py-2">Service</th>
                                <th className="py-2">Date</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr className="border-b">
                                <td className="py-3">Rahul Sharma</td>
                                <td>AC Repair</td>
                                <td>10 Mar</td>
                                <td className="text-green-500">Confirmed</td>
                            </tr>

                            <tr className="border-b">
                                <td className="py-3">Amit Kumar</td>
                                <td>Plumbing</td>
                                <td>11 Mar</td>
                                <td className="text-yellow-500">Pending</td>
                            </tr>

                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    )
}

export default Dashboard