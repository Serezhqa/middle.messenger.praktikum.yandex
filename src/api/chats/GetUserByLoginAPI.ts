import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { AddUserFormModel } from '../models';

export default class GetUserByLoginAPI extends BaseAPI {
  request(addUserData: AddUserFormModel) {
    return http.post(this.baseURL + '/user/search', {
      data: JSON.stringify(addUserData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
