import React from 'react';

import { COLORS } from '@colors/colors';
import { Text, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import { styles } from './styles';
import { SwitcherPropsType } from './types';

export const Switcher = (props: SwitcherPropsType) => {
  const {
    isOn,
    size,
    switcherText,
    onToggleSwitcherClick,
    containerStyle,
    textStyle,
    textMargin,
  } = props;

  const toggle = (isOn: boolean) => {
    if (onToggleSwitcherClick) {
      onToggleSwitcherClick(isOn);
    }
  };

  return (
    <View style={[styles.contentDefaultContainer, containerStyle]}>
      {switcherText && (
        <Text style={[{ marginBottom: textMargin }, textStyle]}>{switcherText}</Text>
      )}
      <ToggleSwitch
        animationSpeed={250}
        isOn={isOn}
        offColor={COLORS.SILVER_CHALICE2}
        onColor={COLORS.JAPANESE_LAUREL}
        onToggle={(isOn) => toggle(isOn)}
        size={size}
      />
    </View>
  );
};
