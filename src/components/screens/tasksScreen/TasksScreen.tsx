import React from 'react';
import {styles} from './Styles';
import {NAVIGATION_TASKS} from '../../../enums/TasksEnum';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TaskList} from '../../common/taskList/TaskList';
import {CustomButton} from '../../common/button/CustomButton';
import {Image, View} from 'react-native';
import {AppRootStateType} from 'store/Store';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskItemType} from 'store/reducers/tasksReducer/Types';
import TasksActive from '../../../assets/images/icons/TasksActive.png';
import Tasks from '../../../assets/images/icons/Tasks.png';
import DoneTasksActive from '../../../assets/images/icons/DoneTasksActive.png';
import DoneTasks from '../../../assets/images/icons/DoneTasks.png';
import Add from '../../../assets/images/icons/Add.png';
import {TabParamListType} from './Types';

const TasksScreenTab = createBottomTabNavigator<TabParamListType>();

export const TasksScreen = (): ReturnComponentType => {
  const toDoTaskList = useSelector<AppRootStateType, TaskItemType[]>(
    (state) => state.tasks.toDoTasks,
  );
  const doneTaskList = useSelector<AppRootStateType, TaskItemType[]>(
    (state) => state.tasks.doneTasks,
  );

  const TodoTasksScreen = () => {
    return (
      <View style={styles.tasksListContainer}>
        <TaskList todo dataList={toDoTaskList} title="Task list" />
      </View>
    );
  };

  const DoneTasksScreen = () => {
    return (
      <View style={styles.tasksListContainer}>
        <TaskList done dataList={doneTaskList} title="Done task list" />
      </View>
    );
  };

  return (
    <TasksScreenTab.Navigator
      initialRouteName={NAVIGATION_TASKS.TASKS}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case NAVIGATION_TASKS.TASKS:
              return focused ? (
                <Image style={styles.tabImage} source={TasksActive} />
              ) : (
                <Image style={styles.tabImage} source={Tasks} />
              );
            case NAVIGATION_TASKS.DONE_TASKS:
              return focused ? (
                <Image style={styles.tabImage} source={DoneTasksActive} />
              ) : (
                <Image style={styles.tabImage} source={DoneTasks} />
              );
            default:
              return <Image style={styles.tabImage} source={Tasks} />;
          }
        },
        headerRight: () => {
          if (route.name === NAVIGATION_TASKS.TASKS) {
            return (
              <View style={{marginRight: 20}}>
                <CustomButton bigImage>{Add}</CustomButton>
              </View>
            );
          }
        },
        tabBarIconStyle: styles.tabImage,
        tabBarStyle: styles.tabBarContainer,
        tabBarActiveBackgroundColor: 'blue',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
      })}>
      <TasksScreenTab.Screen
        name={NAVIGATION_TASKS.TASKS}
        component={TodoTasksScreen}
      />
      <TasksScreenTab.Screen
        name={NAVIGATION_TASKS.DONE_TASKS}
        component={DoneTasksScreen}
      />
    </TasksScreenTab.Navigator>
  );
};
