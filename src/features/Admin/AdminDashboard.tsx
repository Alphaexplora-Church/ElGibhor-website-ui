// src/features/Admin/AdminDashboard.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../shared/components/AdminSidebar';
import AdminHeader from '../../shared/components/AdminHeader';

export default function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Uncomment to enforce login check
        // if (!token) {
        //     navigate('/login');
        // }
    }, [navigate]);

    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-gold selection:text-royal-purple-dark">
            <AdminSidebar />

            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-purple/20 rounded-full blur-[120px] pointer-events-none"></div>

                <AdminHeader userName="Admin" />

                <main className="p-8 md:p-12 flex-1 relative z-10 max-w-7xl mx-auto w-full">
                    <h1 className="text-4xl font-black tracking-tighter mb-8">
                        Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Overview</span>
                    </h1>

                    {/* Welcome Card */}
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-10 border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-bl-full pointer-events-none"></div>
                        <h2 className="text-2xl font-bold text-white mb-4">Welcome back!</h2>
                        <p className="text-gray-400 font-light max-w-2xl leading-relaxed">
                            You are now logged into the TMGN Admin Portal. Use the sidebar to navigate to the Events & Announcements manager where you can create, update, and remove content for the main website.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}