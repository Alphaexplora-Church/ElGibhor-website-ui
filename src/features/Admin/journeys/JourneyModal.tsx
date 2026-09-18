// src/features/Admin/journeys/JourneyModal.tsx

import { useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';
import { FiImage, FiLayers, FiLoader, FiPlus, FiX } from 'react-icons/fi';
import type { CategoryOption, Journey, JourneyFormData, JourneyPart, JourneyStatus } from './adminJourneys.types';
import { CONTENT_TYPE_OPTIONS, EMPTY_JOURNEY_FORM, EMPTY_PART, isNewPartId } from './adminJourneys.types';
import { AdminJourneysService } from './adminJourneys.service';
import { JourneyPartCard } from './JourneyPartCard';
import { JourneyPartEditModal } from './JourneyPartEditModal';

interface JourneyModalProps {
    open: boolean;
    initial?: Journey | null;
    isLoadingParts?: boolean;
    onClose: () => void;
    onSave: (data: JourneyFormData, thumbnailFile: File | null) => Promise<void>;
}

const STATUS_LABELS: Record<JourneyStatus, string> = {
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived',
};

const statusOptionsFor = (current?: JourneyStatus): JourneyStatus[] => {
    switch (current) {
        case 'draft': return ['draft', 'published', 'archived'];
        case 'published': return ['published', 'archived'];
        case 'archived': return ['archived', 'published'];
        default: return ['draft', 'published'];
    }
};

export function JourneyModal({ open, initial, isLoadingParts = false, onClose, onSave }: JourneyModalProps) {
    const [form, setForm] = useState<JourneyFormData>(EMPTY_JOURNEY_FORM);
    const [editingPartId, setEditingPartId] = useState<string | null>(null);
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>(AdminJourneysService.getCachedCategories);
    const [isSaving, setIsSaving] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initial?.thumbnailUrl ?? null);
    const [thumbnailError, setThumbnailError] = useState<string | null>(null);

    useEffect(() => {
        if (initial) {
            setForm({
                title: initial.title,
                description: initial.description,
                summary: initial.summary,
                contentType: initial.contentType,
                categories: initial.categories,
                status: initial.status,
                parts: initial.parts.map(p => ({ ...p })).sort((a, b) => a.order - b.order),
            });
        } else {
            setForm(EMPTY_JOURNEY_FORM);
        }
        setEditingPartId(null);
        setIsSaving(false);
        setThumbnailFile(null);
        setThumbnailPreview(initial?.thumbnailUrl ?? null);
        setThumbnailError(null);
    }, [initial, open]);

    useEffect(() => {
        if (!open) return;
        let cancelled = false;
        AdminJourneysService.fetchCategories()
            .then(options => { if (!cancelled) setCategoryOptions(options); })
            .catch(() => undefined);
        return () => { cancelled = true; };
    }, [open]);

    if (!open) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value as never }));
    };

    const toggleCategory = (name: string) => {
        setForm(prev => ({
            ...prev,
            categories: prev.categories.includes(name)
                ? prev.categories.filter(c => c !== name)
                : [...prev.categories, name],
        }));
    };

    const handleThumbnailChange = (file: File | null) => {
        if (!file) return;
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
            setThumbnailError('Please choose a JPEG, PNG, WebP or GIF image.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setThumbnailError('That image is larger than 5MB.');
            return;
        }
        setThumbnailError(null);
        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    // ── Parts management ────────────────────────────────────────────────
    const addPart = () => {
        const newPart = EMPTY_PART(form.parts.length);
        setForm(prev => ({ ...prev, parts: [...prev.parts, newPart] }));
        setEditingPartId(newPart.id);
    };

    const removePart = (id: string) => {
        if (!isNewPartId(id)) return;
        setForm(prev => ({
            ...prev,
            parts: prev.parts.filter(p => p.id !== id).map((p, i) => ({ ...p, order: i })),
        }));
    };

    const togglePartStatus = (id: string) => {
        setForm(prev => ({
            ...prev,
            parts: prev.parts.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'archived' : 'active' } : p),
        }));
    };

    const savePartEdit = (updated: JourneyPart) => {
        setForm(prev => ({
            ...prev,
            parts: prev.parts.map(p => p.id === updated.id ? updated : p),
        }));
        setEditingPartId(null);
    };

    // Reorder.Group hands back the full re-ordered array on drag end
    const handleReorder = (newOrder: JourneyPart[]) => {
        setForm(prev => ({ ...prev, parts: newOrder.map((p, i) => ({ ...p, order: i })) }));
    };

    const handleSubmit = async () => {
        if (isSaving) return;
        setIsSaving(true);
        try {
            await onSave(form, thumbnailFile);
        } finally {
            setIsSaving(false);
        }
    };

    const editingPart = form.parts.find(p => p.id === editingPartId) ?? null;
    const editingPartNumber = form.parts.findIndex(p => p.id === editingPartId) + 1;
    const canSave = form.title.trim().length > 0 && form.parts.every(p => p.title.trim().length > 0) && !isLoadingParts && !isSaving;

    return (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-background-dark border border-white/10 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">

                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <h2 className="font-black text-2xl text-white tracking-tight">
                        {initial ? 'Edit Journey' : 'New Journey'}
                    </h2>
                    <button onClick={onClose} disabled={isSaving} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-40">
                        <FiX className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                    {/* General Details */}
                    <div className="space-y-4">
                        <h3 className="text-gold text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2 mb-4">General Details</h3>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. The Road to Emmaus"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="What is this journey about?"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                    Thumbnail <span className="normal-case font-medium text-gray-600">(optional)</span>
                                </label>
                                <div className="flex items-center gap-4">
                                    {thumbnailPreview ? (
                                        <img src={thumbnailPreview} alt="" className="h-20 w-32 shrink-0 rounded-xl object-cover border border-white/10" />
                                    ) : (
                                        <div className="grid h-20 w-32 shrink-0 place-items-center rounded-xl bg-white/5 border border-white/10 text-gray-600">
                                            <FiImage className="w-5 h-5" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        onChange={e => handleThumbnailChange(e.target.files?.[0] ?? null)}
                                        className="text-sm text-gray-400 file:mr-3 file:rounded-lg file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-bold file:text-royal-purple-dark hover:file:bg-gold-light file:cursor-pointer"
                                    />
                                </div>
                                {thumbnailError && <p className="mt-2 text-xs font-bold text-red-400">{thumbnailError}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Content Type</label>
                                <select
                                    name="contentType"
                                    value={form.contentType}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                >
                                    {CONTENT_TYPE_OPTIONS.map(opt => (
                                        <option key={opt.value} className="bg-background-dark" value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                    Summary <span className="normal-case font-medium text-gray-600">(optional)</span>
                                </label>
                                <input
                                    name="summary"
                                    value={form.summary}
                                    onChange={handleChange}
                                    placeholder="Short teaser for listings"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Categories</label>
                                <div className="flex flex-wrap gap-2 min-h-8">
                                    {categoryOptions.map(opt => {
                                        const active = form.categories.includes(opt.name);
                                        return (
                                            <button
                                                key={opt.categoryId}
                                                type="button"
                                                onClick={() => toggleCategory(opt.name)}
                                                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all
                                                    ${active
                                                        ? 'bg-gold text-royal-purple-dark border-gold'
                                                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-gold/40 hover:text-gold'}`}
                                            >
                                                {opt.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                >
                                    {statusOptionsFor(initial?.status).map(s => (
                                        <option key={s} className="bg-background-dark" value={s}>{STATUS_LABELS[s]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Series / Parts Manager */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <h3 className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <FiLayers className="w-3.5 h-3.5" />
                                Series Parts ({form.parts.length})
                            </h3>
                            <button
                                type="button"
                                onClick={addPart}
                                disabled={isLoadingParts}
                                className="text-xs font-bold text-gold hover:text-gold-light flex items-center gap-1.5 disabled:opacity-40"
                            >
                                <FiPlus className="w-3.5 h-3.5" />
                                Add Part
                            </button>
                        </div>

                        {isLoadingParts ? (
                            <div className="border-2 border-dashed border-white/10 rounded-xl py-8 flex items-center justify-center gap-2 text-gray-500 text-sm">
                                <FiLoader className="w-4 h-4 animate-spin" />
                                Loading parts...
                            </div>
                        ) : form.parts.length === 0 ? (
                            <div className="border-2 border-dashed border-white/10 rounded-xl py-8 text-center text-gray-500 text-sm">
                                No parts yet. Click "Add Part" to start building the series.
                            </div>
                        ) : (
                            <Reorder.Group
                                axis="y"
                                values={form.parts}
                                onReorder={handleReorder}
                                className="space-y-2"
                            >
                                {form.parts.map((part, index) => (
                                    <JourneyPartCard
                                        key={part.id}
                                        part={part}
                                        index={index}
                                        onEdit={() => setEditingPartId(part.id)}
                                        onToggleStatus={() => togglePartStatus(part.id)}
                                        onRemove={() => removePart(part.id)}
                                    />
                                ))}
                            </Reorder.Group>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-white/5 bg-white/[0.02] flex justify-end gap-3">
                    <button onClick={onClose} disabled={isSaving} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-40">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!canSave}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black bg-gold text-royal-purple-dark hover:bg-gold-light hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)] disabled:opacity-40 disabled:hover:scale-100"
                    >
                        {isSaving && <FiLoader className="w-4 h-4 animate-spin" />}
                        {isSaving ? 'Saving...' : initial ? 'Save Changes' : 'Create Journey'}
                    </button>
                </div>
            </div>

            {/* Nested part editor */}
            <JourneyPartEditModal
                open={editingPartId !== null}
                part={editingPart}
                partNumber={editingPartNumber}
                onClose={() => setEditingPartId(null)}
                onSave={savePartEdit}
            />
        </div>
    );
}
