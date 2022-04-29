import {COLORS} from '@colors/colors';
import {CreateTaskListButton} from '@components/buttons/createTaskListButton/CreateTaskListButton';
import {AccountScreen} from '@components/screens/accountScreen/AccountScreen';
import {Account, iconSizeMedium, Tasks} from '@constants/constants';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TasksNavigation} from '@navigation/tasksNavigation/TasksNavigation';
import {BottomTabParamList} from '@navigation/withAuthNavigation/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {syncUserTaskListsAction} from '@store/actions/authSagaActions/syncUserTaskListsAction';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigation = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(syncUserTaskListsAction());
  }, []);

  return (
    <Navigator
      initialRouteName={Tasks}
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: styles.tabBarContainer,
        tabBarActiveBackgroundColor: COLORS.FRESH_EGGPLANT,
        tabBarActiveTintColor: COLORS.WHITE,
        tabBarInactiveTintColor: COLORS.BLACK,
        tabBarIconStyle: styles.icon,
        tabBarLabelStyle: styles.title,
      })}>
      <Screen
        name={Tasks}
        component={TasksNavigation}
        options={() => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitle: `${t('tasksScreen.Tasks')}`,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarLabel: `${t('tasksScreen.Tasks')}`,
          headerRight: () => (
            <View style={styles.buttonContainer}>
              <CreateTaskListButton />
            </View>
          ),
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faFile}
              size={iconSizeMedium}
            />
          ),
        })}
      />
      <Screen
        name={Account}
        component={AccountScreen}
        options={() => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitle: `${t('accountScreen.Account')}`,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarLabel: `${t('accountScreen.Account')}`,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faUser}
              size={iconSizeMedium}
            />
          ),
        })}
      />
    </Navigator>
  );
};
