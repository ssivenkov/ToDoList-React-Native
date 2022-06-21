import { SetStateType } from '@root/types/common/types';
import { ColorType } from '@store/reducers/userReducer/types';

export type ColorPickerComponentPropsType = {
  color: ColorType;
  selectColor: SetStateType<ColorType>;

  marginTop?: number;
  marginRight?: number;
};
