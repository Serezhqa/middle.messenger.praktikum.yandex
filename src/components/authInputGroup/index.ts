import Block from '../../utils/Block';
import template from './authInputGroup.hbs';
import './authInputGroup.scss';
import { blurHandler, focusHandler } from '../../utils/validation';

type AuthInputGroupProps = {
  name: string;
  placeholder: string;
  type: string;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  errorText: string;
  events?: Record<string, (event: Event) => void>;
};

export default class AuthInputGroup extends Block {
  constructor(props: AuthInputGroupProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  protected addEvents() {
    this.getContent()?.addEventListener('input', (event: InputEvent) => {
      const inputElement = event.target as HTMLInputElement;
      inputElement.previousElementSibling?.classList.add('auth-input-group__label_visible');

      if (inputElement.value === '') {
        inputElement.previousElementSibling?.classList.remove('auth-input-group__label_visible');
      }
    });

    this.getContent()?.addEventListener('focusin', (event: FocusEvent) => focusHandler(
      event,
      'auth-input-group__error_visible'
    ));
    this.getContent()?.addEventListener('focusout', (event: FocusEvent) => blurHandler(
      event,
      'auth-input-group__error_visible'
    ));
  }
}
