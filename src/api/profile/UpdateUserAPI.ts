import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { UpdateUserFormModel } from '../models';

export default class UpdateUserAPI extends BaseAPI {
  update(updateUserData: UpdateUserFormModel) {
    return http.put(this.baseURL + '/user/profile', {
      data: JSON.stringify(updateUserData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
