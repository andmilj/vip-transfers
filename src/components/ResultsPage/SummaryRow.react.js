import React, { PropTypes } from 'react';
const SummaryRow = (props) => {
  return (
    <div className="f-row">
      <div className="one-fourth">{props.label}</div>
      <div className="three-fourth">{props.value}</div>
    </div>
  );
};

SummaryRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SummaryRow;
