import React from 'react';

import { COLORS } from '@colors/colors';
import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { useStyles } from '@hooks/useStyles';
import {
  Platform,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import { textButtonStyles } from './styles';
import { TextButtonPropsType } from './type';

export const TextButton = (props: TextButtonPropsType) => {
  const { title, containerStyle, onPress, disabled } = props;

  const style = useStyles(textButtonStyles);

  const TextButtonStyle = [style.button, disabled && commonButtonStyles.disabled];

  return (
    <View style={containerStyle && containerStyle}>
      {Platform.OS === 'android' ? (
        <View style={style.touchableNativeFeedbackWrapper}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              COLORS.MEDIUM_LIGHT_TRANSPARENCY,
              false,
            )}
            disabled={disabled}
            onPress={onPress}
          >
            <View style={TextButtonStyle}>
              <Text style={style.text}>{title}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={TextButtonStyle}>
          <Text style={style.text}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
