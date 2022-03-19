import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { ChatUsersModel } from '../models';

export default class RemoveUsersAPI extends BaseAPI {
  delete(users: ChatUsersModel) {
    return http.delete(this.baseURL + '/chats/users', {
      data: JSON.stringify(users),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
