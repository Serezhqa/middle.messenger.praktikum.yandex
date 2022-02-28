import Block from '../../utils/Block';
import template from './chat.hbs';
import './chat.scss';

export default class Chat extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
