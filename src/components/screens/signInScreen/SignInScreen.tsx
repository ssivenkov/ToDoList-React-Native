import {ReturnComponentType} from 'commonTypes/returnComponentType';
import {Formik} from 'formik';
import React from 'react';
import {Text, View} from 'react-native';
import * as yup from 'yup';
import {CustomBigButton} from '../../common/buttons/CustomBigButton';
import {CustomInput} from '../../common/input/CustomInput';
import {styles} from './styles';
import {SignInValueType} from './types';

export const SignInScreen = (): ReturnComponentType => {
  const minPasswordLength = 6;

  const onSubmit = (values: SignInValueType) => {
    const value = values;
  };

  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
    password: yup
      .string()
      .min(
        minPasswordLength,
        ({min}) => `Password must be at least ${min} characters`,
      )
      .required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={signInValidationSchema}
        onSubmit={(values) => onSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <CustomInput
                onValueChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={'Email'}
                keyboardType="email-address"
              />
              <View style={styles.errorContainer}>
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <CustomInput
                onValueChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder={'Password'}
                secureTextEntry
              />
              <View style={styles.errorContainer}>
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>
            </View>
            <View style={styles.bigButtonContainer}>
              <CustomBigButton
                onPress={handleSubmit}
                title={`Sign in with Google`}
                touched={[!!touched.email, !!touched.password]}
                errors={[errors.email, errors.password]}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
