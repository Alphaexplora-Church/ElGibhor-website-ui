// src/features/Admin/AdminJourneys.tsx

import AdminSidebar from '../../shared/components/AdminSidebar';
import AdminHeader from '../../shared/components/AdminHeader';
import { useAdminJourneysViewModel } from './journeys/useAdminJourneysViewModel';
import { JourneyModal } from './journeys/JourneyModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import type { Journey, JourneyStatus } from './journeys/adminJourneys.types';

const STATUS_STYLES: Record<JourneyStatus, string> = {
    draft: 'text-gray-300 bg-white/10 border-white/20',
    published: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    archived: 'text-gray-500 bg-white/5 border-white/10',
};

export default function AdminJourneys() {
    const vm = useAdminJourneysViewModel();

    return (
        <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-gold selection:text-royal-purple-dark">
            <AdminSidebar />

            <div className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-purple/20 rounded-full blur-[120px] pointer-events-none"></div>

                <AdminHeader userName="Admin" />

                <main className="p-8 md:p-12 flex-1 space-y-8 relative z-10 max-w-7xl mx-auto w-full">

                    {/* Title & Action */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter mb-2">Journeys</h1>
                            <p className="text-gray-400 font-light">Build and manage multi-part journeys & series.</p>
                        </div>
                        <button
                            onClick={vm.openCreateModal}
                            className="flex items-center gap-2 bg-gold text-royal-purple-dark px-6 py-3 rounded-xl text-sm font-black hover:bg-gold-light hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)] w-fit"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                            New Journey
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard label="Total Journeys" value={vm.stats.total.toString()} />
                        <StatCard label="Draft" value={vm.stats.draft.toString()} />
                        <StatCard label="Published" value={vm.stats.published.toString()} />
                        <StatCard label="Archived" value={vm.stats.archived.toString()} />
                    </div>

                    {/* Search + Filters */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative group flex-1">
                            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
                            </svg>
                            <input
                                value={vm.search}
                                onChange={e => vm.setSearch(e.target.value)}
                                placeholder="Search journeys by title or description..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all backdrop-blur-sm"
                            />
                        </div>

                        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-md w-fit">
                            {(['all', 'draft', 'published', 'archived'] as const).map(s => (
                                <button
                                    key={s}
                                    onClick={() => vm.setStatusFilter(s)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${vm.filters.status === s ? 'bg-gold text-royal-purple-dark shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-md w-fit">
                            <select
                                value={vm.filters.sortBy}
                                onChange={e => vm.setSortBy(e.target.value as 'created_at' | 'updated_at')}
                                className="bg-transparent text-xs font-bold text-gray-300 px-3 py-2.5 rounded-xl focus:outline-none"
                            >
                                <option className="bg-background-dark" value="updated_at">Date Updated</option>
                                <option className="bg-background-dark" value="created_at">Date Created</option>
                            </select>
                            <button
                                onClick={vm.toggleSortDir}
                                title="Toggle sort direction"
                                className="px-3 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-gold hover:bg-gold/10 transition-all"
                            >
                                {vm.filters.sortDir === 'asc' ? '↑ Oldest' : '↓ Newest'}
                            </button>
                        </div>
                    </div>

                    {/* List */}
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
                    ) : vm.filteredJourneys.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="overflow-x-auto rounded-3xl border border-white/5">
                            <table className="w-full text-left border-collapse min-w-[820px]">
                                <thead>
                                    <tr className="bg-white/[0.03] text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <th className="px-6 py-4">Journey</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Parts</th>
                                        <th className="px-6 py-4">Updated</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vm.filteredJourneys.map(j => (
                                        <JourneyRow key={j.id} journey={j} onEdit={() => vm.openEditModal(j)} onDelete={() => vm.openDeleteModal(j)} onSetStatus={(s) => vm.handleSetStatus(j, s)} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            {/* Toast */}
            {vm.toast && (
                <div className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold border transition-all animate-in slide-in-from-bottom-5
                    ${vm.toast.type === 'success' ? 'bg-[#0C0515] text-gold border-gold/30' : 'bg-[#0C0515] text-red-400 border-red-500/30'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${vm.toast.type === 'success' ? 'bg-gold' : 'bg-red-500'}`}></div>
                        {vm.toast.msg}
                    </div>
                </div>
            )}

            {/* Modals */}
            <JourneyModal open={vm.showModal} initial={vm.editTarget} onClose={vm.closeModal} onSave={vm.handleSave} />
            <ConfirmDeleteModal
                open={!!vm.deleteTarget}
                eventTitle={vm.deleteTarget?.title ?? ''}
                onCancel={vm.closeDeleteModal}
                onConfirm={vm.handleDelete}
            />
        </div>
    );
}

// ─── Sub-components ────────────────────────────────────────────────────

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{label}</p>
            <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-16 text-center border border-white/5 border-dashed">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
                <svg className="w-10 h-10 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <p className="font-black text-2xl text-white tracking-tight mb-2">No journeys found</p>
            <p className="text-gray-400 font-light">Try adjusting your filters, or create a new journey to get started.</p>
        </div>
    );
}

function JourneyRow({ journey, onEdit, onDelete, onSetStatus }: {
    journey: Journey;
    onEdit: () => void;
    onDelete: () => void;
    onSetStatus: (status: JourneyStatus) => void;
}) {
    const activeParts = journey.parts.filter(p => p.status === 'active').length;
    const updated = journey.updated_at ? new Date(journey.updated_at).toLocaleDateString() : '—';

    return (
        <tr className="border-t border-white/5 hover:bg-white/[0.03] transition-all group">
            <td className="px-6 py-5 max-w-[280px]">
                <p className="font-black text-white truncate">{journey.title}</p>
                <p className="text-sm text-gray-500 line-clamp-1">{journey.description}</p>
            </td>
            <td className="px-6 py-5">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${STATUS_STYLES[journey.status]}`}>
                    {journey.status}
                </span>
            </td>
            <td className="px-6 py-5 text-sm text-gray-300">
                {activeParts} / {journey.parts.length}
            </td>
            <td className="px-6 py-5 text-sm text-gray-400">{updated}</td>
            <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-2 flex-wrap">
                    {journey.status === 'published' ? (
                        <ActionBtn label="Unpublish" onClick={() => onSetStatus('draft')} />
                    ) : journey.status !== 'archived' ? (
                        <ActionBtn label="Publish" onClick={() => onSetStatus('published')} highlight />
                    ) : null}

                    {journey.status === 'archived' ? (
                        <ActionBtn label="Restore" onClick={() => onSetStatus('draft')} />
                    ) : (
                        <ActionBtn label="Archive" onClick={() => onSetStatus('archived')} />
                    )}

                    <ActionBtn label="Edit" onClick={onEdit} />
                    <ActionBtn label="Delete" onClick={onDelete} danger />
                </div>
            </td>
        </tr>
    );
}

function ActionBtn({ label, onClick, danger, highlight }: { label: string; onClick: () => void; danger?: boolean; highlight?: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                ${danger ? 'text-red-400 border-transparent hover:border-red-500/30 hover:bg-red-500/10'
                    : highlight ? 'text-gold border-gold/30 bg-gold/10 hover:bg-gold/20'
                        : 'text-gray-300 border-transparent hover:border-white/10 hover:bg-white/5'}`}
        >
            {label}
        </button>
    );
}
