// eslint-disable-next-line max-classes-per-file
import { expect } from 'chai';
import Block from './Block';

class TestBlock extends Block {
  constructor(number: number) {
    super({ number });
  }

  render() {
    return this.compile(() => `<p>the number is ${this.props.number}</p>`, {});
  }
}

class TestBlockWithChild extends Block {
  constructor(number: number, child: string) {
    super({ number, child });
  }

  render() {
    return this.compile(() => `<p>the number is ${this.props.number}${this.props.child}</p>`, {});
  }
}

describe('Проверяем Block.ts', () => {
  it('Контент отрисовывается с учетом props', () => {
    const testBlock = new TestBlock(14);
    expect(testBlock.getContent()?.textContent).to.eq('the number is 14');
  });

  it('Контент отрисовывается с учетом children', () => {
    const testBlockWithChild = new TestBlockWithChild(14, '<span>!</span>');
    expect(testBlockWithChild.getContent()?.innerHTML).to.eq('the number is 14<span>!</span>');
  });

  it('Контент обновляется с помощью setProps()', () => {
    const testBlock = new TestBlock(14);
    testBlock.setProps({ number: 13 });
    expect(testBlock.getContent()?.textContent).to.eq('the number is 13');
  });
});
