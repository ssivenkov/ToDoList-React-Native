import React, {FC} from 'react';
import {Button, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {CustomButtonPropsType} from 'types/components/customButton/CustomButtonType';
import {Styles} from './Styles';

export const CustomButton: FC<CustomButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {title} = props;

  return (
    <View style={Styles.container}>
      <Button title={title} />
    </View>
  );
};
