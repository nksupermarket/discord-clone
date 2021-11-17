import React from 'react';

import '../../styles/ProfileColorSwatch.css';

const ProfileColorSwatch = ({ isDefault, style }) => {
  return (
    <div className="profile-color-swatch">
      <label className={isDefault ? 'swatch' : 'swatch custom'} style={style}>
        {!isDefault && <input type="color" style={{ display: 'none' }} />}
      </label>
      <div className="swatch-description header-secondary">
        {isDefault ? 'Default' : 'Custom'}
      </div>
    </div>
  );
};

export default ProfileColorSwatch;
