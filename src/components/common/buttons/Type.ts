import {FontawesomeObject} from '@fortawesome/fontawesome-svg-core';

export type CustomTextButtonPropsType = {
  title: string;

  onPress?: () => void;
};

export type CustomIconButtonPropsType = {
  icon: FontawesomeObject;

  onPress?: () => void;
};
