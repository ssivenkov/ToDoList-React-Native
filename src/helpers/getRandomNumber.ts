type GetRandomNumberLengthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const getRandomNumber = (length: GetRandomNumberLengthType): number => {
  return Number(
    Math.random()
      .toString()
      .slice(2, length + 2),
  );
};
