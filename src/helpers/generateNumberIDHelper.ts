import {customAlphabet} from 'nanoid';

export const generateNumberIDHelper = (length: number): string => {
  const nanoid = customAlphabet('1234567890', length);

  return nanoid();
};
