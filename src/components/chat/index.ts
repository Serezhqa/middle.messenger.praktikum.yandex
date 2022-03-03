import Block from '../../utils/Block';
import template from './chat.hbs';
import './chat.scss';

type ChatProps = {
  image: string;
  chatName: string;
  isOwn: boolean;
  lastMessage: string;
  time: string;
  hasUnread: boolean;
};

export default class Chat extends Block {
  constructor(props: ChatProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
