import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import ProfileInput from '../../components/profileInput';
import SubmitButton from '../../components/submitButton';
import Modal from '../../components/modal';
import {
  emailValidation,
  loginValidation,
  firstNameValidation,
  secondNameValidation,
  displayNameValidation,
  phoneValidation,
  passwordValidation,
  password2Validation,
  formSubmitHandler
} from '../../utils/validation';
import router from '../../utils/Router';
import store, { State, StoreEvents } from '../../utils/Store';
import { UpdateAvatarFormModel, UpdateUserFormModel, UserModel } from '../../api/models';
import isEqual, { PlainObject } from '../../utils/isEqual';
import mockProfilePicture from '../../images/mock-profile-picture.svg';
import { baseURL } from '../../utils/HTTP';
import profileController from '../../controllers/ProfileController';
import authController from '../../controllers/AuthController';

function mapStateToProps(state: State) {
  return {
    user: { ...state.user },
    image: (state.user as UserModel).avatar
      ? `${baseURL}/resources${(state.user as UserModel).avatar}`
      : mockProfilePicture,
    displayName: (state.user as UserModel).display_name || (state.user as UserModel).first_name
  };
}

type ProfileProps = {
  editingData: boolean;
  editingPassword: boolean;
  editing: boolean;
  user: UserModel;
  image: string;
  displayName: string;
};

export default class Profile extends Block {
  constructor() {
    super({
      editingData: false,
      editingPassword: false,
      editing: false,
      user: {},
      image: mockProfilePicture,
      displayName: ''
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(mapStateToProps(store.getState()));
    });
  }

  protected componentDidMount() {
    this.setProps(mapStateToProps(store.getState()));
    this.setProps({
      editingData: false,
      editingPassword: false,
      editing: false
    });
  }

