import http, { baseURL } from '../utils/HTTP';
import { LoginFormModel, RegisterFormModel } from './models';

class AuthAPI {
  getUser(): Promise<XMLHttpRequest> {
    return http.get(baseURL + '/auth/user', {
      timeout: 5000
    });
  }

  login(loginData: LoginFormModel): Promise<XMLHttpRequest> {
    return http.post(baseURL + '/auth/signin', {
      data: JSON.stringify(loginData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  logout(): Promise<XMLHttpRequest> {
    return http.post(baseURL + '/auth/logout', {
      timeout: 5000
    });
  }

  register(registerData: RegisterFormModel): Promise<XMLHttpRequest> {
    return http.post(baseURL + '/auth/signup', {
      data: JSON.stringify(registerData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}

export default new AuthAPI();
