import Block from '../../utils/Block';
import template from './chats.hbs';
import './chats.scss';
import renderDOM from '../../utils/renderDOM';

export default class Chats extends Block {
  render() {
    return this.compile(template, {});
  }
}

const chats = new Chats();

renderDOM('.app', chats);

const optionsButton = document.querySelector('.chats__options-button');
const options = document.querySelector('.chats__options');

const attachmentsButton = document.querySelector('.chats__attachments-button');
const attachments = document.querySelector('.chats__attachments');

if (optionsButton && options) {
  optionsButton.addEventListener('click', () => {
    optionsButton.classList.toggle('chats__options-button_active');

    if (optionsButton.classList.contains('chats__options-button_active')) {
      options.classList.add('chats__options_active');
    } else {
      options.classList.remove('chats__options_active');
    }
  });
}

if (attachmentsButton && attachments) {
  attachmentsButton.addEventListener('click', () => {
    attachmentsButton.classList.toggle('chats__attachments-button_active');

    if (attachmentsButton.classList.contains('chats__attachments-button_active')) {
      attachments.classList.add('chats__attachments_active');
    } else {
      attachments.classList.remove('chats__attachments_active');
    }
  });
}
