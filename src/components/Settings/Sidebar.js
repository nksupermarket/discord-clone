import React from 'react';

import CatList from '../CatList';
import ListItem from './ListItem';

const Sidebar = ({ btnList, categories, reducer }) => {
  return (
    <aside className="sidebar">
      <div className="list-wrapper">
        {categories.map((category, i) => (
          <CatList key={i} cat={category} className="settings-category-wrapper">
            {btnList
              .filter((btn) => {
                if (btn.category === category) return true;
                if (!btn.category && category === 'none') return true;
                return false;
              })
              .map((btn, i) => {
                return (
                  <ListItem key={i} onClick={() => reducer(btn.text)}>
                    {btn.text}
                  </ListItem>
                );
              })}
          </CatList>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
