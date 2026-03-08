const BookingTable = ({ bookings = [] }) => {
    return (
        <table className="w-full text-left border-collapse mt-5">
            <thead className="border-b bg-gray-50">
                <tr>
                    <th className="py-3 px-4 font-medium text-gray-700 border-b">ID</th>
                    <th className="py-3 px-4 font-medium text-gray-700 border-b">Customer</th>
                    <th className="py-3 px-4 font-medium text-gray-700 border-b">Service</th>
                    <th className="py-3 px-4 font-medium text-gray-700 border-b">Status</th>
                </tr>
            </thead>
            <tbody>
                {bookings.length > 0 ? bookings.map((b) => (
                    <tr key={b.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">{b.id}</td>
                        <td className="py-3 px-4">{b.customer}</td>
                        <td className="py-3 px-4">{b.service}</td>
                        <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${b.status === 'Completed'
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                {b.status}
                            </span>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="4" className="py-4 text-center text-gray-500">No bookings found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
export default BookingTable;
