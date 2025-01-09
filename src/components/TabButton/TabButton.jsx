import React from 'react';
import PropTypes from 'prop-types';
import './TabButton.css';

const TabButtons = ({ tabs, onTabChange }) => {
  return (
    <div className="tab-buttons-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className="tab-button"
          onClick={() => onTabChange(tab.id)}
        >
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
