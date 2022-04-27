import {COLORS} from '@colors/colors';
import {styles} from '@components/common/notification/styles';
import {NotificationPropsType} from '@components/common/notification/types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ToggleSwitch from 'toggle-switch-react-native';

export const Notification = (props: NotificationPropsType) => {
  const {isOn, toggleSwitcher, date, setDate} = props;
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.notificationContainer}>
        <Text style={styles.text}>{t('tasksScreen.EnableNotification')}</Text>
        <ToggleSwitch
          isOn={isOn}
          onColor={COLORS.JAPANESE_LAUREL}
          offColor={COLORS.SILVER_CHALICE}
          size="medium"
          onToggle={(isOn) => toggleSwitcher(isOn)}
          animationSpeed={250}
        />
      </View>
      {isOn && date && (
        <View style={styles.dateTimePickerContainer}>
          <DatePicker date={new Date(date)} onDateChange={setDate} />
        </View>
      )}
    </>
  );
};
