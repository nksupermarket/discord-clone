import React, { useState } from 'react';

import UploadFile from '../UploadFile';
import Popup from '../Popup_desktop';
import FlatBtn from '../FlatBtn';
import InputField from '../InputField';

import '../../styles/CreateChannelNodeTwo.css';

import addCircleSVG from '../../assets/svg/add-circle-fill.svg';
import cameraSVG from '../../assets/svg/camera-fill.svg';

const NodeTwo = ({
  channelName,
  createChannel,
  prevNode,
  close,
  handleChange,
  handleIcon,
  isMobile,
}) => {
  const [imgPreview, setImgPreview] = useState();

  return (
    <Popup
      className={
        isMobile
          ? 'create-channel create-channel-node_two mobile'
          : 'create-channel create-channel-node_two'
      }
      title="Customize your channel"
      subheader="Give your new channel some personality with a name and an icon. You can always change it later."
      close={close}
      footerContent={
        <div className="btn-ctn">
          <FlatBtn text={'Back'} onClick={prevNode} />
          <FlatBtn
            className={channelName ? 'filled' : 'filled inactive'}
            text="Create"
            onClick={() => {
              createChannel();
              close();
            }}
          />
        </div>
      }
    >
      <UploadFile
        handleUpload={handleIcon}
        handlePreview={setImgPreview}
        isPreview={true}
        imgPreview={imgPreview}
      >
        <img
          className="add-circle-fill"
          src={addCircleSVG}
          alt="upload an icon"
        />
        <div className="add-circle-bg"></div>
        <img className="camera-fill" src={cameraSVG} alt="upload an icon" />
      </UploadFile>
      <form>
        <h5>Channel Name</h5>
        <InputField name="name" value={channelName} onChange={handleChange} />
      </form>
    </Popup>
  );
};

export default NodeTwo;
