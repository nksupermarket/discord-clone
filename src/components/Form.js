import React from 'react';

import { dynamicValidation } from '../logic/formValidation';
import useInputError from '../logic/custom-hooks/useInputError';

import InputField from './InputField';
import FlatBtn from './FlatBtn';

const Form = ({ fields, handleChange, close }) => {
  const { inputError, validateInput } = useInputError(
    fields.map((f) => f.name)
  );
  return (
    <form
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
      }}
    >
      <div className="content">
        {fields.map((f, idx) => (
          <InputField
            key={idx}
            //onBlur={(e) => validateInput(e.target)}
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
