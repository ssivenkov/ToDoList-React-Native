import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {CustomBigButton} from '@components/common/buttons/CustomBigButton';
import {CustomInput} from '@components/common/input/CustomInput';
import {useFormik} from 'formik';
import React from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import * as yup from 'yup';
import {styles} from './styles';
import {SignInValueType} from './types';

export const SignInScreen = (): ReturnComponentType => {
  const {t} = useTranslation();
  const minPasswordLength = 6;

  const onSubmit = (values: SignInValueType) => {
    //NOTE: temp const
    return values;
  };

  const minPasswordLengthErrorTextElement = (
    min: number,
  ): ReturnComponentType => {
    return (
      <Trans i18nKey="MinPasswordLengthError">
        <Text key={uuidv4()}>{{text: min}}</Text>
      </Trans>
    );
  };

  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(`${t('ValidEmailError')}`)
      .required(`${t('EmailRequiredError')}`),
    password: yup
      .string()
      .min(minPasswordLength, ({min}) => minPasswordLengthErrorTextElement(min))
      .required(`${t('PasswordRequireError')}`),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('SignIn')}</Text>
      <>
        <View style={styles.inputContainer}>
          <CustomInput
            onValueChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            placeholder={`${t('Email')}`}
            keyboardType="email-address"
          />
          <View style={styles.errorContainer}>
            {formik.errors.email && formik.touched.email && (
              <Text style={styles.error}>{formik.errors.email}</Text>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            onValueChange={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            placeholder={`${t('Password')}`}
            secureTextEntry={true}
          />
          <View style={styles.errorContainer}>
            {formik.errors.password && formik.touched.password && (
              <Text style={styles.error}>{formik.errors.password}</Text>
            )}
          </View>
        </View>
        <View style={styles.bigButtonContainer}>
          <CustomBigButton
            onPress={formik.handleSubmit}
            title={`${t('SignInWithGoogle')}`}
            touched={[!!formik.touched.email, !!formik.touched.password]}
            errors={[formik.errors.email, formik.errors.password]}
          />
        </View>
      </>
    </View>
  );
};
