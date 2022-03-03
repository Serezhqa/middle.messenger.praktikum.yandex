import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import renderDOM from '../../utils/renderDOM';
import ProfileInputGroup from '../../components/profileInputGroup';
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

export default class Profile extends Block {
  protected initChildren() {
    this.children.emailProfileInputGroup = new ProfileInputGroup({
      name: 'email',
      text: 'Почта',
      type: 'email',
      value: 'pochta@yandex.ru',
      editing: false,
      pattern: emailValidation.pattern,
      errorText: emailValidation.message
    });

    this.children.loginProfileInputGroup = new ProfileInputGroup({
      name: 'login',
      text: 'Логин',
      type: 'text',
      value: 'ivanivanov',
      editing: false,
      minlength: 3,
      maxlength: 20,
      pattern: loginValidation.pattern,
      errorText: loginValidation.message
    });

    this.children.firstNameProfileInputGroup = new ProfileInputGroup({
      name: 'first_name',
      text: 'Имя',
      type: 'text',
      value: 'Иван',
      editing: false,
      pattern: firstNameValidation.pattern,
      errorText: firstNameValidation.message
    });

    this.children.secondNameProfileInputGroup = new ProfileInputGroup({
      name: 'second_name',
      text: 'Фамилия',
      type: 'text',
      value: 'Иванов',
      editing: false,
      pattern: secondNameValidation.pattern,
      errorText: secondNameValidation.message
    });

    this.children.displayNameProfileInputGroup = new ProfileInputGroup({
      name: 'display_name',
      text: 'Имя в чате',
      type: 'text',
      value: 'Иван',
      editing: false,
      pattern: displayNameValidation.pattern,
      errorText: displayNameValidation.message
    });

    this.children.phoneProfileInputGroup = new ProfileInputGroup({
      name: 'phone',
      text: 'Телефон',
      type: 'text',
      value: '+79091234567',
      editing: false,
      minlength: 10,
      maxlength: 15,
      pattern: phoneValidation.pattern,
      errorText: phoneValidation.message
    });

    this.children.oldPasswordProfileInputGroup = new ProfileInputGroup({
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

    this.children.passwordProfileInputGroup = new ProfileInputGroup({
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

    this.children.password2ProfileInputGroup = new ProfileInputGroup({
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
      })
    });
  }

  protected componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
    if (oldProps.editing !== newProps.editing) {
      this.children.emailProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.loginProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.firstNameProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.secondNameProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.displayNameProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.phoneProfileInputGroup.setProps({
        editing: newProps.editing
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  protected addEvents() {
    if (!this.element) {
      return;
    }

    const profileForm: HTMLFormElement | null = this.element.querySelector('.profile__form');
    if (profileForm) {
      profileForm.addEventListener('submit', (event: SubmitEvent) => formSubmitHandler(
        event,
        profileForm,
        '.profile-input-group__input',
        'profile-input-group__error_visible',
        true
      ));
    }
  }
}

const profile = new Profile({
  editingData: false,
  editingPassword: false,
  editing: false
});

renderDOM('.app', profile);

const editDataButton = document.querySelector('.profile__button_type_data');
if (editDataButton) {
  editDataButton.addEventListener('click', () => {
    profile.setProps({
      editingData: true,
      editingPassword: false,
      editing: true
    });
  });
}

const editPasswordButton = document.querySelector('.profile__button_type_password');
if (editPasswordButton) {
  editPasswordButton.addEventListener('click', () => {
    profile.setProps({
      editingData: false,
      editingPassword: true,
      editing: true
    });
  });
}

const changeImageButton = document.querySelector('.profile__image-button');
const modal = document.querySelector('.modal');

if (changeImageButton && modal) {
  changeImageButton.addEventListener('click', () => {
    modal.classList.add('modal_opened');
  });
}
