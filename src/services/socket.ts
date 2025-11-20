import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../utils/data';

class SocketService {
  private socket: Socket | null = null;
  private token: string | null = null;

  // Get socket URL from BASE_URL
  private getSocketUrl(): string {
    // Convert HTTP URL to WebSocket URL
    // Example: http://10.0.2.2:5000/lynx/v1/api -> http://10.0.2.2:5000
    const url = BASE_URL.split('/lynx')[0];
    return url;
  }

  // Initialize socket connection
  connect(userId: string, token: string) {
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return;
    }

    this.token = token;

    // Clean token - remove "Bearer " prefix if present
    // Backend expects raw JWT token in auth.token
    const cleanToken = token.replace(/^Bearer\s+/i, '').trim();

    const socketUrl = this.getSocketUrl();
    console.log('🔌 Connecting to socket:', socketUrl);
    console.log('👤 User ID:', userId);
    console.log(
      '🔑 Token format:',
      token.startsWith('Bearer ')
        ? 'Has Bearer prefix (will be stripped)'
        : 'Raw token',
    );
    console.log(
      '🔑 Token (first 30 chars):',
      cleanToken ? cleanToken.substring(0, 30) + '...' : 'Missing',
    );

    this.socket = io(socketUrl, {
      query: {
        token: cleanToken, // Backend expects token in query params
        user_id: userId, // Also send user_id
      },
      transports: ['websocket', 'polling'], // Try polling as fallback
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      timeout: 20000,
      autoConnect: true,
    });

    this.setupListeners();
  }

  // Setup socket event listeners
  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket connected successfully!');
      console.log('Socket ID:', this.socket?.id);
    });

    this.socket.on('disconnect', reason => {
      console.log('❌ Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        this.socket?.connect();
      }
    });

    this.socket.on('connect_error', (error: any) => {
      console.error('❌ Socket connection error:', error.message || error);
      console.error('Error details:', {
        type: error.type,
        description: error.description,
        data: error.data,
      });

      // If authentication error, log more details
      if (error.message && error.message.includes('Auth')) {
        console.error(
          '🔐 Authentication failed. Check token format and validity.',
        );
        console.error(
          'Token being sent:',
          this.token ? this.token.substring(0, 30) + '...' : 'None',
        );
      }
    });

    this.socket.on('error', (error: any) => {
      console.error('❌ Socket error:', error.message || error);
    });

    this.socket.on('reconnect', (attemptNumber: number) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
    });

    this.socket.on('reconnect_attempt', (attemptNumber: number) => {
      console.log('🔄 Attempting to reconnect...', attemptNumber);
    });

    this.socket.on('reconnect_error', (error: any) => {
      console.error('❌ Reconnection error:', error.message || error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('❌ Failed to reconnect after all attempts');
    });
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.token = null;
      console.log('Socket disconnected');
    }
  }

  // Join chat room
  joinChat(chatRoomId: string) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('join_chat', { chat_room_id: chatRoomId });
    console.log('Joining chat room:', chatRoomId);
  }

  // Leave chat room
  leaveChat(chatRoomId: string) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('leave_chat', { chat_room_id: chatRoomId });
    console.log('Leaving chat room:', chatRoomId);
  }

  // Send message via socket
  sendMessage(chatRoomId: string, messageText: string, attachments?: any[]) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('send_message', {
      chat_room_id: chatRoomId,
      message_text: messageText,
      attachments: attachments || [],
    });
    console.log('Sending message via socket');
  }

  // Mark message as delivered
  markMessageDelivered(messageId: string) {
    if (!this.socket?.connected) return;

    this.socket.emit('message_delivered', { message_id: messageId });
  }

  // Mark message as read
  markMessageRead(messageId: string) {
    if (!this.socket?.connected) return;

    this.socket.emit('message_read', { message_id: messageId });
  }

  // Send typing status
  sendTypingStatus(chatRoomId: string, isTyping: boolean) {
    if (!this.socket?.connected) return;

    this.socket.emit('user_typing', {
      chat_room_id: chatRoomId,
      is_typing: isTyping,
    });
  }

  // Listen for events
  on(event: string, callback: (...args: any[]) => void) {
    if (!this.socket) return;
    this.socket.on(event, callback);
  }

  // Remove event listener
  off(event: string, callback?: (...args: any[]) => void) {
    if (!this.socket) return;
    this.socket.off(event, callback);
  }

  // Get connection status
  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

// Export singleton instance
export default new SocketService();
