/**
 * INTEGRATION GUIDE - Admin Registrations Dashboard
 * 
 * This guide explains how to integrate the new AdminRegistrations component
 * into your existing admin navigation and routing.
 */

/*
 * ════════════════════════════════════════════════════════════════════════
 * STEP 1: Add Route to Your Router
 * ════════════════════════════════════════════════════════════════════════
 * 
 * Find your main router file (e.g., App.tsx or router.tsx) and add:
 */

import { AdminRegistrations } from '@/features/Admin/registrations';

// In your Routes component:
<Routes>
  <Route path="/admin/events" element={<AdminEvents />} />
  <Route path="/admin/registrations" element={<AdminRegistrations />} {/* ADD THIS */}
  {/* ...other routes */}
</Routes>

/*
 * ════════════════════════════════════════════════════════════════════════
 * STEP 2: Update Admin Navigation/Sidebar
 * ════════════════════════════════════════════════════════════════════════
 * 
 * Add a navigation link in AdminSidebar.tsx or wherever you manage admin nav:
 */

// In the navigation menu, add:
<NavLink 
  to="/admin/registrations" 
  className={({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
    ${isActive ? 'bg-gold text-royal-purple-dark font-bold' : 'text-gray-400 hover:text-white'}
  `}
>
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  <span>Registrations</span>
</NavLink>

/*
 * ════════════════════════════════════════════════════════════════════════
 * STEP 3: Configure API Base URL (if needed)
 * ════════════════════════════════════════════════════════════════════════
 * 
 * Edit: src/features/Admin/registrations/registrations.service.ts
 * 
 * Change the API_BASE constant based on your environment:
 */

// Development (local backend):
const API_BASE = 'http://localhost:4000';

// Or: Production (your hosted backend):
const API_BASE = 'https://api.elgibhor.com';

// Or: Dynamic based on environment:
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

/*
 * ════════════════════════════════════════════════════════════════════════
 * STEP 4: Verify Backend Endpoints Exist
 * ════════════════════════════════════════════════════════════════════════
 * 
 * Your backend needs these endpoints:
 * 
 * GET /api/registrations
 *   - Returns: Array of registrations
 *   - Example response:
 */
[
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    service_type: "Sunday Worship",
    adult_count: 2,
    child_count: 1,
    visitor_status: "first-time",
    submitted_at: "2025-06-15T10:30:00Z"
  }
]

// DELETE /api/registrations/:id
//   - Returns: 200 OK on success, or error status with error message

/*
 * ════════════════════════════════════════════════════════════════════════
 * STEP 5: Authentication (Optional)
 * ════════════════════════════════════════════════════════════════════════
 * 
 * If your backend requires authentication:
 * 
 * The component automatically includes bearer token from:
 *   localStorage.getItem('token')
 * 
 * Make sure your login flow sets this token:
 */

// In your Login.tsx or auth handler:
localStorage.setItem('token', responseToken);

// The service will automatically use it in request headers:
// Authorization: Bearer <token>

/*
 * ════════════════════════════════════════════════════════════════════════
 * STEP 6: Test the Implementation
 * ════════════════════════════════════════════════════════════════════════
 * 
 * 1. Navigate to: http://localhost:5173/admin/registrations
 * 2. You should see:
 *    - Loading skeleton while data is fetched
 *    - Stats cards with counts
 *    - Search and filter inputs
 *    - Data table (or cards on mobile)
 * 3. Try these actions:
 *    - Search by name or email
 *    - Filter by service type
 *    - Click delete icon and confirm
 *    - Check toast notifications
 */

/*
 * ════════════════════════════════════════════════════════════════════════
 * STEP 7: Customize (Optional)
 * ════════════════════════════════════════════════════════════════════════
 */

// A) Change visitor status colors:
// In AdminRegistrations.tsx, update the visitorStatusColors object:
const visitorStatusColors: Record<string, string> = {
  'first-time': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'returning': 'bg-green-500/20 text-green-400 border-green-500/50',
  'member': 'bg-gold/20 text-gold border-gold/50',
  'visitor': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  'custom-status': 'bg-pink-500/20 text-pink-400 border-pink-500/50', // Add more
};

// B) Change toast duration:
// In useAdminRegistrationsViewModel.tsx, modify showToast():
const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  setToast({ msg, type });
  setTimeout(() => setToast(null), 5000); // Change from 3000 to 5000ms
};

// C) Add more stats or filters:
// Modify the stats object in useAdminRegistrationsViewModel.tsx
// and add new filter selects in AdminRegistrations.tsx

/*
 * ════════════════════════════════════════════════════════════════════════
 * TROUBLESHOOTING
 * ════════════════════════════════════════════════════════════════════════
 */

// Problem: "Cannot find module" error
// Solution: Make sure all files are in src/features/Admin/registrations/

// Problem: Registrations not loading
// Solution: 
//   1. Check API_BASE URL is correct
//   2. Open browser DevTools > Network tab
//   3. Look for GET /api/registrations request
//   4. Check response status and payload

// Problem: Delete button not working
// Solution:
//   1. Check DELETE endpoint exists on backend
//   2. Verify authorization header is included
//   3. Check browser console for error messages

// Problem: Styling looks different
// Solution: Verify Tailwind CSS is configured and custom colors are in:
//   tailwind.config.js

// Problem: Toast not showing
// Solution: Check z-index conflicts. Toast uses z-[100]

/*
 * ════════════════════════════════════════════════════════════════════════
 * NEXT FEATURES TO CONSIDER
 * ════════════════════════════════════════════════════════════════════════
 */

// - Export to CSV
// - Date range filter
// - Bulk delete
// - Edit registration details
// - Email guest confirmations
// - Print guest list
// - Analytics/insights
// - Pagination for large datasets
// - Guest arrival check-in
// - Capacity warnings

/*
 * ════════════════════════════════════════════════════════════════════════
 * FILE STRUCTURE REMINDER
 * ════════════════════════════════════════════════════════════════════════
 */

/*
src/features/Admin/registrations/
├── AdminRegistrations.tsx              (main component)
├── useAdminRegistrationsViewModel.tsx  (state management)
├── registrations.service.ts            (API calls)
├── registrations.types.ts              (TypeScript types)
├── index.ts                            (exports)
├── README.md                           (detailed docs)
└── INTEGRATION_GUIDE.tsx               (this file)
*/

export {};
