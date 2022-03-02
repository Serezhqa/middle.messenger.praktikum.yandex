import Block from '../../utils/Block';
import template from './profileInputGroup.hbs';
import './profileInputGroup.scss';

type ProfileInputGroupProps = {
  name: string;
  text: string;
  type: string;
  value: string;
  editing: boolean;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  errorText: string;
  events: Record<string, (event: Event) => void>;
};

export default class ProfileInputGroup extends Block {
  constructor(props: ProfileInputGroupProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
