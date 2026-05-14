// src/features/Admin/events/EventModal.tsx

import { useEffect, useState } from 'react';
import type { EventFormData } from './adminEvents.types';
import { EMPTY_FORM } from './adminEvents.types';

interface EventModalProps {
    open: boolean;
    initial?: EventFormData;
    onClose: () => void;
    onSave: (data: EventFormData) => void;
}

export function EventModal({ open, initial, onClose, onSave }: EventModalProps) {
    const [form, setForm] = useState<EventFormData>(initial ?? EMPTY_FORM);

    useEffect(() => {
        setForm(initial ?? EMPTY_FORM);
    }, [initial, open]);

    if (!open) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-background-dark border border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <h2 className="font-black text-2xl text-white tracking-tight">
                        {initial ? 'Edit Content' : 'New Content'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        ×
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                    {/* General Info */}
                    <div className="space-y-4">
                        <h3 className="text-gold text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2 mb-4">General Details</h3>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Sunday Worship Service"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Location</label>
                                <input
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Main Sanctuary"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Category</label>
                                <input
                                    name="category_content"
                                    value={form.category_content}
                                    onChange={handleChange}
                                    placeholder="e.g. Worship, Youth"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Write the details here..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Dates (Events mostly need this) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-gold text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">Start Date</h3>
                            <input type="date" name="start_date_date" value={form.start_date_date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="time" name="start_date_time" value={form.start_date_time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                                <input type="text" name="start_date_day" value={form.start_date_day} onChange={handleChange} placeholder="Day (e.g. Sun)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-gold text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">End Date (Optional)</h3>
                            <input type="date" name="end_date_date" value={form.end_date_date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="time" name="end_date_time" value={form.end_date_time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                                <input type="text" name="end_date_day" value={form.end_date_day} onChange={handleChange} placeholder="Day (e.g. Mon)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-white/5 bg-white/[0.02] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        className="px-6 py-2.5 rounded-xl text-sm font-black bg-gold text-royal-purple-dark hover:bg-gold-light hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)]"
                    >
                        {initial ? 'Save Changes' : 'Create Content'}
                    </button>
                </div>
            </div>
        </div>
    );
}