import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { DeleteChatFormModel } from '../models';

export default class DeleteChatAPI extends BaseAPI {
  delete(chatId: DeleteChatFormModel) {
    return http.delete(this.baseURL + '/chats', {
      data: JSON.stringify(chatId),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
