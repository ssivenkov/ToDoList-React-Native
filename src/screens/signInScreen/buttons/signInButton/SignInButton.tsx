import React from 'react';

import { ICON_SIZE_MEDIUM } from '@constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Trans } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';

import { signInButtonStyles } from './styles';
import { SignInButtonPropsType } from './types';

export const SignInButton = (props: SignInButtonPropsType) => {
  const { colorStyle, serviceTitle, icon, onPress, disabled } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        signInButtonStyles.button,
        disabled ? signInButtonStyles.disabled : colorStyle,
      ]}
    >
      <FontAwesomeIcon
        icon={icon}
        size={ICON_SIZE_MEDIUM}
        style={signInButtonStyles.icon}
      />
      <Text style={signInButtonStyles.text}>
        <Trans i18nKey='signInScreen.SignInWith'>
          <Text>{{ text: serviceTitle }}</Text>
        </Trans>
      </Text>
    </TouchableOpacity>
  );
};