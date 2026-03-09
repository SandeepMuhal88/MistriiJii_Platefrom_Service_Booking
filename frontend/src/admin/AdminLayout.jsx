import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import Bookings from './Bookings';
import Technicians from './Technicians';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/bookings', label: 'Bookings', icon: '📅' },
        { path: '/admin/technicians', label: 'Technicians', icon: '🛠️' }
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen font-sans text-gray-900">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm hidden md:flex">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <span className="text-2xl font-black tracking-tight text-gray-900">
                        Mistri<span className="text-orange-500">Jii</span>
                    </span>
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Admin</span>
                </div>

                <ul className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));

                        return (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${isActive
                                            ? 'bg-orange-50 text-orange-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="text-lg">{link.icon}</span>
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="p-4 border-t border-gray-100 space-y-2">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg font-medium transition-colors">
                        <span>🏠</span> Back to Main Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium transition-colors"
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                    <span className="text-xl font-black tracking-tight text-gray-900">
                        Mistri<span className="text-orange-500">Jii</span> <span className="text-xs bg-orange-100 text-orange-700 px-1 py-0.5 rounded">ADMIN</span>
                    </span>
                    <button onClick={handleLogout} className="text-sm font-semibold text-red-500">Logout</button>
                </div>

                {/* Page Content */}
                <div className="p-6 md:p-10 flex-1 max-w-7xl w-full mx-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route path="technicians" element={<Technicians />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
