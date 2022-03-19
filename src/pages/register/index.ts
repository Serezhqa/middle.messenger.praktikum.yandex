import Block from '../../utils/Block';
import template from './register.hbs';
import './register.scss';
import AuthInput from '../../components/authInput/index';
import SubmitButton from '../../components/submitButton';
import {
  emailValidation,
  loginValidation,
  firstNameValidation,
  secondNameValidation,
  phoneValidation,
  passwordValidation,
  password2Validation,
  formSubmitHandler
} from '../../utils/validation';
import AuthController from '../../controllers/AuthController';
import { RegisterFormModel } from '../../api/models';
import router from '../../utils/Router';

export default class Register extends Block {
  authController = new AuthController();

  protected initChildren() {
    this.children.emailAuthInput = new AuthInput({
      name: 'email',
      placeholder: 'Почта',
      type: 'email',
      pattern: emailValidation.pattern,
      errorText: emailValidation.message
    });

    this.children.loginAuthInput = new AuthInput({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      minlength: 3,
      maxlength: 20,
      pattern: loginValidation.pattern,
      errorText: loginValidation.message
    });

    this.children.firstNameAuthInput = new AuthInput({
      name: 'first_name',
      placeholder: 'Имя',
      type: 'text',
      pattern: firstNameValidation.pattern,
      errorText: firstNameValidation.message
    });

    this.children.secondNameAuthInput = new AuthInput({
      name: 'second_name',
      placeholder: 'Фамилия',
      type: 'text',
      pattern: secondNameValidation.pattern,
      errorText: secondNameValidation.message
    });

    this.children.phoneAuthInput = new AuthInput({
      name: 'phone',
      placeholder: 'Телефон',
      type: 'text',
      minlength: 10,
      maxlength: 15,
      pattern: phoneValidation.pattern,
      errorText: phoneValidation.message
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

    this.children.password2AuthInput = new AuthInput({
      name: 'password2',
      placeholder: 'Пароль (ещё раз)',
      type: 'password',
      minlength: 8,
      maxlength: 40,
      pattern: password2Validation.pattern,
      errorText: password2Validation.message
    });

    this.children.submitButton = new SubmitButton({
      text: 'Зарегистрироваться'
    });
  }

  render() {
    return this.compile(template, {});
  }

  protected afterRender() {
    if (!this.element) {
      return;
    }

    const registerLink = this.element.querySelector('.register__link');
    if (registerLink) {
      registerLink.addEventListener('click', () => {
        router.go('/');
      });
    }

    const registerForm: HTMLFormElement | null = this.element.querySelector('.register__form');
    if (registerForm) {
      registerForm.addEventListener('submit', (event: SubmitEvent) => {
        const registerData = formSubmitHandler(
          event,
          'auth-input__error_visible',
          true
        );
        if (!registerData) {
          return;
        }
        delete registerData?.password2;
        this.authController.register(registerData as RegisterFormModel);
      });
    }
  }
}
