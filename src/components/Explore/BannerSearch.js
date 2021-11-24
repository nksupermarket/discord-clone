import React from 'react';

import searchSVG from '../../assets/svg/search-line.svg';
import bannerBG from '../../assets/png/Waffle_Coffee_Dessert.png';

const BannerSearch = () => {
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bannerBG})`,
      }}
    >
      <h3>Find your community on bread</h3>
      <div className="subheader">
        From gaming, to music, to learning, there's a place for you
      </div>
      <div className="search">
        <div className="searchBar">
          <div className="input-wrapper">
            <input type="text" />
          </div>
          <img src={searchSVG} alt="search" />
        </div>
      </div>
    </div>
  );
};

export default BannerSearch;
