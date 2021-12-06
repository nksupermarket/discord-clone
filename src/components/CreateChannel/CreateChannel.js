import React, { useState, useCallback, useContext } from 'react';

import {
  createChannel,
  uploadChannelIcon,
  changeChannelIcon,
} from '../../logic/channel_firebaseStuff';
import { subscribeToChannel } from '../../logic/user_firebaseStuff';

import Modal from '../Modal';
import NodeOne from './NodeOne';

import '../../styles/CreateChannel.css';
import NodeTwo from './NodeTwo';
import { UserContext } from '../../logic/contexts/UserContext';
import { ErrorContext } from '../../logic/contexts/ErrorContext';

const CreateChannel = ({ close, isMobile }) => {
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [node, setNode] = useState(1);
  const [channelInfo, setChannelInfo] = useState({
    name: `${user.displayName}'s channel`,
    icon: {},
    isPublic: false,
  });

  function ontoNextNode() {
    setNode((prev) => prev + 1);
  }

  function prevNode() {
    setNode((prev) => prev - 1);
  }

  const onCreateChannel = useCallback(
    async function onCreateChannel() {
      try {
        let channelID;
        if (channelInfo.icon instanceof File) {
          channelID = await createChannel(
            channelInfo.name,
            channelInfo.isPublic,
            channelInfo.icon
          );
        } else {
          channelID = await createChannel(
            channelInfo.name,
            channelInfo.isPublic
          );
        }
        await subscribeToChannel(user, channelID, 'owner');
      } catch (error) {
        setError(error.message);
      }
    },
    [channelInfo, user, setError]
  );

  return (
    <Modal close={close}>
      {
        {
          1: (
            <NodeOne
              nextNode={ontoNextNode}
              setChannelInfo={(status) =>
                setChannelInfo((prev) => ({ ...prev, isPublic: status }))
              }
              close={close}
              isMobile={isMobile}
            />
          ),
          2: (
            <NodeTwo
              createChannel={onCreateChannel}
              prevNode={prevNode}
              channelName={channelInfo.name}
              handleChange={(e) =>
                setChannelInfo((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              handleIcon={(icon) =>
                setChannelInfo((prev) => ({ ...prev, icon }))
              }
              close={close}
              isMobile={isMobile}
            />
          ),
        }[node] // renders component based on value of node
      }
    </Modal>
  );
};

export default CreateChannel;
