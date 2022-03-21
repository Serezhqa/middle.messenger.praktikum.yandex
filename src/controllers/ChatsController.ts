import GetChatsAPI from '../api/chats/GetChatsAPI';
import store from '../utils/Store';
import CreateChatAPI from '../api/chats/CreateChatAPI';
import {
  AddChatFormModel,
  AddUserFormModel,
  ChatUsersModel,
  DeleteChatFormModel,
  RemoveUserFormModel,
  UserModel, WebSocketTokenModel
} from '../api/models';
import GetUserByLoginAPI from '../api/chats/GetUserByLoginAPI';
import AddUsersAPI from '../api/chats/AddUsersAPI';
import DeleteChatAPI from '../api/chats/DeleteChatAPI';
import RemoveUsersAPI from '../api/chats/RemoveUsersAPI';
import RequestWebSocketTokenAPI from '../api/chats/RequestWebSocketTokenAPI';

export default class ChatsController {
  getChatsAPI = new GetChatsAPI();

  createChatAPI = new CreateChatAPI();

  getUserByLoginAPI = new GetUserByLoginAPI();

  addUsersAPI = new AddUsersAPI();

  deleteChatAPI = new DeleteChatAPI();

  removeUsersAPI = new RemoveUsersAPI();

  requestWebSocketTokenAPI = new RequestWebSocketTokenAPI();

  async getChats() {
    try {
      this.getChatsAPI.request()
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            store.set('chats', JSON.parse(response.response));
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async createChat(addChatData: AddChatFormModel) {
    try {
      this.createChatAPI.create(addChatData)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            this.getChats();
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByLogin(addUserData: AddUserFormModel) {
    try {
      // eslint-disable-next-line @typescript-eslint/return-await
      return this.getUserByLoginAPI.request(addUserData)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            const users: UserModel[] = JSON.parse(response.response);
            const user = users.find((item) => item.login === addUserData.login);
            return user;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async addUsers(addUserData: AddUserFormModel, activeChatId: number) {
    try {
      this.getUserByLogin(addUserData)
        .then((user) => {
          if (!user) {
            return;
          }

          const data: ChatUsersModel = {
            users: [user.id],
            chatId: activeChatId
          };
          this.addUsersAPI.update(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async removeUsers(removeUserData: RemoveUserFormModel, activeChatId: number) {
    try {
      this.getUserByLogin(removeUserData)
        .then((user) => {
          if (!user) {
            return;
          }

          const data: ChatUsersModel = {
            users: [user.id],
            chatId: activeChatId
          };
          this.removeUsersAPI.delete(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChat(chatId: DeleteChatFormModel) {
    try {
      this.deleteChatAPI.delete(chatId)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            this.getChats();
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getWebSocketToken(chatId: number) {
    try {
      // eslint-disable-next-line
      return this.requestWebSocketTokenAPI.request(chatId)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            return (JSON.parse(response.response) as WebSocketTokenModel).token;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
