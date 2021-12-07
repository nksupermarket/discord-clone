import React from 'react';

import useInputValues from '../../../logic/custom-hooks/useInputValues';

import FlatBtn from '../../FlatBtn';
import InputField from '../../InputField';
const RoomOverview = ({ room }) => {
  const { inputValues, handleChange, resetInputValues } = useInputValues();
  return (
    <section className="room_overview">
      <header>
        <h2>Overview</h2>
      </header>
      <div className="inner-content">
        <div className="fields-ctn">
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
        </div>
        <FlatBtn className="filled" text="Save changes" />
      </div>
    </section>
  );
};

export default RoomOverview;
