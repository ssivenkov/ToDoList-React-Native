import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {CustomBigButton} from '@components/common/buttons/CustomBigButton';
import {CustomInput} from '@components/common/input/CustomInput';
import {useFormik} from 'formik';
import React from 'react';
import {Text, View} from 'react-native';
import * as yup from 'yup';
import {styles} from './styles';
import {SignInValueType} from './types';

export const SignInScreen = (): ReturnComponentType => {
  const minPasswordLength = 6;

  const onSubmit = (values: SignInValueType) => {
    //NOTE: temp const
    return values;
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
      <Text style={styles.title}>Sign in</Text>
      <>
        <View style={styles.inputContainer}>
          <CustomInput
            onValueChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            placeholder={'Email'}
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
            placeholder={'Password'}
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
            title={`Sign in with Google`}
            touched={[!!formik.touched.email, !!formik.touched.password]}
            errors={[formik.errors.email, formik.errors.password]}
          />
        </View>
      </>
    </View>
  );
};
