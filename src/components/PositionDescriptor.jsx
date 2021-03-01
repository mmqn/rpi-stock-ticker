import React from 'react';
import PropTypes from 'prop-types';
import descriptorStyle from '../styles/descriptorStyle';

const PositionDescriptor = ({ curPrice, position }) => {
  const equity = position.shares * curPrice;

  const invested = position.shares * position.average_price;

  const roi = equity - invested;

  // TODO Price changed %

  const isPriceIncreased = roi >= 0;

  return (
    <>
      <h5 style={descriptorStyle(isPriceIncreased)}>
        {isPriceIncreased ? '+$' : '-$'}
        {Math.abs(roi).toFixed(4)}
      </h5>

      <h5>Equity: ${equity.toFixed(4)}</h5>
      <h5>
        Position: {position.shares.toFixed(2)} @ $
        {position.average_price.toFixed(2)}
      </h5>
    </>
  );
};

PositionDescriptor.propTypes = {
  position: PropTypes.shape({
    shares: PropTypes.number,
    average_price: PropTypes.number,
  }),
};

export default PositionDescriptor;
