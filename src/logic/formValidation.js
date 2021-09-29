function validateEmail(email) {
  const regX = /\S+@\S+\.\S+/;
  return regX.test(email);
}

function validatePw(pw) {
  return (
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length > 6
  );
}

export { validateEmail, validatePw };
