import { ReactNode } from 'react';

export type MenuHorizontalPropsType = {
  buttons: JSX.Element;
  children: JSX.Element | ReactNode;
  isMenuHorizontalVisible: boolean;
  menuButtonIcon: JSX.Element;
  onMenuButtonPress: () => void;
};
