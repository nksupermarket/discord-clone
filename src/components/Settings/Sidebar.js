import React from 'react';

import uniqid from 'uniqid';

import CatList from '../CatList';
import ListItem from './ListItem';

const Sidebar = ({ btnList, categories, dispatch }) => {
  function capitalize(str) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return (
    <aside className="sidebar">
      <div className="list-wrapper">
        {categories &&
          categories.map((category, i) => (
            <>
              <CatList
                key={i}
                cat={category}
                className="settings-category-wrapper"
                isHeader={category !== 'none'}
              >
                {btnList //grab btns that fall under the category
                  .filter((btn) => {
                    if (btn.category === category) return true;
                    if (!btn.category && category === 'none') return true;
                    return false;
                  })
                  .map((btn) => {
                    return (
                      <ListItem
                        key={uniqid()}
                        onClick={() =>
                          dispatch({ type: 'swap_to', payload: btn.text })
                        }
                      >
                        {capitalize(btn.text)}
                      </ListItem>
                    );
                  })}
              </CatList>
              <div className="list-underline-wrapper">
                <div className="list-underline"></div>
              </div>
            </>
          ))}
        {!categories &&
          btnList.map((btn) => {
            return (
              <ListItem
                key={uniqid()}
                onClick={() => dispatch({ type: 'swap_to', payload: btn.text })}
              >
                {capitalize(btn.text)}
              </ListItem>
            );
          })}
      </div>
    </aside>
  );
};

export default Sidebar;
