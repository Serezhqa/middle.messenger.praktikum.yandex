import Block from '../../utils/Block';
import template from './chats.hbs';
import './chats.scss';
import Modal from '../../components/modal';
import SubmitButton from '../../components/submitButton';
import AuthInput from '../../components/authInput';
import router from '../../utils/Router';
import { formSubmitHandler, loginValidation } from '../../utils/validation';
import {
  AddChatFormModel,
  AddUserFormModel,
  ChatsModel,
  RemoveUserFormModel,
  UserModel,
  WebSocketMessageModel
} from '../../api/models';
import store, { State, StoreEvents } from '../../utils/Store';
import Chat from '../../components/chat';
import mockChatImage from '../../images/mock-chat-image.svg';
import WebSocketAPI from '../../api/WebSocketAPI';
import Message from '../../components/message';
import getTime from '../../utils/getTime';
import chatsController from '../../controllers/ChatsController';

function mapStateToProps(state: State) {
  return {
    user: { ...state.user },
    chats: [...state.chats],
    messages: [...state.messages]
  };
}

type ChatsProps = {
  user: UserModel;
  chats: ChatsModel[];
  activeChat: {
    id: number;
    title: string;
    image: string;
  } | null;
  socket: WebSocket;
  messages: WebSocketMessageModel[];
};

export default class Chats extends Block {
  constructor() {
    super({
      user: {},
      chats: [],
      activeChat: null,
      socket: null,
      messages: []
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(mapStateToProps(store.getState()));
    });
  }

  protected componentDidMount() {
    this.setProps(mapStateToProps(store.getState()));
  }

  protected initChildren() {
    this.children.addChatModal = new Modal({
      modificator: 'add-chat',
      title: 'Создать чат',
      withAuthInput: true,
      authInput: new AuthInput({
        name: 'title',
        placeholder: 'Название',
        type: 'text',
        errorText: 'Заполните поле'
      }),
      button: new SubmitButton({
        text: 'Создать'
      }),
      events: {
        submit: async (event: SubmitEvent) => {
          const addChatData = formSubmitHandler(
            event,
            'auth-input__error_visible'
          );

          if (!addChatData) {
            return;
          }

          await chatsController.createChat(addChatData as AddChatFormModel);
          this.children.addChatModal.element?.classList.remove('modal_opened');
        }
      }
    });

    this.children.addUserModal = new Modal({
      modificator: 'add-user',
      title: 'Добавить пользователя',
      withAuthInput: true,
      authInput: new AuthInput({
        name: 'login',
        placeholder: 'Логин',
        type: 'text',
        minlength: 3,
        maxlength: 20,
        pattern: loginValidation.pattern,
        errorText: loginValidation.message
      }),
      button: new SubmitButton({
        text: 'Добавить'
      }),
      events: {
        submit: async (event: SubmitEvent) => {
          const addUserData = formSubmitHandler(
            event,
            'auth-input__error_visible'
          );
          if (!addUserData) {
            return;
          }
          const activeChatId = (this.props as ChatsProps).activeChat!.id;
          await chatsController.addUsers(addUserData as AddUserFormModel, activeChatId);
          this.children.addUserModal.element?.classList.remove('modal_opened');
        }
      }
    });

    this.children.removeUserModal = new Modal({
      modificator: 'remove-user',
      title: 'Удалить пользователя',
      withAuthInput: true,
      authInput: new AuthInput({
        name: 'login',
        placeholder: 'Логин',
        type: 'text',
        minlength: 3,
        maxlength: 20,
        pattern: loginValidation.pattern,
        errorText: loginValidation.message
      }),
      button: new SubmitButton({
        text: 'Удалить'
      }),
      events: {
        submit: async (event: SubmitEvent) => {
          const removeUserData = formSubmitHandler(
            event,
            'auth-input__error_visible'
          );
          if (!removeUserData) {
            return;
          }
          const activeChatId = (this.props as ChatsProps).activeChat!.id;
          await chatsController.removeUsers(removeUserData as RemoveUserFormModel, activeChatId);
          this.children.removeUserModal.element?.classList.remove('modal_opened');
        }
      }
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
      }),
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();
          const activeChatId = (this.props as ChatsProps).activeChat!.id;
          await chatsController.deleteChat({
            chatId: activeChatId
          });
          this.setProps({
            activeChat: null
          });
          this.children.deleteChatModal.element?.classList.remove('modal_opened');
        }
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  protected afterRender() {
    if (!this.element) {
      return;
    }

    (this.props as ChatsProps).chats.forEach((chat) => {
      const isActive = (this.props as ChatsProps).activeChat?.id === chat.id;
      const isOwn = chat.last_message?.user.login === (store.getState().user as UserModel).login;
      const time = getTime(chat.last_message?.time);
      const chatElement = new Chat({
        isActive,
        image: chat.avatar || mockChatImage,
        chatName: chat.title,
        isOwn,
        lastMessage: chat.last_message?.content,
        time,
        unreadCount: chat.unread_count,
        id: chat.id,
        events: {
          click: async () => {
            if (isActive) {
              return;
            }

            const userId = (this.props as ChatsProps).user.id;
            const webSocketToken = await chatsController.getWebSocketToken(chat.id);

            if (webSocketToken) {
              const socket = new WebSocketAPI(userId, chat.id, webSocketToken);
              this.setProps({
                socket,
                activeChat: {
                  id: chat.id,
                  title: chat.title,
                  image: chat.avatar || mockChatImage
                }
              });
            }
          }
        }
      });

      this.element?.querySelector('.chats__chatlist')?.append(chatElement.element!);
    });

    (this.props as ChatsProps).messages.forEach((message) => {
      const isOwn = message.user_id === (this.props as ChatsProps).user.id;
      const messageElement = new Message({
        isOwn,
        text: message.content,
        time: getTime(message.time) as string
      });

      const messagesContainer = this.element?.querySelector('.chats__messages');
      if (messagesContainer) {
        messagesContainer.prepend(messageElement.element!);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });

    const messageForm: HTMLFormElement | null = this.element?.querySelector('.chats__message-form');
    const messageInput: HTMLInputElement | null = this.element?.querySelector('.chats__message-input');
    if (messageForm && messageInput) {
      messageForm.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();
        const message = messageInput.value;
        if (message.trim()) {
          (this.props as ChatsProps).socket.send(message);
        }
        messageInput.value = '';
      });
      messageInput.focus();
    }

    const chatsLink = this.element.querySelector('.chats__profile-link');
    if (chatsLink) {
      chatsLink.addEventListener('click', () => {
        router.go('/settings');
      });
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
