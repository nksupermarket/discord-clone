import React, { useState, useRef } from 'react';

const UploadFile = ({ mainIcon, handleIcon, isPreview }) => {
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
    handleIcon(file);
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
      {!imgPreview && { mainIcon }}
      <input
        type="file"
        name="icon"
        ref={uploadFileRef}
        onChange={onUploadImg}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export default UploadFile;
