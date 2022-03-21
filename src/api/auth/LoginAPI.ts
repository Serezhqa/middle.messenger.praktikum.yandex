import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { LoginFormModel } from '../models';

export default class LoginAPI extends BaseAPI {
  request(loginData: LoginFormModel) {
    return http.post(this.baseURL + '/auth/signin', {
      data: JSON.stringify(loginData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
