import React from 'react';

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
