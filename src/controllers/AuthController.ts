import RegisterAPI from '../api/auth/RegisterAPI';
import GetUserAPI from '../api/auth/GetUserAPI';
import LoginAPI from '../api/auth/LoginAPI';
import LogoutAPI from '../api/auth/LogoutAPI';
import { LoginFormModel, RegisterFormModel } from '../api/models';
import router from '../utils/Router';
import store from '../utils/Store';
import ChatsController from './ChatsController';

export default class AuthController {
  registerAPI = new RegisterAPI();

  getUserAPI = new GetUserAPI();

  loginAPI = new LoginAPI();

  logoutAPI = new LogoutAPI();

  chatsController = new ChatsController();

  async register(registerData: RegisterFormModel) {
    try {
      this.registerAPI.create(registerData)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            this.getUser()
              .then(() => this.chatsController.getChats());
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getUser() {
    try {
      this.getUserAPI.request()
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
      this.loginAPI.request(loginData)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            this.getUser()
              .then(() => this.chatsController.getChats());
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      this.logoutAPI.request()
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
