import store from '../utils/Store';
import chatsController from '../controllers/ChatsController';

export default class WebSocketAPI {
  socket: WebSocket;

  timerId: number;

  constructor(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this._addEventListeners();
    this._startPinging();
  }

  private _addEventListeners() {
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      this.getOld('0');
    });

    this.socket.addEventListener('message', (event: MessageEvent) => {
      console.log('Получены данные', event.data);

      const data = JSON.parse(event.data);

      if (Array.isArray(data) && data.length) {
        store.set('messages', data);
      }

      if (data.type === 'message') {
        this.getOld('0');
        chatsController.getChats();
      }
    });

    this.socket.addEventListener('error', (event: ErrorEvent) => {
      console.log('Ошибка', event.message);
    });

    this.socket.addEventListener('close', (event: CloseEvent) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      this._stopPinging();
    });
  }

  private _startPinging() {
    this.timerId = setInterval(() => {
      this.socket.send(JSON.stringify({ type: 'ping' }));
    }, 14000);
  }

  private _stopPinging() {
    clearInterval(this.timerId);
  }

  send(message: string) {
    this.socket.send(JSON.stringify({
      content: message,
      type: 'message'
    }));
  }

  getOld(content: string) {
    this.socket.send(JSON.stringify({
      content,
      type: 'get old'
    }));
  }
}
