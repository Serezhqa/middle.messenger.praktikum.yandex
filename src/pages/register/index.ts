import Block from '../../utils/Block';
import template from './register.hbs';
import './register.scss';
import AuthInputGroup, {inputHandler} from '../../components/authInputGroup/index';
import SubmitButton from '../../components/submitButton';
import renderDOM from '../../utils/renderDOM';

export default class Register extends Block {
  protected initChildren() {
    this.children.emailAuthInputGroup = new AuthInputGroup({
      name: 'email',
      placeholder: 'Почта',
      type: 'email',
      errorText: '',
      events: {
        input: inputHandler
      }
    });

    this.children.loginAuthInputGroup = new AuthInputGroup({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      errorText: '',
      events: {
        input: inputHandler
      }
    });

    this.children.firstNameAuthInputGroup = new AuthInputGroup({
      name: 'first_name',
      placeholder: 'Имя',
      type: 'text',
      errorText: '',
      events: {
        input: inputHandler
      }
    });

    this.children.secondNameAuthInputGroup = new AuthInputGroup({
      name: 'second_name',
      placeholder: 'Фамилия',
      type: 'text',
      errorText: '',
      events: {
        input: inputHandler
      }
    });

    this.children.phoneAuthInputGroup = new AuthInputGroup({
      name: 'phone',
      placeholder: 'Телефон',
      type: 'text',
      errorText: '',
      events: {
        input: inputHandler
      }
    });

    this.children.passwordAuthInputGroup = new AuthInputGroup({
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      errorText: '',
      events: {
        input: inputHandler
      }
    });

    this.children.password2AuthInputGroup = new AuthInputGroup({
      name: 'password2',
      placeholder: 'Пароль (ещё раз)',
      type: 'password',
      errorText: '',
      events: {
        input: inputHandler
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
