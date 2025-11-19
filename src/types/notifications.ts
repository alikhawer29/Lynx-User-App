export type NotificationStatus = 'all' | 'read' | 'unread';

export interface NotificationData {
  type: string;
  user_id: string;
  previous_status?: boolean;
  new_status?: boolean;
  changed_by?: string;
  changed_at?: string;
  action?: string;
  [key: string]: any;
}

export interface Notification {
  notification: {
    title: string;
    body: string;
    data: NotificationData;
  };
  _id: string;
  recipients: string[];
  for_all: boolean;
  for_admins: boolean;
  read: boolean;
  read_by: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NotificationResponse {
  success: boolean;
  total: number;
  data: Notification[];
}

export interface NotificationMarkResponse {
  success: boolean;
  message: string;
  updated?: number;
}

export interface NotificationSection {
  title: string;
  data: Notification[];
}
