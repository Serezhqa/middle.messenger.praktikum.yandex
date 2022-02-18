import './register.scss';
import { authPageTmpl } from './register.tmpl';
import { renderToPage, addListeners } from '../../utils/utils';

const context = {
  type: 'register',
  title: 'Регистрация',
  inputGroup: [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Почта',
      errorText: 'Ошибка'
    },
    {
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
      errorText: 'Ошибка'
    },
    {
      type: 'text',
      name: 'first_name',
      placeholder: 'Имя',
      errorText: 'Ошибка'
    },
    {
      type: 'text',
      name: 'second_name',
      placeholder: 'Фамилия',
      errorText: 'Ошибка'
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      errorText: 'Ошибка'
    },
    {
      type: 'password',
      name: 'password2',
      placeholder: 'Пароль (ещё раз)',
      errorText: 'Пароли не совпадают'
    }
  ],
  buttonText: 'Зарегистрироваться',
  route: '/login.html',
  linkText: 'Войти'
};

renderToPage(authPageTmpl, context);
addListeners();
