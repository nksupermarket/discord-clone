import React from 'react';

import { validateInput } from '../logic/formValidation';
import useInputError from '../logic/custom-hooks/useInputError';

import InputField from './InputField';
import FlatBtn from './FlatBtn';

const Form = ({ fields, handleChange, close }) => {
  const { inputError, setInputError } = useInputError(
    fields.map((f) => f.name)
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const {
          target: { elements },
        } = e;

        fields //iterate through each input field and validate
          .map((f) => f.name)
          .forEach((fname) => {
            const currEl = elements.namedItem(fname);
            console.log(currEl);
            const validationStatus = validateInput(currEl);
            if (validationStatus.error)
              return setInputError((prev) => ({
                ...prev,
                [fname]: validationStatus.error,
              }));
          });
      }}
    >
      <div className="content">
        {fields.map((f, idx) => (
          <InputField
            key={idx}
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
