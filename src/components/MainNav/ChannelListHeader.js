import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getInfoForVisitingChannel } from '../../logic/channel_firebaseStuff';
import { ErrorContext } from '../../logic/contexts/ErrorContext';
import { UserContext } from '../../logic/contexts/UserContext';

import Avatar from '../Avatar';

const ChannelListHeader = () => {
  const { channelList } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { channelID } = useParams();
  const [visitingChannel, setVisitingChannel] = useState();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!channelID || channelList?.find((c) => c.id === channelID))
        return setVisitingChannel();

      try {
        const data = await getInfoForVisitingChannel(channelID);
        const channelInfo = {
          name: data[0],
          icon: data[1],
          defaultRoom: data[2],
        };
        setVisitingChannel(channelInfo);

        history.replace(
          `/channels/${channelID}/${Object.keys(channelInfo.defaultRoom)[0]}/`
        );
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [channelID, channelList, history, setError]);

  return (
    <header>
      <div className="list-item home-icon">
        <Avatar color="#cb3e5b" />
      </div>
      {visitingChannel && (
        <div className="list-item avatar-wrapper">
          <Avatar
            channelName={visitingChannel.name}
            img={visitingChannel.icon}
          />
        </div>
      )}
      <div className="header-underline-wrapper list-item">
        <div className="header-underline"></div>
      </div>
    </header>
  );
};

export default ChannelListHeader;
