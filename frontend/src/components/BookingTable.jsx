const BookingTable = ({ bookings = [] }) => {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <thead style={{ backgroundColor: '#f9f9f9' }}>
                <tr>
                    <th style={{ borderBottom: '1px solid #eee', textAlign: 'left', padding: '12px' }}>ID</th>
                    <th style={{ borderBottom: '1px solid #eee', textAlign: 'left', padding: '12px' }}>Customer</th>
                    <th style={{ borderBottom: '1px solid #eee', textAlign: 'left', padding: '12px' }}>Service</th>
                    <th style={{ borderBottom: '1px solid #eee', textAlign: 'left', padding: '12px' }}>Status</th>
                </tr>
            </thead>
            <tbody>
                {bookings.length > 0 ? bookings.map((b) => (
                    <tr key={b.id}>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{b.id}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{b.customer}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{b.service}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                            <span style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                backgroundColor: b.status === 'Completed' ? '#d4edda' : '#fff3cd',
                                color: b.status === 'Completed' ? '#155724' : '#856404'
                            }}>
                                {b.status}
                            </span>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>No bookings found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
export default BookingTable;
