import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';

export default class LogoutAPI extends BaseAPI {
  request() {
    return http.post(this.baseURL + '/auth/logout', {
      timeout: 5000
    });
  }
}
