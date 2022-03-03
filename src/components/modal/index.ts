import Block from '../../utils/Block';
import template from './modal.hbs';
import './modal.scss';

type ModalProps = {
  modificator: string;
  title: string;
  withAuthInputGroup?: boolean;
  authInputGroup?: Block;
  withFileInput?: boolean;
  button: Block;
  events?: Record<string, (event: Event) => void>;
};

export default class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  protected addEvents() {
    this.getContent()?.addEventListener('click', (event: PointerEvent) => {
      if (event.target && event.target === event.currentTarget) {
        (event.target as HTMLDivElement).classList.remove('modal_opened');
      }
    });

    if (this.props.withFileInput) {
      this.getContent()?.addEventListener('input', (event: InputEvent) => {
        const inputElement = event.target as HTMLInputElement;
        const filename = inputElement.value.replace('C:\\fakepath\\', '');

        const modalTitleElement = this.getContent()?.querySelector('.modal__title');
        const labelElement = this.getContent()?.querySelector('.modal__file-label');
        const filenameElement = this.getContent()?.querySelector('.modal__filename');

        if (modalTitleElement) {
          modalTitleElement.textContent = 'Файл загружен';
        }

        if (filenameElement && labelElement) {
          labelElement.classList.add('modal__file-label_hidden');
          filenameElement.textContent = filename;
          filenameElement.classList.add('modal__filename_visible');
        }
      });
    }
  }
}
