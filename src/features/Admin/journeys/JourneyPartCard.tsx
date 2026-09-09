// src/features/Admin/journeys/JourneyPartCard.tsx

import { useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { FiArchive, FiEdit2, FiRotateCcw, FiTrash2 } from 'react-icons/fi';
import { RxDragHandleDots2 } from 'react-icons/rx';
import type { JourneyPart } from './adminJourneys.types';

interface JourneyPartCardProps {
    part: JourneyPart;
    index: number;
    onEdit: () => void;
    onToggleStatus: () => void;
    onRemove: () => void;
}

export function JourneyPartCard({ part, index, onEdit, onToggleStatus, onRemove }: JourneyPartCardProps) {
    const dragControls = useDragControls();
    const isArchived = part.status === 'archived';

    // Drive the "lifted" look off explicit state instead of `whileDrag`.
    // `whileDrag` occasionally fails to revert when the drag is started via
    // external dragControls on a nested handle, leaving the card visually
    // stuck at its scaled-up size after drop. Tracking drag state ourselves
    // and animating with `animate` guarantees it always resets.
    const [isDragging, setIsDragging] = useState(false);

    return (
        <Reorder.Item
            value={part}
            dragListener={false}
            dragControls={dragControls}
            layout="position"
            animate={{
                scale: isDragging ? 1.03 : 1,
                boxShadow: isDragging ? '0 12px 30px rgba(0,0,0,0.45)' : '0 0px 0px rgba(0,0,0,0)',
            }}
            transition={{ duration: 0.15 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            style={{ position: 'relative', zIndex: isDragging ? 10 : 1 }}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5
                ${isArchived ? 'border-white/5 bg-white/[0.01] opacity-60' : 'border-white/10 bg-white/[0.03]'}`}
        >
            {/* Drag handle — only this triggers the drag */}
            <button
                type="button"
                onPointerDown={e => dragControls.start(e)}
                onPointerUp={() => setIsDragging(false)}
                className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gold flex-shrink-0 touch-none"
                title="Drag to reorder"
            >
                <RxDragHandleDots2 className="w-5 h-5" />
            </button>

            {/* Order badge */}
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gold/10 text-gold text-[11px] font-black flex-shrink-0">
                {index + 1}
            </span>

            {/* Title */}
            <button type="button" onClick={onEdit} className="flex-1 min-w-0 text-left">
                <span className="block truncate font-bold text-white text-sm">
                    {part.title || 'Untitled Part'}
                </span>
            </button>

            {isArchived && (
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 flex-shrink-0">Archived</span>
            )}

            {/* Actions */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
                <button type="button" onClick={onEdit} title="Edit part"
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gold hover:bg-gold/10 transition-all">
                    <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={onToggleStatus} title={isArchived ? 'Restore part' : 'Archive part'}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gold hover:bg-gold/10 transition-all">
                    {isArchived ? <FiRotateCcw className="w-3.5 h-3.5" /> : <FiArchive className="w-3.5 h-3.5" />}
                </button>
                <button type="button" onClick={onRemove} title="Remove part"
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <FiTrash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </Reorder.Item>
    );
}
