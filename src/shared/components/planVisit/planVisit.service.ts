// src/shared/components/planVisit/planVisit.service.ts

import type { PlanVisitFormData, RegistrationApiResponse } from './planVisit.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PlanVisitService = {
    /**
     * Submits a visit registration to the backend.
     * POST /api/registration
     */
    submitRegistration: async (data: PlanVisitFormData): Promise<RegistrationApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/registrations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: data.firstName,       // VARCHAR(50) NOT NULL
                last_name: data.lastName,         // VARCHAR(50) NOT NULL
                email: data.email,                // VARCHAR(255) NOT NULL
                service_type: data.service,       // VARCHAR(100) NOT NULL
                adult_count: data.adults,         // INT
                child_count: data.kids,           // INT
                visitor_status: data.type,        // VARCHAR(20)
            }),
        });

        if (!response.ok) {
            let errorMsg = `Request failed with status ${response.status}`;
            try {
                // Read as text first — always works regardless of content-type
                const rawBody = await response.text();
                console.error(
                    `[PlanVisitService] Error ${response.status} from ${response.url}:`,
                    rawBody,
                );
                // Attempt to extract a human-readable message if the body is JSON
                const parsed = JSON.parse(rawBody);
                errorMsg = parsed.error ?? parsed.message ?? errorMsg;
            } catch {
                // Body was not valid JSON — errorMsg stays as the HTTP status string
            }
            throw new Error(errorMsg);
        }

        return response.json() as Promise<RegistrationApiResponse>;
    },
};
