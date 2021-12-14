import React from 'react';
import PropTypes from 'prop-types';

import FlatBtn from '../FlatBtn';

const Field = ({ item, display, onClick }) => {
  return (
    <div className="field">
      <div className="constrained-row">
        <div className={`${item}-wrapper item-wrapper`}>
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

Field.propTypes = {
  item: PropTypes.string,
  display: PropTypes.string,
  onClick: PropTypes.func,
};
