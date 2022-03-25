import {COLORS} from '@colors/colors';
import {ReturnComponentType} from '@commonTypes/returnComponentType';
import {CreateTaskListButton} from '@components/buttons/createTaskListButton/CreateTaskListButton';
import {SignInScreen} from '@components/screens/signInScreen/SignInScreen';
import {iconSizeMedium} from '@constants/constants';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TasksNavigation} from '@navigation/tasksNavigation/TasksNavigation';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {styles} from './styles';

const RootTab = createBottomTabNavigator();

export const Navigation = (): ReturnComponentType => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [userData, setUserData] = useState();
  const {t} = useTranslation();

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  /*const onGooglePress = async () => {
    const userData = await onGoogleButtonPress();
    setUserData(userData);
  };*/

  function onAuthStateChanged(user: any) {
    setUserData(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '39222740250-rco3iuni391tlvdtj9vm857nsmp6t5db.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  if (!userData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title={'Google Sign in'} onPress={onGoogleButtonPress} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootTab.Navigator
          initialRouteName={`${t('tasksInScreen.Tasks')}`}
          screenOptions={() => ({
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitleStyle,
            tabBarStyle: styles.tabBarContainer,
            tabBarActiveBackgroundColor: COLORS.FRESH_EGGPLANT,
            tabBarActiveTintColor: COLORS.WHITE,
            tabBarInactiveTintColor: COLORS.BLACK,
            tabBarIconStyle: styles.icon,
            tabBarLabelStyle: styles.title,
          })}>
          <RootTab.Screen
            name={`${t('tasksInScreen.Tasks')}`}
            component={TasksNavigation}
            options={() => ({
              headerRight: () => {
                return (
                  <View style={styles.buttonContainer}>
                    <CreateTaskListButton />
                  </View>
                );
              },
              tabBarIcon: ({focused}) => (
                <FontAwesomeIcon
                  style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
                  icon={faFile}
                  size={iconSizeMedium}
                />
              ),
            })}
          />
          <RootTab.Screen
            name={`${t('signInScreen.SignIn')}`}
            component={SignInScreen}
            options={() => ({
              tabBarIcon: ({focused}) => (
                <FontAwesomeIcon
                  style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
                  icon={faUser}
                  size={iconSizeMedium}
                />
              ),
            })}
          />
        </RootTab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
