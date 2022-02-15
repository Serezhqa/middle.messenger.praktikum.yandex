import './profile.sass';
import {profileTmpl} from './profile.tmpl';
import Handlebars from 'handlebars';
import {renderToPage} from '../../utils/utils';
import {modalTmpl} from '../../components/modal/modal.tmpl';

const context = {
  editingData: false,
  editingPassword: false,
  dataInputs: [
    {
      id: 'profile__input_email',
      text: 'Почта',
      type: 'email',
      name: 'email',
      value: 'pochta@yandex.ru'
    },
    {
      id: 'profile__input_login',
      text: 'Логин',
      type: 'text',
      name: 'login',
      value: 'ivanivanov'
    },
    {
      id: 'profile__input_first-name',
      text: 'Имя',
      type: 'text',
      name: 'first_name',
      value: 'Иван'
    },
    {
      id: 'profile__input_second-name',
      text: 'Фамилия',
      type: 'text',
      name: 'second_name',
      value: 'Иванов'
    },
    {
      id: 'profile__input_display-name',
      text: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      value: 'Иван'
    },
    {
      id: 'profile__input_phone',
      text: 'Телефон',
      type: 'text',
      name: 'phone',
      value: '+7 (909) 967 30 30'
    }
  ],
  passwordInputs: [
    {
      id: 'profile__input_old-password',
      text: 'Старый пароль',
      type: 'password',
      name: 'oldPassword',
      value: '12345678'
    },
    {
      id: 'profile__input_new-password',
      text: 'Новый пароль',
      type: 'password',
      name: 'newPassword',
      value: '87654321'
    },
    {
      id: 'profile__input_new-password2',
      text: 'Повторите новый пароль',
      type: 'password',
      name: 'newPassword2',
      value: '87654321'
    }
  ],
  modal: {
    title: 'Загрузите файл',
    id: 'modal__input_type_avatar',
    type: 'file',
    name: 'avatar',
    placeholder: 'placeholder',
    buttonText: 'Поменять'
  }
};

Handlebars.registerPartial('inputGroup', `
        <div class="profile__input-group">
          <label class="profile__label" for="{{id}}">{{text}}</label>
          <input class="profile__input" id="{{id}}" type="{{type}}" name="{{name}}" value="{{value}}"
            {{#unless editing}}disabled{{/unless}}/>
        </div>
`);
Handlebars.registerPartial('modal', modalTmpl);
Handlebars.registerPartial('modal__form-content', `
  <label class="modal__label" for="modal__input_type_avatar">Выбрать файл на компьютере</label>
  <input class="modal__input" id="modal__input_type_avatar" type="file" name="name"/>
`);

renderToPage(profileTmpl, {
  ...context,
  editing: context.editingData || context.editingPassword
});

const editDataButton = document.querySelector('.profile__button_type_data');
const editPasswordButton = document.querySelector('.profile__button_type_password');
const changeImageButton = document.querySelector('.profile__image-button');
editDataButton.addEventListener('click', () => editButtonsClickHandler('editingData'));
editPasswordButton.addEventListener('click', () => editButtonsClickHandler('editingPassword'));
changeImageButton.addEventListener('click', () => document.querySelector('.modal').classList.add('modal_opened'));

function editButtonsClickHandler(prop) {
  prop === 'editingData' ? context.editingPassword = false : context.editingData = false;
  context[prop] = true;
  document.querySelector('.page').innerHTML = '';
  renderToPage(profileTmpl, {
    ...context,
    editing: context.editingData || context.editingPassword
  });
}