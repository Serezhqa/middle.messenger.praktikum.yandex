import Handlebars from 'handlebars';

export function renderToPage(template, context) {
  const templateRenderer = Handlebars.compile(template);
  const page = document.querySelector('.page');
  page.insertAdjacentHTML('afterbegin', templateRenderer(context));
}

// Пока побаловался, чтобы удобно было вёрстку проверить
export function addListeners() {
  const inputs = document.querySelectorAll('.auth-page__input');
  inputs.forEach(input => {
    input.addEventListener('input', (event) => {
      event.target.previousElementSibling.classList.add('auth-page__label_visible');
      event.target.nextElementSibling.classList.add('auth-page__error_visible');

      if (event.target.value === '') {
        event.target.previousElementSibling.classList.remove('auth-page__label_visible');
        event.target.nextElementSibling.classList.remove('auth-page__error_visible');
      }
    });
  });
}