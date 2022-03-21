import UpdateUserAPI from '../api/profile/UpdateUserAPI';
import { UpdateAvatarFormModel, UpdatePasswordFormModel, UpdateUserFormModel } from '../api/models';
import store from '../utils/Store';
import UpdatePasswordAPI from '../api/profile/UpdatePasswordAPI';
import UpdateAvatarAPI from '../api/profile/UpdateAvatarAPI';

export default class ProfileController {
  updateUserAPI = new UpdateUserAPI();

  updatePasswordAPI = new UpdatePasswordAPI();

  updateAvatarAPI = new UpdateAvatarAPI();

  async updateUser(updateUserData: UpdateUserFormModel) {
    try {
      this.updateUserAPI.update(updateUserData)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            store.set('user', JSON.parse(response.response));
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(updatePasswordData: UpdatePasswordFormModel) {
    try {
      this.updatePasswordAPI.update(updatePasswordData);
    } catch (error) {
      console.log(error);
    }
  }

  async updateAvatar(updateAvatarData: UpdateAvatarFormModel) {
    try {
      this.updateAvatarAPI.update(updateAvatarData)
        .then((response: XMLHttpRequest) => {
          if (response.status === 200) {
            store.set('user', JSON.parse(response.response));
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
