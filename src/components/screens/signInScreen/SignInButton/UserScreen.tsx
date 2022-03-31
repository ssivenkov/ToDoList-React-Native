import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {UserScreenPropsType} from '@components/screens/signInScreen/SignInButton/types';
import {styles} from '@components/screens/signInScreen/styles';
import React from 'react';
import {Image, Text, View} from 'react-native';

export const UserScreen = (props: UserScreenPropsType) => {
  const {userData, signOutCallback} = props;
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>{userData.displayName}</Text>
      {userData.photoURL && (
        <Image source={{uri: userData.photoURL}} style={styles.avatar} />
      )}
      <CustomTextButton
        title={'Sign out'}
        onPress={signOutCallback}
        disable={!userData}
      />
    </View>
  );
};
