import {SetStateType} from '@root/types/common/types';
import {ViewStyle} from 'react-native';

export type ModalTextPropsType = {
  buttonTitle: string;

  buttonContainerStyle?: ViewStyle;
  children?: any;
  description?: string;
  okHandler?: () => void;
  disable?: boolean;
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
};
