import {COLORS} from '@colors/colors';
import {styles} from '@components/common/switcher/styles';
import {SwitcherPropsType} from '@components/common/switcher/types';
import React from 'react';
import {Text, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

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
    onToggleSwitcherClick && onToggleSwitcherClick(isOn);
  };

  return (
    <View style={[styles.contentDefaultContainer, containerStyle]}>
      {switcherText && (
        <Text style={[{marginBottom: textMargin}, textStyle]}>
          {switcherText}
        </Text>
      )}
      <ToggleSwitch
        isOn={isOn}
        onColor={COLORS.JAPANESE_LAUREL}
        offColor={COLORS.SILVER_CHALICE1}
        size={size}
        onToggle={(isOn) => toggle(isOn)}
        animationSpeed={250}
      />
    </View>
  );
};
