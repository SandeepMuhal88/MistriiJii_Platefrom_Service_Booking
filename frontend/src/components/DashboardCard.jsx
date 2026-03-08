const DashboardCard = ({ title, count }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', flex: 1, backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3>{title}</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0' }}>{count}</p>
        </div>
    );
};
export default DashboardCard;
