import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';

export default class RequestWebSocketTokenAPI extends BaseAPI {
  request(chatId: number) {
    return http.post(this.baseURL + '/chats/token/' + chatId, {
      timeout: 5000
    });
  }
}
