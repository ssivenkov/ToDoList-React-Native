import {CustomTextButtonPropsType} from '@components/common/buttons/type';
import {themeSelector} from '@store/selectors/userSelectors';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const CustomTextButton = (props: CustomTextButtonPropsType) => {
  const {title, containerStyle, onPress, disable} = props;

  const theme = useSelector(themeSelector);

  const CustomTextButtonStyle = [
    styles(theme).textButton,
    disable && styles(theme).textButtonDisable,
  ];

  return (
    <View style={containerStyle && containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={CustomTextButtonStyle}
        disabled={disable}>
        <Text style={styles(theme).text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
