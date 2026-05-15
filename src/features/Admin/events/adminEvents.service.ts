// src/features/Admin/events/adminEvents.service.ts

import type { ChurchEvent, Announcement, EventFormData, ContentTab } from './adminEvents.types';

// Update this to your Render URL when you deploy!
const API_BASE = 'http://localhost:4000';

export const AdminEventsService = {
    /**
     * Fetches all active events
     */
    fetchEvents: async (): Promise<ChurchEvent[]> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/contents/admin/events`, {
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
        if (!response.ok) throw new Error('Failed to fetch events');
        const json = await response.json();
        return (json.data ?? json) as ChurchEvent[];
    },

    /**
     * Fetches all active announcements
     */
    fetchAnnouncements: async (): Promise<Announcement[]> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/contents/admin/announcements`, {
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
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

        // 'type_content' matches the backend API payload field name
        formData.append('type_content', type);
        formData.append('title', data.title);

        // status defaults to 'active' on the backend, but we send it explicitly for clarity
        formData.append('status', 'active');

        // Append optional text fields
        if (data.description) formData.append('description', data.description);
        if (data.location) formData.append('location', data.location);
        if (data.category_content) formData.append('category_content', data.category_content);

        // Only send start_date if the user actually filled it in
        if (data.start_date_date) {
            formData.append('start_date', JSON.stringify({
                date: data.start_date_date,
                time: data.start_date_time,
            }));
        }

        // end_date is optional
        if (data.end_date_date) {
            formData.append('end_date', JSON.stringify({
                date: data.end_date_date,
                time: data.end_date_time,
            }));
        }

        // Attach the image file if provided
        if (imageFile) {
            formData.append('image', imageFile);
        }

        // NOTE: user_id and church_id are NOT sent from the frontend.
        // The backend extracts them from the verified JWT token (req.user).
        const token = localStorage.getItem('token');

        // POST to the backend — do NOT set Content-Type; browser sets it with the correct boundary
        const response = await fetch(`${API_BASE}/api/contents/admin`, {
            method: 'POST',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: formData,
        });

        if (!response.ok) {
            let errorMsg = 'Failed to create content';
            try {
                const errorData = await response.json();
                // Surface the exact backend message to help diagnose 500s
                errorMsg = errorData.error ?? errorData.message ?? errorMsg;
                console.error('[createEvent] Backend error:', errorData);
            } catch {
                console.error('[createEvent] Could not parse error response body');
            }
            throw new Error(errorMsg);
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