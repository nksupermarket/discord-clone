import React from 'react';

import FlatBtn from '../FlatBtn';

const Field = ({ item, display, onClick }) => {
  return (
    <div className="field">
      <div className="constrained-row">
        <div className={`${item}-wrapper`}>
          <h5 className="caps-title">{item}</h5>
          <div className={`inner_row`}>
            <span>{display}</span>
          </div>
        </div>
      </div>
      <FlatBtn text={'Edit'} className="filled" onClick={onClick} />
    </div>
  );
};

export default Field;
