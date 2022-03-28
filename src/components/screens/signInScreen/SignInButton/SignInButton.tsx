import {iconSizeMedium} from '@constants/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text, TouchableOpacity} from 'react-native';
import {signInStyles} from './styles';
import {SignInButtonPropsType} from './types';

export const SignInButton = (props: SignInButtonPropsType) => {
  const {buttonColorStyle, serviceTitle, icon, onPress, disabled} = props;

  return (
    <TouchableOpacity
      style={[signInStyles.button, buttonColorStyle]}
      onPress={onPress}
      disabled={disabled}>
      <FontAwesomeIcon
        icon={icon}
        size={iconSizeMedium}
        style={signInStyles.icon}
      />
      <Text style={signInStyles.text}>
        <Trans i18nKey="signInScreen.SignInWith">
          <Text>{{text: serviceTitle}}</Text>
        </Trans>
      </Text>
    </TouchableOpacity>
  );
};
