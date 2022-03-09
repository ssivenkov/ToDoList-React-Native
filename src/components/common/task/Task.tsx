import React, {FC} from 'react';
import {styles} from './Styles';
import {CustomImageButton} from '../buttons/CustomImageButton';
import {Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import DoneImage from '../../../assets/images/icons/DoneTasks.png';
import PenImage from '../../../assets/images/icons/Pen.png';
import DeleteImage from '../../../assets/images/icons/Delete.png';
import {TaskPropsType} from './Types';

export const Task: FC<TaskPropsType> = (props): ReturnComponentType => {
  const {title, todo} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttonsContainer}>
        {todo && <CustomImageButton image={DoneImage} />}
        <CustomImageButton image={PenImage} />
        <CustomImageButton image={DeleteImage} />
      </View>
    </View>
  );
};
