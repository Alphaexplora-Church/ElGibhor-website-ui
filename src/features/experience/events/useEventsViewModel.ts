// src/features/experience/events/useEventsViewModel.ts

// FIX: Added useEffect here
import { useState, useEffect } from 'react';
import { EventsService } from './events.service';
import type { ChurchEvent, Announcement } from './events.types';

export interface FormattedEvent {
    id: number;
    hasImage: boolean;
    img: string;
    title: string;
    desc: string;
    location: string;
    category: string;
    startFull: string;
    endFull: string | null;
}

export interface FormattedAnnouncement {
    id: number;
    title: string;
    date: string;
    tag: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80";

export function useEventsViewModel() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [featuredEvent, setFeaturedEvent] = useState<FormattedEvent | null>(null);
    const [secondaryEvents, setSecondaryEvents] = useState<FormattedEvent[]>([]);
    const [announcements, setAnnouncements] = useState<FormattedAnnouncement[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const [eventsData, announcementsData] = await Promise.all([
                    EventsService.fetchEvents(),
                    EventsService.fetchAnnouncements()
                ]);

                const formattedEvents: FormattedEvent[] = eventsData.map((ev: ChurchEvent) => {
                    const start = ev.start_date;
                    const startString = start ? `${start.day}, ${start.date} @ ${start.time}` : 'TBA';

                    const end = ev.end_date;
                    const endString = end ? `${end.day}, ${end.date} @ ${end.time}` : null;

                    const hasImage = !!(ev.media && ev.media.length > 0);

                    return {
                        id: ev.id,
                        hasImage,
                        img: hasImage ? ev.media[0].file_url : '',
                        title: ev.title,
                        desc: ev.description,
                        location: ev.location || 'TBA',
                        category: ev.category_content || 'Event',
                        startFull: startString,
                        endFull: endString
                    };
                });

                setFeaturedEvent(formattedEvents[0] || null);
                setSecondaryEvents(formattedEvents.slice(1, 4));

                const formattedAnnouncements: FormattedAnnouncement[] = announcementsData.map((ann: Announcement) => ({
                    id: ann.id,
                    title: ann.title,
                    tag: ann.category_content || 'General',
                    date: ann.start_date
                        ? new Date(ann.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : 'Ongoing'
                })).slice(0, 4);

                setAnnouncements(formattedAnnouncements);
            } catch (err) {
                console.error(err);
                setError('Failed to load experience data.');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return {
        isLoading,
        error,
        featuredEvent,
        secondaryEvents,
        announcements
    };
}