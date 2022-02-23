import Block from '../../utils/Block';
import template from './authInputGroup.hbs';
import './authInputGroup.scss';

export default class AuthInputGroup extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
