import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SetStateType } from '@root/types/common/types';

export type ModalIconPropsType = {
  buttonIcon: JSX.Element;
  okHandler: (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => void;

  buttonIconDisabled?: boolean;
  children?: JSX.Element;
  closeHandler?: () => void;
  description?: string;
  inputFocus?: () => void;
  modalVisibleFromProps?: boolean;
  okDisabled?: boolean;
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
  disabled?: boolean;
  hasContentBottomPadding?: boolean;
};
