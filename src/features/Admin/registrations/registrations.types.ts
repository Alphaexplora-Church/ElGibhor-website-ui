/**
 * Registration types from the database schema
 */

export interface Registration {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  service_type: string;
  adult_count: number | null;    // INT — optional in DB
  child_count: number | null;    // INT — optional in DB
  visitor_status: string | null; // VARCHAR(20) — optional in DB
  submitted_at: string;          // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

/**
 * Derived registration data for UI display
 */
export interface RegistrationDisplay extends Registration {
  fullName: string;
  submittedDate: string; // Formatted as MM/DD/YYYY
  submittedTime: string; // Formatted as HH:MM AM/PM
  totalCount: number; // adult_count + child_count
}
