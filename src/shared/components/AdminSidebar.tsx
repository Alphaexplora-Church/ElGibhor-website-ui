// src/components/AdminSidebar.tsx

import { path } from 'framer-motion/client';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token and redirect to login
        localStorage.removeItem('token');
        navigate('/login');
    };

    const links = [
        {
            name: 'Dashboard',
            path: '/admin/dashboard',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        },
        {
            name: 'Content Manager',
            path: '/admin/events',
            icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        },
        {
            name: 'Registrations',
            path: '/admin/registration',
            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        }
    ];

    return (
        <aside className="w-64 bg-white/[0.02] border-r border-white/5 backdrop-blur-xl flex flex-col h-screen sticky top-0 z-50">
            {/* Logo Area */}
            <div className="p-8 border-b border-white/5">
                <h2 className="text-2xl font-black tracking-tighter text-white">
                    TMGN <span className="text-gold">Admin</span>
                </h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
                {links.map(link => {
                    const isActive = location.pathname.includes(link.path);
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all 
                                ${isActive
                                    ? 'bg-gold/10 text-gold border border-gold/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                            </svg>
                            {link.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Secure Logout
                </button>
            </div>
        </aside>
    );
}