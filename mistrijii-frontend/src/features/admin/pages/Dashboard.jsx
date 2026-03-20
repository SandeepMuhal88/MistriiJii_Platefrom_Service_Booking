import React from 'react';
import { useBookings } from '../../booking/context/BookingContext';

const Dashboard = () => {
    const { bookings, updateBookingStatus } = useBookings();
    
    // Derived stats
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    
    // Example earnings calc (fake pricing mapping)
    const basePrices = {
        'Electrician': 500,
        'AC Service': 1200,
        'Mechanic': 800,
        'Plumber': 400
    };
    
    const totalRevenue = bookings
        .filter(b => b.status === 'Completed' || b.status === 'Paid')
        .reduce((sum, b) => sum + (basePrices[b.service] || 500), 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Overview Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Manage platform metrics and view recent activities.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Bookings', value: totalBookings, icon: '📅', color: 'blue' },
                    { label: 'Pending Requests', value: pendingBookings, icon: '🔄', color: 'orange' },
                    { label: 'Completed Jobs', value: completedBookings, icon: '✅', color: 'green' },
                    { label: 'Total Revenues', value: `₹${totalRevenue.toLocaleString()}`, icon: '💰', color: 'purple' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
                    <button className="text-sm font-medium text-orange-500 hover:text-orange-600 transition">View All →</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Service</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.slice(0, 10).map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">
                                                🛠️
                                            </div>
                                            {booking.service}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-800">{booking.name}</div>
                                        <div className="text-xs text-gray-500">{booking.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">{booking.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                            booking.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                                            booking.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' : 
                                            'bg-red-50 text-red-600 border-red-200'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={booking.status}
                                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                            className="text-sm border-gray-200 rounded-lg bg-gray-50 py-1.5 focus:ring-orange-500 focus:border-orange-500 transition"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}

                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 flex-col items-center">
                                        <div className="text-4xl mb-3">📭</div>
                                        <p>No bookings yet.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
