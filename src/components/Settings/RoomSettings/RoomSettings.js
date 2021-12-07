import React, { useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorContext } from '../../../logic/contexts/ErrorContext';
import { deleteRoom } from '../../../logic/channel_firebaseStuff';

import Settings from '../Settings_desktop';
import RoomOverview from './RoomOverview';
import Error from '../../Error';

const RoomSettings = ({ room, close }) => {
  const { SetError } = useContext(ErrorContext);
  const { channelID, roomID } = useParams();

  const [state, dispatch] = useReducer((state, action) => {
    if (action.type === 'swap_to') {
      switch (action.payload) {
        case 'overview':
          return 'overview';
        case 'delete room':
          (async function () {
            try {
              await deleteRoom(channelID, roomID);
            } catch (error) {
              SetError(error.message);
            }
          })();
          break;
        default:
          throw new Error("that doesn't exist!");
      }
    }
  }, 'my account');

  return (
    <Settings
      close={close}
      categories={[`${room.name}`, 'none']}
      btnList={[
        createSettingsButtonDetails('my account', `${room.name}`, true),
        createSettingsButtonDetails('delete room', 'none'),
      ]}
      dispatch={dispatch}
    >
      {state &&
        {
          overview: <RoomOverview room={room} />,
        }[state]}
    </Settings>
  );
};

export default RoomSettings;

function createSettingsButtonDetails(text, category, isDefault) {
  return {
    text,
    category,
    isDefault,
  };
}
