export type CustomTextButtonPropsType = {
  title: string;
  onPress: () => void;

  touched?: Array<boolean>;
  errors?: Array<string | undefined>;
};

export type CustomIconButtonPropsType = {
  icon: JSX.Element;

  onPress?: () => void;
};
