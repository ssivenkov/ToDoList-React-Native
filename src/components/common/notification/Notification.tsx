import {styles} from '@components/common/notification/styles';
import {NotificationPropsType} from '@components/common/notification/types';
import {Switcher} from '@components/common/switcher/Switcher';
import {errorAlert} from '@root/helpers/alertHelper';
import {requestIOSNotificationsPermissionHelper} from '@root/helpers/requestIOSNotificationsPermissionHelper';
import {themeSelector} from '@store/selectors/userSelectors';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, Platform, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';

export const Notification = (props: NotificationPropsType) => {
  const {isSwitcherOn, onToggleSwitcherClick, date, setDate} = props;

  const {t} = useTranslation();

  const theme = useSelector(themeSelector);

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
    requestIOSNotificationsPermissionHelper().then((hasPermission) => {
      if (!hasPermission) {
        errorAlert(t('common.NoIOSNotificationsPermission'));

        return;
      }

      isOn
        ? datePickerAnimation(isOn, datePickerHeight)
        : datePickerAnimation(isOn, 0);
    });
  };

  return (
    <View style={styles().notificationContainer}>
      <Switcher
        isOn={isSwitcherOn}
        size={'medium'}
        switcherText={t('tasksScreen.EnableNotification')}
        onToggleSwitcherClick={switching}
        containerStyle={styles().switcherContainer}
        textStyle={styles(theme).text}
        textMargin={1}
      />
      <Animated.View style={{height: heightAnimation}}>
        <DatePicker
          date={datePickerDate}
          onDateChange={setDate}
          textColor={theme.TEXT_COLOR}
        />
      </Animated.View>
    </View>
  );
};
