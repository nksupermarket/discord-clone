import React from 'react';

const RoomCategory = ({ categoriesRef, category }) => {
  return (
    <ul
      ref={(el) => (categoriesRef.current[category] = el)} //create a ref to each individual category
      className="category-room-wrapper"
    >
      {category !== 'none' && (
        <header>
          <h2 className="caps-title">{category}</h2>
        </header>
      )}
    </ul>
  );
};

export default RoomCategory;
