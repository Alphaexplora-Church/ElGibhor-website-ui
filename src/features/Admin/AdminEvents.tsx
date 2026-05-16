// src/features/Admin/AdminEvents.tsx

import AdminSidebar from '../../shared/components/AdminSidebar';
import AdminHeader from '../../shared/components/AdminHeader';
import { useAdminEventsViewModel } from './events/useAdminEventsViewModel';
import { EventModal } from './events/EventModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400&auto=format&fit=crop';

export default function AdminEvents() {
    const vm = useAdminEventsViewModel();
    const isEvent = vm.activeTab === 'event';
    const label = isEvent ? 'Event' : 'Announcement';

    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-gold selection:text-royal-purple-dark">
            <AdminSidebar />

            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-purple/20 rounded-full blur-[120px] pointer-events-none"></div>

                <AdminHeader userName="Admin" />

                <main className="p-8 md:p-12 flex-1 space-y-8 relative z-10 max-w-7xl mx-auto w-full">

                    {/* ── Page Title & Action ─────────────────────────────────── */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter mb-2">
                                {isEvent ? 'Events' : 'Announcements'}
                            </h1>
                            <p className="text-gray-400 font-light">
                                {isEvent ? 'Manage all upcoming church events and programs.' : 'Manage church-wide announcements and news.'}
                            </p>
                        </div>
                        <button
                            onClick={vm.openCreateModal}
                            className="flex items-center gap-2 bg-gold text-royal-purple-dark px-6 py-3 rounded-xl text-sm font-black hover:bg-gold-light hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)] w-fit"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                            New {label}
                        </button>
                    </div>

                    {/* ── Tab Toggle ─────────────────────────────────── */}
                    <div className="flex gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 w-fit backdrop-blur-md">
                        <button
                            onClick={() => vm.setActiveTab('event')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                                ${isEvent ? 'bg-gold text-royal-purple-dark shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Events
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isEvent ? 'bg-royal-purple-dark/20 text-royal-purple-dark' : 'bg-white/10 text-gray-300'}`}>
                                {vm.events.length}
                            </span>
                        </button>
                        <button
                            onClick={() => vm.setActiveTab('announcement')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                                ${!isEvent ? 'bg-gold text-royal-purple-dark shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Announcements
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${!isEvent ? 'bg-royal-purple-dark/20 text-royal-purple-dark' : 'bg-white/10 text-gray-300'}`}>
                                {vm.announcements.length}
                            </span>
                        </button>
                    </div>

                    {/* ── Stats ──────────────────────────────────────── */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <StatCard label={`Total ${label}s`} value={vm.stats.total.toString()} />
                        <StatCard label="With Images" value={vm.stats.withImages.toString()} />
                        <StatCard label="Categories" value={vm.stats.categories.toString()} className="col-span-2 md:col-span-1" />
                    </div>

                    {/* ── Search ─────────────────────────────────────── */}
                    <div className="relative group">
                        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
                        </svg>
                        <input
                            value={vm.search}
                            onChange={e => vm.setSearch(e.target.value)}
                            placeholder={isEvent ? 'Search events by title, location or category...' : 'Search announcements...'}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all backdrop-blur-sm"
                        />
                    </div>

                    {/* ── Content List ───────────────────────────────── */}
                    {vm.isLoading ? (
                        <div className="flex flex-col gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white/5 rounded-2xl h-28 animate-pulse border border-white/5" />
                            ))}
                        </div>
                    ) : vm.error ? (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center backdrop-blur-md">
                            <p className="text-red-400 font-bold mb-4">{vm.error}</p>
                            <button onClick={vm.retry} className="px-6 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-sm border border-red-500/30">
                                Retry Connection
                            </button>
                        </div>
                    ) : (isEvent ? vm.filteredEvents : vm.filteredAnnouncements).length === 0 ? (
                        <EmptyState label={label.toLowerCase()} />
                    ) : (
                        <div className="flex flex-col gap-4">
                            {(isEvent ? vm.filteredEvents : vm.filteredAnnouncements).map((item: any) => {
                                const thumb = item.media?.length > 0 ? item.media[0].file_url : FALLBACK_IMAGE;
                                const metaStr = isEvent
                                    ? [item.start_date ? `${item.start_date.date} · ${item.start_date.time}` : null, item.location].filter(Boolean)
                                    : [item.start_date ? new Date(item.start_date).toLocaleDateString() : null].filter(Boolean);

                                return (
                                    <ContentCard
                                        key={item.id}
                                        thumb={thumb}
                                        title={item.title}
                                        category={item.category_content}
                                        meta={metaStr as string[]}
                                        imageCount={item.media?.length ?? 0}
                                        description={item.description}
                                        onEdit={() => vm.openEditModal(item)}
                                        onDelete={() => vm.openDeleteModal(item)}
                                    />
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>

            {/* ── Toast ──────────────────────────────────────── */}
            {vm.toast && (
                <div className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold border transition-all animate-in slide-in-from-bottom-5
                    ${vm.toast.type === 'success' ? 'bg-[#0C0515] text-gold border-gold/30' : 'bg-[#0C0515] text-red-400 border-red-500/30'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${vm.toast.type === 'success' ? 'bg-gold' : 'bg-red-500'}`}></div>
                        {vm.toast.msg}
                    </div>
                </div>
            )}

            {/* ── Modals ─────────────────────────────────────── */}
            <EventModal
                open={vm.showModal}
                initial={vm.editTarget as any}
                onClose={vm.closeModal}
                onSave={vm.handleSave}
            />

            <ConfirmDeleteModal
                open={!!vm.deleteTarget}
                eventTitle={vm.deleteTarget?.title ?? ''}
                onCancel={vm.closeDeleteModal}
                onConfirm={vm.handleDelete}
            />
        </div>
    );
}

// ─── Shared Sub-components ────────────────────────────────────────────────────

function StatCard({ label, value, className = "" }: { label: string, value: string, className?: string }) {
    return (
        <div className={`bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden group ${className}`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{label}</p>
            <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        </div>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-16 text-center border border-white/5 border-dashed">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
                <svg className="w-10 h-10 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <p className="font-black text-2xl text-white tracking-tight mb-2">No {label}s found</p>
            <p className="text-gray-400 font-light">Try adjusting your search, or create a new {label} to get started.</p>
        </div>
    );
}

function ContentCard({ thumb, title, category, meta, imageCount, description, onEdit, onDelete }: any) {
    return (
        <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center gap-5 p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
            {/* Thumbnail */}
            <div className="w-full sm:w-24 h-40 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                <img src={thumb} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent sm:hidden"></div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-black text-xl text-white truncate">{title}</h3>
                    {category && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                            {category}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-4 flex-wrap text-sm text-gray-400 font-light mb-2">
                    {meta.map((m: string, i: number) => <span key={i}>{m}</span>)}
                    {imageCount > 0 && (
                        <span className="flex items-center gap-1.5 text-gold/80 font-medium">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {imageCount} Media
                        </span>
                    )}
                </div>
                {description && <p className="text-sm text-gray-500 line-clamp-1">{description}</p>}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-t-0 mt-4 sm:mt-0">
                <button onClick={onEdit} title="Edit" className="flex-1 sm:flex-none h-10 px-4 rounded-xl flex items-center justify-center text-gray-400 hover:text-gold hover:bg-gold/10 border border-transparent hover:border-gold/20 transition-all">
                    <span className="sm:hidden font-bold text-sm mr-2">Edit</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={onDelete} title="Delete" className="flex-1 sm:flex-none h-10 px-4 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all">
                    <span className="sm:hidden font-bold text-sm mr-2">Delete</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>
    );
}