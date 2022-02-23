import Block from '../../utils/Block';
import template from './login.hbs';
import './login.scss';
import AuthInputGroup from '../../components/authInputGroup/index';
import SubmitButton from '../../components/submitButton';
import renderDOM from '../../utils/renderDOM';

export default class Login extends Block {
  protected initChildren() {
    this.children.loginAuthInputGroup = new AuthInputGroup({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      errorText: 'Ошибка'
    });

    this.children.passwordAuthInputGroup = new AuthInputGroup({
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      errorText: 'Ошибка'
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
