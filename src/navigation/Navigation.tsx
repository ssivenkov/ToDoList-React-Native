import {SignInScreen} from '@components/screens/signInScreen/SignInScreen';
import {WithAuthNavigation} from '@navigation/withAuthNavigation/WithAuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRootStateType} from '@store/store';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const RootNavigator = createNativeStackNavigator();

export const Navigation = () => {
  const isAuth = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.authStatus,
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator.Navigator>
          {isAuth ? (
            <RootNavigator.Screen
              name="WithAuth"
              component={WithAuthNavigation}
              options={{headerShown: false}}
            />
          ) : (
            <RootNavigator.Screen
              name="SignIn"
              component={SignInScreen}
              options={{headerShown: false}}
            />
          )}
        </RootNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
