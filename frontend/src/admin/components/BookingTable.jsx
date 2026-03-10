const BookingTable = ({ bookings = [] }) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <tr>
                        <th className="py-4 px-6">ID</th>
                        <th className="py-4 px-6">Customer</th>
                        <th className="py-4 px-6">Service</th>
                        <th className="py-4 px-6 text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                    {bookings.length > 0 ? bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-orange-50/30 transition-colors">
                            <td className="py-4 px-6 font-bold text-gray-600">{b.id}</td>
                            <td className="py-4 px-6 font-semibold text-gray-900">{b.customer}</td>
                            <td className="py-4 px-6 text-gray-600"><span className="bg-white border border-gray-200 px-2.5 py-1 rounded shadow-sm text-xs font-medium">{b.service}</span></td>
                            <td className="py-4 px-6 text-right">
                                <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${b.status === 'Completed'
                                        ? "bg-green-50 text-green-600 border-green-200"
                                        : b.status === 'In Progress'
                                            ? "bg-blue-50 text-blue-600 border-blue-200"
                                            : "bg-yellow-50 text-yellow-600 border-yellow-200"
                                    }`}>
                                    {b.status}
                                </span>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4" className="py-8 text-center text-gray-400 font-medium">No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default BookingTable;
