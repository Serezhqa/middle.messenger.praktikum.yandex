export type RegisterFormModel = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginFormModel = {
  login: string;
  password: string;
};

export type AddChatFormModel = {
  title: string;
};

export type DeleteChatFormModel = {
  chatId: number;
};

export type AddUserFormModel = {
  login: string;
};

export type RemoveUserFormModel = {
  login: string;
};

export type UpdateUserFormModel = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UpdatePasswordFormModel = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateAvatarFormModel = {
  avatar: BinaryData;
};

export type UserModel = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type ChatsModel = {
  avatar: string | null;
  created_by: number;
  id: number;
  last_message: LastMessage | null;
  title: string;
  unread_count: number;
};

export type LastMessage = {
  user: UserModel;
  time: string;
  content: string;
};

export type ChatUsersModel = {
  users: number[];
  chatId: number;
};

export type WebSocketTokenModel = {
  token: string;
};

export type WebSocketMessageModel = {
  id: number;
  user_id: number;
  chat_id: number;
  type: 'message' | 'file';
  time: string;
  content: string;
  is_read: boolean;
  file: FileMessage | null;
};

export type FileMessage = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};
