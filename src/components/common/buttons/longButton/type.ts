import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type LongButtonPropsType = {
  title: string;
  onPress: () => void;
  icon: IconProp;

  rightComponent?: JSX.Element;
  touched?: Array<boolean>;
  errors?: Array<string | undefined>;
  disable?: boolean;
};
