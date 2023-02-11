import { Nullable, SetStateType } from '@root/types/common/types';

export type NotificationPropsType = {
  date: Nullable<Date>;
  isSwitcherOn: boolean;
  onToggleSwitcherClick: (isOn: boolean) => void;
  setDate: SetStateType<Nullable<Date>> | SetStateType<Date>;
};
