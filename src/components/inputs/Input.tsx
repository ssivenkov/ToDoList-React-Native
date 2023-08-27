import React from 'react';

import { COLORS } from '@colors/colors';
import { IconButton } from '@components/buttons/iconButton/IconButton';
import {
  ICON_SIZE_EXTRA_SMALL2,
  infinity,
  INPUT_MAX_LENGTH100,
} from '@constants/constants';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useStyles } from '@hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { Text, TextInput, View, StyleSheet } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { useSelector } from 'react-redux';

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
    additionalTextAndClearButtonColor,
  } = props;

  const styles = useStyles(inputStyles);

  const theme = useSelector(themeSelector);

  const reassignColorCondition = !!additionalTextAndClearButtonColor;

  const reassignedColorStyles = StyleSheet.create({
    reassignedTextColor: {
      color: additionalTextAndClearButtonColor,
    },
  });

  const CLEAR_BUTTON_PADDING = 10.5;

  const subtextElement = () => {
    if (errorSubtext) return <Text style={styles.errorSubtext}>{errorSubtext}</Text>;

    if (subtext)
      return (
        <Text
          style={[
            styles.subtext,
            reassignColorCondition && reassignedColorStyles.reassignedTextColor,
          ]}
        >
          {subtext}
        </Text>
      );

    if (displayEmptySubtext) return <Text style={styles.transparentSubtext}> </Text>;

    return null;
  };

  return (
    <View>
      {suptext && (
        <View style={styles.inputTopContainer}>
          <Text
            style={[
              styles.suptext,
              reassignColorCondition && reassignedColorStyles.reassignedTextColor,
            ]}
          >
            {suptext}
          </Text>
          <IconButton
            icon={
              <FontAwesomeIcon
                color={additionalTextAndClearButtonColor ?? theme.TEXT_COLOR}
                icon={faTimes}
                size={ICON_SIZE_EXTRA_SMALL2}
              />
            }
            onPress={() => onChangeText && onChangeText('')}
            padding={CLEAR_BUTTON_PADDING}
          />
        </View>
      )}
      {maxLength === infinity ? (
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
