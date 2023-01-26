import { ReactNode } from 'react';

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
  contentPaddingHorizontal?: number;
  description?: string;
  inputFocus?: () => void;
  modalVisibleFromProps?: boolean;
  okDisabled?: boolean;
  okText?: string;
  hasContentPaddingBottom?: boolean;
  setModalVisibleFromProps?: SetStateType<boolean>;
};

export type ModalLongButtonPropsType = {
  buttonIcon: IconProp;
  buttonTitle: string;

  children?: JSX.Element | ReactNode;
  closeHandler?: () => void;
  contentPaddingHorizontal?: number;
  description?: string;
  disabled?: boolean;
  hasContentPaddingBottom?: boolean;
  okHandler?: () => void;
  okText?: string;
  rightComponent?: JSX.Element;
};
