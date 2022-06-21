import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SetStateType } from '@root/types/common/types';

export type ModalIconPropsType = {
  buttonIcon: Element;
  okHandler: (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => void;

  children?: Element;
  description?: string;
  okDisable?: boolean;
  closeHandler?: () => void;
  modalVisibleFromProps?: boolean;
  setModalVisibleFromProps?: SetStateType<boolean>;
};

export type ModalLongButtonPropsType = {
  buttonTitle: string;
  buttonIcon: IconProp;

  children?: Element;
  description?: string;
  okHandler?: () => void;
  rightComponent?: Element;
  closeHandler?: () => void;
  disable?: boolean;
};
