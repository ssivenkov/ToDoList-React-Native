import React from 'react';

import { COLORS } from '@colors/colors';
import { infinity, INPUT_MAX_LENGTH100 } from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { Text, TextInput, View } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import { inputStyles } from './styles';
import { InputPropsType } from './types';

export const Input = (props: InputPropsType) => {
  const {
    value,
    onChangeText,
    onBlur,
    placeholder,
    subtext,
    suptext,
    errorSubtext,
    displayEmptySubtext = false,
    maxLength = INPUT_MAX_LENGTH100,
    inputRef,
  } = props;

  const styles = useStyles(inputStyles);

  const subtextElement = () => {
    if (errorSubtext) return <Text style={styles.errorSubtext}>{errorSubtext}</Text>;
    if (subtext) return <Text style={styles.subtext}>{subtext}</Text>;
    if (displayEmptySubtext) return <Text style={styles.transparentSubtext}> </Text>;

    return null;
  };

  return (
    <View>
      {suptext && <Text style={styles.suptext}>{suptext}</Text>}
      {maxLength === infinity ? (
        <View style={styles.inputContainer}>
          <AutoGrowingTextInput
            onBlur={onBlur}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.SILVER_CHALICE2}
            ref={inputRef}
            style={styles.input}
            value={value}
          />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            maxLength={maxLength}
            onBlur={onBlur}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.SILVER_CHALICE2}
            ref={inputRef}
            style={styles.input}
            value={value}
          />
        </View>
      )}
      {subtextElement()}
    </View>
  );
};
