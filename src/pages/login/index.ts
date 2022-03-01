import Block from '../../utils/Block';
import template from './login.hbs';
import './login.scss';
import AuthInputGroup, { inputHandler } from '../../components/authInputGroup/index';
import SubmitButton from '../../components/submitButton';
import renderDOM from '../../utils/renderDOM';
import { blurHandler, focusHandler, formSubmitHandler } from '../../utils/validation';

export default class Login extends Block {
  protected initChildren() {
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

    this.children.submitButton = new SubmitButton({
      text: 'Авторизоваться'
    });
  }

  render() {
    return this.compile(template, {});
  }
}

const login = new Login();

renderDOM('.app', login);

const loginForm: HTMLFormElement | null = document.querySelector('.login__form');
if (loginForm) {
  loginForm.addEventListener('submit', (event: SubmitEvent) => formSubmitHandler(
    event,
    loginForm,
    '.auth-input-group__input',
    'auth-input-group__error_visible'
  ));
}
