import React, { useState, useMemo } from 'react';

import { createChannel } from '../../firebaseStuff';
import { subscribeToChannel } from '../../logic/user_firebaseStuff';

import Modal from '../Modal';
import NodeOne from './NodeOne';

import '../../styles/CreateChannel.css';
import NodeTwo from './NodeTwo';

const CreateChannel = ({ user, close }) => {
  const [node, setNode] = useState(1);
  const [channelInfo, setChannelInfo] = useState({
    name: `${user.displayName}'s channel`,
  });

  function ontoNextNode() {
    setNode((prev) => prev + 1);
  }

  function prevNode() {
    setNode((prev) => prev - 1);
  }

  const display = useMemo(
    function getDisplay() {
      const nodeOne = (
        <NodeOne
          nextNode={ontoNextNode}
          setChannelInfo={(status) =>
            setChannelInfo((prev) => ({ ...prev, isPrivate: status }))
          }
        />
      );
      const nodeTwo = (
        <NodeTwo
          createChannel={onCreateChannel}
          prevNode={prevNode}
          channelName={channelInfo.name}
          handleChannelName={(name) =>
            setChannelInfo((prev) => ({ ...prev, name }))
          }
          close={close}
        />
      );

      switch (node) {
        case 1:
          return nodeOne;

        case 2:
          return nodeTwo;

        default:
          return nodeOne;
      }

      async function onCreateChannel() {
        const channelID = await createChannel(channelInfo.name);
        subscribeToChannel(user.uid, channelID);
      }
    },
    [node, close, channelInfo, user]
  );

  return <Modal close={close}>{display}</Modal>;
};

export default CreateChannel;
