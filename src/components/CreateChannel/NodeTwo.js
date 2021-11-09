import React, { useState, useRef } from 'react';

import FlatBtn from '../FlatBtn';
import InputField from '../InputField';

import '../../styles/CreateChannelNodeTwo.css';
import UploadFile from './UploadFile';

const NodeTwo = ({
  channelName,
  createChannel,
  prevNode,
  handleName,
  close,
  handleIcon,
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
        <UploadFile handleIcon={handleIcon} />
        <form>
          <h5>Channel Name</h5>
          <InputField value={channelName} onChange={handleName} />
        </form>
      </div>
      <footer>
        <FlatBtn text={'Back'} onClick={prevNode} />
        <FlatBtn
          className={channelName ? 'filled' : 'filled inactive'}
          text="Create"
          onClick={() => {
            createChannel();
            close();
          }}
        />
      </footer>
    </div>
  );
};

export default NodeTwo;
