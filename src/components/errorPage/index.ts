import Block from '../../utils/Block';
import template from './errorPage.hbs';
import './errorPage.scss';

export default class ErrorPage extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
