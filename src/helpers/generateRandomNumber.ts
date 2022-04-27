import {customAlphabet} from 'nanoid';

export const generateRandomNumber = (length: number): number => {
  const nanoid = customAlphabet('1234567890', length);
  return Number(nanoid());
};
