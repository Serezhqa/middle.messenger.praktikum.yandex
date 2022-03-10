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

export default class Profile extends Block {
  constructor() {
    super({
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
      value: 'pochta@yandex.ru',
      editing: false,
      pattern: emailValidation.pattern,
      errorText: emailValidation.message
    });

    this.children.loginProfileInput = new ProfileInput({
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

    this.children.firstNameProfileInput = new ProfileInput({
      name: 'first_name',
      text: 'Имя',
      type: 'text',
      value: 'Иван',
      editing: false,
      pattern: firstNameValidation.pattern,
      errorText: firstNameValidation.message
    });

    this.children.secondNameProfileInput = new ProfileInput({
      name: 'second_name',
      text: 'Фамилия',
      type: 'text',
      value: 'Иванов',
      editing: false,
      pattern: secondNameValidation.pattern,
      errorText: secondNameValidation.message
    });

    this.children.displayNameProfileInput = new ProfileInput({
      name: 'display_name',
      text: 'Имя в чате',
      type: 'text',
      value: 'Иван',
      editing: false,
      pattern: displayNameValidation.pattern,
      errorText: displayNameValidation.message
    });

    this.children.phoneProfileInput = new ProfileInput({
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
      })
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

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  protected addEvents() {
    if (!this.element) {
      return;
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
      profileForm.addEventListener('submit', (event: SubmitEvent) => formSubmitHandler(
        event,
        profileForm,
        '.profile-input-group__input',
        'profile-input-group__error_visible',
        this.props.editingPassword as boolean
      ));
    }
  }
}
