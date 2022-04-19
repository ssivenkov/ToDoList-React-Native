import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {styles} from '@components/screens/accountScreen/styles';
import {signOut} from '@store/actions/authSagaActions/authSagaActions';
import {UserDataType} from '@store/reducers/authReducer/types';
import {getUserData} from '@store/selectors/authSelectors';
import {AppRootStateType} from '@store/store';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const userData = useSelector<AppRootStateType, UserDataType>(getUserData);
  const [waitingSignOut, setWaitingSignOut] = useState<boolean>(false);

  const onSignOutPress = (): void => {
    setWaitingSignOut(true);
    dispatch(signOut());
  };

  console.log(userData);

  if (userData) {
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
            title={t('signInScreen.SignOut')}
            onPress={onSignOutPress}
            disable={waitingSignOut}
          />
        </View>
      </View>
    );
  }

  return <Text>User data not found</Text>;
};
