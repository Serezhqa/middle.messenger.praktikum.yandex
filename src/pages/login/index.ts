import Block from '../../utils/Block';
import template from './login.hbs';
import './login.scss';
import AuthInputGroup from '../../components/authInputGroup/index';
import SubmitButton from '../../components/submitButton';
import renderDOM from '../../utils/renderDOM';
import { formSubmitHandler, loginValidation, passwordValidation } from '../../utils/validation';

export default class Login extends Block {
  protected initChildren() {
    this.children.loginAuthInputGroup = new AuthInputGroup({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      minlength: 3,
      maxlength: 20,
      pattern: loginValidation.pattern,
      errorText: loginValidation.message
    });

    this.children.passwordAuthInputGroup = new AuthInputGroup({
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      minlength: 8,
      maxlength: 40,
      pattern: passwordValidation.pattern,
      errorText: passwordValidation.message
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
