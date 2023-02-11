import React, { useLayoutEffect, useState } from 'react';

import { TextButton } from '@components/buttons/textButton/TextButton';
import { GoBackButton } from '@components/header/buttons/goBackButton/GoBackButton';
import { Header } from '@components/header/Header';
import { Input } from '@components/inputs/Input';
import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import { infinity } from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { useNavigation } from '@react-navigation/native';
import { emailField, messageField } from '@screens/contactTheAuthorScreen/fieldNames';
import { validate } from '@screens/contactTheAuthorScreen/validate';
import { contactTheAuthorAction } from '@store/actions/userSagaActions/contactTheAuthorAction';
import { userDataSelector } from '@store/selectors/userSelectors';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { contactTheAuthorScreenStyles } from './styles';

export const ContactTheAuthorScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const styles = useStyles(contactTheAuthorScreenStyles);

  const { t } = useTranslation();

  const userData = useSelector(userDataSelector);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const initialEmailValue = userData?.email ?? '';

  const navigate = () => {
    navigation.goBack();
  };

  const { handleChange, handleSubmit, values, setFieldTouched, errors, touched } =
    useFormik({
      initialValues: { [emailField]: initialEmailValue, [messageField]: '' },
      onSubmit: () => {
        setSubmitting(true);
      },
      validate: (values) => validate({ isFormValid, setIsFormValid, values }),
      validateOnBlur: true,
      validateOnChange: true,
    });

  useLayoutEffect(() => {
    if (submitting) {
      dispatch(contactTheAuthorAction({ navigate, setSubmitting, values }));
    }
  }, [submitting]);

  const buttonDisabledCondition = submitting || !isFormValid;

  return (
    <View>
      <Header
        leftButton={<GoBackButton />}
        title={t('contactTheAuthorScreen.HeaderTitle')}
      />
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.screenContainer}>
        {submitting && (
          <Modal transparent={true}>
            <PurpleLoader />
          </Modal>
        )}
        <View style={styles.inputsWrapper}>
          <View style={styles.inputWrapper}>
            <Input
              displayEmptySubtext={true}
              errorSubtext={
                errors[emailField] && touched[emailField] ? errors[emailField] : ''
              }
              onBlur={() => setFieldTouched(emailField, true)}
              onChangeText={handleChange(emailField)}
              subtext={t('contactTheAuthorScreen.EmailSubtext')}
              suptext={t('contactTheAuthorScreen.EmailSuptext')}
              value={values[emailField]}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Input
              displayEmptySubtext={true}
              errorSubtext={
                errors[messageField] && touched[messageField] ? errors[messageField] : ''
              }
              maxLength={infinity}
              onBlur={() => setFieldTouched(messageField, true)}
              onChangeText={handleChange(messageField)}
              suptext={t('contactTheAuthorScreen.MessageSuptext')}
              value={values[messageField]}
            />
          </View>
        </View>
        <TextButton
          containerStyle={styles.buttonContainer}
          disabled={buttonDisabledCondition}
          onPress={() => handleSubmit()}
          title={t('contactTheAuthorScreen.SendButtonTitle')}
        />
      </ScrollView>
    </View>
  );
};
