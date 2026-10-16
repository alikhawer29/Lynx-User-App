import { ChatRoom } from '../types/chat';

/**
 * Resolves the booking Mongo id used by GET /booking/get/:id.
 */
export const getChatBookingMongoId = (chat?: ChatRoom | null): string | null => {
  if (!chat || chat.chat_type === 'support') {
    return null;
  }

  if (typeof chat.booking_id === 'object' && chat.booking_id) {
    const nestedId = chat.booking_id._id || chat.booking_id.id;
    if (nestedId) {
      return String(nestedId);
    }
  }

  if (typeof chat.booking_id === 'string' && /^[a-f\d]{24}$/i.test(chat.booking_id)) {
    return chat.booking_id;
  }

  const fromBooking = chat.booking?._id || chat.booking?.id;
  return fromBooking ? String(fromBooking) : null;
};

/**
 * Resolves booking_status from route/chat room payloads (string or nested booking).
 */
export const getChatBookingStatus = (
  chat?: ChatRoom | null,
  bookingStatus?: string | null,
): string | null => {
  const raw =
    bookingStatus ||
    chat?.booking?.booking_status ||
    (chat as any)?.booking_status ||
    (typeof chat?.booking_id === 'object'
      ? (chat.booking_id as any)?.booking_status
      : undefined);

  if (!raw) {
    return null;
  }

  return String(raw).toLowerCase().trim();
};

/**
 * Appointment chat compose is allowed only while booking is in-progress.
 * Prefer explicit booking_status; fall back to is_chat_active === true.
 */
export const canSendAppointmentChatMessages = (
  chat?: ChatRoom | null,
  bookingStatus?: string | null,
): boolean => {
  if (!chat || chat.chat_type === 'support') {
    return true;
  }

  const status = getChatBookingStatus(chat, bookingStatus);
  if (status) {
    return status === 'in_progress';
  }

  // No status available — only allow send when API explicitly marks chat active
  return chat.is_chat_active === true;
};

/**
 * Resolves a human-readable booking id for appointment chat rooms.
 * Prefers populated booking.booking_id; falls back to booking_id string,
 * slicing Mongo ObjectIds to match appointment list display.
 */
export const getChatBookingDisplayId = (chat?: ChatRoom | null): string | null => {
  if (!chat || chat.chat_type === 'support') {
    return null;
  }

  const nested =
    chat.booking?.booking_id ||
    (typeof chat.booking_id === 'object'
      ? chat.booking_id?.booking_id
      : undefined);

  if (nested) {
    return String(nested);
  }

  const raw =
    (typeof chat.booking_id === 'string' ? chat.booking_id : undefined) ||
    chat.booking?._id ||
    chat.booking?.id ||
    (typeof chat.booking_id === 'object'
      ? chat.booking_id?._id || chat.booking_id?.id
      : undefined);

  if (!raw) {
    return null;
  }

  const value = String(raw);
  // Mongo ObjectId — show trailing segment like AppointmentDetails
  if (/^[a-f\d]{24}$/i.test(value)) {
    return value.slice(-8);
  }

  return value;
};
