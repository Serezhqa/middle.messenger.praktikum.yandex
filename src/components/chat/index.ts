import Block from '../../utils/Block';
import template from './chat.hbs';
import './chat.scss';

type ChatProps = {
  isActive: boolean;
  image: string;
  chatName: string;
  isOwn: boolean;
  lastMessage: string | undefined;
  time: string | undefined;
  unreadCount: number;
  id: number;
  events: Record<string, (event: Event) => void>;
};

export default class Chat extends Block {
  constructor(props: ChatProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
