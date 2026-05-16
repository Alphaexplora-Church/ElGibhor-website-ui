import type { ChurchEvent, Announcement } from './events.types';

// Vercel Ready: Kukunin ang link sa .env, kung wala, gagamitin ang live Render link.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const EventsService = {
    fetchEvents: async (): Promise<ChurchEvent[]> => {
        const response = await fetch(`${API_BASE_URL}/api/contents/public/events/2`);
        if (!response.ok) throw new Error('Failed to fetch events');
        const json = await response.json();
        return (json.data ?? json) as ChurchEvent[];
    },

    fetchAnnouncements: async (): Promise<Announcement[]> => {
        const response = await fetch(`${API_BASE_URL}/api/contents/public/announcements/2`);
        if (!response.ok) throw new Error('Failed to fetch announcements');
        const json = await response.json();
        return (json.data ?? json) as Announcement[];
    }
};