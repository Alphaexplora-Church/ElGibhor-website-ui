// src/shared/components/planVisit/usePlanVisitViewModel.ts

import { useState, useEffect } from 'react';
import type { PlanVisitFormData } from './planVisit.types';
import { EMPTY_PLAN_VISIT_FORM } from './planVisit.types';
import { PlanVisitService } from './planVisit.service';

export interface PlanVisitViewModel {
    // Form data
    formData: PlanVisitFormData;
    setField: <K extends keyof PlanVisitFormData>(key: K, value: PlanVisitFormData[K]) => void;

    // Submission state
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;

    // Handlers
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    reset: () => void;
}

export function usePlanVisitViewModel(isOpen: boolean): PlanVisitViewModel {
    const [formData, setFormData] = useState<PlanVisitFormData>(EMPTY_PLAN_VISIT_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Reset form state each time the modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData(EMPTY_PLAN_VISIT_FORM);
            setIsSubmitted(false);
            setError(null);
        }
    }, [isOpen]);

    /** Granular field setter — keeps the ViewModel interface type-safe */
    const setField = <K extends keyof PlanVisitFormData>(key: K, value: PlanVisitFormData[K]) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await PlanVisitService.submitRegistration(formData);
            setIsSubmitted(true);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setFormData(EMPTY_PLAN_VISIT_FORM);
        setIsSubmitted(false);
        setError(null);
    };

    return {
        formData,
        setField,
        isSubmitting,
        isSubmitted,
        error,
        handleSubmit,
        reset,
    };
}
