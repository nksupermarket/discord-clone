import React, { useState } from 'react';
import NodeOne from './NodeOne';

import '../../styles/CreateChannel.css';

const CreateChannel = () => {
  const [node, setNode] = useState(1);
  const [channelInfo, setChannelInfo] = useState({});

  function ontoNextNode() {
    setNode((prev) => prev + 1);
  }

  function prevNode() {
    setNode((prev) => prev - 1);
  }

  const nodeOne = (
    <NodeOne
      nextNode={ontoNextNode}
      setChannelInfo={(status) =>
        setChannelInfo((prev) => ({ ...prev, isPrivate: status }))
      }
    />
  );

  let display;
  switch (node) {
    case 1: {
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
