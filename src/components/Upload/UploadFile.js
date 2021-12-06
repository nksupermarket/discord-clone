import React, { useContext, useEffect, useRef } from 'react';
import { ErrorContext } from '../../logic/contexts/ErrorContext';

const UploadFile = ({
  children,
  handleFile,
  handlePreview,
  imgPreview,
  isPreview,
  actionOnChange,
}) => {
  const uploadFileRef = useRef();
  const { setError } = useContext(ErrorContext);

  function checkIfFileIsImg(file) {
    return file['type'].includes('image');
  }

  function handleChange(action) {
    const file = uploadFileRef.current.files[0];
    if (file.size > 5000000) return setError('file exceeds 5mb');

    switch (action) {
      case 'set img preview': {
        if (!checkIfFileIsImg(file)) return setError('not an image');
        return setImgPreview(file);
      }
      case 'set attachment': {
        return handleFile(file);
      }
      default:
        return;
    }

    //helpers
    function setImgPreview(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        handlePreview(reader.result);
      };
      handleFile && handleFile(file);
    }
  }

  return (
    <label className={imgPreview ? 'upload-file' : 'upload-file init'}>
      {isPreview && imgPreview && (
        <img
          src={imgPreview}
          className="icon-preview"
          alt="your uploaded icon"
        />
      )}
      {(!imgPreview || !isPreview) && children}
      <input
        type="file"
        name="upload"
        ref={uploadFileRef}
        onChange={() => handleChange(actionOnChange)}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export default UploadFile;
