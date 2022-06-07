import {IconProp} from '@fortawesome/fontawesome-svg-core';

export type CustomLongButtonPropsType = {
  title: string;
  onPress: (arg?: any) => void;
  icon: IconProp;

  rightComponent?: Element;
  touched?: Array<boolean>;
  errors?: Array<string | undefined>;
  disable?: boolean;
};
