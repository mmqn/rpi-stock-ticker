export const getGainsLossColor = isPriceIncreased =>
  isPriceIncreased ? '#00ff9f' : '#ff3000';

export const descriptorStyle = isPriceIncreased => ({
  paddingTop: '10px',
  marginTop: '10px',
  borderTop: '1px solid #ffffff',
  color: getGainsLossColor(isPriceIncreased),
});
