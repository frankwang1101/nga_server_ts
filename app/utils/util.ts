const random = (bit: number = 8) => {
  return Math.random()
    .toString(32)
    .substr(2, bit);
};

export const uuid = () => {
  return `${random(4)}-${random()}-${random()}-${Date.now()}`;
};
