import {COLORS} from '@colors/colors';
import {CreateTaskListButton} from '@components/buttons/createTaskListButton/CreateTaskListButton';
import {AccountScreen} from '@components/screens/accountScreen/AccountScreen';
import {Account, iconSizeMedium, Tasks} from '@constants/constants';
import {faFile, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TasksNavigation} from '@navigation/tasksNavigation/TasksNavigation';
import {BottomTabParamList} from '@navigation/withAuthNavigation/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {syncUserTaskLists} from '@store/actions/tasksSagaActions/tasksSagaActions';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const WithAuthNavigation = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(syncUserTaskLists());
  }, []);

  return (
    <Tab.Navigator
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
      <Tab.Screen
        name={Tasks}
        component={TasksNavigation}
        options={() => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitle: `${t('tasksScreen.Tasks')}`,
          headerTitleStyle: styles.headerTitleStyle,
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
      <Tab.Screen
        name={Account}
        component={AccountScreen}
        options={() => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitle: `${t('accountScreen.Account')}`,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              style={focused ? styles.tabLightIcon : styles.tabDarkIcon}
              icon={faUser}
              size={iconSizeMedium}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
