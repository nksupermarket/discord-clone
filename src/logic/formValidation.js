import { verifyPW } from './user_firebaseStuff';

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

function dynamicValidation(el, isSubmit = false, otherPW = undefined) {
  switch (true) {
    case el.name.includes('username'): {
      return el.value.length > 0
        ? { isValid: 0 }
        : { error: 'username is empty' };
    }
    case el.name.includes('email'): {
      return validateEmail(el.value);
    }

    case el.name.includes('password'): {
      const pwValidation = validatePW(el.value);
      if (pwValidation.error) return pwValidation;

      if (el.name === 'confirm_password') return confirmPW(el.value, otherPW);
      if (
        (el.name === 'current_password' || el.name === 'password') &&
        isSubmit
      )
        return verifyPW(el.value);
      return { isValid: true };
    }

    default:
      return { isValid: true };
  }
}

export { dynamicValidation, validateEmail, validatePW, confirmPW };
