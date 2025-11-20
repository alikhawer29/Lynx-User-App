# Socket.IO Connection Troubleshooting

## Current Error
```
Socket connection error: Error: websocket error
```

## Possible Causes & Solutions

### 1. Backend Socket.IO Server Not Running
**Check:**
- Is your Node.js server running?
- Is Socket.IO properly initialized on the backend?

**Backend Setup Required:**
```javascript
// server.js or app.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Configure properly for production
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const user_id = socket.handshake.auth.user_id;
  
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  // Verify JWT token here
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user_id = user_id; // or decoded.user_id
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Import your socket controller
const socketController = require('./controllers/socketController');

io.on('connection', (socket) => {
  socketController(socket, io);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. CORS Issues
**Backend CORS Configuration:**
```javascript
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8081", "http://10.0.2.2:8081"], // React Native Metro bundler
    methods: ["GET", "POST"],
    credentials: true
  }
});
```

### 3. Wrong Socket URL
**Current Configuration:**
- BASE_URL: `http://10.0.2.2:5000/lynx/v1/api`
- Socket URL: `http://10.0.2.2:5000`

**Verify:**
- Is your backend running on port 5000?
- Can you access `http://10.0.2.2:5000` from your Android emulator?

**Test Backend:**
```bash
# From your terminal
curl http://10.0.2.2:5000
# or
curl http://localhost:5000
```

### 4. Authentication Token Issues
**Check:**
- Is the token being passed correctly?
- Is the token valid?
- Does the backend middleware accept the token format?

**Debug Logs Added:**
The socket service now logs:
- Connection URL
- User ID
- Token presence
- Detailed error information

### 5. Network/Firewall Issues
**For Android Emulator:**
- `10.0.2.2` maps to `localhost` on your development machine
- Make sure your backend is listening on `0.0.0.0` not just `127.0.0.1`

**Backend Server Listen:**
```javascript
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
```

### 6. Socket.IO Version Mismatch
**Check versions match:**
- Client: socket.io-client@4.8.1 (installed)
- Server: socket.io@4.x.x (should match major version)

**Install on backend:**
```bash
npm install socket.io@^4.8.0
```

## Debugging Steps

### Step 1: Check Backend Server
```bash
# In your backend directory
node server.js
# or
npm start
```

Look for logs like:
```
Server running on port 5000
```

### Step 2: Test Socket.IO Endpoint
Create a test HTML file:
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.socket.io/4.8.0/socket.io.min.js"></script>
</head>
<body>
  <script>
    const socket = io('http://localhost:5000', {
      auth: {
        token: 'your-test-token',
        user_id: 'test-user-id'
      }
    });
    
    socket.on('connect', () => {
      console.log('Connected!', socket.id);
    });
    
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  </script>
</body>
</html>
```

### Step 3: Check React Native Logs
Look for these logs in Metro bundler:
```
Connecting to socket: http://10.0.2.2:5000
User ID: [user-id]
Token: Present
```

### Step 4: Temporary Workaround
If socket connection fails, the app will fallback to REST API for messaging.
This is already implemented in the code.

## Quick Fix Options

### Option 1: Disable Socket Temporarily
Comment out socket initialization in `App.tsx`:
```typescript
// <SocketInitializer />
```

### Option 2: Use Polling Transport Only
In `src/services/socket.ts`:
```typescript
transports: ['polling'], // Remove 'websocket'
```

### Option 3: Test with Public Socket Server
Temporarily test with a public socket.io server to verify client code works.

## Expected Backend Response

When connection is successful, you should see:
```
✅ Socket connected successfully!
Socket ID: [socket-id]
User [user-id] connected with socket [socket-id]
```

## Next Steps

1. ✅ Verify backend Socket.IO server is running
2. ✅ Check CORS configuration
3. ✅ Verify authentication middleware
4. ✅ Test connection with HTML client first
5. ✅ Check network connectivity (10.0.2.2 accessible)
6. ✅ Review backend logs for errors

