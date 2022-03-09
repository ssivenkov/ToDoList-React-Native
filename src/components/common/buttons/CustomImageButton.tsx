import React, {FC} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {CustomImageButtonPropsType} from 'components/common/buttons/Type';
import {styles} from './Styles';

export const CustomImageButton: FC<CustomImageButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {image, bigImage, onPress} = props;
  const iconButtonStyle = bigImage ? styles.bigImage : styles.smallImage;

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={iconButtonStyle} />
    </TouchableOpacity>
  );
};
