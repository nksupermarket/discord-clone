import React, { useRef, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import useInputValues from '../../../logic/custom-hooks/useInputValues';
import {
  updateRoomName,
  updateCategoryOfRoom,
  createRoomCategory,
  deleteRoom,
} from '../../../logic/channel_firebaseStuff';
import { ChannelContext } from '../../../logic/contexts/ChannelContext';
import { ErrorContext } from '../../../logic/contexts/ErrorContext';
import useSuccess from '../../../logic/custom-hooks/useSuccess';

import FlatBtn from '../../FlatBtn';
import InputField from '../../InputField';
import Success from '../../Success';

import '../../../styles/RoomOverview.css';
import { useState } from 'react/cjs/react.development';

const RoomOverview = ({ room }) => {
  const { channelID } = useParams();
  const { roomCategories } = useContext(ChannelContext);
  const { setError } = useContext(ErrorContext);

  const { inputValues, setInputValues, handleChange } = useInputValues();
  useEffect(() => {
    setInputValues({
      room_name: room.name,
      room_category: room.category,
    });
  }, [room, setInputValues]);

  const isMounted = useRef();
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  const { success, setSuccess } = useSuccess(isMounted);
  const [isSaving, setIsSaving] = useState(false);
  return (
    <>
      {success && <Success text={success} />}
      <section className="room_overview">
        <header>
          <h2>Overview</h2>
        </header>
        <div className="inner-content">
          <form
            className="fields-ctn"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                setIsSaving(true);
                const { room_name, room_category } = inputValues;
                if (room_name !== room.name)
                  await updateRoomName(channelID, room.id, room_name);

                if (room_category === room.category) return;

                if (roomCategories.indexOf(room_category) === -1)
                  await createRoomCategory(channelID, room_category);
                await updateCategoryOfRoom(channelID, room.id, room_category);

                if (isMounted.current) {
                  setIsSaving(false);
                  setSuccess('changes saved');
                }
              } catch (error) {
                setError(error.message);
              }
            }}
          >
            <InputField
              label={'room name'}
              name="room_name"
              onChange={handleChange}
              value={inputValues.room_name}
            />
            <InputField
              label={'room category'}
              name="room_category"
              onChange={handleChange}
              value={inputValues.room_category}
            />
            <div className="btn-ctn">
              <FlatBtn
                className="filled"
                text="Save changes"
                type="submit"
                loading={isSaving}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RoomOverview;
