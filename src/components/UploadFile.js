import React, { useState, useEffect, useRef } from 'react';

const UploadFile = ({ children, handleIcon, isPreview }) => {
  const [imgPreview, setImgPreview] = useState();
  const uploadFileRef = useRef();

  function checkIfFileIsImg(file) {
    return file['type'].includes('image');
  }

  function onUploadImg() {
    const file = uploadFileRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => setImgPreview(reader.result);
    console.log('finished onloadend');
    console.log(children);
    handleIcon && handleIcon(file);
  }
  return (
    <label className={imgPreview ? 'upload-file' : 'upload-file init'}>
      {imgPreview && (
        <img
          src={imgPreview}
          className="icon-preview"
          alt="your uploaded icon"
        />
      )}
      {!imgPreview && children}
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
