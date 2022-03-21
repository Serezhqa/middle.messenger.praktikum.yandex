import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { RegisterFormModel } from '../models';

export default class RegisterAPI extends BaseAPI {
  create(registerData: RegisterFormModel) {
    return http.post(this.baseURL + '/auth/signup', {
      data: JSON.stringify(registerData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
