import Block from '../../utils/Block';
import template from './submitButton.hbs';
import './submitButton.scss';

export default class SubmitButton extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
