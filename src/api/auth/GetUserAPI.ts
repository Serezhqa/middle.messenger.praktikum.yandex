import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';

export default class GetUserAPI extends BaseAPI {
  request() {
    return http.get(this.baseURL + '/auth/user', {
      timeout: 5000
    });
  }
}
