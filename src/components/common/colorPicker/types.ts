import {SetStateType} from '@root/types/common/types';
import {AccentColorType} from '@store/reducers/userReducer/types';

export type ColorPickerComponentPropsType = {
  selectAccentColor: SetStateType<AccentColorType>;
};
