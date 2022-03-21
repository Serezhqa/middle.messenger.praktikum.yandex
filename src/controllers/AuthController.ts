import { LoginFormModel, RegisterFormModel } from '../api/models';
import router from '../utils/Router';
import store from '../utils/Store';
import authAPI from '../api/AuthAPI';
import chatsController from './ChatsController';

class AuthController {
  async register(registerData: RegisterFormModel) {
    try {
      authAPI.register(registerData)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            this.getUser()
              .then(() => chatsController.getChats());
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getUser() {
    try {
      authAPI.getUser()
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            store.set('user', JSON.parse(response.response));
            if (window.location.pathname === '/' || window.location.pathname === '/sign-up') {
              router.go('/messenger');
            }
          } else {
            router.go('/');
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async login(loginData: LoginFormModel) {
    try {
      authAPI.login(loginData)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            this.getUser()
              .then(() => chatsController.getChats());
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      authAPI.logout()
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            router.go('/');
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
