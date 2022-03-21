import BaseAPI from '../BaseAPI';
import http from '../../utils/HTTP';
import { UpdateAvatarFormModel } from '../models';

export default class UpdateAvatarAPI extends BaseAPI {
  update(updateAvatarData: UpdateAvatarFormModel) {
    return http.put(this.baseURL + '/user/profile/avatar', {
      data: updateAvatarData,
      timeout: 5000
    });
  }
}
