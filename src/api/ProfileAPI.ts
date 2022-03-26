import { UpdateAvatarFormModel, UpdatePasswordFormModel, UpdateUserFormModel } from './models';
import http, { baseURL } from '../utils/HTTP';

class ProfileAPI {
  updateAvatar(updateAvatarData: UpdateAvatarFormModel): Promise<XMLHttpRequest> {
    return http.put(baseURL + '/user/profile/avatar', {
      data: updateAvatarData,
      timeout: 5000
    });
  }

  updatePassword(updatePasswordData: UpdatePasswordFormModel): Promise<XMLHttpRequest> {
    return http.put(baseURL + '/user/password', {
      data: JSON.stringify(updatePasswordData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateUser(updateUserData: UpdateUserFormModel): Promise<XMLHttpRequest> {
    return http.put(baseURL + '/user/profile', {
      data: JSON.stringify(updateUserData),
      timeout: 5000,
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}

export default new ProfileAPI();
