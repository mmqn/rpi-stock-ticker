import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { descriptorStyle } from '../../styles/getStyles';

const PrevPriceDescriptor = ({ curPrice, prevPrice, prevPriceTime }) => {
  const priceChange =
    prevPrice !== null ? parseFloat(curPrice || 0) - prevPrice : 0;

  // TODO Price changed %

  const isPriceIncreased = priceChange >= 0;

  return (
    <>
      <h5 style={descriptorStyle(isPriceIncreased)}>
        {isPriceIncreased ? '+$' : '-$'}
        {Math.abs(priceChange).toFixed(4)}s
      </h5>

      <h5>{format(prevPriceTime, 'MMM dd yyyy hh:mm a')}</h5>
    </>
  );
};

PrevPriceDescriptor.propTypes = {
  curPrice: PropTypes.number,
  prevPrice: PropTypes.number,
  prevPriceTime: PropTypes.instanceOf(Date),
};

export default PrevPriceDescriptor;
