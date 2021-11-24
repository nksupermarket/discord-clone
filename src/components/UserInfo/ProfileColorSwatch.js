import React from 'react';

import checkSVG from '../../assets/svg/check-line.svg';

import '../../styles/ProfileColorSwatch.css';

const ProfileColorSwatch = ({
  isDefault,
  isActive,
  color,
  onChange,
  onClick,
}) => {
  return (
    <div className="profile-color-swatch" onClick={onClick}>
      <label
        className={isDefault ? 'swatch' : 'swatch custom'}
        style={{ background: color }}
      >
        {!isDefault && (
          <input type="color" style={{ display: 'none' }} onChange={onChange} />
        )}
        {isActive && <img src={checkSVG} alt="selected" />}
      </label>
      <div className="swatch-description header-secondary">
        {isDefault ? 'Default' : 'Custom'}
      </div>
    </div>
  );
};

export default ProfileColorSwatch;
