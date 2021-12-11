import React from 'react';
import PropTypes from 'prop-types';

import FlatBtn from '../FlatBtn';
import Popup from '../Popup';

import '../../styles/CreateChannelNodeOne.css';

const NodeOne = ({ nextNode, setChannelInfo, close, isMobile }) => {
  return (
    <Popup
      className={
        isMobile
          ? 'create-channel create-channel-node_one mobile'
          : 'create-channel create-channel-node_one'
      }
      close={close}
      title="Tell us more about your server"
      subheader="In order to help you with your setup, will your new channel be private (invite-only) or public?"
      footerContent={
        <FlatBtn
          text="Skip this question for now"
          onClick={() => {
            nextNode();
          }}
          isUnderline={true}
        />
      }
    >
      <div className="btn-ctn">
        <FlatBtn
          text={'Private (invite only)'}
          onClick={() => {
            setChannelInfo(false);
            nextNode();
          }}
        />
        <FlatBtn
          text={'Public'}
          onClick={() => {
            setChannelInfo(true);
            nextNode();
          }}
        />
      </div>
    </Popup>
  );
};

export default NodeOne;

NodeOne.propTypes = {
  nextNode: PropTypes.func,
  setChannelInfo: PropTypes.func,
  close: PropTypes.func,
  isMobile: PropTypes.bool,
};
