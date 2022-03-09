import {ImageSourcePropType} from 'react-native';

export type CustomImageButtonPropsType = {
  image: ImageSourcePropType;

  bigImage?: boolean;
  onPress?: () => void;
};

export type CustomTextButtonPropsType = {
  title: string;

  onPress?: () => void;
};
