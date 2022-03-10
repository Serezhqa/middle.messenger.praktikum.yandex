import Block from './Block';
import renderDOM from './renderDOM';

export default class Route {
  private _pathname: string;

  private _blockClass: typeof Block;

  private _block: Block | null;

  private _props: Record<string, unknown>;

  private _rootQuery: string;

  constructor(pathname: string, blockClass: typeof Block, props: Record<string, unknown>) {
    this._pathname = pathname;
    this._blockClass = blockClass;
    this._block = null;
    const { rootQuery, ...rest } = props;
    this._rootQuery = rootQuery as string;
    this._props = rest;
  }

  navigate(pathname: string) {
    if (this._pathname === pathname) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return this._pathname === pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      renderDOM(this._rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
