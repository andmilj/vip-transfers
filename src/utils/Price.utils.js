export default {
  getReturnPrice(price) {
    const _price = parseInt(price, 10);
    return (_price - _price / 100 * 5);
  },
};
