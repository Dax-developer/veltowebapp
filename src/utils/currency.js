// Currency formatting utility

export const formatCurrency = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatCurrencySimple = (price) => {
  return `₹${Math.round(price).toLocaleString('en-IN')}`;
};
