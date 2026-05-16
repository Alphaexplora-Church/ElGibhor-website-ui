// src/features/Admin/events/useAdminEventsViewModel.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ChurchEvent and Announcement are sourced from the local admin types — they include
// description, category_content, and media which the public experience types lack.
import type { ChurchEvent, Announcement, ContentTab, EventFormData } from './adminEvents.types';
import { AdminEventsService } from './adminEvents.service';

export interface AdminEventsViewModel {
    // Tab
    activeTab: ContentTab;
    setActiveTab: (tab: ContentTab) => void;

    // Data
    events: ChurchEvent[];
    announcements: Announcement[];
    filteredEvents: ChurchEvent[];
    filteredAnnouncements: Announcement[];
    isLoading: boolean;
    error: string | null;

    // Search
    search: string;
    setSearch: (v: string) => void;

    // Stats (derived — per active tab)
    stats: { total: number; withImages: number; categories: number };

    // Modal state
    showModal: boolean;
    editTarget: ChurchEvent | Announcement | null;
    deleteTarget: ChurchEvent | Announcement | null;

    // Toast
    toast: { msg: string; type: 'success' | 'error' } | null;

    // Handlers
    openCreateModal: () => void;
    openEditModal: (item: ChurchEvent | Announcement) => void;
    closeModal: () => void;
    openDeleteModal: (item: ChurchEvent | Announcement) => void;
    closeDeleteModal: () => void;
    handleSave: (data: EventFormData) => Promise<void>;
    handleDelete: () => Promise<void>;
    retry: () => void;
}

export function useAdminEventsViewModel(): AdminEventsViewModel {
    const navigate = useNavigate();

    // ── State ──────────────────────────────────────────────────────────────
    const [activeTab, setActiveTab] = useState<ContentTab>('event');
    const [events, setEvents] = useState<ChurchEvent[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState<ChurchEvent | Announcement | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ChurchEvent | Announcement | null>(null);

    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    // ── Auth guard ─────────────────────────────────────────────────────────
    useEffect(() => {
        // Uncomment this when you are ready to enforce login!
        // if (!localStorage.getItem('token')) navigate('/login');
    }, [navigate]);

    // ── Initial load — fetch both in parallel ──────────────────────────────
    useEffect(() => { loadAll(); }, []);

    // ── Reset search when switching tabs ───────────────────────────────────
    useEffect(() => { setSearch(''); }, [activeTab]);

    // ── Internal helpers ───────────────────────────────────────────────────
    const loadAll = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [eventsData, announcementsData] = await Promise.all([
                AdminEventsService.fetchEvents(),
                AdminEventsService.fetchAnnouncements(),
            ]);
            setEvents(eventsData);
            setAnnouncements(announcementsData);
        } catch {
            setError('Could not load content. Make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ── Derived: filtered lists ────────────────────────────────────────────
    const q = search.toLowerCase();

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(q) ||
        (e.location ?? '').toLowerCase().includes(q) ||
        (e.category_content ?? '').toLowerCase().includes(q)
    );

    const filteredAnnouncements = announcements.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.category_content ?? '').toLowerCase().includes(q) ||
        (a.description ?? '').toLowerCase().includes(q)
    );

    // ── Derived: stats (per active tab) ────────────────────────────────────
    const stats = activeTab === 'event'
        ? {
            total: events.length,
            withImages: events.filter(e => e.media && e.media.length > 0).length,
            categories: new Set(events.map(e => e.category_content).filter(Boolean)).size,
        }
        : {
            total: announcements.length,
            withImages: announcements.filter(a => a.media && a.media.length > 0).length,
            categories: new Set(announcements.map(a => a.category_content).filter(Boolean)).size,
        };

    // ── Handlers ───────────────────────────────────────────────────────────
    const openCreateModal = () => { setEditTarget(null); setShowModal(true); };
    const openEditModal = (item: ChurchEvent | Announcement) => { setEditTarget(item); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditTarget(null); };
    const openDeleteModal = (item: ChurchEvent | Announcement) => setDeleteTarget(item);
    const closeDeleteModal = () => setDeleteTarget(null);

    const handleSave = async (data: EventFormData) => {
        try {
            if (editTarget) {
                await AdminEventsService.updateEvent(editTarget.id, data);
                showToast(`"${data.title}" updated successfully.`);
            } else {
                // Pass the activeTab so the backend knows if it's an event or announcement
                await AdminEventsService.createEvent(data, activeTab);
                showToast(`"${data.title}" created.`);
            }
            closeModal();
            await loadAll();
        } catch {
            showToast('An error occurred. Please try again.', 'error');
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await AdminEventsService.deleteEvent(deleteTarget.id);

            // Optimistic UI update
            if (activeTab === 'event') {
                setEvents(prev => prev.filter(e => e.id !== deleteTarget.id));
            } else {
                setAnnouncements(prev => prev.filter(a => a.id !== deleteTarget.id));
            }

            showToast(`"${deleteTarget.title}" deleted.`);
            closeDeleteModal();
        } catch {
            showToast('Failed to delete.', 'error');
        }
    };

    return {
        activeTab, setActiveTab,
        events, announcements,
        filteredEvents, filteredAnnouncements,
        isLoading, error,
        search, setSearch,
        stats,
        showModal, editTarget, deleteTarget, toast,
        openCreateModal, openEditModal, closeModal,
        openDeleteModal, closeDeleteModal,
        handleSave, handleDelete,
        retry: loadAll,
    };
}