# Role-Based Authentication & Redirection Guide

This guide explains how to implement and use the role-based authentication system in your Next.js application.

## Overview

The authentication system provides:
- Role-based redirection after login
- Protected routes based on user roles
- Authentication state management
- Secure token handling

## How It Works

### 1. Authentication Flow

1. User submits login form with email/password
2. Frontend calls `/api/auth/login` endpoint
3. Backend validates credentials and returns user data with role
4. Frontend stores authentication data and redirects based on role

### 2. Role-Based Redirection

The system automatically redirects users to different routes based on their role:

```javascript
const ROLE_ROUTES = {
  admin: '/dashboard',      // Admin users go to dashboard
  user: '/home',           // Regular users go to home
  moderator: '/dashboard', // Moderators go to dashboard
  guest: '/home'           // Guests go to home
};
```

### 3. Protected Routes

Use the `ProtectedRoute` component to restrict access to specific roles:

```jsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'moderator']}>
      <div>Admin content here</div>
    </ProtectedRoute>
  );
}
```

## Backend API Requirements

Your backend should implement a `/api/auth/login` endpoint that returns:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "admin",
    "name": "User Name"
  },
  "token": "jwt_token_here"
}
```

### Sample Backend Response

The included sample API route (`app/api/auth/login/route.js`) demonstrates the expected format. Replace it with your actual authentication logic.

## Usage Examples

### 1. Login Form

The login form automatically handles authentication and redirection:

```jsx
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return <LoginForm />;
}
```

### 2. Protected Pages

```jsx
// Admin-only page
<ProtectedRoute allowedRoles={['admin']}>
  <AdminContent />
</ProtectedRoute>

// User and guest access
<ProtectedRoute allowedRoles={['user', 'guest']}>
  <UserContent />
</ProtectedRoute>

// Any authenticated user
<ProtectedRoute>
  <AuthenticatedContent />
</ProtectedRoute>
```

### 3. Using Authentication State

```jsx
import { useAuth } from '@/lib/useAuth';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      Welcome, {user.name}! 
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 4. Logout Button

```jsx
import { LogoutButton } from '@/components/LogoutButton';

function Navigation() {
  return (
    <nav>
      <LogoutButton />
    </nav>
  );
}
```

## File Structure

```
lib/
├── auth.js              # Authentication utilities
└── useAuth.js           # Authentication context and hook

components/
├── login-form.jsx       # Login form with role-based redirection
├── ProtectedRoute.jsx   # Route protection component
└── LogoutButton.jsx     # Logout functionality

app/
├── api/auth/login/route.js  # Sample authentication API
├── dashboard/page.js        # Admin dashboard (admin/moderator only)
├── home/page.js            # User dashboard (user/guest only)
└── layout.js               # Root layout with AuthProvider

middleware.js              # Route protection middleware
```

## Configuration

### Customizing Role Routes

Edit `lib/auth.js` to modify role-based routing:

```javascript
export const ROLE_ROUTES = {
  admin: '/admin-panel',
  user: '/user-dashboard',
  moderator: '/mod-panel',
  guest: '/welcome'
};
```

### Adding New Roles

1. Add the role to `ROLE_ROUTES` in `lib/auth.js`
2. Update your backend to return the new role
3. Use the role in `ProtectedRoute` components

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage. For production, consider using httpOnly cookies.

2. **Token Validation**: The middleware currently only checks for token existence. Implement proper JWT validation in production.

3. **Role Verification**: Always verify user roles on the backend, not just the frontend.

4. **HTTPS**: Use HTTPS in production to protect authentication data.

## Testing

Use the sample credentials to test the system:

- **Admin**: `admin@example.com` / `admin123` → redirects to `/dashboard`
- **User**: `user@example.com` / `user123` → redirects to `/home`
- **Moderator**: `moderator@example.com` / `mod123` → redirects to `/dashboard`

## Troubleshooting

### Common Issues

1. **Redirect not working**: Check that the user object contains a `role` property
2. **Protected route not working**: Ensure the component is wrapped with `AuthProvider`
3. **API errors**: Verify your backend returns the expected response format

### Debug Mode

Add console logs to see authentication flow:

```javascript
// In lib/auth.js
console.log('User role:', user.role);
console.log('Redirect route:', getRouteByRole(user.role));
```

## Next Steps

1. Replace the sample API with your actual backend
2. Implement proper JWT token validation
3. Add refresh token functionality
4. Implement role-based permissions for specific actions
5. Add user registration flow
6. Implement password reset functionality
