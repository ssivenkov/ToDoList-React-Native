import React, { useRef } from 'react';

import { styles } from '@components/common/notification/styles';
import { NotificationPropsType } from '@components/common/notification/types';
import { Switcher } from '@components/common/switcher/Switcher';
import { errorAlert } from '@root/helpers/alertHelper';
import { requestIOSNotificationsPermissionHelper } from '@root/helpers/requestIOSNotificationsPermissionHelper';
import { useStyles } from '@root/hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { Animated, Platform, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';

export const Notification = (props: NotificationPropsType) => {
  const { isSwitcherOn, onToggleSwitcherClick, date, setDate } = props;

  const style = useStyles(styles);
  const { t } = useTranslation();
  const theme = useSelector(themeSelector);

  const iOSDatePickerHeight = 210;
  const androidDatePickerHeight = 170;
  const datePickerHeight =
    Platform.OS === 'ios' ? iOSDatePickerHeight : androidDatePickerHeight;
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
    requestIOSNotificationsPermissionHelper().then((hasPermission) => {
      if (!hasPermission) {
        return errorAlert(t('common.NoIOSNotificationsPermission'));
      }

      if (isOn) {
        datePickerAnimation(isOn, datePickerHeight);
      } else {
        datePickerAnimation(isOn, 0);
      }
    });
  };

  return (
    <View style={style.notificationContainer}>
      <Switcher
        containerStyle={style.switcherContainer}
        isOn={isSwitcherOn}
        onToggleSwitcherClick={switching}
        size='medium'
        switcherText={t('tasksScreen.EnableNotification')}
        textMargin={1}
        textStyle={style.text}
      />
      <Animated.View style={{ height: heightAnimation }}>
        <DatePicker
          androidVariant='nativeAndroid'
          date={datePickerDate}
          onDateChange={setDate}
          textColor={theme.TEXT_COLOR}
        />
      </Animated.View>
    </View>
  );
};
