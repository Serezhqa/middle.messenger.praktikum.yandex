import Block from '../../utils/Block';
import template from './register.hbs';
import './register.scss';
import AuthInputGroup, { inputHandler } from '../../components/authInputGroup/index';
import SubmitButton from '../../components/submitButton';
import renderDOM from '../../utils/renderDOM';
import {
  blurHandler,
  emailValidation,
  firstNameValidation,
  focusHandler,
  formSubmitHandler,
  loginValidation, password2Validation, passwordValidation, phoneValidation,
  secondNameValidation
} from '../../utils/validation';

export default class Register extends Block {
  protected initChildren() {
    this.children.emailAuthInputGroup = new AuthInputGroup({
      name: 'email',
      placeholder: 'Почта',
      type: 'email',
      pattern: emailValidation.pattern,
      errorText: emailValidation.message,
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
      pattern: loginValidation.pattern,
      errorText: loginValidation.message,
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
      pattern: firstNameValidation.pattern,
      errorText: firstNameValidation.message,
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
      pattern: secondNameValidation.pattern,
      errorText: secondNameValidation.message,
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
      pattern: phoneValidation.pattern,
      errorText: phoneValidation.message,
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
      pattern: passwordValidation.pattern,
      errorText: passwordValidation.message,
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
      pattern: password2Validation.pattern,
      errorText: password2Validation.message,
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
