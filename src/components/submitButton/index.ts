import Block from '../../utils/Block';
import template from './submitButton.hbs';
import './submitButton.scss';

type SubmitButtonProps = {
  text: string;
};

export default class SubmitButton extends Block {
  constructor(props: SubmitButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
