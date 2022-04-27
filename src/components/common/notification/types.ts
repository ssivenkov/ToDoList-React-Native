import {SetStateType} from '@root/types/common/types';

export type NotificationPropsType = {
  isOn: boolean;
  toggleSwitcher: (isOn: boolean) => void;
  date: Date | null;
  setDate: SetStateType<Date | null> | SetStateType<Date>;
};
