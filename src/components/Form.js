import React, { useRef, useLayoutEffect, useContext } from 'react';

import useInputError from '../logic/custom-hooks/useInputError';
import { UserContext } from '../logic/contexts/UserContext';

import InputField from './InputField';
import FlatBtn from './FlatBtn';

const Form = ({ fields, handleChange, submitAction, close }) => {
  const user = useContext(UserContext);
  const formRef = useRef();
  const { inputError, validateInput } = useInputError(
    fields.map((f) => f.name)
  );

  return (
    <form
      ref={formRef}
      autocomplete="nope"
      onSubmit={(e) => {
        e.preventDefault();

        const {
          target: { elements },
        } = e;

        let errors = false;
        fields //iterate through each input field and validate
          .map((f) => f.name)
          .forEach((fname) => {
            const currEl = elements.namedItem(fname);
            const isValid =
              fname === 'confirm_password'
                ? validateInput(
                    currEl,
                    elements.namedItem('new_password').value
                  )
                : validateInput(currEl);
            if (!isValid) errors = true;
          });
        if (errors) return;

        submitAction(user);
      }}
    >
      <div className="content">
        <input type="password" hidden />
        {fields.map((f, idx) => (
          <InputField
            key={idx}
            type={f.type}
            onBlur={
              f.name === 'confirm_password'
                ? (e) =>
                    validateInput(
                      e.target,
                      formRef.current.elements.namedItem('new_password').value
                    )
                : (e) => validateInput(e.target)
            }
            error={inputError[f.name]}
            label={f.label}
            name={f.name}
            onChange={handleChange}
          />
        ))}
      </div>
      <footer>
        <div className="btn-ctn">
          <FlatBtn text="Cancel" isUnderline={true} onClick={close} />
          <FlatBtn type="submit" text="Done" className="filled" />
        </div>
      </footer>
    </form>
  );
};

export default Form;
