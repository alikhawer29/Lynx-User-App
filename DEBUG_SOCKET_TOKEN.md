# Socket Token Authentication Debug Guide

## Current Issue
Backend error: `Invalid Auth Token`

This means the token is being sent but the backend's `verifyToken` function is rejecting it.

## Backend Token Verification

Your backend likely has code like this in `/src/configs/dbConnection.js`:

```javascript
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  try {
    const decoded = verifyToken(token); // This is throwing "Invalid Auth Token"
    socket.user_id = decoded.user_id;
    next();
  } catch (err) {
    next(new Error('Invalid Auth Token'));
  }
});
```

## Possible Issues

### 1. Token Format Mismatch

**Check if token has "Bearer " prefix:**

The token stored in Redux might be:
- `"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."` (with Bearer)
- `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."` (without Bearer)

**Backend might expect:**
- Token WITHOUT "Bearer " prefix in `auth.token`
- Token WITH "Bearer " prefix in headers

### 2. Token Expiration

The token might have expired. Check:
- When was the user last logged in?
- What is the token expiration time?

### 3. Token Secret Mismatch

The JWT secret used to sign the token must match the secret used to verify it.

## Solutions

### Solution 1: Strip "Bearer " prefix if present

Update `src/services/socket.ts`:

```typescript
connect(userId: string, token: string) {
  // Remove "Bearer " prefix if present
  const cleanToken = token.replace(/^Bearer\s+/i, '');
  
  this.socket = io(socketUrl, {
    auth: {
      token: cleanToken, // Send without "Bearer "
    },
    // ...
  });
}
```

### Solution 2: Update Backend Middleware

If you control the backend, update the middleware to handle both formats:

```javascript
io.use((socket, next) => {
  let token = socket.handshake.auth.token || socket.handshake.headers.authorization;
  
  // Remove "Bearer " prefix if present
  if (token && token.startsWith('Bearer ')) {
    token = token.substring(7);
  }
  
  if (!token) {
    return next(new Error('No token provided'));
  }
  
  try {
    const decoded = verifyToken(token);
    socket.user_id = decoded.user_id || decoded._id;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    next(new Error('Invalid Auth Token'));
  }
});
```

### Solution 3: Check Token in Redux

Add temporary logging to see the exact token format:

In `src/hooks/useSocket.ts`:

```typescript
useEffect(() => {
  if (isLoggedIn && user && token) {
    console.log('=== TOKEN DEBUG ===');
    console.log('Full token:', token);
    console.log('Has Bearer prefix:', token.startsWith('Bearer '));
    console.log('Token length:', token.length);
    console.log('==================');
    
    const userId = user._id || user.id;
    if (userId) {
      socketService.connect(userId, token);
    }
  }
}, [isLoggedIn, user, token]);
```

## Testing Steps

### Step 1: Check Token Format in App

1. Login to the app
2. Check Metro bundler logs for:
   ```
   === TOKEN DEBUG ===
   Full token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Has Bearer prefix: true
   Token length: 200
   ==================
   ```

### Step 2: Test Token with Backend API

Use the same token to make a REST API call:

```bash
# Get the token from logs
TOKEN="your-token-here"

# Test with your API
curl -H "Authorization: Bearer $TOKEN" http://10.0.2.2:5000/lynx/v1/api/user/profile
```

If this works, the token is valid.

### Step 3: Check Backend Logs

Look for:
```
Token verification failed: [error message]
```

This will tell you exactly why the token is invalid.

### Step 4: Verify JWT

Use https://jwt.io to decode your token and check:
- Expiration time (`exp` claim)
- User ID (`user_id` or `_id` claim)
- Issuer (`iss` claim)

## Quick Fix

If you need a quick fix, update the socket service to strip "Bearer " prefix:

```typescript
// In src/services/socket.ts
connect(userId: string, token: string) {
  // Clean token - remove "Bearer " if present
  const cleanToken = token.replace(/^Bearer\s+/i, '').trim();
  
  this.socket = io(socketUrl, {
    auth: {
      token: cleanToken,
    },
    // ... rest of config
  });
}
```

## Expected Backend Behavior

When authentication succeeds, backend should log:
```
User [user-id] connected with socket [socket-id]
```

When it fails, you see:
```
Error: Invalid Auth Token
```

## Next Steps

1. ✅ Add token debug logging
2. ✅ Check if token has "Bearer " prefix
3. ✅ Strip "Bearer " prefix before sending to socket
4. ✅ Verify token is not expired
5. ✅ Test token with REST API endpoint
6. ✅ Update backend middleware to handle both formats (recommended)

