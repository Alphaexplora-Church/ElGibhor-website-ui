// src/features/Admin/events/adminEvents.service.ts

import type { ChurchEvent, Announcement, EventFormData, ContentTab } from './adminEvents.types';

// Update this to your Render URL when you deploy!
const API_BASE = 'http://localhost:4000';

export const AdminEventsService = {
    /**
     * Fetches all active events
     */
    fetchEvents: async (): Promise<ChurchEvent[]> => {
        const response = await fetch(`${API_BASE}/api/contents/public/events`);
        if (!response.ok) throw new Error('Failed to fetch events');
        const json = await response.json();
        return (json.data ?? json) as ChurchEvent[];
    },

    /**
     * Fetches all active announcements
     */
    fetchAnnouncements: async (): Promise<Announcement[]> => {
        const response = await fetch(`${API_BASE}/api/contents/public/announcements`);
        if (!response.ok) throw new Error('Failed to fetch announcements');
        const json = await response.json();
        return (json.data ?? json) as Announcement[];
    },

    /**
     * Creates a new event or announcement.
     * Uses FormData to support image uploads via Multer on the backend.
     */
    createEvent: async (data: EventFormData, type: ContentTab, imageFile?: File): Promise<void> => {
        const formData = new FormData();

        // Append required text fields
        formData.append('type', type);
        formData.append('title', data.title);

        // Append optional text fields
        if (data.description) formData.append('description', data.description);
        if (data.location) formData.append('location', data.location);
        if (data.category_content) formData.append('category_content', data.category_content);

        // Stringify complex nested objects for FormData
        formData.append('start_date', JSON.stringify({
            date: data.start_date_date,
            time: data.start_date_time,
            day: data.start_date_day
        }));

        if (data.end_date_date) {
            formData.append('end_date', JSON.stringify({
                date: data.end_date_date,
                time: data.end_date_time,
                day: data.end_date_day
            }));
        }

        // Attach the image file if present
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const token = localStorage.getItem('token');

        // POST to the backend (Notice: NO 'Content-Type': 'application/json' header!)
        const response = await fetch(`${API_BASE}/api/contents/admin`, {
            method: 'POST',
            headers: {
                // Only send the Authorization header if we have a token
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to create content');
        }
    },

    /**
     * Updates an existing event by ID.
     */
    updateEvent: async (id: number, data: EventFormData): Promise<void> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/contents/admin/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Update failed');
    },

    /**
     * Deletes an event by ID.
     */
    deleteEvent: async (id: number): Promise<void> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/contents/admin/${id}`, {
            method: 'DELETE',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });

        if (!response.ok) throw new Error('Delete failed');
    },
};