import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type LongButtonPropsType = {
  icon: IconProp | string;
  onPress: () => void;
  title: string;

  disabled?: boolean;
  errors?: Array<string | undefined>;
  iconMarginLeft?: number;
  rightComponent?: JSX.Element;
  touched?: boolean[];
};
