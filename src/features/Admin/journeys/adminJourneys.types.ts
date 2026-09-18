// src/features/Admin/journeys/adminJourneys.types.ts

export type JourneyStatus = 'draft' | 'published' | 'archived';
export type PartStatus = 'active' | 'archived';
export type JourneyContentType = 'sunday_service' | 'devotional' | 'bible_study' | 'general';

export const CONTENT_TYPE_OPTIONS: { value: JourneyContentType; label: string }[] = [
    { value: 'sunday_service', label: 'Sermon Series' },
    { value: 'bible_study', label: 'Bible Study' },
    { value: 'devotional', label: 'Devotional' },
    { value: 'general', label: 'Discipleship Course' },
];

export interface CategoryOption {
    categoryId: string;
    name: string;
    sortOrder: number;
}

export interface JourneyPart {
    id: string;
    order: number;
    title: string;
    content: string;
    video_url: string;
    status: PartStatus;
    apiStatus?: JourneyStatus;
}

export interface Journey {
    id: string;
    title: string;
    description: string;
    summary: string;
    contentType: JourneyContentType;
    categories: string[];
    thumbnailUrl: string | null;
    status: JourneyStatus;
    parts: JourneyPart[];
    publishedParts: number;
    created_at: string;
    updated_at: string;
}

export interface JourneyFormData {
    title: string;
    description: string;
    summary: string;
    contentType: JourneyContentType;
    categories: string[];
    status: JourneyStatus;
    parts: JourneyPart[];
}

export interface JourneyQuery {
    search?: string;
    status?: JourneyStatus;
}

export const isNewPartId = (id: string) => id.startsWith('new-');

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
    summary: '',
    contentType: 'general',
    categories: [],
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
