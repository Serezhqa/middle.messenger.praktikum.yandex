export const authPageTmpl = `
  <section class="auth-page">
    <form class="auth-page__form auth-page__form_type_{{type}}">
      <h1 class="auth-page__title">{{title}}</h1>
      
      {{#each inputGroup}}
        <label class="auth-page__label" for="auth-page__input_type_{{name}}">{{placeholder}}</label>
        <input class="auth-page__input" id="auth-page__input_type_{{name}}" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}"/>
        <span class="auth-page__error">{{errorText}}</span>
      {{/each}}
      
      <button class="auth-page__submit-button">{{buttonText}}</button>
      <a class="auth-page__link" href="{{route}}">{{linkText}}</a>
    </form>
  </section>
`;