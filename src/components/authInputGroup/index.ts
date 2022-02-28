import Block from '../../utils/Block';
import template from './authInputGroup.hbs';
import './authInputGroup.scss';

export default class AuthInputGroup extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}

export const inputHandler = (event: InputEvent) => {
  const inputElement = event.target as HTMLInputElement;
  inputElement.previousElementSibling?.classList.add('auth-input-group__label_visible');

  if (inputElement.value === '') {
    inputElement.previousElementSibling?.classList.remove('auth-input-group__label_visible');
  }
};

export const focusHandler = (event: FocusEvent) => {
  const inputElement = event.target as HTMLInputElement;
  inputElement.nextElementSibling?.classList.remove('auth-input-group__error_visible');
};

export const blurHandler = (event: FocusEvent) => {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.validity.valid) {
    inputElement.nextElementSibling?.classList.add('auth-input-group__error_visible');
  }
};
