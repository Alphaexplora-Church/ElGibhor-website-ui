// src/features/Admin/events/EventModal.tsx

import { useEffect, useRef, useState } from 'react';
import type { EventFormData } from './adminEvents.types';
import { EMPTY_FORM } from './adminEvents.types';

interface EventModalProps {
    open: boolean;
    initial?: EventFormData;
    onClose: () => void;
    /** Receives the form data AND the selected image file (if any) */
    onSave: (data: EventFormData, imageFile?: File) => void;
}

export function EventModal({ open, initial, onClose, onSave }: EventModalProps) {
    const [form, setForm] = useState<EventFormData>(initial ?? EMPTY_FORM);
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setForm(initial ?? EMPTY_FORM);
        // Reset image state when modal opens/closes
        setImageFile(undefined);
        setImagePreview(null);
    }, [initial, open]);

    if (!open) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const clearImage = () => {
        setImageFile(undefined);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
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
                            <input type="time" name="start_date_time" value={form.start_date_time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-gold text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">End Date (Optional)</h3>
                            <input type="date" name="end_date_date" value={form.end_date_date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                            <input type="time" name="end_date_time" value={form.end_date_time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-3">
                        <h3 className="text-gold text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">Cover Image (Optional)</h3>

                        {imagePreview ? (
                            <div className="relative rounded-xl overflow-hidden border border-white/10">
                                <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white text-xs hover:bg-red-600 transition-all"
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full border-2 border-dashed border-white/10 rounded-xl py-8 flex flex-col items-center gap-2 text-gray-500 hover:border-gold hover:text-gold transition-all"
                            >
                                <span className="text-2xl">📷</span>
                                <span className="text-xs font-bold uppercase tracking-wider">Click to upload image</span>
                            </button>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
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
                        onClick={() => onSave(form, imageFile)}
                        className="px-6 py-2.5 rounded-xl text-sm font-black bg-gold text-royal-purple-dark hover:bg-gold-light hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)]"
                    >
                        {initial ? 'Save Changes' : 'Create Content'}
                    </button>
                </div>
            </div>
        </div>
    );
}