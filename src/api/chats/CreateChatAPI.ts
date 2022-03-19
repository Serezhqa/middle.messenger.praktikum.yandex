import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { AddChatFormModel } from '../models';

export default class CreateChatAPI extends BaseAPI {
  create(addChatData: AddChatFormModel) {
    return http.post(this.baseURL + '/chats', {
      data: JSON.stringify(addChatData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
