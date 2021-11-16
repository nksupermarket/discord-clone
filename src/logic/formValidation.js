function validateEmail(email) {
  const regX = /\S+@\S+\.\S+/;
  return regX.test(email) ? { isValid: true } : { error: 'Not a valid email' };
}

function validatePW(pw) {
  // if (!/[A-Z]/.test(pw))
  //   return {
  //     isValid: false,
  //     error: 'Must include uppercase',
  //   };
  // if (!/[a-z]/.test(pw))
  //   return {
  //     isValid: false,
  //     error: 'Must include lowercase',
  //   };
  // if (!/[0-9]/.test(pw))
  //   return {
  //     isValid: false,
  //     error: 'Must include a number',
  //   };
  // if (!/[^A-Za-z0-9]/.test(pw))
  //   return {
  //     isValid: false,
  //     error: 'Must include special character',
  //   };
  if (pw.length < 6)
    return {
      isValid: false,
      error: 'Must be 6 or more in length',
    };

  return { isValid: true };
}

function confirmPW(pw, otherPW) {
  return pw === otherPW
    ? { isValid: true }
    : { error: "Passwords don't match" };
}

function validateInput(el, otherPW) {
  console.log(el);
  switch (true) {
    case el.name.includes('email'): {
      return validateEmail(el.value);
    }
    case el.name.includes('password'): {
      return validatePW(el.value);
    }
    case el.name === 'confirm_password': {
      return confirmPW(el.value, otherPW);
    }
    default:
      return { isValid: true };
  }
}

export { validateInput, validateEmail, validatePW, confirmPW };
