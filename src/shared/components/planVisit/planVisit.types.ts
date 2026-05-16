// src/shared/components/planVisit/planVisit.types.ts

// ── Form model ─────────────────────────────────────────────────────────────
export interface PlanVisitFormData {
    firstName: string;
    lastName: string;
    email: string;
    service: string;
    adults: number;        // → adult_count INT
    kids: number;          // → child_count INT
    type: 'first-time' | 'returning'; // → visitor_status VARCHAR(20)
}

export const EMPTY_PLAN_VISIT_FORM: PlanVisitFormData = {
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    adults: 1,
    kids: 0,
    type: 'first-time',
};

// ── API response ────────────────────────────────────────────────────────────
export interface RegistrationApiResponse {
    success: boolean;
    message?: string;
}
