export const profileTmpl = `
  <section class="profile">
    <button class="profile__image-button" type="button">
      <img class="profile__image" src="https://tinyurl.com/hmx3ka4a" alt="Аватар"/>
    </button>
    <h1 class="profile__display-name">Иван</h1>

    <form class="profile__form">
      {{#if editingPassword}}
        {{#each passwordInputs}}
          {{> inputGroup editing=../editing}}
        {{/each}}
      {{else}}
        {{#each dataInputs}}
          {{> inputGroup editing=../editing}}
        {{/each}}
      {{/if}}

      {{#if editing}}
        <button class="profile__button profile__button_type_save" type="submit">Сохранить</button>
      {{else}}
        <button class="profile__button profile__button_type_data" type="button">Изменить данные</button>
        <button class="profile__button profile__button_type_password" type="button">Изменить пароль</button>
        <a class="profile__button profile__button_type_logout" href="/login.html">Выйти</a>
      {{/if}}
    </form>

    <div class="profile__back">
      <a class="profile__back-arrow" href="/chats.html">
        <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3"/>
          <path fill="#fff" d="M20 14.8H9v-1.6h11z"/>
          <path d="m13 19-4-5 4-5" stroke="#fff" stroke-width="1.6"/>
        </svg>
      </a>
    </div>
  </section>

  {{#with modal}}
    {{> modal}}
  {{/with}}
`;
