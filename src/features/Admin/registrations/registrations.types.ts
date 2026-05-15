/**
 * Registration types from the database schema
 */

export interface Registration {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  service_type: string;
  adult_count: number;
  child_count: number;
  visitor_status: string;
  submitted_at: string; // ISO 8601 timestamp
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
