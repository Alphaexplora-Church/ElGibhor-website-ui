// src/features/Admin/journeys/adminJourneys.service.ts

import type { Journey, JourneyFormData, JourneyStatus, PartStatus } from './adminJourneys.types';

// Vercel Ready: reads from env variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

const handleError = async (response: Response, fallback: string) => {
    let msg = fallback;
    try {
        const errorData = await response.json();
        msg = errorData.error ?? errorData.message ?? fallback;
    } catch {
        // no-op — body wasn't JSON
    }
    throw new Error(msg);
};

export const AdminJourneysService = {
    /** Fetches all journeys (all statuses — filtering happens client-side) */
    fetchJourneys: async (): Promise<Journey[]> => {
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin`, {
            headers: authHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch journeys');
        const json = await response.json();
        return (json.data ?? json) as Journey[];
    },

    /** Creates a new journey, including its ordered parts */
    createJourney: async (data: JourneyFormData): Promise<Journey> => {
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) await handleError(response, 'Failed to create journey');
        const json = await response.json();
        return (json.data ?? json) as Journey;
    },

    /** Updates an existing journey's details + parts */
    updateJourney: async (id: number, data: JourneyFormData): Promise<Journey> => {
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin/${id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) await handleError(response, 'Failed to update journey');
        const json = await response.json();
        return (json.data ?? json) as Journey;
    },

    /** Deletes a journey permanently */
    deleteJourney: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
        if (!response.ok) await handleError(response, 'Failed to delete journey');
    },

    /** Publish / Unpublish / Archive / Restore — all are just status transitions */
    setStatus: async (id: number, status: JourneyStatus): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin/${id}/status`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify({ status }),
        });
        if (!response.ok) await handleError(response, 'Failed to update status');
    },

    /** Archive / Restore an individual part without touching the rest of the journey */
    setPartStatus: async (journeyId: number, partId: string, status: PartStatus): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin/${journeyId}/parts/${partId}/status`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify({ status }),
        });
        if (!response.ok) await handleError(response, 'Failed to update part status');
    },

    /** Persists new part order after a drag-and-drop reorder */
    reorderParts: async (journeyId: number, orderedPartIds: string[]): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin/${journeyId}/parts/reorder`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify({ partIds: orderedPartIds }),
        });
        if (!response.ok) await handleError(response, 'Failed to reorder parts');
    },
};
