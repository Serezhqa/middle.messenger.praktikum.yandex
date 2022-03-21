import set from './set';
import EventBus from './EventBus';
import { ChatsModel, UserModel, WebSocketMessageModel } from '../api/models';

export enum StoreEvents {
  Updated = 'updated',
}

export type State = {
  user: UserModel | {};
  chats: ChatsModel[];
  messages: WebSocketMessageModel[];
};

class Store extends EventBus {
  private state: State = {
    user: {},
    chats: [],
    messages: []
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
