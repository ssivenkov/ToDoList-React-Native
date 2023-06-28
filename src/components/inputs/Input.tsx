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
import { Text, TextInput, View } from 'react-native';
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
  } = props;

  const styles = useStyles(inputStyles);

  const theme = useSelector(themeSelector);

  const subtextElement = () => {
    if (errorSubtext) return <Text style={styles.errorSubtext}>{errorSubtext}</Text>;
    if (subtext) return <Text style={styles.subtext}>{subtext}</Text>;
    if (displayEmptySubtext) return <Text style={styles.transparentSubtext}> </Text>;

    return null;
  };

  return (
    <View>
      {suptext && (
        <View style={styles.inputTopContainer}>
          <Text style={styles.suptext}>{suptext}</Text>
          <View style={styles.clearButtonIconContainer}>
            <IconButton
              icon={
                <FontAwesomeIcon
                  color={theme.TEXT_COLOR}
                  icon={faTimes}
                  size={ICON_SIZE_EXTRA_SMALL2}
                />
              }
              onPress={() => onChangeText && onChangeText('')}
            />
          </View>
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
            autoFocus={!!inputRef}
            maxLength={maxLength}
            onBlur={onBlur}
            onChangeText={onChangeText}
            onLayout={() => {
              if (inputRef) {
                inputRef.current?.focus();
              }
            }}
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
