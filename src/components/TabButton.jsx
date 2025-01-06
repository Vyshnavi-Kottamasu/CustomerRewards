import React from 'react';
import PropTypes from 'prop-types';

const TabButtons = ({ tabs, onTabChange }) => {
  return (
    <div>
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

TabButtons.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTabChange: PropTypes.func,
};

export default TabButtons;
