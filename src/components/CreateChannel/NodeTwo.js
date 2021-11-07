import React from 'react';

import FlatBtn from '../FlatBtn';
import InputField from '../InputField';

import addCircleSVG from '../../assets/svg/add-circle-fill.svg';
import cameraSVG from '../../assets/svg/camera-fill.svg';
import '../../styles/CreateChannelNodeTwo.css';

const NodeTwo = ({
  channelName,
  createChannel,
  prevNode,
  handleChannelName,
  close,
}) => {
  return (
    <div
      className="create-channel create-channel-node_two"
      onClick={(e) => e.stopPropagation()}
    >
      <header>
        <h3>Customize your channel</h3>
        <p>
          Give your new channel some personality with a name and an icon. You
          can always change it later.
        </p>
      </header>
      <div className="content">
        <label className="upload-file">
          <img
            className="add-circle-fill"
            src={addCircleSVG}
            alt="upload an icon"
          />
          <div className="add-circle-bg"></div>
          <img className="camera-fill" src={cameraSVG} alt="upload an icon" />
          <input type="file" style={{ display: 'none' }} />
        </label>
        <form>
          <h5>Channel Name</h5>
          <InputField value={channelName} onChange={handleChannelName} />
        </form>
      </div>
      <footer>
        <FlatBtn text={'Back'} onClick={prevNode} />
        <FlatBtn
          className={channelName ? 'filled' : 'filled inactive'}
          text="Create"
          onClick={() => {
            close();
            createChannel();
          }}
        />
      </footer>
    </div>
  );
};

export default NodeTwo;
