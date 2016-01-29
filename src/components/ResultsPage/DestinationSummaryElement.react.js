import React, { PropTypes } from 'react';
const DestinationSummaryElement = (props) => {
  return (
    <div>
      <p>{props.date.format('DD.MM.YYYY')} <small>at</small> {props.date.format('HH:mm')}</p>
      <p>{props.from} <small>to</small> {props.to}</p>
    </div>
  );
};

DestinationSummaryElement.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.any.isRequired,
};

export default DestinationSummaryElement;
