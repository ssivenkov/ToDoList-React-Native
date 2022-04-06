import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';
import {UserScreenPropsType} from './types';

export const UserScreen = (props: UserScreenPropsType) => {
  const {userData, signOutCallback} = props;

  return (
    <View style={styles.screenContainer}>
      {userData.photoURL && (
        <Image source={{uri: userData.photoURL}} style={styles.avatar} />
      )}
      {userData.displayName && (
        <Text style={styles.name}>{userData.displayName}</Text>
      )}
      {userData.email && <Text style={styles.text}>{userData.email}</Text>}
      {userData.phoneNumber && (
        <Text style={styles.text}>{userData.phoneNumber}</Text>
      )}
      <View style={styles.buttonContainer}>
        <CustomTextButton
          title={'Sign out'}
          onPress={signOutCallback}
          disable={!userData}
        />
      </View>
    </View>
  );
};
