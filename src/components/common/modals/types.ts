import {Nullable, SetStateType} from '@root/types/common/types';

export type ModalTextPropsType = {
  buttonTitle: string;

  children?: any;
  description?: string;
  okHandler?: () => void;
};

export type ModalIconPropsType = {
  buttonIcon: JSX.Element;
  okHandler: (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => void;

  children?: any;
  description?: string;
  okDisable?: boolean;
  closeHandler?: () => void;
  hasNotification?: boolean;
  isOn: boolean;
  onToggleSwitcherClick?: (isOn: boolean) => void;
  date?: Date;
  setDate?: SetStateType<Nullable<Date>> | SetStateType<Date>;
};
