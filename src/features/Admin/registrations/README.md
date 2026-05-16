# Admin Registrations Dashboard

A production-grade React component for managing church event registrations with a clean, responsive data table interface.

## Features

✅ **Data Management**

- Displays all registrations from the database
- Real-time search by name or email
- Filter by service type
- Sorted by submission date (newest first)

✅ **User Interface**

- Responsive design (desktop table + mobile cards)
- Loading skeleton state
- Empty state and error state with retry
- Stats cards (total registrations, service types, total guests)

✅ **Operations**

- Delete registrations with confirmation dialog
- Optimistic UI updates
- Toast notifications for success/error feedback
- Graceful error handling

✅ **State Management**

- Custom view model pattern matching your existing codebase
- Modular service layer for API interactions
- Clean separation of concerns

## File Structure

```
src/features/Admin/registrations/
├── AdminRegistrations.tsx           # Main component
├── useAdminRegistrationsViewModel.tsx # State management
├── registrations.service.ts         # API service layer
├── registrations.types.ts           # TypeScript types
├── index.ts                         # Barrel export
└── README.md                        # This file
```

## Component API

### AdminRegistrations Component

The main page component. Import and use in your routing:

```tsx
import { AdminRegistrations } from "@/features/Admin/registrations";

// In your router or parent component:
<AdminRegistrations />;
```

### useAdminRegistrationsViewModel Hook

Provides all state and business logic:

```tsx
const vm = useAdminRegistrationsViewModel();

// Available properties:
vm.registrations; // Raw registration data
vm.displayRegistrations; // Filtered/formatted registrations
vm.isLoading; // Loading state
vm.error; // Error message or null
vm.search; // Current search query
vm.setSearch(query); // Update search
vm.serviceTypeFilter; // Current filter
vm.setServiceTypeFilter(type); // Update filter
vm.stats; // { total, uniqueServices, totalGuests }
vm.serviceTypes; // Array of available service types
vm.deleteTarget; // Registration marked for deletion
vm.isDeleting; // Delete in progress
vm.toast; // { msg, type } or null
vm.openDeleteModal(reg); // Open delete confirmation
vm.closeDeleteModal(); // Close delete confirmation
vm.handleDelete(); // Confirm and process deletion
vm.retry(); // Retry loading data
```

### RegistrationsService

API service for backend communication:

```tsx
import { RegistrationsService } from "@/features/Admin/registrations";

// Fetch all registrations
const registrations = await RegistrationsService.fetchRegistrations();

// Delete a registration
await RegistrationsService.deleteRegistration(registrationId);
```

## Database Schema

The component expects registrations with this structure:

```sql
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  adult_count INT,
  child_count INT,
  visitor_status VARCHAR(20),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints Required

### GET /api/registrations

Returns array of registrations sorted by `submitted_at` descending:

```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "service_type": "Sunday Worship",
    "adult_count": 2,
    "child_count": 1,
    "visitor_status": "first-time",
    "submitted_at": "2025-06-15T10:30:00Z"
  }
]
```

### DELETE /api/registrations/:id

Deletes a registration by ID. Returns 200 on success.

## Configuration

### Update API Base URL

In `registrations.service.ts`, update the `API_BASE` constant:

```tsx
const API_BASE = "http://localhost:4000"; // Local development
// or
const API_BASE = "https://your-production-url.com"; // Production
```

### Authentication

The service automatically includes bearer token from localStorage:

```tsx
const token = localStorage.getItem("token");
// Token is included in headers if available
```

## Styling

Uses Tailwind CSS with your custom theme colors:

- `gold` - Primary accent color
- `royal-purple` - Secondary accent
- `background-dark` - Dark background
- `white/5`, `white/10` - Opacity utilities for borders and backgrounds

### Color Codes for Visitor Status

| Status     | Color  |
| ---------- | ------ |
| first-time | Blue   |
| returning  | Green  |
| member     | Gold   |
| visitor    | Purple |
| (other)    | Gray   |

## Usage Example

### Basic Setup in Router

```tsx
import { AdminRegistrations } from "@/features/Admin/registrations";

export default function AdminLayout() {
  return (
    <Routes>
      <Route path="/admin/registrations" element={<AdminRegistrations />} />
    </Routes>
  );
}
```

### Toast Customization

Toast notifications auto-dismiss after 3 seconds. To customize:

In `useAdminRegistrationsViewModel.tsx`, modify the `showToast` function:

```tsx
const showToast = (msg: string, type: "success" | "error" = "success") => {
  setToast({ msg, type });
  setTimeout(() => setToast(null), 5000); // Change from 3000 to 5000
};
```

## Error Handling

The component handles common error scenarios:

- **Network errors**: Shows error message with retry button
- **Failed deletion**: Reverts optimistic UI update, shows error toast
- **Empty state**: Shows friendly message when no registrations match filters
- **Invalid dates**: Formats gracefully if timestamp is invalid

## Performance Optimizations

- Memoized computed values (filtered list, stats, service types)
- Optimistic UI updates for deletion
- Efficient table rendering with keys
- Loading skeleton prevents layout shift

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential additions (not yet implemented):

- Export to CSV
- Bulk delete
- Edit registration details
- Email confirmations
- Advanced filtering (date range, visitor status)
- Guest list printing
- Analytics dashboard

## Troubleshooting

### Registrations not loading

1. Check API_BASE URL is correct
2. Verify backend endpoint returns proper format
3. Check browser console for network errors
4. Ensure token is valid if using auth

### Delete not working

1. Verify backend supports DELETE method
2. Check authorization headers
3. Ensure user has permission to delete
4. Check for CORS issues

### Styling looks wrong

1. Verify Tailwind CSS is properly configured
2. Check custom theme colors are defined in tailwind.config.js
3. Clear browser cache and rebuild

## License

Internal use only - ElGibhor Church
