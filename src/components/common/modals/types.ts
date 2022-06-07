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
};

export type ModalLongButtonPropsType = {
  buttonTitle: string;
  buttonIcon: IconProp;

  children?: any;
  description?: string;
  okHandler?: (arg?: any) => void;
  rightComponent?: Element;
  disable?: boolean;
};
