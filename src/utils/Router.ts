import Block from './Block';
import Route from './Route';

class Router {
  private routes: Route[];

  private history: History;

  private readonly _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery
  }

  use(pathname: string, block: typeof Block, props?: Record<string, unknown>) {
    const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const currentTarget = event.currentTarget as unknown as { location: { pathname: string } };
      this._onRoute(currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/404');
      return;
    }

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('.app');
