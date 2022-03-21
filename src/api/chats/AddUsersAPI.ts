import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { ChatUsersModel } from '../models';

export default class AddUsersAPI extends BaseAPI {
  update(users: ChatUsersModel) {
    return http.put(this.baseURL + '/chats/users', {
      data: JSON.stringify(users),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
