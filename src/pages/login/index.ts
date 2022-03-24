import Block from '../../utils/Block';
import template from './login.hbs';
import './login.scss';
import AuthInput from '../../components/authInput/index';
import SubmitButton from '../../components/submitButton';
import { formSubmitHandler, loginValidation, passwordValidation } from '../../utils/validation';
import router from '../../utils/Router';
import { LoginFormModel } from '../../api/models';
import authController from '../../controllers/AuthController';

export default class Login extends Block {
  protected initChildren() {
    this.children.loginAuthInput = new AuthInput({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      minlength: 3,
      maxlength: 20,
      pattern: loginValidation.pattern,
      errorText: loginValidation.message
    });

    this.children.passwordAuthInput = new AuthInput({
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

  protected afterRender() {
    if (!this.element) {
      return;
    }

    const loginLink = this.element.querySelector('.login__link');
    if (loginLink) {
      loginLink.addEventListener('click', () => {
        router.go('/sign-up');
      });
    }

    const loginForm: HTMLFormElement | null = this.element.querySelector('.login__form');
    if (loginForm) {
      loginForm.addEventListener('submit', (event: SubmitEvent) => {
        const loginData = formSubmitHandler(
          event,
          'auth-input__error_visible'
        );

        if (!loginData) {
          return;
        }

        authController.login(loginData as LoginFormModel);
      });
    }
  }
}
