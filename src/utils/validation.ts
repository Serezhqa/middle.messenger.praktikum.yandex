export const formSubmitHandler = (
  event: SubmitEvent,
  errorClass: string,
  hasPasswords?: boolean
) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const inputElements: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
  let formIsInvalid = false;

  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      inputElement.nextElementSibling?.classList.add(errorClass);
      formIsInvalid = true;
    } else {
      inputElement.nextElementSibling?.classList.remove(errorClass);
    }
  });

  if (!formIsInvalid) {
    if (hasPasswords) {
      const passwordInputElements = Array.from(inputElements).filter((inputElement) => inputElement.name.startsWith('password'));
      const [password1, password2] = passwordInputElements;
      if (password1.value !== password2.value) {
        password2.nextElementSibling?.classList.add(errorClass);
        return;
      }
    }

    const data: Record<string, string> = {};

    inputElements.forEach((inputElement) => {
      data[inputElement.name] = inputElement.value;
      inputElement.blur();
    });

    form.reset();

    return data;
  }
};

export const focusHandler = (event: FocusEvent, errorClass: string) => {
  const inputElement = event.target as HTMLInputElement;
  inputElement.nextElementSibling?.classList.remove(errorClass);
};

export const blurHandler = (event: FocusEvent, errorClass: string) => {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.validity.valid) {
    inputElement.nextElementSibling?.classList.add(errorClass);
  } else {
    inputElement.nextElementSibling?.classList.remove(errorClass);
  }
};

export const loginValidation = {
  pattern: '[a-zA-Z0-9_-]*[a-zA-Z_-][a-zA-Z0-9_-]*',
  message: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, допустимы дефис и нижнее подчёркивание'
};

export const passwordValidation = {
  pattern: '(?=.*[A-Z])(?=.*[0-9]).*',
  message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
};

export const password2Validation = {
  pattern: '(?=.*[A-Z])(?=.*[0-9]).*',
  message: 'Пароли должны совпадать'
};

export const emailValidation = {
  pattern: '[A-Za-z0-9_-]+@[A-Za-z]+\\.[A-Za-z0-9_-]+',
  message: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательна @ и точка после,'
    + ' но перед точкой обязательно должны быть буквы'
};

export const firstNameValidation = {
  pattern: '[A-ZА-ЯЁ]+[A_Za-zА-Яа-яЁё-]+',
  message: 'Латиница или кириллица, первая буква заглавная, без пробелов и цифр, нет спецсимволов (допустим только дефис)'
};

export const secondNameValidation = {
  pattern: '[A-ZА-ЯЁ]+[A_Za-zА-Яа-яЁё-]+',
  message: 'Латиница или кириллица, первая буква заглавная, без пробелов и цифр, нет спецсимволов (допустим только дефис)'
};

export const phoneValidation = {
  pattern: '\\+?[0-9]+',
  message: 'От 10 до 15 символов, состоит из цифр, может начинаться с плюса'
};

export const displayNameValidation = {
  pattern: '[A-Za-zА-Яа-яЁё0-9_ -]+',
  message: 'Заполните поле'
};
