import React from 'react';

import FlatBtn from '../FlatBtn';
import Popup from '../Popup';

import '../../styles/CreateChannelNodeOne.css';

const NodeOne = ({ nextNode, setChannelInfo, close }) => {
  return (
    <Popup
      className="create-channel create-channel-node_one"
      close={close}
      title="Tell us more about your server"
      subheader="In order to help you with your setup, will your new channel be private (invite-only) or public?"
      footerContent={
        <FlatBtn
          text="Skip this question for now"
          onClick={() => {
            setChannelInfo('private');
            nextNode();
          }}
        />
      }
    >
      <div className="btn-ctn">
        <FlatBtn
          text={'Private (invite only)'}
          onClick={() => {
            setChannelInfo('private');
            nextNode();
          }}
        />
        <FlatBtn
          text={'Public'}
          onClick={() => {
            setChannelInfo('public');
            nextNode();
          }}
        />
      </div>
    </Popup>
  );
};

export default NodeOne;
