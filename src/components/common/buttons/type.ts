export type CustomTextButtonPropsType = {
  title: string;
  onPress: () => void;

  touched?: Array<boolean>;
  errors?: Array<string | undefined>;
  disable?: boolean;
};

export type CustomIconButtonPropsType = {
  icon: JSX.Element;

  onPress?: () => void;
  disable?: boolean;
};
