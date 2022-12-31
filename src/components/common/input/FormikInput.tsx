import React from 'react';

import { COLORS } from '@colors/colors';
import { MAX_INPUT_LENGTH100 } from '@constants/constants';
import { useStyles } from '@root/hooks/useStyles';
import { Text, TextInput, View } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import { styles } from './styles';
import { FormikInputPropsType } from './types';

export const FormikInput = (props: FormikInputPropsType) => {
  const {
    value,
    onChangeText,
    onBlur,
    placeholder,
    subtext,
    suptext,
    errorSubtext,
    autogrow = false,
  } = props;

  const style = useStyles(styles);

  return (
    <View>
      {suptext && <Text style={style.suptext}>{suptext}</Text>}
      {autogrow ? (
        <View style={style.inputContainer}>
          <AutoGrowingTextInput
            onBlur={onBlur}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.SILVER_CHALICE2}
            style={style.input}
            value={value}
          />
        </View>
      ) : (
        <View style={style.inputContainer}>
          <TextInput
            maxLength={MAX_INPUT_LENGTH100}
            onBlur={onBlur}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.SILVER_CHALICE2}
            style={style.input}
            value={value}
          />
        </View>
      )}
      {errorSubtext ? (
        <Text style={style.errorSubtext}>{errorSubtext}</Text>
      ) : subtext ? (
        <Text style={style.subtext}>{subtext}</Text>
      ) : (
        <Text style={style.transparentText}> </Text>
      )}
    </View>
  );
};
