import {Nullable, SetStateType} from '@root/types/common/types';

export type NotificationPropsType = {
  isOn: boolean;
  toggleSwitcher: (isOn: boolean) => void;
  date: Nullable<Date>;
  setDate: SetStateType<Nullable<Date>> | SetStateType<Date>;
};
