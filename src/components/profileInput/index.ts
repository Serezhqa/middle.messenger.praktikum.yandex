import Block from '../../utils/Block';
import template from './profileInput.hbs';
import './profileInput.scss';
import { blurHandler, focusHandler } from '../../utils/validation';

type ProfileInputProps = {
  name: string;
  text: string;
  type: string;
  value: string;
  editing: boolean;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  errorText: string;
  events?: Record<string, (event: Event) => void>;
};

export default class ProfileInput extends Block {
  constructor(props: ProfileInputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  protected addEvents() {
    if (!this.element) {
      return;
    }

    this.element.addEventListener('focusin', (event: FocusEvent) => focusHandler(
      event,
      'profile-input-group__error_visible'
    ));
    this.element.addEventListener('focusout', (event: FocusEvent) => blurHandler(
      event,
      'profile-input-group__error_visible'
    ));
  }
}
