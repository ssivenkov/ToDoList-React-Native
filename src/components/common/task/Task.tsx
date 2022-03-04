import React, {FC} from 'react';
import {styles} from './Styles';
import {CustomButton} from '../button/CustomButton';
import {Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import Done from '../../../assets/images/icons/DoneTasks.png';
import Pen from '../../../assets/images/icons/Pen.png';
import Delete from '../../../assets/images/icons/Delete.png';

type TaskItemPropsType = {
  title: string;
  todo?: boolean;
};

export const Task: FC<TaskItemPropsType> = (props): ReturnComponentType => {
  const {title, todo} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {todo && <CustomButton smallImage>{Done}</CustomButton>}
      <CustomButton smallImage>{Pen}</CustomButton>
      <CustomButton smallImage>{Delete}</CustomButton>
    </View>
  );
};
