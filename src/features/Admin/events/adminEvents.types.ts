// src/features/Admin/events/adminEvents.types.ts

export type ContentTab = 'event' | 'announcement';

// --- Database Payload Types ---
export interface MediaContent {
    id: number;
    content_id: number;
    media_type: string;
    file_url: string;
    created_at: string;
}

export interface ContentDate {
    date: string;
    time: string;
    day: string;
}

export interface ChurchEvent {
    id: number;
    type_content: string;
    title: string;
    category_content: string;
    description: string;
    location: string;
    start_date: ContentDate | null;
    end_date: ContentDate | null;
    media: MediaContent[];
}

export interface Announcement {
    id: number;
    type_content: string;
    title: string;
    category_content: string;
    description: string;
    start_date: string | null;
    end_date: string | null;
    media: MediaContent[];
    status?: string;
}

// --- Form State Types ---
export interface EventFormData {
    title: string;
    description: string;
    location: string;
    category_content: string;
    start_date_date: string;
    start_date_time: string;
    end_date_date: string;
    end_date_time: string;
}

export const EMPTY_FORM: EventFormData = {
    title: '',
    description: '',
    location: '',
    category_content: '',
    start_date_date: '',
    start_date_time: '',
    end_date_date: '',
    end_date_time: '',
};