import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import renderDOM from '../../utils/renderDOM';
import ProfileInputGroup from '../../components/profileInputGroup';
import SubmitButton from '../../components/submitButton';
import Modal, { clickHandler, fileInputChangeHandler } from '../../components/modal';
import { blurHandler, focusHandler, formSubmitHandler } from '../../utils/validation';

export default class Profile extends Block {
  protected initChildren() {
    this.children.emailProfileInputGroup = new ProfileInputGroup({
      name: 'email',
      text: 'Почта',
      type: 'email',
      value: 'pochta@yandex.ru',
      editing: false,
      pattern: '[A-Za-z0-9_-]+@[A-Za-z]+\\.[A-Za-z0-9_-]+',
      errorText: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательна @ и точка после, но перед точкой обязательно должны быть буквы',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.loginProfileInputGroup = new ProfileInputGroup({
      name: 'login',
      text: 'Логин',
      type: 'text',
      value: 'ivanivanov',
      editing: false,
      minlength: 3,
      maxlength: 20,
      pattern: '[a-zA-Z0-9_-]*[a-zA-Z_-][a-zA-Z0-9_-]*',
      errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, допустимы дефис и нижнее подчёркивание',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.firstNameProfileInputGroup = new ProfileInputGroup({
      name: 'first_name',
      text: 'Имя',
      type: 'text',
      value: 'Иван',
      editing: false,
      pattern: '[A-ZА-ЯЁ]+[A_Za-zА-Яа-яЁё-]+',
      errorText: 'Латиница или кириллица, первая буква заглавная, без пробелов и цифр, нет спецсимволов (допустим только дефис)',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.secondNameProfileInputGroup = new ProfileInputGroup({
      name: 'second_name',
      text: 'Фамилия',
      type: 'text',
      value: 'Иванов',
      editing: false,
      pattern: '[A-ZА-ЯЁ]+[A_Za-zА-Яа-яЁё-]+',
      errorText: 'Латиница или кириллица, первая буква заглавная, без пробелов и цифр, нет спецсимволов (допустим только дефис)',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.displayNameProfileInputGroup = new ProfileInputGroup({
      name: 'display_name',
      text: 'Имя в чате',
      type: 'text',
      value: 'Иван',
      editing: false,
      pattern: '[A-Za-zА-Яа-яЁё0-9_-]+',
      errorText: 'Заполните поле',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.phoneProfileInputGroup = new ProfileInputGroup({
      name: 'phone',
      text: 'Телефон',
      type: 'text',
      value: '+79091234567',
      editing: false,
      minlength: 10,
      maxlength: 15,
      pattern: '\\+?[0-9]+',
      errorText: 'От 10 до 15 символов, состоит из цифр, может начинаться с плюса',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.oldPasswordProfileInputGroup = new ProfileInputGroup({
      name: 'oldPassword',
      text: 'Старый пароль',
      type: 'password',
      value: '',
      editing: true,
      minlength: 8,
      maxlength: 40,
      pattern: '(?=.*[A-Z])(?=.*[0-9]).*',
      errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.passwordProfileInputGroup = new ProfileInputGroup({
      name: 'password',
      text: 'Новый пароль',
      type: 'password',
      value: '',
      editing: true,
      minlength: 8,
      maxlength: 40,
      pattern: '(?=.*[A-Z])(?=.*[0-9]).*',
      errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.password2ProfileInputGroup = new ProfileInputGroup({
      name: 'password2',
      text: 'Повторите новый пароль',
      type: 'password',
      value: '',
      editing: true,
      minlength: 8,
      maxlength: 40,
      pattern: '(?=.*[A-Z])(?=.*[0-9]).*',
      errorText: 'Пароли должны совпадать',
      events: {
        focusin: (event: FocusEvent) => focusHandler(event, 'profile-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'profile-input-group__error_visible')
      }
    });

    this.children.submitButton = new SubmitButton({
      text: 'Сохранить'
    });

    this.children.changeImageModal = new Modal({
      modificator: 'change-image',
      title: 'Загрузите файл',
      withFileInput: true,
      events: {
        click: clickHandler,
        change: fileInputChangeHandler
      },
      button: new SubmitButton({
        text: 'Поменять'
      })
    });
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
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
        'profile-input-group__error_visible'
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
