import React, {FC} from 'react';
import {Button, View, Image} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {CustomButtonPropsType} from 'components/common/button/Type';
import {styles} from './Styles';

export const CustomButton: FC<CustomButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {children, bigImage, smallImage} = props;
  let jsx;
  if (typeof children === 'string') {
    jsx = <Button title={children} />;
  } else if (bigImage) {
    jsx = <Image source={children} style={styles.bigImage} />;
  } else if (smallImage)
    jsx = <Image source={children} style={styles.smallImage} />;

  return (
    <View
      style={
        typeof children === 'string' ? styles.text : styles.squareContainer
      }>
      {jsx}
    </View>
  );
};
