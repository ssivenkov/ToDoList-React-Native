import React, {FC} from 'react';
import {styles} from './Styles';
import {Task} from '../task/Task';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskListPropsType} from './Types';
import {Input} from '../input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ModalIcon} from '../modals/ModalIcon';
import {faPen, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall} from '../../../constants/constants';

export const TaskList: FC<TaskListPropsType> = (props): ReturnComponentType => {
  const {title, tasks, todo} = props;
  const renderTodoTaskItem: ListRenderItem<string> = ({
    item,
  }): ReturnComponentType => {
    return <Task todo title={item} />;
  };
  const renderDoneTaskItem: ListRenderItem<string> = ({
    item,
  }): ReturnComponentType => {
    return <Task title={item} />;
  };
  let tasksList;
  if (todo) {
    tasksList = <FlatList data={tasks} renderItem={renderTodoTaskItem} />;
  } else {
    tasksList = <FlatList data={tasks} renderItem={renderDoneTaskItem} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonsContainer}>
          {todo && (
            <ModalIcon
              okHandler={() => {}}
              description={'Enter new task title:'}
              buttonIcon={
                <FontAwesomeIcon icon={faPlus} size={iconSizeSmall} />
              }>
              <Input />
            </ModalIcon>
          )}
          <ModalIcon
            okHandler={() => {}}
            description={'Edit tasklist title:'}
            buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
            <Input value={title} />
          </ModalIcon>
          <ModalIcon
            okHandler={() => {}}
            buttonIcon={
              <FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />
            }>
            <Text style={styles.warnText}>
              Are you sure to delete{' '}
              <Text style={styles.redHighlightTask}>{title}</Text>?
            </Text>
          </ModalIcon>
        </View>
      </View>
      {tasksList}
    </View>
  );
};
