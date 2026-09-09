// src/features/Admin/journeys/useAdminJourneysViewModel.tsx

import { useEffect, useMemo, useState } from 'react';
import type { Journey, JourneyFormData, JourneyStatus, JourneyFilters } from './adminJourneys.types';
import { DEFAULT_FILTERS } from './adminJourneys.types';
import { AdminJourneysService } from './adminJourneys.service';

export interface AdminJourneysViewModel {
    journeys: Journey[];
    filteredJourneys: Journey[];
    isLoading: boolean;
    error: string | null;

    search: string;
    setSearch: (v: string) => void;
    filters: JourneyFilters;
    setStatusFilter: (s: JourneyFilters['status']) => void;
    setSortBy: (s: JourneyFilters['sortBy']) => void;
    toggleSortDir: () => void;

    stats: { total: number; draft: number; published: number; archived: number };

    showModal: boolean;
    editTarget: Journey | null;
    deleteTarget: Journey | null;

    toast: { msg: string; type: 'success' | 'error' } | null;

    openCreateModal: () => void;
    openEditModal: (journey: Journey) => void;
    closeModal: () => void;
    openDeleteModal: (journey: Journey) => void;
    closeDeleteModal: () => void;

    handleSave: (data: JourneyFormData) => Promise<void>;
    handleDelete: () => Promise<void>;
    handleSetStatus: (journey: Journey, status: JourneyStatus) => Promise<void>;
    retry: () => void;
}

export function useAdminJourneysViewModel(): AdminJourneysViewModel {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<JourneyFilters>(DEFAULT_FILTERS);

    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState<Journey | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Journey | null>(null);

    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => { loadAll(); }, []);

    const loadAll = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await AdminJourneysService.fetchJourneys();
            setJourneys(data);
        } catch {
            setError('Could not load journeys. Make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const setStatusFilter = (status: JourneyFilters['status']) => setFilters(prev => ({ ...prev, status }));
    const setSortBy = (sortBy: JourneyFilters['sortBy']) => setFilters(prev => ({ ...prev, sortBy }));
    const toggleSortDir = () => setFilters(prev => ({ ...prev, sortDir: prev.sortDir === 'asc' ? 'desc' : 'asc' }));

    const filteredJourneys = useMemo(() => {
        const q = search.toLowerCase();
        let list = journeys.filter(j =>
            (filters.status === 'all' || j.status === filters.status) &&
            (j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q))
        );
        list = [...list].sort((a, b) => {
            const aVal = new Date(a[filters.sortBy]).getTime();
            const bVal = new Date(b[filters.sortBy]).getTime();
            return filters.sortDir === 'asc' ? aVal - bVal : bVal - aVal;
        });
        return list;
    }, [journeys, search, filters]);

    const stats = useMemo(() => ({
        total: journeys.length,
        draft: journeys.filter(j => j.status === 'draft').length,
        published: journeys.filter(j => j.status === 'published').length,
        archived: journeys.filter(j => j.status === 'archived').length,
    }), [journeys]);

    const openCreateModal = () => { setEditTarget(null); setShowModal(true); };
    const openEditModal = (journey: Journey) => { setEditTarget(journey); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditTarget(null); };
    const openDeleteModal = (journey: Journey) => setDeleteTarget(journey);
    const closeDeleteModal = () => setDeleteTarget(null);

    const handleSave = async (data: JourneyFormData) => {
        try {
            if (editTarget) {
                const updated = await AdminJourneysService.updateJourney(editTarget.id, data);
                setJourneys(prev => prev.map(j => j.id === editTarget.id ? updated : j));
                showToast(`"${data.title}" updated successfully.`);
            } else {
                const created = await AdminJourneysService.createJourney(data);
                setJourneys(prev => [created, ...prev]);
                showToast(`"${data.title}" created.`);
            }
            closeModal();
        } catch (err) {
            showToast(err instanceof Error ? err.message : 'An error occurred. Please try again.', 'error');
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await AdminJourneysService.deleteJourney(deleteTarget.id);
            setJourneys(prev => prev.filter(j => j.id !== deleteTarget.id));
            showToast(`"${deleteTarget.title}" deleted.`);
            closeDeleteModal();
        } catch {
            showToast('Failed to delete.', 'error');
        }
    };

    const handleSetStatus = async (journey: Journey, status: JourneyStatus) => {
        const prevStatus = journey.status;
        // Optimistic update
        setJourneys(prev => prev.map(j => j.id === journey.id ? { ...j, status } : j));
        try {
            await AdminJourneysService.setStatus(journey.id, status);
            const label = status === 'published' ? 'Published' : status === 'draft' ? 'Unpublished' : status === 'archived' ? 'Archived' : 'Updated';
            showToast(`"${journey.title}" ${label.toLowerCase()}.`);
        } catch {
            setJourneys(prev => prev.map(j => j.id === journey.id ? { ...j, status: prevStatus } : j));
            showToast('Failed to update status.', 'error');
        }
    };

    return {
        journeys, filteredJourneys, isLoading, error,
        search, setSearch, filters, setStatusFilter, setSortBy, toggleSortDir,
        stats,
        showModal, editTarget, deleteTarget, toast,
        openCreateModal, openEditModal, closeModal,
        openDeleteModal, closeDeleteModal,
        handleSave, handleDelete, handleSetStatus,
        retry: loadAll,
    };
}
