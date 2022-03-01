import Block from '../../utils/Block';
import template from './register.hbs';
import './register.scss';
import AuthInputGroup, { inputHandler } from '../../components/authInputGroup/index';
import SubmitButton from '../../components/submitButton';
import renderDOM from '../../utils/renderDOM';
import { blurHandler, focusHandler, formSubmitHandler } from '../../utils/validation';

export default class Register extends Block {
  protected initChildren() {
    this.children.emailAuthInputGroup = new AuthInputGroup({
      name: 'email',
      placeholder: 'Почта',
      type: 'email',
      pattern: '[A-Za-z0-9_-]+@[A-Za-z]+\\.[A-Za-z0-9_-]+',
      errorText: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательна @ и точка после, но перед точкой обязательно должны быть буквы',
      events: {
        input: inputHandler,
        focusin: (event: FocusEvent) => focusHandler(event, 'auth-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'auth-input-group__error_visible')
      }
    });

    this.children.loginAuthInputGroup = new AuthInputGroup({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      minlength: 3,
      maxlength: 20,
      pattern: '[a-zA-Z0-9_-]*[a-zA-Z_-][a-zA-Z0-9_-]*',
      errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, допустимы дефис и нижнее подчёркивание',
      events: {
        input: inputHandler,
        focusin: (event: FocusEvent) => focusHandler(event, 'auth-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'auth-input-group__error_visible')
      }
    });

    this.children.firstNameAuthInputGroup = new AuthInputGroup({
      name: 'first_name',
      placeholder: 'Имя',
      type: 'text',
      pattern: '[A-ZА-ЯЁ]+[A_Za-zА-Яа-яЁё-]+',
      errorText: 'Латиница или кириллица, первая буква заглавная, без пробелов и цифр, нет спецсимволов (допустим только дефис)',
      events: {
        input: inputHandler,
        focusin: (event: FocusEvent) => focusHandler(event, 'auth-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'auth-input-group__error_visible')
      }
    });

    this.children.secondNameAuthInputGroup = new AuthInputGroup({
      name: 'second_name',
      placeholder: 'Фамилия',
      type: 'text',
      pattern: '[A-ZА-ЯЁ]+[A_Za-zА-Яа-яЁё-]+',
      errorText: 'Латиница или кириллица, первая буква заглавная, без пробелов и цифр, нет спецсимволов (допустим только дефис)',
      events: {
        input: inputHandler,
        focusin: (event: FocusEvent) => focusHandler(event, 'auth-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'auth-input-group__error_visible')
      }
    });

    this.children.phoneAuthInputGroup = new AuthInputGroup({
      name: 'phone',
      placeholder: 'Телефон',
      type: 'text',
      minlength: 10,
      maxlength: 15,
      pattern: '\\+?[0-9]+',
      errorText: 'От 10 до 15 символов, состоит из цифр, может начинаться с плюса',
      events: {
        input: inputHandler,
        focusin: (event: FocusEvent) => focusHandler(event, 'auth-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'auth-input-group__error_visible')
      }
    });

    this.children.passwordAuthInputGroup = new AuthInputGroup({
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      minlength: 8,
      maxlength: 40,
      pattern: '(?=.*[A-Z])(?=.*[0-9]).*',
      errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      events: {
        input: inputHandler,
        focusin: (event: FocusEvent) => focusHandler(event, 'auth-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'auth-input-group__error_visible')
      }
    });

    this.children.password2AuthInputGroup = new AuthInputGroup({
      name: 'password2',
      placeholder: 'Пароль (ещё раз)',
      type: 'password',
      minlength: 8,
      maxlength: 40,
      pattern: '(?=.*[A-Z])(?=.*[0-9]).*',
      errorText: 'Пароли должны совпадать',
      events: {
        input: inputHandler,
        focusin: (event: FocusEvent) => focusHandler(event, 'auth-input-group__error_visible'),
        focusout: (event: FocusEvent) => blurHandler(event, 'auth-input-group__error_visible')
      }
    });

    this.children.submitButton = new SubmitButton({
      text: 'Зарегистрироваться'
    });
  }

  render() {
    return this.compile(template, {});
  }
}

const register = new Register();

renderDOM('.app', register);

const registerForm: HTMLFormElement | null = document.querySelector('.register__form');
if (registerForm) {
  registerForm.addEventListener('submit', (event: SubmitEvent) => formSubmitHandler(
    event,
    registerForm,
    '.auth-input-group__input',
    'auth-input-group__error_visible',
    true
  ));
}
