import {CustomTextButtonPropsType} from 'components/common/buttons/type';
import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const CustomBigButton: FC<CustomTextButtonPropsType> = (props) => {
  const {title, onPress, touched, errors} = props;
  const hasErrors = errors?.some((error) => error);
  const hasTouched = touched?.some((input) => input);
  const disabled = hasErrors || !hasTouched;
  const buttonStyles = [styles.bigButton, disabled ? styles.disable : {}];

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={buttonStyles}>
        <Text style={styles.bigText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
