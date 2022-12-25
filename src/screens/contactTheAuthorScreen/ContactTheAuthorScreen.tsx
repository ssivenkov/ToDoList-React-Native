import React, { useState } from 'react';

import { CustomInput } from '@components/common/input/CustomInput';
import { useStyles } from '@root/hooks/useStyles';
import { styles } from '@root/screens/contactTheAuthorScreen/styles';
import { userDataSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export const ContactTheAuthorScreen = () => {
  const style = useStyles(styles);

  const { t } = useTranslation();

  const userData = useSelector(userDataSelector);

  const initialEmailValue = userData?.email ?? '';

  const [email, setEmail] = useState<string>(initialEmailValue);
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  return (
    <View style={style.screenContainer}>
      <View style={style.inputWrapper}>
        <CustomInput
          onValueChange={setSubject}
          placeholder={t('contactTheAuthorScreen.SubjectPlaceholder')}
          value={subject}
        />
      </View>
      <View style={style.inputWrapper}>
        <CustomInput
          onValueChange={setEmail}
          placeholder={t('contactTheAuthorScreen.EmailPlaceholder')}
          value={email}
        />
      </View>
      <View style={style.inputWrapper}>
        <CustomInput
          onValueChange={setMessage}
          placeholder={t('contactTheAuthorScreen.MessagePlaceholder')}
          value={message}
        />
      </View>
    </View>
  );
};
