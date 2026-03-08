import BookingTable from '../components/BookingTable';

const Bookings = () => {
    const dummyBookings = [
        { id: '1001', customer: 'Rahul Sharma', service: 'AC Repair', status: 'Pending' },
        { id: '1002', customer: 'Anjali Verma', service: 'Plumbing', status: 'Completed' }
    ];

    return (
        <div style={{ padding: '20px', marginTop: '60px' }}>
            <h1>Manage Bookings</h1>
            <p>List of all recent bookings</p>
            <BookingTable bookings={dummyBookings} />
        </div>
    );
};
export default Bookings;
