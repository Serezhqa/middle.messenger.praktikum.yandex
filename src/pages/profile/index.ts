import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import renderDOM from '../../utils/renderDOM';
import ProfileInputGroup from '../../components/profileInputGroup';
import SubmitButton from '../../components/submitButton';
import Modal, { clickHandler, fileInputChangeHandler } from '../../components/modal';

export default class Profile extends Block {
  protected initChildren() {
    this.children.emailProfileInputGroup = new ProfileInputGroup({
      name: 'email',
      text: 'Почта',
      type: 'email',
      value: 'pochta@yandex.ru',
      editing: false
    });

    this.children.loginProfileInputGroup = new ProfileInputGroup({
      name: 'login',
      text: 'Логин',
      type: 'text',
      value: 'ivanivanov',
      editing: false
    });

    this.children.firstNameProfileInputGroup = new ProfileInputGroup({
      name: 'first_name',
      text: 'Имя',
      type: 'text',
      value: 'Иван',
      editing: false
    });

    this.children.secondNameProfileInputGroup = new ProfileInputGroup({
      name: 'second_name',
      text: 'Фамилия',
      type: 'text',
      value: 'Иванов',
      editing: false
    });

    this.children.displayNameProfileInputGroup = new ProfileInputGroup({
      name: 'display_name',
      text: 'Имя в чате',
      type: 'text',
      value: 'Иван',
      editing: false
    });

    this.children.phoneProfileInputGroup = new ProfileInputGroup({
      name: 'phone',
      text: 'Телефон',
      type: 'text',
      value: '+7 (909) 123 45 67',
      editing: false
    });

    this.children.oldPasswordProfileInputGroup = new ProfileInputGroup({
      name: 'oldPassword',
      text: 'Старый пароль',
      type: 'password',
      value: '',
      editing: true
    });

    this.children.newPassword1ProfileInputGroup = new ProfileInputGroup({
      name: 'newPassword',
      text: 'Новый пароль',
      type: 'password',
      value: '',
      editing: true
    });

    this.children.newPassword2ProfileInputGroup = new ProfileInputGroup({
      name: 'newPassword2',
      text: 'Повторите новый пароль',
      type: 'password',
      value: '',
      editing: true
    });

    this.children.submitButton = new SubmitButton({
      text: 'Сохранить'
    });

    this.children.changeImageModal = new Modal({
      modificator: 'change-image',
      title: 'Загрузите файл',
      withFileInput: true,
      events: {
        click: clickHandler,
        change: fileInputChangeHandler
      },
      button: new SubmitButton({
        text: 'Поменять'
      })
    });
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.editing !== newProps.editing) {
      this.children.emailProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.loginProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.firstNameProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.secondNameProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.displayNameProfileInputGroup.setProps({
        editing: newProps.editing
      });
      this.children.phoneProfileInputGroup.setProps({
        editing: newProps.editing
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const profile = new Profile({
  editingData: false,
  editingPassword: false,
  editing: false
});

renderDOM('.app', profile);

const editDataButton = document.querySelector('.profile__button_type_data');
if (editDataButton) {
  editDataButton.addEventListener('click', () => {
    profile.setProps({
      editingData: true,
      editingPassword: false,
      editing: true
    });
  });
}

const editPasswordButton = document.querySelector('.profile__button_type_password');
if (editPasswordButton) {
  editPasswordButton.addEventListener('click', () => {
    profile.setProps({
      editingData: false,
      editingPassword: true,
      editing: true
    });
  });
}

const changeImageButton = document.querySelector('.profile__image-button');
const modal = document.querySelector('.modal');

if (changeImageButton && modal) {
  changeImageButton.addEventListener('click', () => {
    modal.classList.add('modal_opened');
  });
}
