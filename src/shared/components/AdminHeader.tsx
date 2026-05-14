// src/components/AdminHeader.tsx

export default function AdminHeader({ userName = "Admin" }: { userName?: string }) {
    return (
        <header className="h-24 px-8 flex items-center justify-end bg-transparent relative z-20 w-full">
            {/* User Profile Pill */}
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg">
                <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-white leading-tight">{userName}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gold">System Admin</span>
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            </div>
        </header>
    );
}