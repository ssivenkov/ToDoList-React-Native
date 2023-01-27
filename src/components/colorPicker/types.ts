import { ColorType } from '@store/reducers/userReducer/types';

export type ColorPickerComponentPropsType = {
  gapSize: number;
  setSelectedColor: (color: ColorType) => void;

  color?: ColorType;
};