  protected initChildren() {
    this.children.emailProfileInput = new ProfileInput({
      name: 'email',
      text: 'Почта',
      type: 'email',
      value: (this.props as ProfileProps).user.email,
      editing: false,
      pattern: emailValidation.pattern,
      errorText: emailValidation.message
    });

    this.children.loginProfileInput = new ProfileInput({
      name: 'login',
      text: 'Логин',
      type: 'text',
      value: (this.props as ProfileProps).user.login,
      editing: false,
      minlength: 3,
      maxlength: 20,
      pattern: loginValidation.pattern,
      errorText: loginValidation.message
    });

    this.children.firstNameProfileInput = new ProfileInput({
      name: 'first_name',
      text: 'Имя',
      type: 'text',
      value: (this.props as ProfileProps).user.first_name,
      editing: false,
      pattern: firstNameValidation.pattern,
      errorText: firstNameValidation.message
    });

    this.children.secondNameProfileInput = new ProfileInput({
      name: 'second_name',
      text: 'Фамилия',
      type: 'text',
      value: (this.props as ProfileProps).user.second_name,
      editing: false,
      pattern: secondNameValidation.pattern,
      errorText: secondNameValidation.message
    });

    this.children.displayNameProfileInput = new ProfileInput({
      name: 'display_name',
      text: 'Имя в чате',
      type: 'text',
      value: (this.props as ProfileProps).user.display_name || (this.props as ProfileProps).user.first_name,
      editing: false,
      pattern: displayNameValidation.pattern,
      errorText: displayNameValidation.message
    });

    this.children.phoneProfileInput = new ProfileInput({
      name: 'phone',
      text: 'Телефон',
      type: 'text',
      value: (this.props as ProfileProps).user.phone,
      editing: false,
      minlength: 10,
      maxlength: 15,
      pattern: phoneValidation.pattern,
      errorText: phoneValidation.message
    });

    this.children.oldPasswordProfileInput = new ProfileInput({
      name: 'oldPassword',
      text: 'Старый пароль',
      type: 'password',
      value: '',
      editing: true,
      minlength: 8,
      maxlength: 40,
      pattern: passwordValidation.pattern,
      errorText: passwordValidation.message
    });

    this.children.passwordProfileInput = new ProfileInput({
      name: 'password',
      text: 'Новый пароль',
      type: 'password',
      value: '',
      editing: true,
      minlength: 8,
      maxlength: 40,
      pattern: passwordValidation.pattern,
      errorText: passwordValidation.message
    });

    this.children.password2ProfileInput = new ProfileInput({
      name: 'password2',
      text: 'Повторите новый пароль',
      type: 'password',
      value: '',
      editing: true,
      minlength: 8,
      maxlength: 40,
      pattern: password2Validation.pattern,
      errorText: password2Validation.message
    });

    this.children.submitButton = new SubmitButton({
      text: 'Сохранить'
    });

    this.children.changeImageModal = new Modal({
      modificator: 'change-image',
      title: 'Загрузите файл',
      withFileInput: true,
      button: new SubmitButton({
        text: 'Поменять'
      }),
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);

          await profileController.updateAvatar(formData as unknown as UpdateAvatarFormModel);
          form.reset();
          this.children.changeImageModal.element?.classList.remove('modal_opened');

          const modalTitleElement = this.element?.querySelector('.modal__title');
          const labelElement = this.element?.querySelector('.modal__file-label');
          const filenameElement = this.element?.querySelector('.modal__filename');

          if (modalTitleElement) {
            modalTitleElement.textContent = 'Загрузите файл';
          }

          if (filenameElement && labelElement) {
            labelElement.classList.remove('modal__file-label_hidden');
            filenameElement.textContent = '';
            filenameElement.classList.remove('modal__filename_visible');
          }
        }
      }
    });
  }

  protected componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
    if (oldProps.editing !== newProps.editing) {
      this.children.emailProfileInput.setProps({
        editing: newProps.editing
      });
      this.children.loginProfileInput.setProps({
        editing: newProps.editing
      });
      this.children.firstNameProfileInput.setProps({
        editing: newProps.editing
      });
      this.children.secondNameProfileInput.setProps({
        editing: newProps.editing
      });
      this.children.displayNameProfileInput.setProps({
        editing: newProps.editing
      });
      this.children.phoneProfileInput.setProps({
        editing: newProps.editing
      });
    }

    if (!isEqual(oldProps.user as PlainObject, newProps.user as PlainObject)) {
      this.children.emailProfileInput.setProps({
        value: (newProps as ProfileProps).user.email
      });
      this.children.loginProfileInput.setProps({
        value: (newProps as ProfileProps).user.login
      });
      this.children.firstNameProfileInput.setProps({
        value: (newProps as ProfileProps).user.first_name
      });
      this.children.secondNameProfileInput.setProps({
        value: (newProps as ProfileProps).user.second_name
      });
      this.children.displayNameProfileInput.setProps({
        value: (this.props as ProfileProps).user.display_name || (this.props as ProfileProps).user.first_name
      });
      this.children.phoneProfileInput.setProps({
        value: (newProps as ProfileProps).user.phone
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  protected afterRender() {
    if (!this.element) {
      return;
    }

    const logoutLink = this.element.querySelector('.profile__button_type_logout');
    if (logoutLink) {
      logoutLink.addEventListener('click', () => {
        authController.logout();
      });
    }

    const backLink = this.element.querySelector('.profile__back-arrow');
    if (backLink) {
      backLink.addEventListener('click', () => {
        router.go('/messenger');
      });
    }

    const editDataButton = this.element.querySelector('.profile__button_type_data');
    if (editDataButton) {
      editDataButton.addEventListener('click', () => {
        this.setProps({
          editingData: true,
          editingPassword: false,
          editing: true
        });
      });
    }

    const editPasswordButton = this.element.querySelector('.profile__button_type_password');
    if (editPasswordButton) {
      editPasswordButton.addEventListener('click', () => {
        this.setProps({
          editingData: false,
          editingPassword: true,
          editing: true
        });
      });
    }

    const changeImageButton = this.element.querySelector('.profile__image-button');
    const modal = this.element.querySelector('.modal');

    if (changeImageButton && modal) {
      changeImageButton.addEventListener('click', () => {
        modal.classList.add('modal_opened');
      });
    }

    const profileForm: HTMLFormElement | null = this.element.querySelector('.profile__form');
    if (profileForm) {
      profileForm.addEventListener('submit', (event: SubmitEvent) => {
        const editingPassword = (this.props as ProfileProps).editingPassword;
        const data = formSubmitHandler(
          event,
          'profile-input__error_visible',
          editingPassword
        );

        if (!data) {
          return;
        }

        if (editingPassword) {
          const { oldPassword, password: newPassword } = data;
          profileController.updatePassword({ oldPassword, newPassword });
        } else {
          profileController.updateUser(data as UpdateUserFormModel);
        }

        this.setProps({
          editingData: false,
          editingPassword: false,
          editing: false
        });
      });
    }
  }
}
