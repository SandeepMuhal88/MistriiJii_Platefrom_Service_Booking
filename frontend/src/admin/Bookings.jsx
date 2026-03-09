import BookingTable from '../components/BookingTable';

const Bookings = () => {
    const dummyBookings = [
        { id: '#BK-1001', customer: 'Rahul Sharma', service: 'AC Repair', status: 'Pending' },
        { id: '#BK-1002', customer: 'Anjali Verma', service: 'Plumbing', status: 'Completed' },
        { id: '#BK-1003', customer: 'Kiran Patel', service: 'Electrician', status: 'In Progress' },
    ];

    return (
        <div className="anim-fade-up">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Bookings</h1>
                    <p className="text-gray-500 mt-1">Track and manage customer service requests</p>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <input type="text" placeholder="Search bookings..." className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" />
                    <button className="text-gray-500 hover:text-gray-800 p-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg></button>
                </div>
                <BookingTable bookings={dummyBookings} />
            </div>
        </div>
    );
};
export default Bookings;
