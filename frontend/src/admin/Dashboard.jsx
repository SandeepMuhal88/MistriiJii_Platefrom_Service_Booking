const Dashboard = () => {
    return (
        <div style={{ padding: '20px', marginTop: '60px' }}>
            <h1>Admin Dashboard</h1>
            <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
                <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h3>Total Bookings</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>245</p>
                </div>
                <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h3>Active Technicians</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>42</p>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
