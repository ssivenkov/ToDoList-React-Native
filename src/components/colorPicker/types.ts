import { ColorType } from '@store/reducers/userReducer/types';

export type ColorPickerComponentPropsType = {
  setSelectedColor: (color: ColorType) => void;

  color?: ColorType;
  marginRight?: number;
  marginTop?: number;
};
