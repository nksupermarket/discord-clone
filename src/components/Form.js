import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useInputError from '../logic/custom-hooks/useInputError';

import InputField from './InputField';
import FlatBtn from './FlatBtn';

const Form = ({
  fields,
  inputValues,
  actionBtnText,
  noCancelBtn,
  cancelBtnText,
  handleChange,
  submitAction,
  cleanUp,
  close,
  setError,
}) => {
  const formRef = useRef();
  const fieldNames = fields.map((f) => f.name);
  const { inputError, validateInput, submitForm } =
    useInputError(fieldNames);
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return (
    <form
      ref={formRef}
      autoComplete="nope"
      onSubmit={async (e) => {
        setLoading(true);
        cleanUp = cleanUp || close;
        await submitForm(e, submitAction, cleanUp, setError);
        if (isMounted.current) setLoading(false);
      }}
    >
      <div className="content">
        <input type="password" hidden />
        {/* need this to turn off autocomplete */}
        {fields.map((f, idx) => {
          console.log(f.type);
          if (f.type === 'dropdown') {
            return (
              <select name={f.name}>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.display}
                  </option>
                ))}
              </select>
            );
          }
          return (
            <InputField
              key={idx}
              type={f.type}
              autoFocus={idx === 0}
              onBlur={(e) => validateInput(e.currentTarget)}
              error={inputError[f.name]}
              label={f.label}
              name={f.name}
              onChange={handleChange}
              value={inputValues[f.name] || ''}
            />
          );
        })}
      </div>
      <footer>
        <div
          className={
            loading ? 'btn-ctn no-pointer-events' : 'btn-ctn'
          }
        >
          {!noCancelBtn && (
            <FlatBtn
              text={cancelBtnText || 'Cancel'}
              isUnderline={true}
              onClick={close}
            />
          )}
          <FlatBtn
            type="submit"
            text={actionBtnText || 'Done'}
            className="filled small"
            loading={loading}
          />
        </div>
      </footer>
    </form>
  );
};

export default Form;

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
  inputValues: PropTypes.object,
  actionBtnText: PropTypes.string,
  noCancelBtn: PropTypes.bool,
  cancelBtnText: PropTypes.string,
  textBtns: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func,
  submitAction: PropTypes.func,
  cleanUp: PropTypes.func,
  close: PropTypes.func,
  setError: PropTypes.func,
};
