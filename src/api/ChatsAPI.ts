import {
  AddChatFormModel,
  AddUserFormModel,
  ChatUsersModel,
  DeleteChatFormModel
} from './models';
import http, { baseURL } from '../utils/HTTP';

class ChatsAPI {
  addUsers(users: ChatUsersModel) {
    return http.put(baseURL + '/chats/users', {
      data: JSON.stringify(users),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  createChat(addChatData: AddChatFormModel) {
    return http.post(baseURL + '/chats', {
      data: JSON.stringify(addChatData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  deleteChat(chatId: DeleteChatFormModel) {
    return http.delete(baseURL + '/chats', {
      data: JSON.stringify(chatId),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  getChats() {
    return http.get(baseURL + '/chats', {
      timeout: 5000
    });
  }

  getUserByLogin(addUserData: AddUserFormModel) {
    return http.post(baseURL + '/user/search', {
      data: JSON.stringify(addUserData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  removeUsers(users: ChatUsersModel) {
    return http.delete(baseURL + '/chats/users', {
      data: JSON.stringify(users),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  getWebSocketToken(chatId: number) {
    return http.post(baseURL + '/chats/token/' + chatId, {
      timeout: 5000
    });
  }
}

export default new ChatsAPI();
