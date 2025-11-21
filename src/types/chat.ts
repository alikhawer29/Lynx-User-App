export interface ChatUser {
  _id: string;
  first_name: string;
  last_name: string;
  email?: string;
  picture?: string;
  role: 'user' | 'admin' | 'provider';
  image_url?: string | null;
  certifications_with_urls?: any[];
  id: string;
}

export interface ChatAttachment {
  file_url: string;
  file_name: string;
  file_size: number;
  file_type: 'image' | 'document' | 'video' | 'audio';
  mime_type: string;
  _id: string;
  id: string;
  full_url?: string;
}

export interface ChatMessage {
  _id: string;
  chat_room_id: string;
  sender_id: ChatUser;
  receiver_id: ChatUser;
  message_text: string;
  attachments: ChatAttachment[];
  attachments_with_urls?: ChatAttachment[];
  status: 'sent' | 'delivered' | 'read';
  is_read: boolean;
  is_delivered: boolean;
  deleted: boolean;
  deleted_for: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface ChatRoom {
  is_chat_active: any;
  _id: string;
  chat_type: 'support' | 'appointment';
  participants: string[];
  user_id: ChatUser;
  other_user_id: ChatUser;
  unread_count: {
    [userId: string]: number;
  };
  is_active: boolean;
  auto_close_on_completion: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  last_message?: string;
  last_message_sender?: ChatUser;
  last_message_text?: string;
  last_message_time?: string;
  id: string;
  my_unread_count?: number;
  other_user?: ChatUser;
  booking_id?: string;
}

export interface ChatListResponse {
  success: boolean;
  total: number;
  data: ChatRoom[];
}

export interface MessagesResponse {
  success: boolean;
  total: number;
  data: ChatMessage[];
}

export interface SendMessagePayload {
  chat_room_id: string;
  message_text?: string;
  files?: File[];
}

export interface CreateAppointmentChatPayload {
  booking_id: string;
}

export interface ChatRoomResponse {
  success: boolean;
  data: ChatRoom;
}

