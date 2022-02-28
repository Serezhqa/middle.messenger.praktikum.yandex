import Block from '../../utils/Block';
import template from './profileInputGroup.hbs';
import './profileInputGroup.scss';

export default class ProfileInputGroup extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
