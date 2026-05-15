/**
 * useAdminRegistrationsViewModel
 * Encapsulates all state management and business logic for the registrations admin page
 */

import { useEffect, useState, useMemo } from 'react';
import type { Registration, RegistrationDisplay } from './registrations.types';
import { RegistrationsService } from './registrations.service';

export interface AdminRegistrationsViewModel {
  // Data
  registrations: Registration[];
  displayRegistrations: RegistrationDisplay[];
  isLoading: boolean;
  error: string | null;

  // Search & Filter
  search: string;
  setSearch: (search: string) => void;
  serviceTypeFilter: string;
  setServiceTypeFilter: (filter: string) => void;

  // Stats (derived)
  stats: {
    total: number;
    uniqueServices: number;
    totalGuests: number;
  };
  serviceTypes: string[];

  // Modal state
  deleteTarget: Registration | null;
  isDeleting: boolean;

  // Toast
  toast: { msg: string; type: 'success' | 'error' } | null;

  // Handlers
  openDeleteModal: (registration: Registration) => void;
  closeDeleteModal: () => void;
  handleDelete: () => Promise<void>;
  retry: () => void;
}

export function useAdminRegistrationsViewModel(): AdminRegistrationsViewModel {
  // ── State ──────────────────────────────────────────────────────────────
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Registration | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // ── Derived Data ───────────────────────────────────────────────────────
  const serviceTypes = useMemo(() => {
    const types = new Set(registrations.map(r => r.service_type));
    return Array.from(types).sort();
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      // Search by name or email
      const searchLower = search.toLowerCase();
      const matchesSearch =
        reg.first_name.toLowerCase().includes(searchLower) ||
        reg.last_name.toLowerCase().includes(searchLower) ||
        reg.email.toLowerCase().includes(searchLower);

      // Filter by service type
      const matchesService =
        serviceTypeFilter === 'all' || reg.service_type === serviceTypeFilter;

      return matchesSearch && matchesService;
    });
  }, [registrations, search, serviceTypeFilter]);

  const displayRegistrations = useMemo((): RegistrationDisplay[] => {
    return filteredRegistrations.map(reg => ({
      ...reg,
      fullName: `${reg.first_name} ${reg.last_name}`,
      submittedDate: formatDate(reg.submitted_at),
      submittedTime: formatTime(reg.submitted_at),
      totalCount: reg.adult_count + reg.child_count,
    }));
  }, [filteredRegistrations]);

  const stats = useMemo(() => {
    return {
      total: registrations.length,
      uniqueServices: serviceTypes.length,
      totalGuests: registrations.reduce((sum, r) => sum + r.adult_count + r.child_count, 0),
    };
  }, [registrations, serviceTypes]);

  // ── Effects ────────────────────────────────────────────────────────────
  useEffect(() => {
    loadRegistrations();
  }, []);

  // ── Toast Helper ───────────────────────────────────────────────────────
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Handlers ───────────────────────────────────────────────────────────

  /**
   * Load all registrations from the API
   */
  const loadRegistrations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await RegistrationsService.fetchRegistrations();
      setRegistrations(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load registrations';
      setError(message);
      console.error('Error loading registrations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Open the delete confirmation modal
   */
  const openDeleteModal = (registration: Registration) => {
    setDeleteTarget(registration);
  };

  /**
   * Close the delete confirmation modal
   */
  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  /**
   * Handle confirmed deletion
   * Optimistically removes from UI, then makes API call
   */
  const handleDelete = async () => {
    if (!deleteTarget) return;

    const targetId = deleteTarget.id;
    const targetName = `${deleteTarget.first_name} ${deleteTarget.last_name}`;

    try {
      setIsDeleting(true);

      // Optimistically update UI
      setRegistrations(prev => prev.filter(r => r.id !== targetId));

      // Make API call
      await RegistrationsService.deleteRegistration(targetId);

      showToast(`Registration for ${targetName} deleted successfully.`, 'success');
      closeDeleteModal();
    } catch (err) {
      // Revert optimistic update on error
      await loadRegistrations();
      const message = err instanceof Error ? err.message : 'Failed to delete registration';
      showToast(`Error: ${message}`, 'error');
      console.error('Error deleting registration:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Retry loading registrations
   */
  const retry = () => {
    loadRegistrations();
  };

  return {
    registrations,
    displayRegistrations,
    isLoading,
    error,
    search,
    setSearch,
    serviceTypeFilter,
    setServiceTypeFilter,
    stats,
    serviceTypes,
    deleteTarget,
    isDeleting,
    toast,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    retry,
  };
}

// ── Utility Functions ──────────────────────────────────────────────────
/**
 * Format ISO timestamp to MM/DD/YYYY
 */
function formatDate(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Format ISO timestamp to HH:MM AM/PM
 */
function formatTime(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '--:--';
  }
}
