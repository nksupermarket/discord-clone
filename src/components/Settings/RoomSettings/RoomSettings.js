import React, { useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorContext } from '../../../logic/contexts/ErrorContext';
import { deleteRoom } from '../../../logic/channel_firebaseStuff';
import useMobileCheck from '../../../logic/custom-hooks/useMobileCheck';

import RoomOverview from './RoomOverview';
import Error from '../../Error';
import Import from '../../../logic/Import';

const RoomSettings = ({ room, close }) => {
  const { SetError } = useContext(ErrorContext);
  const { channelID, roomID } = useParams();
  const {
    isMobileCheck: { current: isMobile },
  } = useMobileCheck();

  const [state, dispatch] = useReducer((state, action) => {
    if (action.type === 'swap_to') {
      switch (action.payload) {
        case 'overview':
          return 'overview';
        case 'delete room':
          (async function () {
            try {
              await deleteRoom(channelID, roomID);
              close();
            } catch (error) {
              SetError(error.message);
            }
          })();
          break;
        default:
          throw new Error("that doesn't exist!");
      }
    }
  }, 'overview');

  return (
    <Import
      mobile={() => import('../Settings _mobile')}
      desktop={() => import('../Settings_desktop')}
      isMobile={isMobile}
    >
      {(Settings) => (
        <Settings
          close={close}
          categories={[`${room.name}`, 'none']}
          btnList={[
            createSettingsButtonDetails('overview', `${room.name}`, true),
            createSettingsButtonDetails('delete room', 'none'),
          ]}
          dispatch={dispatch}
        >
          {state &&
            {
              overview: <RoomOverview room={room} />,
            }[state]}
        </Settings>
      )}
    </Import>
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
