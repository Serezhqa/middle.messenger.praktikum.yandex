// eslint-disable-next-line max-classes-per-file
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import router from './Router';
import Block from './Block';

class StartingPage extends Block {
  render() {
    return this.compile(() => '<p>starting page</p>', {});
  }
}

class AnotherPage extends Block {
  render() {
    return this.compile(() => '<p>another page</p>', {});
  }
}

class Page404 extends Block {
  render() {
    return this.compile(() => '<p>404 page</p>', {});
  }
}

describe('Проверяем Router.ts', () => {
  beforeEach(() => {
    router
      .use('/', StartingPage)
      .use('/test', AnotherPage)
      .use('/404', Page404)
      .start();
  });

  it('Начальная инициализация работает', () => {
    expect(window.location.pathname).to.eq('/err');
  });

  it('Метод go() работает', () => {
    router.go('/test');
    expect(window.location.pathname).to.eq('/test');
  });

  it('Переход на несуществующий роут кидает на 404', () => {
    router.go('/qwe');
    expect(window.location.pathname).to.eq('/404');
  });

  it('Контент отрисовывается', () => {
    router.go('/test');
    expect(document.querySelector('.app')?.textContent).to.eq('another page');
  });
});
