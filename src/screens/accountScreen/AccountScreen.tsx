import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {Loader} from '@components/common/loader/loader';
import {styles} from '@root/screens/accountScreen/styles';
import {signOutAction} from '@store/actions/authSagaActions/signOutAction';
import {userDataSelector} from '@store/selectors/authSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const userData = useSelector(userDataSelector);
  const [waitingSignOut, setWaitingSignOut] = useState<boolean>(false);

  const onSignOutPress = (): void => {
    dispatch(signOutAction({setWaitingSignOut}));
  };

  if (userData && !waitingSignOut) {
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

  return <Loader />;
};
