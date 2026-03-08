import BookingTable from '../components/BookingTable';

const Bookings = () => {
    const dummyBookings = [
        { id: '1001', customer: 'Rahul Sharma', service: 'AC Repair', status: 'Pending' },
        { id: '1002', customer: 'Anjali Verma', service: 'Plumbing', status: 'Completed' }
    ];

    return (
        <div className="p-5 mt-15 flex-1 p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-2 text-gray-900">Manage Bookings</h1>
            <p className="text-gray-500 mb-6">List of all recent bookings</p>
            <div className="bg-white shadow rounded-lg p-6">
                <BookingTable bookings={dummyBookings} />
            </div>
        </div>
    );
};
export default Bookings;
