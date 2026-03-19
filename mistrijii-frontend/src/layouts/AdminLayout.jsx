import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Bookings', path: '/admin/bookings', icon: '📅' },
        { name: 'Services', path: '/admin/services', icon: '🛠️' },
        { name: 'Customers', path: '/admin/customers', icon: '👥' },
        { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
    ];

    const basePath = '/admin';

    return (
        <div className="flex bg-gray-50 h-screen overflow-hidden">
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-center p-6 border-b border-gray-800">
                    <Link to="/" className="text-2xl font-black bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                        MistriJii Admin
                    </Link>
                </div>
                
                <nav className="p-4 space-y-2 flex-col">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin')
                                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <span>{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 p-4 w-full border-t border-gray-800 space-y-2">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition">
                        <span>🏡</span>
                        <span className="font-medium">Back to Website</span>
                    </Link>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-white rounded-xl hover:bg-red-500/20 transition cursor-pointer border-none bg-transparent">
                        <span>🚪</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50/50">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b h-16 flex items-center justify-between px-6 z-10 sticky top-0">
                    <button 
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>
                    <div className="font-semibold text-gray-700">Admin Dashboard</div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-sm"></div>
                    </div>
                </header>

                {/* Dashboard Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
