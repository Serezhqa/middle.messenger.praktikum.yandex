import Block from '../../utils/Block';
import template from './message.hbs';
import './message.scss';

export default class Message extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
