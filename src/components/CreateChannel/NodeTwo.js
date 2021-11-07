import React from 'react';

import FlatBtn from '../FlatBtn';
import InputField from '../InputField';

import '../../styles/CreateChannelNodeTwo.css';

const NodeTwo = ({
  channelName,
  createChannel,
  prevNode,
  handleChannelName,
  close,
}) => {
  console.log(channelName);
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
        <div>{/* upload files */}</div>
        <form>
          <h5>Channel Name</h5>
          <InputField value={channelName} onChange={handleChannelName} />
        </form>
      </div>
      <footer>
        <FlatBtn text={'Back'} onClick={prevNode} />
        <FlatBtn
          className="filled"
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
