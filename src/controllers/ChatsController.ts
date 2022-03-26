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
      const response = await chatsAPI.getChats();

      if (response.status === 200) {
        store.set('chats', JSON.parse(response.response));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createChat(addChatData: AddChatFormModel) {
    try {
      const response = await chatsAPI.createChat(addChatData);

      if (response.status === 200) {
        await this.getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByLogin(addUserData: AddUserFormModel) {
    try {
      const response = await chatsAPI.getUserByLogin(addUserData);

      if (response.status === 200) {
        const users: UserModel[] = JSON.parse(response.response);
        return users.find((item) => item.login === addUserData.login);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addUsers(addUserData: AddUserFormModel, activeChatId: number) {
    try {
      const user = await this.getUserByLogin(addUserData);

      if (!user) {
        return;
      }

      const users: ChatUsersModel = {
        users: [user.id],
        chatId: activeChatId
      };
      await chatsAPI.addUsers(users);
    } catch (error) {
      console.log(error);
    }
  }

  async removeUsers(removeUserData: RemoveUserFormModel, activeChatId: number) {
    try {
      const user = await this.getUserByLogin(removeUserData);

      if (!user) {
        return;
      }

      const users: ChatUsersModel = {
        users: [user.id],
        chatId: activeChatId
      };
      await chatsAPI.removeUsers(users);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChat(chatId: DeleteChatFormModel) {
    try {
      const response = await chatsAPI.deleteChat(chatId);

      if (response.status === 200) {
        await this.getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getWebSocketToken(chatId: number) {
    try {
      const response = await chatsAPI.getWebSocketToken(chatId);

      if (response.status === 200) {
        return (JSON.parse(response.response) as WebSocketTokenModel).token;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ChatsController();
