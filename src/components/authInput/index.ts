import Block from '../../utils/Block';
import template from './authInput.hbs';
import './authInput.scss';
import { blurHandler, focusHandler } from '../../utils/validation';

type AuthInputProps = {
  name: string;
  placeholder: string;
  type: string;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  errorText: string;
  events?: Record<string, (event: Event) => void>;
};

export default class AuthInput extends Block {
  constructor(props: AuthInputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  protected afterRender() {
    if (!this.element) {
      return;
    }

    this.element.addEventListener('input', (event: InputEvent) => {
      const inputElement = event.target as HTMLInputElement;
      inputElement.previousElementSibling?.classList.add('auth-input__label_visible');

      if (inputElement.value === '') {
        inputElement.previousElementSibling?.classList.remove('auth-input__label_visible');
      }
    });

    this.element.addEventListener('focusin', (event: FocusEvent) => focusHandler(
      event,
      'auth-input__error_visible'
    ));
    this.element.addEventListener('focusout', (event: FocusEvent) => blurHandler(
      event,
      'auth-input__error_visible'
    ));
  }
}
