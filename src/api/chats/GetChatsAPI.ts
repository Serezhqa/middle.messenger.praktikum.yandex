import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';

export default class GetChatsAPI extends BaseAPI {
  request() {
    return http.get(this.baseURL + '/chats', {
      timeout: 5000
    });
  }
}
