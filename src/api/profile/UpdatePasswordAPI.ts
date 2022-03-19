import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { UpdatePasswordFormModel } from '../models';

export default class UpdatePasswordAPI extends BaseAPI {
  update(updatePasswordData: UpdatePasswordFormModel) {
    return http.put(this.baseURL + '/user/password', {
      data: JSON.stringify(updatePasswordData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
