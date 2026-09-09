// src/features/Admin/journeys/JourneyModal.tsx

import { useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';
import { FiLayers, FiPlus, FiX } from 'react-icons/fi';
import type { Journey, JourneyFormData, JourneyPart } from './adminJourneys.types';
import { EMPTY_JOURNEY_FORM, EMPTY_PART } from './adminJourneys.types';
import { JourneyPartCard } from './JourneyPartCard';
import { JourneyPartEditModal } from './JourneyPartEditModal';

interface JourneyModalProps {
    open: boolean;
    initial?: Journey | null;
    onClose: () => void;
    onSave: (data: JourneyFormData) => void;
}

export function JourneyModal({ open, initial, onClose, onSave }: JourneyModalProps) {
    const [form, setForm] = useState<JourneyFormData>(EMPTY_JOURNEY_FORM);
    const [editingPartId, setEditingPartId] = useState<string | null>(null);

    useEffect(() => {
        if (initial) {
            setForm({
                title: initial.title,
                description: initial.description,
                status: initial.status,
                parts: initial.parts.map(p => ({ ...p })).sort((a, b) => a.order - b.order),
            });
        } else {
            setForm(EMPTY_JOURNEY_FORM);
        }
        setEditingPartId(null);
    }, [initial, open]);

    if (!open) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value as never }));
    };

    // ── Parts management ────────────────────────────────────────────────
    const addPart = () => {
        const newPart = EMPTY_PART(form.parts.length);
        setForm(prev => ({ ...prev, parts: [...prev.parts, newPart] }));
        setEditingPartId(newPart.id);
    };

    const removePart = (id: string) => {
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

    const editingPart = form.parts.find(p => p.id === editingPartId) ?? null;
    const editingPartNumber = form.parts.findIndex(p => p.id === editingPartId) + 1;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-background-dark border border-white/10 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">

                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <h2 className="font-black text-2xl text-white tracking-tight">
                        {initial ? 'Edit Journey' : 'New Journey'}
                    </h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
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
                                    rows={3}
                                    placeholder="What is this journey about?"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                >
                                    <option className="bg-background-dark" value="draft">Draft</option>
                                    <option className="bg-background-dark" value="published">Published</option>
                                    <option className="bg-background-dark" value="archived">Archived</option>
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
                                className="text-xs font-bold text-gold hover:text-gold-light flex items-center gap-1.5"
                            >
                                <FiPlus className="w-3.5 h-3.5" />
                                Add Part
                            </button>
                        </div>

                        {form.parts.length === 0 ? (
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
                    <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        disabled={!form.title.trim()}
                        className="px-6 py-2.5 rounded-xl text-sm font-black bg-gold text-royal-purple-dark hover:bg-gold-light hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)] disabled:opacity-40 disabled:hover:scale-100"
                    >
                        {initial ? 'Save Changes' : 'Create Journey'}
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
