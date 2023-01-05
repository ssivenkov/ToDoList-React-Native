import React from 'react';

import { COLORS } from '@colors/colors';
import { MAX_INPUT_LENGTH100 } from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { Text, TextInput, View } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import { inputStyles } from './styles';
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

  const styles = useStyles(inputStyles);

  return (
    <View>
      {suptext && <Text style={styles.suptext}>{suptext}</Text>}
      {autogrow ? (
        <View style={styles.inputContainer}>
          <AutoGrowingTextInput
            onBlur={onBlur}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.SILVER_CHALICE2}
            style={styles.input}
            value={value}
          />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            maxLength={MAX_INPUT_LENGTH100}
            onBlur={onBlur}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.SILVER_CHALICE2}
            style={styles.input}
            value={value}
          />
        </View>
      )}
      {errorSubtext ? (
        <Text style={styles.errorSubtext}>{errorSubtext}</Text>
      ) : subtext ? (
        <Text style={styles.subtext}>{subtext}</Text>
      ) : (
        <Text style={styles.transparentText}> </Text>
      )}
    </View>
  );
};
