import React, {FC} from 'react';
import {styles} from './Styles';
import {Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {TaskPropsType} from './Types';
import {Input} from '../input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ModalIcon} from '../modals/ModalIcon';
import {faPen, faTrash, faCheck} from '@fortawesome/free-solid-svg-icons';
import {iconSizeSmall} from '../../../constants/constants';

export const Task: FC<TaskPropsType> = (props): ReturnComponentType => {
  const {title, todo} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttonsContainer}>
        {todo && (
          <ModalIcon
            okHandler={() => {}}
            buttonIcon={
              <FontAwesomeIcon icon={faCheck} size={iconSizeSmall} />
            }>
            <Text style={styles.warnText}>
              Is done task{' '}
              <Text style={styles.greenHighlightTask}>{title}</Text>?
            </Text>
          </ModalIcon>
        )}
        <ModalIcon
          okHandler={() => {}}
          description={'Edit task title:'}
          buttonIcon={<FontAwesomeIcon icon={faPen} size={iconSizeSmall} />}>
          <Input value={title} />
        </ModalIcon>
        <ModalIcon
          okHandler={() => {}}
          buttonIcon={<FontAwesomeIcon icon={faTrash} size={iconSizeSmall} />}>
          <Text style={styles.warnText}>
            Are you sure to delete{' '}
            <Text style={styles.redHighlightTask}>{title}</Text>?
          </Text>
        </ModalIcon>
      </View>
    </View>
  );
};
