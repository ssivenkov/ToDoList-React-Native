import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {SetStateType} from '@root/types/common/types';

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
  modalVisibleFromProps?: boolean;
  setModalVisibleFromProps?: SetStateType<boolean>;
};

export type ModalLongButtonPropsType = {
  buttonTitle: string;
  buttonIcon: IconProp;

  children?: any;
  description?: string;
  okHandler?: (arg?: any) => void;
  rightComponent?: Element;
  closeHandler?: (arg?: any) => void;
  disable?: boolean;
};
