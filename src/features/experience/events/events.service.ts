import type { ChurchEvent, Announcement } from './events.types';

const API_BASE = 'http://localhost:4000';

export const EventsService = {
    fetchEvents: async (): Promise<ChurchEvent[]> => {
        const response = await fetch(`${API_BASE}/api/contents/public/events`);
        if (!response.ok) throw new Error('Failed to fetch events');
        const json = await response.json();
        return (json.data ?? json) as ChurchEvent[];
    },

    fetchAnnouncements: async (): Promise<Announcement[]> => {
        const response = await fetch(`${API_BASE}/api/contents/public/announcements`);
        if (!response.ok) throw new Error('Failed to fetch an nouncements');
        const json = await response.json();
        return (json.data ?? json) as Announcement[];
    }
};