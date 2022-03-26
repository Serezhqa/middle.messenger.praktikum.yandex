import { LoginFormModel, RegisterFormModel } from '../api/models';
import router from '../utils/Router';
import store from '../utils/Store';
import authAPI from '../api/AuthAPI';
import chatsController from './ChatsController';

class AuthController {
  async register(registerData: RegisterFormModel) {
    try {
      const response = await authAPI.register(registerData);

      if (response.status === 200) {
        await this.getUser();
        await chatsController.getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUser() {
    try {
      const response = await authAPI.getUser();

      if (response.status === 200) {
        store.set('user', JSON.parse(response.response));
        if (window.location.pathname === '/' || window.location.pathname === '/sign-up') {
          router.go('/messenger');
        }
      } else {
        router.go('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(loginData: LoginFormModel) {
    try {
      const response = await authAPI.login(loginData);

      if (response.status === 200) {
        await this.getUser();
        await chatsController.getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      const response = await authAPI.logout();

      if (response.status === 200) {
        router.go('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
