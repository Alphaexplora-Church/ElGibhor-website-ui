/**
 * Admin Registrations Service
 * Handles all API interactions for the registrations table
 */

import type { Registration } from './registrations.types';

// Update this to your Render URL when you deploy!
const API_BASE = 'http://localhost:4000';

export const RegistrationsService = {
  /**
   * Fetches all registrations from the database
   * Sorted by submitted_at descending (most recent first)
   */
  fetchRegistrations: async (): Promise<Registration[]> => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE}/api/registrations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch registrations`);
      }

      const json = await response.json();
      // Handle both { data: [...] } and [...] response formats
      const data = (json.data ?? json) as Registration[];

      // Ensure data is sorted by submitted_at descending
      return data.sort((a, b) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
      );
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
      throw error;
    }
  },

  /**
   * Deletes a registration by ID
   */
  deleteRegistration: async (id: number): Promise<void> => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE}/api/registrations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to delete registration`);
      }
    } catch (error) {
      console.error(`Failed to delete registration ${id}:`, error);
      throw error;
    }
  },
};
