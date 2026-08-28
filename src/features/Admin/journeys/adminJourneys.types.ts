// src/features/Admin/journeys/adminJourneys.types.ts

export type JourneyStatus = 'draft' | 'published' | 'archived';
export type PartStatus = 'active' | 'archived';

export interface JourneyPart {
    id: string;               // client-generated (new) or server id (existing) — always a string
    order: number;
    title: string;
    content: string;          // text content
    video_url: string;        // video embed URL
    status: PartStatus;
}

export interface Journey {
    id: number;
    title: string;
    description: string;
    status: JourneyStatus;
    parts: JourneyPart[];
    created_at: string;
    updated_at: string;
}

export interface JourneyFormData {
    title: string;
    description: string;
    status: JourneyStatus;
    parts: JourneyPart[];
}

export const EMPTY_PART = (order: number): JourneyPart => ({
    id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    order,
    title: '',
    content: '',
    video_url: '',
    status: 'active',
});

export const EMPTY_JOURNEY_FORM: JourneyFormData = {
    title: '',
    description: '',
    status: 'draft',
    parts: [],
};

export interface JourneyFilters {
    status: JourneyStatus | 'all';
    sortBy: 'created_at' | 'updated_at';
    sortDir: 'asc' | 'desc';
}

export const DEFAULT_FILTERS: JourneyFilters = {
    status: 'all',
    sortBy: 'updated_at',
    sortDir: 'desc',
};
