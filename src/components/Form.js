import React, { useRef, useEffect, useState } from 'react';

import useInputError from '../logic/custom-hooks/useInputError';
import uniqid from 'uniqid';

import InputField from './InputField';
import FlatBtn from './FlatBtn';

const Form = ({
  fields,
  inputValues,
  actionBtnText,
  noCancelBtn,
  cancelBtnText,
  textBtns,
  handleChange,
  submitAction,
  cleanUp,
  close,
  setError,
}) => {
  const formRef = useRef();
  const fieldNames = fields.map((f) => f.name);
  const { inputError, validateInput, submitForm } = useInputError(fieldNames);
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
        cleanUp = cleanUp ? cleanUp : close;
        await submitForm(e, submitAction, cleanUp, setError);
        if (isMounted.current) setLoading(false);
      }}
    >
      <div className="content">
        <input type="password" hidden />
        {/*need this to turn off autocomplete */}
        {fields.map((f, idx) => {
          return (
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
              value={inputValues[f.name] || ''}
            />
          );
        })}
      </div>
      <footer>
        <div className={loading ? 'btn-ctn no-pointer-events' : 'btn-ctn'}>
          {!noCancelBtn && (
            <FlatBtn
              text={cancelBtnText ? cancelBtnText : 'Cancel'}
              isUnderline={true}
              onClick={close}
            />
          )}
          <FlatBtn
            type="submit"
            text={actionBtnText ? actionBtnText : 'Done'}
            className="filled small"
            loading={loading}
          />
        </div>
        {textBtns && (
          <div className="text-btn-ctn">
            {textBtns.map((b) => {
              return (
                <span key={uniqid()} className="link" onClick={b.onClick}>
                  {b.text}
                </span>
              );
            })}
          </div>
        )}
      </footer>
    </form>
  );
};

export default Form;
