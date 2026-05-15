/**
 * AdminRegistrations Component
 * Main dashboard page for managing church registrations
 * Features: view all registrations, search, filter by service type, delete with confirmation
 */

import AdminSidebar from '../../../shared/components/AdminSidebar';
import AdminHeader from '../../../shared/components/AdminHeader';
import { useAdminRegistrationsViewModel } from './useAdminRegistrationsViewModel';
import { ConfirmDeleteModal } from '../ConfirmDeleteModal';
import type { RegistrationDisplay } from './registrations.types';

// Reusable stat card component
function StatCard({
  label,
  value,
  icon,
  className = '',
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-black text-white">{value}</p>
        </div>
        <div className="text-gold/60">{icon}</div>
      </div>
    </div>
  );
}

// Table skeleton loader
function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-14 bg-white/5 border border-white/10 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="font-bold text-white mb-1">No registrations found</h3>
      <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
    </div>
  );
}

// Error state component
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-16 bg-red-500/5 border border-red-500/20 rounded-2xl">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z" />
        </svg>
      </div>
      <h3 className="font-bold text-white mb-1">Error Loading Registrations</h3>
      <p className="text-gray-400 text-sm mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="bg-gold text-royal-purple-dark px-6 py-2 rounded-lg text-sm font-bold hover:bg-gold-light transition-all"
      >
        Retry
      </button>
    </div>
  );
}

export default function AdminRegistrations() {
  const vm = useAdminRegistrationsViewModel();

  // Determine if we should show a mobile card layout or desktop table
  const isMobileLayout = true; // Could be made responsive with useMediaQuery

  const visitorStatusColors: Record<string, string> = {
    'first-time': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'returning': 'bg-green-500/20 text-green-400 border-green-500/50',
    'member': 'bg-gold/20 text-gold border-gold/50',
    'visitor': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  };

  return (
    <div className="flex min-h-screen bg-background-dark text-white font-sans selection:bg-gold selection:text-royal-purple-dark">
      <AdminSidebar />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-purple/20 rounded-full blur-[120px] pointer-events-none"></div>

        <AdminHeader userName="Admin" />

        <main className="p-8 md:p-12 flex-1 space-y-8 relative z-10 max-w-7xl mx-auto w-full overflow-y-auto">
          {/* ── Page Title ─────────────────────────────────────────────── */}
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">
              Event Registrations
            </h1>
            <p className="text-gray-400 font-light">
              Manage and track all church event registrations and attendee information.
            </p>
          </div>

          {/* ── Stats Cards ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Total Registrations"
              value={vm.stats.total}
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2z" />
                </svg>
              }
            />
            <StatCard
              label="Service Types"
              value={vm.stats.uniqueServices}
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              }
            />
            <StatCard
              label="Total Guests"
              value={vm.stats.totalGuests}
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              }
            />
          </div>

          {/* ── Search & Filter Bar ────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative group">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={vm.search}
                onChange={(e) => vm.setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:bg-white/10 transition-all"
              />
            </div>

            {/* Service Type Filter */}
            <select
              value={vm.serviceTypeFilter}
              onChange={(e) => vm.setServiceTypeFilter(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-all cursor-pointer"
            >
              <option value="all">All Service Types</option>
              {vm.serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* ── Content Area ───────────────────────────────────────────── */}
          {vm.error ? (
            <ErrorState message={vm.error} onRetry={vm.retry} />
          ) : vm.isLoading ? (
            <TableSkeleton />
          ) : vm.displayRegistrations.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden md:block border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10 font-bold text-sm text-gray-300 uppercase tracking-wider">
                  <div className="col-span-2">Name</div>
                  <div className="col-span-2">Email</div>
                  <div className="col-span-1">Service</div>
                  <div className="col-span-1">Adults</div>
                  <div className="col-span-1">Children</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>

                {/* Table Rows */}
                {vm.displayRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors items-center text-sm"
                  >
                    {/* Name */}
                    <div className="col-span-2">
                      <p className="font-semibold text-white truncate">{reg.fullName}</p>
                      <p className="text-gray-500 text-xs">ID: {reg.id}</p>
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                      <p className="text-gray-300 truncate" title={reg.email}>{reg.email}</p>
                    </div>

                    {/* Service Type */}
                    <div className="col-span-1">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
                        {reg.service_type}
                      </span>
                    </div>

                    {/* Adults */}
                    <div className="col-span-1 text-center">
                      <p className="font-semibold text-white">{reg.adult_count}</p>
                    </div>

                    {/* Children */}
                    <div className="col-span-1 text-center">
                      <p className="font-semibold text-white">{reg.child_count}</p>
                    </div>

                    {/* Visitor Status */}
                    <div className="col-span-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        visitorStatusColors[reg.visitor_status?.toLowerCase() ?? ''] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}>
                        {reg.visitor_status ?? 'Unknown'}
                      </span>
                    </div>

                    {/* Date & Time */}
                    <div className="col-span-2">
                      <p className="text-gray-300 text-xs">{reg.submittedDate}</p>
                      <p className="text-gray-500 text-xs">{reg.submittedTime}</p>
                    </div>

                    {/* Delete Action */}
                    <div className="col-span-1 text-center">
                      <button
                        onClick={() => vm.openDeleteModal(reg)}
                        disabled={vm.isDeleting}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete registration"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {vm.displayRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{reg.fullName}</h3>
                        <p className="text-gray-500 text-xs mt-1">ID: {reg.id}</p>
                      </div>
                      <button
                        onClick={() => vm.openDeleteModal(reg)}
                        disabled={vm.isDeleting}
                        className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
                      >
                        <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-gray-300 text-sm break-all">{reg.email}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-gray-500">Service</p>
                        <p className="text-white font-semibold">{reg.service_type}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-gray-500">Status</p>
                        <p className={`font-semibold ${
                          reg.visitor_status?.toLowerCase() === 'member' ? 'text-gold' : 'text-blue-400'
                        }`}>
                          {reg.visitor_status ?? 'Unknown'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-gray-500">Guests</p>
                        <p className="text-white font-semibold">{reg.adult_count}A / {reg.child_count}C</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-gray-500">Submitted</p>
                        <p className="text-white font-semibold">{reg.submittedDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Counter */}
              <div className="text-center text-sm text-gray-400 mt-6">
                Showing {vm.displayRegistrations.length} of {vm.stats.total} registrations
              </div>
            </div>
          )}
        </main>

        {/* ── Toast Notification ────────────────────────────────────────── */}
        {vm.toast && (
          <div
            className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold border transition-all animate-in slide-in-from-bottom-5
              ${vm.toast.type === 'success'
                ? 'bg-[#0C0515] text-gold border-gold/30'
                : 'bg-[#0C0515] text-red-400 border-red-500/30'
              }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  vm.toast.type === 'success' ? 'bg-gold' : 'bg-red-500'
                }`}
              ></div>
              {vm.toast.msg}
            </div>
          </div>
        )}

        {/* ── Delete Confirmation Modal ─────────────────────────────────── */}
        {vm.deleteTarget && (
          <ConfirmDeleteModal
            open={!!vm.deleteTarget}
            eventTitle={`${vm.deleteTarget.first_name} ${vm.deleteTarget.last_name}'s Registration`}
            onCancel={vm.closeDeleteModal}
            onConfirm={vm.handleDelete}
          />
        )}
      </div>
    </div>
  );
}
