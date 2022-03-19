import Block from '../../utils/Block';
import template from './errorPage.hbs';
import './errorPage.scss';
import router from '../../utils/Router';

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

  protected afterRender() {
    if (!this.element) {
      return;
    }

    const errorPageLink = this.element.querySelector('.error-page__link');
    if (errorPageLink) {
      errorPageLink.addEventListener('click', () => {
        router.go('/messenger');
      });
    }
  }
}
