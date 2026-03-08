const DashboardCard = ({ title, count }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100 flex-1">
            <h3 className="text-gray-500">{title}</h3>
            <p className="text-3xl font-bold mt-2 text-gray-900">{count}</p>
        </div>
    );
};
export default DashboardCard;
