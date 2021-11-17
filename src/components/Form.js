import React, { useRef, useLayoutEffect, useContext } from 'react';

import useInputError from '../logic/custom-hooks/useInputError';
import { UserContext } from '../logic/contexts/UserContext';

import InputField from './InputField';
import FlatBtn from './FlatBtn';

const Form = ({ fields, actionBtnText, handleChange, submitAction, close }) => {
  const formRef = useRef();
  const fieldNames = fields.map((f) => f.name);
  const { inputError, validateInput, submitForm } = useInputError(fieldNames);

  return (
    <form
      ref={formRef}
      autocomplete="nope"
      onSubmit={(e) => {
        submitForm(e, submitAction, close);
      }}
    >
      <div className="content">
        <input type="password" hidden />
        {fields.map((f, idx) => (
          <InputField
            key={idx}
            type={f.type}
            autoFocus={idx === 0 ? true : false}
            onBlur={
              f.name === 'confirm_password'
                ? (e) =>
                    validateInput(
                      e.target,
                      false,
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
          <FlatBtn
            type="submit"
            text={actionBtnText ? actionBtnText : 'Done'}
            className="filled"
          />
        </div>
      </footer>
    </form>
  );
};

export default Form;
