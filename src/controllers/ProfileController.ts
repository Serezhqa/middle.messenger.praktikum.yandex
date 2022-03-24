import { UpdateAvatarFormModel, UpdatePasswordFormModel, UpdateUserFormModel } from '../api/models';
import store from '../utils/Store';
import profileAPI from '../api/ProfileAPI';

class ProfileController {
  async updateUser(updateUserData: UpdateUserFormModel) {
    try {
      const response = await profileAPI.updateUser(updateUserData);

      if (response.status === 200) {
        store.set('user', JSON.parse(response.response));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(updatePasswordData: UpdatePasswordFormModel) {
    try {
      await profileAPI.updatePassword(updatePasswordData);
    } catch (error) {
      console.log(error);
    }
  }

  async updateAvatar(updateAvatarData: UpdateAvatarFormModel) {
    try {
      const response = await profileAPI.updateAvatar(updateAvatarData);

      if (response.status === 200) {
        store.set('user', JSON.parse(response.response));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ProfileController();
