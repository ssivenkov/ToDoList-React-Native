import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type LongButtonPropsType = {
  title: string;
  onPress: () => void;
  icon: IconProp | string;

  iconMarginLeft?: number;
  rightComponent?: JSX.Element;
  touched?: boolean[];
  errors?: Array<string | undefined>;
  disabled?: boolean;
};
