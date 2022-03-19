import Block from '../../utils/Block';
import template from './errorPage.hbs';
import './errorPage.scss';

type ErrorPageProps = {
  title: string;
  text: string;
};

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
