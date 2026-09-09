// src/features/Admin/journeys/JourneyPartEditModal.tsx

import { useEffect, useState } from 'react';
import { FiFilm, FiX } from 'react-icons/fi';
import type { JourneyPart } from './adminJourneys.types';

interface JourneyPartEditModalProps {
    open: boolean;
    part: JourneyPart | null;
    partNumber: number;
    onClose: () => void;
    onSave: (updated: JourneyPart) => void;
}

/** Converts common share URLs (YouTube / Vimeo) into embeddable iframe URLs. Falls back to the raw URL. */
function toEmbedUrl(url: string): string | null {
    if (!url) return null;
    try {
        const u = new URL(url.trim());
        if (u.hostname.includes('youtu.be')) {
            const id = u.pathname.replace('/', '');
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }
        if (u.hostname.includes('youtube.com')) {
            if (u.pathname.startsWith('/embed/')) return u.toString();
            const id = u.searchParams.get('v');
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }
        if (u.hostname.includes('vimeo.com')) {
            const id = u.pathname.split('/').filter(Boolean).pop();
            return id ? `https://player.vimeo.com/video/${id}` : null;
        }
        return u.toString();
    } catch {
        return null;
    }
}

export function JourneyPartEditModal({ open, part, partNumber, onClose, onSave }: JourneyPartEditModalProps) {
    const [draft, setDraft] = useState<JourneyPart | null>(part);

    useEffect(() => { setDraft(part); }, [part, open]);

    if (!open || !draft) return null;

    const embedUrl = toEmbedUrl(draft.video_url);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
            <div className="bg-background-dark border border-white/10 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[88vh]">

                {/* Header */}
                <div className="px-7 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gold/10 text-gold text-xs font-black flex-shrink-0">{partNumber}</span>
                        <h2 className="font-black text-xl text-white tracking-tight truncate">
                            Edit Part
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                        <FiX className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-7 space-y-5 overflow-y-auto custom-scrollbar">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Part Title</label>
                        <input
                            value={draft.title}
                            onChange={e => setDraft({ ...draft, title: e.target.value })}
                            placeholder="e.g. Part 1: The Beginning"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Text Content</label>
                        <textarea
                            value={draft.content}
                            onChange={e => setDraft({ ...draft, content: e.target.value })}
                            rows={5}
                            placeholder="Write the part's content here..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Video Embed URL</label>
                        <input
                            value={draft.video_url}
                            onChange={e => setDraft({ ...draft, video_url: e.target.value })}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Live Preview</label>
                        <div className="w-full aspect-video bg-white/5 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    title={draft.title || 'Video preview'}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-600">
                                    <FiFilm className="w-6 h-6" />
                                    <span className="text-xs">No video URL yet</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-7 py-4 border-t border-white/5 bg-white/[0.02] flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(draft)}
                        className="px-6 py-2.5 rounded-xl text-sm font-black bg-gold text-royal-purple-dark hover:bg-gold-light hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)]"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
