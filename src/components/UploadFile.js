import React, { useState, useEffect, useRef } from 'react';

const UploadFile = ({
  children,
  handleUpload,
  handlePreview,
  imgPreview,
  isPreview,
}) => {
  const uploadFileRef = useRef();

  function checkIfFileIsImg(file) {
    return file['type'].includes('image');
  }

  function onUploadImg() {
    const file = uploadFileRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (checkIfFileIsImg(file)) handlePreview(reader.result);
    };
    handleUpload && handleUpload(file);
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
        onChange={onUploadImg}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export default UploadFile;
