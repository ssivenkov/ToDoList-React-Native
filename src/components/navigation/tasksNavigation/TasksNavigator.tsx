import {faCheck, faListCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {TaskListType} from 'store/reducers/taskListReducer/types';
import {ReturnComponentType} from 'types/common/returnComponentType';
import {iconSizeLarge} from '../../../constants/constants';
import {NAVIGATION_TASKS} from '../../../enums/taskListsEnum';
import {getTaskList} from '../../../store/selectors/taskListSelectors';
import {TaskList} from '../../common/taskList/TaskList';
import {CreateTaskListButton} from './buttons/createTaskListButton/createTaskListButton';
import {styles} from './styles';
import {TabParamListType} from './types';

const TasksScreenTab = createBottomTabNavigator<TabParamListType>();

export const TasksNavigator = (): ReturnComponentType => {
  const taskLists = useSelector(getTaskList);

  const toDoTaskLists = taskLists.filter((taskList) => {
    if (taskList.showInToDo || taskList.tasks.some((task) => !task.isDone)) {
      return taskList;
    }
  });
  const doneTaskLists = taskLists.filter((taskList) => {
    if (taskList.tasks) {
      return taskList.tasks.some((task) => task.isDone);
    }
  });

  const toDoTaskListRenderItem: ListRenderItem<TaskListType> = ({
    item,
  }): ReturnComponentType => {
    const toDoTasks = item.tasks && item.tasks.filter((task) => !task.isDone);
    return (
      <TaskList
        isTodoTaskList={true}
        taskListId={item.id}
        taskListTitle={item.title}
        taskListPropsTasks={toDoTasks}
        fullTaskList={item}
      />
    );
  };
  const doneTaskListRenderItem: ListRenderItem<TaskListType> = ({
    item,
  }): ReturnComponentType => {
    const doneTasks = item.tasks && item.tasks.filter((task) => task.isDone);
    return (
      <TaskList
        isTodoTaskList={false}
        taskListId={item.id}
        taskListTitle={item.title}
        taskListPropsTasks={doneTasks}
        fullTaskList={item}
      />
    );
  };

  const TodoTasksScreen = (): ReturnComponentType => {
    return (
      <>
        {toDoTaskLists && toDoTaskLists.length > 0 ? (
          <View style={styles.tasksListContainer}>
            <FlatList
              data={toDoTaskLists}
              renderItem={toDoTaskListRenderItem}
            />
          </View>
        ) : (
          <View style={styles.nullContentContainer}>
            <Text style={styles.nullContentText}>
              Todo task lists is not found
            </Text>
          </View>
        )}
      </>
    );
  };

  const DoneTasksScreen = (): ReturnComponentType => {
    return (
      <>
        {doneTaskLists && doneTaskLists.length > 0 ? (
          <View style={styles.tasksListContainer}>
            <FlatList
              data={doneTaskLists}
              renderItem={doneTaskListRenderItem}
            />
          </View>
        ) : (
          <View style={styles.nullContentContainer}>
            <Text style={styles.nullContentText}>
              Done task lists is not found
            </Text>
          </View>
        )}
      </>
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
                <FontAwesomeIcon
                  style={styles.tabLightIcon}
                  icon={faListCheck}
                  size={iconSizeLarge}
                />
              ) : (
                <FontAwesomeIcon icon={faListCheck} size={iconSizeLarge} />
              );
            case NAVIGATION_TASKS.DONE_TASKS:
              return focused ? (
                <FontAwesomeIcon
                  style={styles.tabLightIcon}
                  icon={faCheck}
                  size={iconSizeLarge}
                />
              ) : (
                <FontAwesomeIcon icon={faCheck} size={iconSizeLarge} />
              );
            default:
              return <FontAwesomeIcon icon={faCheck} size={iconSizeLarge} />;
          }
        },
        headerRight: () => {
          if (route.name === NAVIGATION_TASKS.TASKS) {
            return (
              <View style={styles.buttonContainer}>
                <CreateTaskListButton />
              </View>
            );
          }
        },
        tabBarStyle: styles.tabBarContainer,
        tabBarActiveBackgroundColor: '#0000dd',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#123',
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
