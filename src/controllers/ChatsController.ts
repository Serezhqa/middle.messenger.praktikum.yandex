import store from '../utils/Store';
import {
  AddChatFormModel,
  AddUserFormModel,
  ChatUsersModel,
  DeleteChatFormModel,
  RemoveUserFormModel,
  UserModel,
  WebSocketTokenModel
} from '../api/models';
import chatsAPI from '../api/ChatsAPI';

class ChatsController {
  async getChats() {
    try {
      chatsAPI.getChats()
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
      chatsAPI.createChat(addChatData)
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
      return chatsAPI.getUserByLogin(addUserData)
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
          chatsAPI.addUsers(data);
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
          chatsAPI.removeUsers(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChat(chatId: DeleteChatFormModel) {
    try {
      chatsAPI.deleteChat(chatId)
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
      return chatsAPI.getWebSocketToken(chatId)
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

export default new ChatsController();
