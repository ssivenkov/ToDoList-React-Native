import { ReactNode } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SetStateType } from '@root/types/common/types';
import { StyleProp, TextStyle } from 'react-native';

export type IconWithScreenBlockingPropsType = {
  buttonIcon: JSX.Element;
  onPress: (setScreenBlocking: SetStateType<boolean>) => void;
};

export type ModalIconPropsType = {
  buttonIcon: JSX.Element;
  okHandler: (
    setIsLoading: SetStateType<boolean>,
    setModalVisible: SetStateType<boolean>,
  ) => void;

  buttonIconDisabled?: boolean;
  children?: JSX.Element;
  closeHandler?: () => void;
  contentPaddingHorizontal?: number;
  description?: string;
  hasContentPaddingBottom?: boolean;
  inputFocus?: () => void;
  modalVisibleFromProps?: boolean;
  okDisabled?: boolean;
  okText?: string;
  setModalVisibleFromProps?: SetStateType<boolean>;
};

export type ModalLongButtonPropsType = {
  buttonIcon: IconProp;
  buttonTitle: string;

  children?: JSX.Element | ReactNode;
  closeHandler?: () => void;
  contentPaddingHorizontal?: number;
  description?: string;
  descriptionTextStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  hasContentPaddingBottom?: boolean;
  okHandler?: () => void;
  okText?: string;
  okTextStyle?: StyleProp<TextStyle>;
  rightComponent?: JSX.Element;
};
