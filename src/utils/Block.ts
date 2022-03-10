import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  protected uuid = makeUUID();

  private _element: HTMLElement | null = null;

  protected props: Record<string, unknown>;

  protected children: Record<string, Block>;

  private readonly eventBus: EventBus;

  constructor(propsAndChildren: Record<string, unknown> = {}) {
    const { props, children } = this._getPropsAndChildren(propsAndChildren);

    this.children = children;

    this.initChildren();

    this.props = this._makePropsProxy(props);

    this.eventBus = new EventBus();
    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {
  }

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    if (oldProps && newProps) {
      // Эта незамысловатая конструкция чтобы eslint и typescript
      // не орали, что переменные не используются.
    }
    return true;
  }

  setProps = (newProps: Record<string, unknown>) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Record<string, unknown>) {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  private _addEvents() {
    this.addEvents();

    const events: Record<string, () => void> = this.props.events as Record<string, () => void>;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  protected addEvents() {
  }

  private _getPropsAndChildren(propsAndChildren: Record<string, unknown>) {
    const children: Record<string, Block> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected initChildren() {
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  compile(template: (context: Record<string, unknown>) => string, context: Record<string, unknown>) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      context[key] = `<div data-id='${child.uuid}'></div>`;
    });

    fragment.innerHTML = template(context);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id='${child.uuid}']`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}
