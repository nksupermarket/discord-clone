import React from 'react';
import PropTypes from 'prop-types';

const CatList = ({
  cat,
  catRef,
  className,
  isHeader = true,
  headerSubtext,
  children,
}) => {
  return (
    <ul ref={catRef} className={className}>
      {isHeader && (
        <header>
          <h2 className="caps-title">
            {cat}
            {headerSubtext}
          </h2>
        </header>
      )}
      {children}
    </ul>
  );
};

export default CatList;

CatList.propTypes = {
  cat: PropTypes.string,
  catRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  className: PropTypes.string,
  isHeader: PropTypes.bool,
  headerSubtext: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
