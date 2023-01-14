import { ColorType } from '@store/reducers/userReducer/types';

export type ColorPickerComponentPropsType = {
  setSelectedColor: (color: ColorType) => void;
  gapSize: number;

  color?: ColorType;
  marginTop?: number;
};
