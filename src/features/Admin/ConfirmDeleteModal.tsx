// src/features/Admin/events/ConfirmDeleteModal.tsx

interface ConfirmDeleteModalProps {
    open: boolean;
    eventTitle: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export function ConfirmDeleteModal({ open, eventTitle, onCancel, onConfirm }: ConfirmDeleteModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-background-dark border border-white/10 rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center relative overflow-hidden">
                {/* Background red glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 blur-[50px] pointer-events-none"></div>

                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 relative z-10">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>

                <h3 className="font-black text-2xl text-white mb-2 tracking-tight relative z-10">Delete Content?</h3>
                <p className="text-sm text-gray-400 mb-8 relative z-10">
                    "<span className="font-bold text-white">{eventTitle}</span>" will be permanently removed. This cannot be undone.
                </p>

                <div className="flex gap-3 justify-center relative z-10">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-xl text-sm font-bold bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}