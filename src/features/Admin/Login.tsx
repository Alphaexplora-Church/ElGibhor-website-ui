// src/features/Admin/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            const token = data.session?.access_token;
            if (token) {
                localStorage.setItem('token', token);
            }

            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            setError('Network error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark relative overflow-hidden font-sans">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal-purple-dark/30 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-md p-10 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl relative z-10">
                <h2 className="text-3xl font-black text-white mb-2 text-center tracking-tight">
                    Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Portal</span>
                </h2>
                <p className="text-gray-400 text-center text-sm font-light mb-8">Sign in to manage TMGAN content.</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold text-center py-3 rounded-xl mb-6 backdrop-blur-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="group relative">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-gold transition-colors">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all placeholder-gray-600"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="group relative mb-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-gold transition-colors">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all placeholder-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gold text-royal-purple-dark px-6 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(239,191,4,0.3)] hover:bg-gold-light transition-colors mt-4"
                    >
                        Secure Login
                    </motion.button>
                </form>
            </div>
        </div>
    );
}