// Define exactly what the API returns based on your payloads
export interface MediaContent {
    file_url: string;
}

export interface ContentDate {
    date: string;
    time: string;
    day: string;
}

export interface ChurchEvent {
    id: number;
    title: string;
    description: string;
    location: string;
    start_date: ContentDate | null;
    media: MediaContent[];
}

export interface Announcement {
    id: number;
    title: string;
    category_content: string;
    start_date: string | null;
    media: MediaContent[];
}