// src/features/Admin/journeys/useAdminJourneysViewModel.tsx

import { useCallback, useEffect, useMemo, useState } from 'react';
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
    isLoadingDetail: boolean;

    toast: { msg: string; type: 'success' | 'error' } | null;

    openCreateModal: () => void;
    openEditModal: (journey: Journey) => void;
    closeModal: () => void;

    handleSave: (data: JourneyFormData, thumbnailFile: File | null) => Promise<void>;
    handleSetStatus: (journey: Journey, status: JourneyStatus) => Promise<void>;
    retry: () => void;
}

export function useAdminJourneysViewModel(): AdminJourneysViewModel {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [allJourneys, setAllJourneys] = useState<Journey[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filters, setFilters] = useState<JourneyFilters>(DEFAULT_FILTERS);

    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState<Journey | null>(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);

    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const loadList = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await AdminJourneysService.fetchJourneys({
                search: debouncedSearch || undefined,
                status: filters.status === 'all' ? undefined : filters.status,
            });
            setJourneys(data);
        } catch (err) {
            setError(err instanceof Error ? `Could not load journeys. ${err.message}` : 'Could not load journeys. Make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch, filters.status]);

    const loadStats = useCallback(async () => {
        try {
            setAllJourneys(await AdminJourneysService.fetchJourneys());
        } catch {
            setAllJourneys([]);
        }
    }, []);

    useEffect(() => { loadList(); }, [loadList]);

    useEffect(() => {
        loadStats();
        AdminJourneysService.fetchCategories().catch(() => undefined);
    }, [loadStats]);

    const refresh = async () => {
        await Promise.all([loadList(), loadStats()]);
    };

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const setStatusFilter = (status: JourneyFilters['status']) => setFilters(prev => ({ ...prev, status }));
    const setSortBy = (sortBy: JourneyFilters['sortBy']) => setFilters(prev => ({ ...prev, sortBy }));
    const toggleSortDir = () => setFilters(prev => ({ ...prev, sortDir: prev.sortDir === 'asc' ? 'desc' : 'asc' }));

    const filteredJourneys = useMemo(() => {
        return [...journeys].sort((a, b) => {
            const aVal = new Date(a[filters.sortBy]).getTime();
            const bVal = new Date(b[filters.sortBy]).getTime();
            return filters.sortDir === 'asc' ? aVal - bVal : bVal - aVal;
        });
    }, [journeys, filters.sortBy, filters.sortDir]);

    const stats = useMemo(() => ({
        total: allJourneys.length,
        draft: allJourneys.filter(j => j.status === 'draft').length,
        published: allJourneys.filter(j => j.status === 'published').length,
        archived: allJourneys.filter(j => j.status === 'archived').length,
    }), [allJourneys]);

    const openCreateModal = () => { setEditTarget(null); setShowModal(true); };

    const openEditModal = async (journey: Journey) => {
        setEditTarget(journey);
        setShowModal(true);
        setIsLoadingDetail(true);
        try {
            setEditTarget(await AdminJourneysService.fetchJourneyDetail(journey.id));
        } catch (err) {
            showToast(err instanceof Error ? err.message : 'Could not load this journey.', 'error');
        } finally {
            setIsLoadingDetail(false);
        }
    };

    const closeModal = () => { setShowModal(false); setEditTarget(null); setIsLoadingDetail(false); };

    const handleSave = async (data: JourneyFormData, thumbnailFile: File | null) => {
        try {
            if (editTarget) {
                await AdminJourneysService.updateJourney(editTarget.id, data, thumbnailFile);
                showToast(`"${data.title}" updated successfully.`);
            } else {
                await AdminJourneysService.createJourney(data, thumbnailFile);
                showToast(`"${data.title}" created.`);
            }
            closeModal();
        } catch (err) {
            showToast(err instanceof Error ? err.message : 'An error occurred. Please try again.', 'error');
        } finally {
            await refresh();
        }
    };

    const handleSetStatus = async (journey: Journey, status: JourneyStatus) => {
        const prevStatus = journey.status;
        setJourneys(prev => prev.map(j => j.id === journey.id ? { ...j, status } : j));
        try {
            await AdminJourneysService.setStatus(journey, status);
            const label = status === 'archived' ? 'archived' : prevStatus === 'archived' ? 'restored' : 'published';
            showToast(`"${journey.title}" ${label}.`);
        } catch (err) {
            setJourneys(prev => prev.map(j => j.id === journey.id ? { ...j, status: prevStatus } : j));
            showToast(err instanceof Error ? err.message : 'Failed to update status.', 'error');
        } finally {
            await refresh();
        }
    };

    return {
        journeys, filteredJourneys, isLoading, error,
        search, setSearch, filters, setStatusFilter, setSortBy, toggleSortDir,
        stats,
        showModal, editTarget, isLoadingDetail, toast,
        openCreateModal, openEditModal, closeModal,
        handleSave, handleSetStatus,
        retry: loadList,
    };
}
