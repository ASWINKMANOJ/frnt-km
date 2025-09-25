# Authentication Implementation Guide

This document explains the new authentication system implemented according to Next.js best practices.

## Overview

The authentication system has been completely redesigned to follow the official Next.js authentication guide, implementing:

- **Server Actions** for form handling
- **JWT-based session management** with secure cookies
- **Form validation** using Zod schemas
- **Data Access Layer (DAL)** for centralized authorization
- **Middleware** for route protection
- **Proper error handling** and user feedback

## Key Components

### 1. Form Validation Schemas (`lib/definitions.js`)

```javascript
// Signup form validation
export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character.' })
    .trim(),
})

// Login form validation
export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message: 'Password is required.' }).trim(),
})
```

### 2. Session Management (`lib/session.js`)

- **JWT encryption/decryption** using Jose library
- **Secure cookie management** with proper security flags
- **Session creation, update, and deletion** functions

```javascript
// Create a new session
export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  // Set secure HTTP-only cookie
}

// Verify session
export async function decrypt(session = '') {
  // Decrypt and verify JWT token
}
```

### 3. Server Actions (`app/actions/auth.js`)

- **Form validation** on the server
- **Password hashing** using bcrypt
- **User creation and authentication**
- **Session management** and redirects

```javascript
export async function signup(state, formData) {
  // 1. Validate form fields
  // 2. Check for existing user
  // 3. Hash password
  // 4. Create user
  // 5. Create session
  // 6. Redirect
}

export async function login(state, formData) {
  // 1. Validate form fields
  // 2. Find user
  // 3. Verify password
  // 4. Create session
  // 5. Redirect
}
```

### 4. Data Access Layer (`lib/dal.js`)

- **Centralized session verification**
- **User data retrieval** with proper authorization
- **Role-based routing** logic

```javascript
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  
  if (!session?.userId) {
    redirect('/auth/login')
  }
  
  return { isAuth: true, userId: session.userId }
})
```

### 5. Updated Forms

Both login and signup forms now use:
- **Server Actions** instead of API calls
- **useActionState** for form state management
- **Real-time validation feedback**
- **Proper error handling**

### 6. Middleware (`middleware.js`)

- **Route protection** based on authentication status
- **Automatic redirects** for unauthenticated users
- **Session verification** using JWT decryption

## Environment Setup

Create a `.env.local` file with:

```bash
# Generate with: openssl rand -base64 32
SESSION_SECRET=your_secret_key_here
```

**Note**: A temporary `.env.local` file has been created for development with a test secret. For production, generate a secure secret using `openssl rand -base64 32`.

## Security Features

1. **HTTP-only cookies** - Prevents XSS attacks
2. **Secure flag** - HTTPS only in production
3. **SameSite protection** - CSRF protection
4. **Password hashing** - bcrypt with salt rounds
5. **JWT expiration** - 7-day session lifetime
6. **Server-side validation** - All validation happens on server
7. **Proper error handling** - No sensitive data exposure

## Usage Examples

### Protected Server Component

```javascript
import { verifySession } from '@/lib/dal'

export default async function Dashboard() {
  const session = await verifySession()
  // Component is automatically protected
  return <div>Dashboard content</div>
}
```

### Client-side Authentication Check

```javascript
import { useAuth } from '@/lib/useAuth'

export default function Profile() {
  const { user, isLoading, isAuthenticated } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Please log in</div>
  
  return <div>Welcome, {user.name}!</div>
}
```

### Logout

```javascript
import { LogoutButton } from '@/components/logout-button'

export default function Navbar() {
  return (
    <nav>
      <LogoutButton>Sign Out</LogoutButton>
    </nav>
  )
}
```

## Migration Notes

The old authentication system has been completely replaced:

- ❌ **Removed**: API routes for auth (`/api/auth/login`, `/api/auth/signup`)
- ❌ **Removed**: localStorage-based token storage
- ❌ **Removed**: Client-side authentication logic
- ✅ **Added**: Server Actions for form handling
- ✅ **Added**: JWT-based session management
- ✅ **Added**: Proper form validation with Zod
- ✅ **Added**: Secure cookie-based authentication

## Testing

To test the authentication system:

1. **Signup**: Create a new account with valid credentials
2. **Login**: Sign in with existing credentials
3. **Protected Routes**: Try accessing `/dashboard` or `/home` without authentication
4. **Logout**: Use the logout button to end the session
5. **Session Persistence**: Refresh the page and verify you remain logged in

## Default Test Accounts

The system includes mock users for testing:

- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`
- **Moderator**: `moderator@example.com` / `mod123`

## Next Steps

1. **Database Integration**: Replace mock users with actual database
2. **Email Verification**: Add email confirmation for signup
3. **Password Reset**: Implement forgot password functionality
4. **Social Login**: Add OAuth providers (Google, GitHub, etc.)
5. **Two-Factor Authentication**: Add 2FA support
6. **Rate Limiting**: Implement login attempt limits
