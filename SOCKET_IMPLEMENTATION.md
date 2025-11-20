# Socket.IO Implementation for Real-time Chat

## Overview
This document describes the Socket.IO implementation for real-time messaging in the Lynx React Native app.

## Files Created/Modified

### New Files:
1. **src/services/socket.ts** - Socket service singleton
2. **src/hooks/useSocket.ts** - React hook for socket connection management

### Modified Files:
1. **App.tsx** - Added SocketInitializer component
2. **src/hooks/index.ts** - Exported useSocket hook
3. **src/screens/ChatRoom/useChatRoomController.ts** - Integrated socket for real-time messaging
4. **package.json** - Added socket.io-client dependency

## Socket Events

### Client → Server (Emit)

1. **join_chat**
   ```typescript
   payload: { chat_room_id: string }
   ```

2. **leave_chat**
   ```typescript
   payload: { chat_room_id: string }
   ```

3. **send_message**
   ```typescript
   payload: {
     chat_room_id: string,
     message_text: string,
     attachments?: any[]
   }
   ```

4. **message_delivered**
   ```typescript
   payload: { message_id: string }
   ```

5. **message_read**
   ```typescript
   payload: { message_id: string }
   ```

6. **user_typing**
   ```typescript
   payload: {
     chat_room_id: string,
     is_typing: boolean
   }
   ```

### Server → Client (Listen)

1. **receive_message**
   ```typescript
   data: ChatMessage
   ```

2. **message_delivered_ack**
   ```typescript
   data: {
     message_id: string,
     delivered_at: string
   }
   ```

3. **message_read_ack**
   ```typescript
   data: {
     message_id: string,
     read_at: string,
     chat_room_id: string
   }
   ```

4. **user_typing_status**
   ```typescript
   data: {
     chat_room_id: string,
     user_id: string,
     is_typing: boolean
   }
   ```

5. **user_online_status**
   ```typescript
   data: {
     user_id: string,
     is_online: boolean,
     last_seen: Date
   }
   ```

6. **new_message_notification**
   ```typescript
   data: {
     chat_room_id: string,
     message: ChatMessage,
     unread_count: number
   }
   ```

7. **error**
   ```typescript
   data: { message: string }
   ```

8. **joined_chat**
   ```typescript
   data: {
     chat_room_id: string,
     message: string
   }
   ```

9. **left_chat**
   ```typescript
   data: {
     chat_room_id: string,
     message: string
   }
   ```

## How It Works

### 1. Socket Connection
- Socket connects automatically when user logs in (via `useSocket` hook in App.tsx)
- Socket disconnects when user logs out
- Connection uses JWT token for authentication

### 2. Chat Room Flow
1. User navigates to ChatRoom screen
2. Controller calls `socketService.joinChat(chatRoomId)`
3. Socket emits `join_chat` event to server
4. Server adds user to the room
5. User can now send/receive messages in real-time

### 3. Sending Messages
- **Text-only messages**: Sent via socket (`send_message` event)
- **Messages with files**: Sent via REST API (FormData)
- Socket provides instant delivery, REST API handles file uploads

### 4. Receiving Messages
- Server emits `receive_message` to all participants in the room
- Client adds message to `realtimeMessages` state
- Messages are merged with API messages and deduplicated
- FlatList auto-scrolls to show new message

### 5. Message Status
- **Delivered**: Client emits `message_delivered` when message is received
- **Read**: Client emits `message_read` when message is viewed
- Server acknowledges with `message_delivered_ack` and `message_read_ack`

## Usage Example

```typescript
import socketService from '../services/socket';

// Send message
socketService.sendMessage(chatRoomId, 'Hello!');

// Listen for messages
socketService.on('receive_message', (message) => {
  console.log('New message:', message);
});

// Mark as delivered
socketService.markMessageDelivered(messageId);

// Send typing status
socketService.sendTypingStatus(chatRoomId, true);
```

## Configuration

Socket URL is automatically derived from `BASE_URL` in `src/utils/data.ts`:
- Example: `http://10.0.2.2:5000/lynx/v1/api` → `http://10.0.2.2:5000`

## Notes

- Socket connection is maintained throughout the app session
- Automatic reconnection is enabled (max 5 attempts)
- WebSocket transport is used for better performance
- Fallback to REST API if socket is not connected

