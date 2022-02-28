import Block from '../../utils/Block';
import template from './login.hbs';
import './login.scss';
import AuthInputGroup, {
  blurHandler,
  focusHandler,
  inputHandler
} from '../../components/authInputGroup/index';
import SubmitButton from '../../components/submitButton';
import renderDOM from '../../utils/renderDOM';

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
        focusin: focusHandler,
        focusout: blurHandler
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
        focusin: focusHandler,
        focusout: blurHandler
      }
    });

    this.children.submitButton = new SubmitButton({
      text: 'Авторизоваться',
      events: {
        click: (event) => {
          event.preventDefault();
          console.log(event);
        }
      }
    });
  }

  render() {
    return this.compile(template, {});
  }
}

const login = new Login();

renderDOM('.app', login);
