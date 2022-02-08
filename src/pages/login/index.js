import './login.sass';
import {authPageTmpl} from './login.tmpl';
import {renderToPage, addListeners} from '../../utils/utils';

const context = {
  type: 'login',
  title: 'Вход',
  inputGroup: [
    {
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
      errorText: 'Ошибка'
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      errorText: 'Ошибка'
    }
  ],
  buttonText: 'Авторизоваться',
  route: '/register.html',
  linkText: 'Нет аккаунта?'
};

renderToPage(authPageTmpl, context);
addListeners();