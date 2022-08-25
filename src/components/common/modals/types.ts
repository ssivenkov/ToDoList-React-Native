import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SetStateType } from '@root/types/common/types';

export type ModalIconPropsType = {
  buttonIcon: JSX.Element;
  okHandler: (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => void;

  children?: JSX.Element;
  description?: string;
  okDisable?: boolean;
  closeHandler?: () => void;
  modalVisibleFromProps?: boolean;
  setModalVisibleFromProps?: SetStateType<boolean>;
};

export type ModalLongButtonPropsType = {
  buttonTitle: string;
  buttonIcon: IconProp;

  children?: JSX.Element;
  description?: string;
  okHandler?: () => void;
  rightComponent?: JSX.Element;
  closeHandler?: () => void;
  disable?: boolean;
};
