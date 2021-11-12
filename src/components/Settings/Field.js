import React from 'react';

import FlatBtn from '../FlatBtn';

const Field = ({ item, display }) => {
  return (
    <div className="field">
      <div className="constained-row">
        <div className={`${item}-wrapper`}>
          <h5 className="caps-title">{item}</h5>
          <div className={`${item}-inner_row`}>{display}</div>
        </div>
      </div>
      <FlatBtn text={'Edit'}></FlatBtn>
    </div>
  );
};

export default Field;
