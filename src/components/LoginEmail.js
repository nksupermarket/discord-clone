import React, { useState } from 'react';

import InputField from './InputField';
import FlatBtn from './FlatBtn';
import InputErrorMsg from './InputErrorMsg';

const LoginEmail = ({ signIn, onRegister }) => {
  const [email, setEmail] = useState();
  const [pw, setPw] = useState();

  const [error, setError] = useState();

  return (
    <form
      name="login-email"
      onSubmit={(e) => {
        e.preventDefault();
        signIn(email, pw, setError);
      }}
    >
      <header>
        <h3>Welcome!</h3>
        <h4>Come on in</h4>
      </header>
      <div className="input-ctn">
        {error && <InputErrorMsg error={error} />}
        <InputField label="Email" type="email" onChange={setEmail} />
        <InputField label="Password" type="password" onChange={setPw} />
        <span className="link">Forgot your password?</span>
      </div>
      <FlatBtn
        type="submit"
        text="Login"
        onClick={() => signIn(email, pw, setError)}
      />
      <p>
        Need an account?
        <span className="link" onClick={onRegister}>
          Register
        </span>
      </p>
    </form>
  );
};

export default LoginEmail;
