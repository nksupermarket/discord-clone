import React from 'react';

const Sidebar = ({ btnList }) => {
  return (
    <div className="sidebar">
      <ul className="option-ctn">
        {btnList.map((btn) => {
          return <li className="list-item">{btn.text}</li>;
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
