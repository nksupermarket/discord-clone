import React, { useState } from 'react';
import NodeOne from './NodeOne';

import '../../styles/CreateChannel.css';

const CreateChannel = () => {
  const [node, setNode] = useState('nodeOne');
  const [channelInfo, setChannelInfo] = useState({});

  const nodeOne = (
    <NodeOne
      setChannelInfo={(status) =>
        setChannelInfo((prev) => ({ ...prev, isPrivate: status }))
      }
    />
  );

  let display;
  switch (node) {
    case 'nodeOne': {
      display = nodeOne;
      break;
    }
    case 'nodeTwo': {
      break;
    }
    default: {
      display = nodeOne;
    }
  }

  return display;
};

export default CreateChannel;
