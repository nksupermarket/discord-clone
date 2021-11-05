import React, { useState } from 'react';
import NodeOne from './NodeOne';

const CreateChannel = () => {
  const [node, setNode] = useState('nodeOne');

  let display;
  switch (node) {
    case 'nodeOne': {
      display = <NodeOne />;
      break;
    }
    case 'nodeTwo': {
      break;
    }
    default: {
      display = <NodeOne />;
    }
  }

  return { display };
};
