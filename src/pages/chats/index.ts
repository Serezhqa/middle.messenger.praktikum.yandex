import Block from '../../utils/Block';
import template from './chats.hbs';
import './chats.scss';
import Modal from '../../components/modal';
import SubmitButton from '../../components/submitButton';
import AuthInput from '../../components/authInput';
import Chat from '../../components/chat';
import Message from '../../components/message';

export default class Chats extends Block {
  protected initChildren() {
    this.children.footballChat = new Chat({
      image: 'https://tinyurl.com/7rumutmn',
      chatName: 'Чат о футболе',
      isOwn: true,
      lastMessage: 'Forza Milan!',
      time: '16:54',
      hasUnread: false
    });

    this.children.musicChat = new Chat({
      image: 'https://tinyurl.com/7rumutmn',
      chatName: 'Чат о музыке',
      isOwn: false,
      lastMessage: 'Анонс концертов',
      time: '16:55',
      hasUnread: true
    });

    this.children.firstMessage = new Message({
      isOwn: false,
      text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила'
        + 'Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью'
        + '500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты'
        + 'с собой забрали только кассеты с пленкой.\n'
        + '\n'
        + '        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда'
        + 'и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      time: '21:45'
    });

    this.children.secondMessage = new Message({
      isOwn: false,
      text: '4500*',
      time: '21:45'
    });

    this.children.ownMessage = new Message({
      isOwn: true,
      text: 'Привет',
      time: '21:46'
    });

    this.children.addChatModal = new Modal({
      modificator: 'add-chat',
      title: 'Создать чат',
      withAuthInput: true,
      authInput: new AuthInput({
        name: 'name',
        placeholder: 'Название',
        type: 'text',
        errorText: 'Заполните поле'
      }),
      button: new SubmitButton({
        text: 'Создать'
      })
    });

    this.children.addUserModal = new Modal({
      modificator: 'add-user',
      title: 'Добавить пользователя',
      withAuthInput: true,
      authInput: new AuthInput({
        name: 'login',
        placeholder: 'Логин',
        type: 'text',
        errorText: 'Заполните поле'
      }),
      button: new SubmitButton({
        text: 'Добавить'
      })
    });

    this.children.removeUserModal = new Modal({
      modificator: 'remove-user',
      title: 'Удалить пользователя',
      withAuthInput: true,
      authInput: new AuthInput({
        name: 'login',
        placeholder: 'Логин',
        type: 'text',
        errorText: 'Заполните поле'
      }),
      button: new SubmitButton({
        text: 'Удалить'
      })
    });

    this.children.changeImageModal = new Modal({
      modificator: 'change-image',
      title: 'Загрузите файл',
      withFileInput: true,
      button: new SubmitButton({
        text: 'Поменять'
      })
    });

    this.children.deleteChatModal = new Modal({
      modificator: 'delete-chat',
      title: 'Удалить чат?',
      withAuthInput: false,
      button: new SubmitButton({
        text: 'Удалить'
      })
    });
  }

  render() {
    return this.compile(template, {});
  }

  protected addEvents() {
    if (!this.element) {
      return;
    }

    const optionsButton = this.element.querySelector('.chats__options-button');
    const options = this.element.querySelector('.chats__options');

    if (optionsButton && options) {
      optionsButton.addEventListener('click', () => {
        optionsButton.classList.toggle('chats__options-button_active');

        if (optionsButton.classList.contains('chats__options-button_active')) {
          options.classList.add('chats__options_active');
        } else {
          options.classList.remove('chats__options_active');
        }
      });
    }

    const attachmentsButton = this.element.querySelector('.chats__attachments-button');
    const attachments = this.element.querySelector('.chats__attachments');

    if (attachmentsButton && attachments) {
      attachmentsButton.addEventListener('click', () => {
        attachmentsButton.classList.toggle('chats__attachments-button_active');

        if (attachmentsButton.classList.contains('chats__attachments-button_active')) {
          attachments.classList.add('chats__attachments_active');
        } else {
          attachments.classList.remove('chats__attachments_active');
        }
      });
    }

    const addChatButton = this.element.querySelector('.chats__add-chat-button');
    const addChatModal = this.element.querySelector('.modal_type_add-chat');

    if (addChatButton && addChatModal) {
      addChatButton.addEventListener('click', () => {
        addChatModal.classList.add('modal_opened');
      });
    }

    const addUserButton = this.element.querySelector('.chats__option_type_add-user');
    const addUserModal = this.element.querySelector('.modal_type_add-user');

    if (addUserButton && addUserModal) {
      addUserButton.addEventListener('click', () => {
        addUserModal.classList.add('modal_opened');
      });
    }

    const removeUserButton = this.element.querySelector('.chats__option_type_remove-user');
    const removeUserModal = this.element.querySelector('.modal_type_remove-user');

    if (removeUserButton && removeUserModal) {
      removeUserButton.addEventListener('click', () => {
        removeUserModal.classList.add('modal_opened');
      });
    }

    const changeImageButton = this.element.querySelector('.chats__option_type_change-image');
    const changeImageModal = this.element.querySelector('.modal_type_change-image');

    if (changeImageButton && changeImageModal) {
      changeImageButton.addEventListener('click', () => {
        changeImageModal.classList.add('modal_opened');
      });
    }

    const deleteChatButton = this.element.querySelector('.chats__option_type_delete-chat');
    const deleteChatModal = this.element.querySelector('.modal_type_delete-chat');

    if (deleteChatButton && deleteChatModal) {
      deleteChatButton.addEventListener('click', () => {
        deleteChatModal.classList.add('modal_opened');
      });
    }
  }
}
