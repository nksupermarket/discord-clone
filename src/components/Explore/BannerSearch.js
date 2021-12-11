import React from 'react';
import PropTypes from 'prop-types';

import searchSVG from '../../assets/svg/search-line.svg';
import bannerBG from '../../assets/png/Waffle_Coffee_Dessert.png';
import closeSVG from '../../assets/svg/close-circle-fill.svg';

const BannerSearch = ({
  query,
  onSearch,
  handleChange,
  cancelSearch,
}) => {
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bannerBG})`,
      }}
    >
      <h3>Find your community on bread</h3>
      <div className="subheader">
        From gaming, to music, to learning, there&apos;s a place for
        you
      </div>
      <div className="search">
        <div className="searchBar">
          <div className="input-wrapper">
            <input
              type="text"
              value={query}
              onKeyUp={(e) => {
                if (e.key === 'Enter') onSearch();
              }}
              onChange={handleChange}
            />
          </div>
          {query ? (
            <img
              src={closeSVG}
              alt="cancel search"
              className="icon-btn"
              onClick={cancelSearch}
            />
          ) : (
            <img src={searchSVG} alt="search" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerSearch;

BannerSearch.propTypes = {
  query: PropTypes.string,
  onSearch: PropTypes.func,
  handleChange: PropTypes.func,
  cancelSearch: PropTypes.func,
};
