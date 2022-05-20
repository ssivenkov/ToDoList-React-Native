import {COLORS} from '@colors/colors';
import {styles} from '@components/common/notification/styles';
import {NotificationPropsType} from '@components/common/notification/types';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, Animated, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ToggleSwitch from 'toggle-switch-react-native';

export const Notification = (props: NotificationPropsType) => {
  const {isSwitcherOn, onToggleSwitcherClick, date, setDate} = props;

  const {t} = useTranslation();

  const datePickerHeight = Platform.OS === 'ios' ? 210 : 190;
  const datePickerDate = date ? new Date(date) : new Date();

  const heightAnimation = useRef(
    new Animated.Value(isSwitcherOn ? datePickerHeight : 0),
  ).current;

  const datePickerAnimation = (isOn: boolean, value: number) => {
    onToggleSwitcherClick(isOn);
    Animated.timing(heightAnimation, {
      toValue: value,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const switching = (isOn: boolean) => {
    isOn
      ? datePickerAnimation(isOn, datePickerHeight)
      : datePickerAnimation(isOn, 0);
  };

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.switchNotificationContainer}>
        <Text style={styles.text}>{t('tasksScreen.EnableNotification')}</Text>
        <ToggleSwitch
          isOn={isSwitcherOn}
          onColor={COLORS.JAPANESE_LAUREL}
          offColor={COLORS.SILVER_CHALICE}
          size="medium"
          onToggle={(isOn) => switching(isOn)}
          animationSpeed={250}
        />
      </View>
      <Animated.View style={{height: heightAnimation}}>
        <DatePicker date={datePickerDate} onDateChange={setDate} />
      </Animated.View>
    </View>
  );
};
