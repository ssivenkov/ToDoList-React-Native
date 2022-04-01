import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';
import {UserScreenPropsType} from './types';

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
