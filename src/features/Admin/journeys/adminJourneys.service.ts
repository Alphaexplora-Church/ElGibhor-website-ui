// src/features/Admin/journeys/adminJourneys.service.ts

import type { CategoryOption, Journey, JourneyContentType, JourneyFormData, JourneyPart, JourneyQuery, JourneyStatus } from './adminJourneys.types';
import { isNewPartId } from './adminJourneys.types';

// Vercel Ready: reads from env variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

const handleError = async (response: Response, fallback: string) => {
    let msg = `${fallback} (${response.status})`;
    try {
        const errorData = await response.json();
        msg = errorData.error?.message ?? errorData.error ?? errorData.message ?? msg;
    } catch {
        // no-op — body wasn't JSON
    }
    throw new Error(msg);
};

interface ApiJourneyRow {
    journeyId: string;
    title: string;
    description: string | null;
    summary: string | null;
    contentType: JourneyContentType | null;
    thumbnailUrl: string | null;
    categories: string[] | null;
    status: JourneyStatus;
    totalPublishedParts: number;
    createdAt: string;
    updatedAt: string;
}

interface ApiPartRow {
    partId: string;
    partOrder: number;
    title: string;
    mediaUrl: string | null;
    readingText: string | null;
    status: JourneyStatus;
}

const toJourney = (row: ApiJourneyRow): Journey => ({
    id: row.journeyId,
    title: row.title,
    description: row.description ?? '',
    summary: row.summary ?? '',
    contentType: row.contentType ?? 'general',
    categories: row.categories ?? [],
    thumbnailUrl: row.thumbnailUrl ?? null,
    status: row.status,
    parts: [],
    publishedParts: row.totalPublishedParts ?? 0,
    created_at: row.createdAt,
    updated_at: row.updatedAt,
});

const toPart = (row: ApiPartRow): JourneyPart => ({
    id: row.partId,
    order: row.partOrder,
    title: row.title,
    content: row.readingText ?? '',
    video_url: row.mediaUrl ?? '',
    status: row.status === 'archived' ? 'archived' : 'active',
    apiStatus: row.status,
});

let categoryCatalog: CategoryOption[] | null = null;

