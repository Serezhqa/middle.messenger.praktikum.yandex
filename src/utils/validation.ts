export const formSubmitHandler = (
  event: SubmitEvent,
  form: HTMLFormElement,
  inputSelector: string,
  errorClass: string,
  hasPasswords?: boolean
) => {
  event.preventDefault();

  const inputElements: NodeListOf<HTMLInputElement> = form.querySelectorAll(inputSelector);
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
    });

    console.log(data);
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
