import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CatList from '../CatList';
import ListItem from './ListItem';

let count = 0;

const Sidebar = ({ btnList, categories, dispatch }) => {
  const [activeBtn, setActiveBtn] = useState();
  return (
    <aside className="sidebar">
      <div className="list-wrapper">
        {categories &&
          categories.map((category, i) => (
            <React.Fragment key={i}>
              <CatList
                key={`${count++}${new Date().toString()}catList`}
                cat={category}
                className="settings-category-wrapper"
                isHeader={category !== 'none'}
              >
                {btnList // grab btns that fall under the category
                  .filter((btn) => {
                    if (btn.category === category) return true;
                    if (!btn.category && category === 'none')
                      return true;
                    return false;
                  })
                  .map((btn) => {
                    return (
                      <ListItem
                        key={`${count++}${new Date().toString()}`}
                        onClick={() => {
                          if (!dispatch) return;
                          setActiveBtn(btn.text);
                          dispatch({
                            type: 'swap_to',
                            payload: btn.text,
                          });
                        }}
                        active={
                          activeBtn
                            ? activeBtn === btn.text
                            : btn.isDefault
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
            </React.Fragment>
          ))}
        {!categories &&
          btnList.map((btn) => {
            return (
              <ListItem
                key={`${count++}${new Date().toString()}withoutCategories`}
                onClick={() => {
                  dispatch &&
                    dispatch({ type: 'swap_to', payload: btn.text });
                }}
                active={
                  activeBtn ? activeBtn === btn.text : btn.isDefault
                }
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

function capitalize(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

Sidebar.propTypes = {
  btnList: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
};
