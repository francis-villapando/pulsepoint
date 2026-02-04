# Admin Authentication System

This document explains how to use the admin login/logout functionality that has been implemented for your PulsePoint project.

## Overview

The admin authentication system provides:
- Secure login page with form validation
- Protected admin routes that require authentication
- Logout functionality with confirmation
- Consistent UI design that matches your project's styling
- Persistent authentication using localStorage

## Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email:** `admin@pulsepoint.gov`
- **Password:** `admin123`

## How It Works

### 1. Login Flow
1. Navigate to `/admin/login` or try to access any protected admin route
2. If not authenticated, you'll be redirected to the login page
3. Enter your credentials and click "Log In"
4. Upon successful authentication, you'll be redirected to the requested admin page

### 2. Protected Routes
All admin routes except `/admin/login` and `/admin/logout` are protected:
- `/admin` (Dashboard)
- `/admin/announcements`
- `/admin/events`
- `/admin/polls`
- `/admin/feedbacks`
- `/admin/carousel`
- `/admin/archives`

### 3. Logout Flow
1. Click on the user dropdown in the admin layout top bar
2. Select "Log out"
3. You'll be redirected to `/admin/logout` page
4. After 1 second, you'll be automatically redirected to the login page

## Files Created/Modified

### New Files
- `src/types/auth.ts` - TypeScript interfaces for authentication
- `src/contexts/AuthContext.tsx` - Authentication context and hooks
- `src/pages/admin/AdminLogin.tsx` - Login page component
- `src/pages/admin/AdminLogout.tsx` - Logout confirmation page
- `src/components/admin/ProtectedRoute.tsx` - Route protection wrapper

### Modified Files
- `src/pages/admin/AdminLayout.tsx` - Updated to show authenticated user info and handle logout
- `src/App.tsx` - Added authentication provider and protected routes

## Key Features

### UI Consistency
- Login page uses the same gradient styles as your existing components
- Glass card effects and shadow styles match your design system
- Typography and spacing follow your established patterns

### Security Features
- Routes are protected client-side
- Authentication state persists across browser sessions
- Automatic redirect to login when accessing protected routes
- Proper logout that clears authentication state

### User Experience
- Loading states during authentication
- Error handling with user-friendly messages
- Remember me functionality (stays logged in)
- Smooth transitions and animations

## Testing the System

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test protected routes:**
   - Navigate to `http://localhost:8081/admin`
   - You should be redirected to `/admin/login`

3. **Test login:**
   - Enter the demo credentials
   - You should be redirected to the admin dashboard

4. **Test logout:**
   - Click the user dropdown in the top right
   - Select "Log out"
   - You should see the logout confirmation page, then be redirected to login

5. **Test route protection:**
   - Log out
   - Try to navigate directly to `/admin/announcements`
   - You should be redirected to login with the intended destination preserved

## Customization

### Changing Demo Credentials
Edit the `login` function in `src/contexts/AuthContext.tsx` to change the authentication logic.

### Adding Real Authentication
Replace the mock authentication in `AuthContext.tsx` with your actual API calls:
```typescript
// Replace the mock logic with real API calls
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
});
```

### Styling Customization
The login page uses your existing design system classes. To customize:
- Modify the gradient colors in the login component
- Adjust spacing and typography using your existing utility classes
- Update the demo credentials section styling

## Integration with Display and Mobile Pages

The authentication system is designed to work seamlessly with your existing display and mobile pages:

- **Display pages** (`/display/*`) remain publicly accessible
- **Mobile pages** (`/mobile/*`) remain publicly accessible  
- **Admin pages** (`/admin/*`) require authentication
- The authentication state doesn't interfere with display or mobile functionality

This separation ensures that public users can still access display and mobile content while admin functionality remains secure.