const fetchCategories = async (): Promise<CategoryOption[]> => {
    if (categoryCatalog) return categoryCatalog;
    const response = await fetch(`${API_BASE_URL}/api/journeys/public/categories`);
    if (!response.ok) await handleError(response, 'Failed to load categories');
    const json = await response.json() as { categories?: CategoryOption[] };
    categoryCatalog = [...(json.categories ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
    return categoryCatalog;
};

const getCachedCategories = (): CategoryOption[] => categoryCatalog ?? [];

const toCategoryIds = async (names: string[]): Promise<string[]> => {
    const catalog = await fetchCategories();
    const idByName = new Map(catalog.map(option => [option.name.toLowerCase(), option.categoryId]));
    return names.map(name => {
        const id = idByName.get(name.toLowerCase());
        if (!id) throw new Error(`"${name}" is not a valid category.`);
        return id;
    });
};

const journeyBody = async (data: JourneyFormData, thumbnailFile?: File | null): Promise<BodyInit> => {
    const categoryIds = await toCategoryIds(data.categories);

    if (!thumbnailFile) {
        return JSON.stringify({
            title: data.title.trim(),
            description: data.description.trim(),
            summary: data.summary.trim() || null,
            content_type: data.contentType,
            category_ids: categoryIds,
        });
    }

    const form = new FormData();
    form.append('title', data.title.trim());
    form.append('description', data.description.trim());
    form.append('summary', data.summary.trim());
    form.append('content_type', data.contentType);
    form.append('category_ids', categoryIds.join(','));
    form.append('image', thumbnailFile);
    return form;
};

const mediaTypeFor = (url: string): string | null => {
    const trimmed = url.trim();
    if (!trimmed) return null;
    if (/youtube\.com|youtu\.be/i.test(trimmed)) return 'youtube';
    if (/vimeo\.com/i.test(trimmed)) return 'vimeo';
    return null;
};

const partBody = (part: JourneyPart) => ({
    title: part.title.trim(),
    media_url: part.video_url.trim() || null,
    media_type: mediaTypeFor(part.video_url),
    reading_text: part.content.trim() || null,
});

const hasContent = (part: JourneyPart) => Boolean(part.video_url.trim() || part.content.trim());

const sameContent = (staged: JourneyPart, server: JourneyPart) =>
    staged.title.trim() === server.title
    && staged.video_url.trim() === server.video_url
    && staged.content.trim() === server.content;

const send = async (url: string, init: RequestInit, fallback: string) => {
    const headers = authHeaders();
    if (init.body instanceof FormData) delete headers['Content-Type'];
    const response = await fetch(url, { ...init, headers });
    if (!response.ok) await handleError(response, fallback);
    return response;
};

const partsUrl = (journeyId: string) => `${API_BASE_URL}/api/journeys/admin/${journeyId}/parts`;

const syncParts = async (journeyId: string, staged: JourneyPart[], serverParts: JourneyPart[]): Promise<string[]> => {
    const serverById = new Map(serverParts.map(part => [part.id, part]));
    const orderedIds: string[] = [];

    for (const part of staged) {
        const before = isNewPartId(part.id) ? undefined : serverById.get(part.id);
        let partId = part.id;
        const apiStatus: JourneyStatus = before?.apiStatus ?? 'draft';

        if (!before) {
            const created = await send(partsUrl(journeyId), {
                method: 'POST',
                body: JSON.stringify({ title: part.title.trim() }),
            }, `Failed to add "${part.title}"`);
            partId = (await created.json() as { partId: string }).partId;
            if (hasContent(part)) {
                await send(`${partsUrl(journeyId)}/${partId}`, {
                    method: 'PUT',
                    body: JSON.stringify(partBody(part)),
                }, `Failed to save "${part.title}"`);
            }
        } else if (!sameContent(part, before)) {
            await send(`${partsUrl(journeyId)}/${partId}`, {
                method: 'PUT',
                body: JSON.stringify(partBody(part)),
            }, `Failed to save "${part.title}"`);
        }

        orderedIds.push(partId);

        if (part.status === 'archived' && apiStatus !== 'archived') {
            await send(`${partsUrl(journeyId)}/${partId}/archive`, { method: 'PATCH' },
                `Failed to archive "${part.title}"`);
        } else if (part.status === 'active' && apiStatus !== 'published' && hasContent(part)) {
            await send(`${partsUrl(journeyId)}/${partId}/publish`, {
                method: 'PATCH',
                body: JSON.stringify({ status: 'published' }),
            }, `Failed to publish "${part.title}"`);
        }
    }

    return orderedIds;
};

const applyStatus = async (id: string, from: JourneyStatus, to: JourneyStatus) => {
    if (from === to) return;
    if (to === 'draft') {
        throw new Error('A journey cannot be moved back to draft. Archive it instead.');
    }
    const path = to === 'archived' ? 'archive' : 'publish';
    await send(`${API_BASE_URL}/api/journeys/admin/${id}/${path}`, { method: 'PATCH' },
        to === 'archived' ? 'Failed to archive the journey' : 'Failed to publish the journey');
};

const reorderIfChanged = async (id: string, orderedIds: string[], serverOrder: string[]) => {
    if (orderedIds.length < 2 || orderedIds.length < serverOrder.length) return;
    if (orderedIds.join(',') === serverOrder.join(',')) return;
    await send(`${partsUrl(id)}/reorder`, {
        method: 'PATCH',
        body: JSON.stringify({ orderedPartIds: orderedIds }),
    }, 'Failed to save the part order');
};

export const AdminJourneysService = {
    fetchCategories,
    getCachedCategories,

    fetchJourneys: async (query: JourneyQuery = {}): Promise<Journey[]> => {
        const params = new URLSearchParams({ limit: '50' });
        if (query.search) params.set('search', query.search);
        if (query.status) params.set('status', query.status);
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin?${params.toString()}`, {
            headers: authHeaders(),
        });
        if (!response.ok) await handleError(response, 'Failed to fetch journeys');
        const json = await response.json() as { journeys?: ApiJourneyRow[] };
        return (json.journeys ?? []).map(toJourney);
    },

    fetchJourneyDetail: async (id: string): Promise<Journey> => {
        const response = await fetch(`${API_BASE_URL}/api/journeys/admin/${id}`, {
            headers: authHeaders(),
        });
        if (!response.ok) await handleError(response, 'Failed to load journey');
        const json = await response.json() as { journey: ApiJourneyRow; parts?: ApiPartRow[] };
        return {
            ...toJourney(json.journey),
            parts: (json.parts ?? []).map(toPart).sort((a, b) => a.order - b.order),
        };
    },

    createJourney: async (data: JourneyFormData, thumbnailFile?: File | null): Promise<Journey> => {
        const created = await send(`${API_BASE_URL}/api/journeys/admin`, {
            method: 'POST',
            body: await journeyBody(data, thumbnailFile),
        }, 'Failed to create journey');
        const { journeyId } = await created.json() as { journeyId: string };

        const orderedIds = await syncParts(journeyId, data.parts, []);
        await reorderIfChanged(journeyId, orderedIds, []);
        await applyStatus(journeyId, 'draft', data.status);

        return AdminJourneysService.fetchJourneyDetail(journeyId);
    },

    updateJourney: async (id: string, data: JourneyFormData, thumbnailFile?: File | null): Promise<Journey> => {
        await send(`${API_BASE_URL}/api/journeys/admin/${id}`, {
            method: 'PATCH',
            body: await journeyBody(data, thumbnailFile),
        }, 'Failed to update journey');

        const before = await AdminJourneysService.fetchJourneyDetail(id);
        const orderedIds = await syncParts(id, data.parts, before.parts);
        await reorderIfChanged(id, orderedIds, before.parts.map(part => part.id));
        await applyStatus(id, before.status, data.status);

        return AdminJourneysService.fetchJourneyDetail(id);
    },

    setStatus: async (journey: Journey, status: JourneyStatus): Promise<void> => {
        await applyStatus(journey.id, journey.status, status);
    },
};
