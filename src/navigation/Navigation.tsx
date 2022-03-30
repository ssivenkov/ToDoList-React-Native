import {COLORS} from '@colors/colors';
import {CreateTaskListButton} from '@components/buttons/createTaskListButton/CreateTaskListButton';
import {SignInScreen} from '@components/screens/signInScreen';
import {iconSizeMedium} from '@constants/constants';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TasksNavigation} from '@navigation/tasksNavigation/TasksNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {styles} from './styles';

const RootTab = createBottomTabNavigator();

export const Navigation = () => {
  const {t} = useTranslation();

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
