import {UserScreen} from '@components/screens/accountScreen/UserScreen/UserScreen';
import {useFacebook} from '@root/hooks/useFacebook';
import {useGoogle} from '@root/hooks/useGoogle';
import React from 'react';
import {Text} from 'react-native';

export const AccountScreen = () => {
  const {googleSignOut, googleUserData} = useGoogle();
  const {facebookSignOut, facebookUserData} = useFacebook();

  if (googleUserData) {
    return (
      <UserScreen userData={googleUserData} signOutCallback={googleSignOut} />
    );
  }

  if (facebookUserData) {
    return (
      <UserScreen
        userData={facebookUserData}
        signOutCallback={facebookSignOut}
      />
    );
  }

  return <Text>Loading...</Text>;
};
