import { set } from 'date-fns';
import React, { useState, useRef } from 'react';

import addCircleSVG from '../../assets/svg/add-circle-fill.svg';
import cameraSVG from '../../assets/svg/camera-fill.svg';

const UploadFile = ({ handleIcon }) => {
  const [imgSrc, setImgSrc] = useState();
  const uploadFileRef = useRef();

  function onUploadFile() {
    const file = uploadFileRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => setImgSrc(reader.result);
    console.log(file);
    handleIcon(file); // store file to channelInfo state
  }
  return (
    <label className={imgSrc ? 'upload-file' : 'upload-file init'}>
      {imgSrc && (
        <img src={imgSrc} className="icon-preview" alt="your uploaded icon" />
      )}
      {!imgSrc && (
        <>
          <img
            className="add-circle-fill"
            src={addCircleSVG}
            alt="upload an icon"
          />
          <div className="add-circle-bg"></div>
          <img className="camera-fill" src={cameraSVG} alt="upload an icon" />
        </>
      )}
      <input
        type="file"
        ref={uploadFileRef}
        onChange={onUploadFile}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export default UploadFile;
