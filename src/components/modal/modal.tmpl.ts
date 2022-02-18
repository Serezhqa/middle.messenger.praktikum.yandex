export const modalTmpl = `
  <div class="modal">
    <form class="modal__form">
      <h2 class="modal__title">{{title}}</h2>
      {{> modal__form-content}}
      <button class="modal__button" type="submit">{{buttonText}}</button>
    </form>
  </div>
`;
