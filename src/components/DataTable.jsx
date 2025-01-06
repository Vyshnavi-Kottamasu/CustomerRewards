import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ columns, details }) => {
  if (!columns || !details || !details.length) {
    return <p>No data available</p>;
  }
  return (
    <table border={1}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {details.map((data, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>{data[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  details: PropTypes.array.isRequired,
};

export default DataTable;
