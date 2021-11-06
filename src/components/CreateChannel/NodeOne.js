import React, { useState } from 'react';

import FlatBtn from '../FlatBtn';

import '../../styles/CreateChannelNodeOne.css';

const NodeOne = ({ nextNode, setChannelInfo }) => {
  return (
    <div
      className="create-channel create-channel-node_one"
      onClick={(e) => e.stopPropagation()}
    >
      <header>
        <h3>Tell us more about your server</h3>
        <p>
          In order to help you with your setup, will your new channel be private
          (invite-only) or public?
        </p>
      </header>
      <div className="content">
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
      </div>
      <footer>
        <FlatBtn
          text="Skip this question for now"
          onClick={() => {
            setChannelInfo('private');
            nextNode();
          }}
        />
      </footer>
    </div>
  );
};

export default NodeOne;
