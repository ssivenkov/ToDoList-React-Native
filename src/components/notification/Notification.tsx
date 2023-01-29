import React, { useLayoutEffect, useRef, useState } from 'react';

import { Switcher } from '@components/switcher/Switcher';
import {
  millisecondsInSecond,
  secondsInMinute,
  switcherMargin,
} from '@constants/constants';
import { BY, CN, EN, JP, KR, RU, UA } from '@constants/languages';
import { errorAlert } from '@helpers/alertHelper';
import {
  increaseDateYearsHelper,
  mathFloorDateFromMinuteHelper,
} from '@helpers/dateHelpers';
import { requestIOSNotificationsPermissionHelper } from '@helpers/requestIOSNotificationsPermissionHelper';
import { useStyles } from '@hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { Animated, Platform, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';

import { notificationStyles } from './styles';
import { NotificationPropsType } from './types';

export const Notification = (props: NotificationPropsType) => {
  const { isSwitcherOn, onToggleSwitcherClick, date, setDate } = props;

  const styles = useStyles(notificationStyles);

  const { i18n, t } = useTranslation();

  const theme = useSelector(themeSelector);

  let datePickerLanguage = i18n.language;

  const isBY = datePickerLanguage === BY;
  const isUA = datePickerLanguage === UA;
  const isCN = datePickerLanguage === CN;
  const isKR = datePickerLanguage === KR;
  const isJP = datePickerLanguage === JP;

  const iOSDatePickerHeight = 210;
  const androidDatePickerHeight = 170;
  const datePickerHeight =
    Platform.OS === 'ios' ? iOSDatePickerHeight : androidDatePickerHeight;

  const currentDate = new Date();
  const maximumDate = increaseDateYearsHelper({ addedYears: 2, date: currentDate });
  const trimmedCurrentDate = mathFloorDateFromMinuteHelper(currentDate);

  const initialDatePickerDate =
    date && date < currentDate ? new Date(date) : trimmedCurrentDate;

  const [minimumDate, setMinimumDate] = useState<Date>(currentDate);
  const [datePickerDate, setDatePickerDate] = useState<Date>(initialDatePickerDate);

  const dateChangeHandler = (date: Date) => {
    setDatePickerDate(date);
    setDate(date);
  };

  useLayoutEffect(() => {
    const currentDate = new Date();

    const currentSecond = currentDate.getSeconds();
    const currentMillisecond = currentDate.getMilliseconds();

    const secondsDiff = secondsInMinute - currentSecond;
    const millisecondsDiff = millisecondsInSecond - currentMillisecond;

    const updateValuesTimeout = setTimeout(() => {
      const newDate = new Date();
      const minDate = mathFloorDateFromMinuteHelper(newDate);

      if (datePickerDate < minDate) {
        setDatePickerDate(minDate);
      }

      setMinimumDate(minDate);
    }, +`${secondsDiff}${millisecondsDiff}`);

    return () => {
      clearTimeout(updateValuesTimeout);
    };
  }, [minimumDate, datePickerDate]);

  if (isBY || isUA) {
    datePickerLanguage = RU;
  }

  if (isCN || isKR || isJP) {
    datePickerLanguage = EN;
  }

  const heightAnimation = useRef(
    new Animated.Value(isSwitcherOn ? datePickerHeight : 0),
  ).current;

  const datePickerAnimation = (isOn: boolean, value: number) => {
    onToggleSwitcherClick(isOn);
    Animated.timing(heightAnimation, {
      duration: 250,
      toValue: value,
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
    <View style={styles.notificationContainer}>
      <Switcher
        containerStyle={styles.switcherContainer}
        isOn={isSwitcherOn}
        onToggleSwitcherClick={switching}
        size='medium'
        switcherMarginLeft={15}
        switcherMarginRight={switcherMargin}
        switcherText={t('tasksScreen.EnableNotification')}
        textMarginBottom={1}
        textStyle={styles.text}
      />
      <Animated.View style={[styles.datePickerContainer, { height: heightAnimation }]}>
        <DatePicker
          androidVariant='iosClone'
          date={datePickerDate}
          fadeToColor='none'
          locale={datePickerLanguage}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onDateChange={dateChangeHandler}
          textColor={theme.TEXT_COLOR}
        />
      </Animated.View>
    </View>
  );
};
