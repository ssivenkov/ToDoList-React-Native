import {COLORS} from '@colors/colors';
import {themeSelector} from '@store/selectors/userSelectors';
import React from 'react';
import {TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import {InputPropsType} from './types';

export const CustomInput = (props: InputPropsType) => {
  const {value, onValueChange, placeholder} = props;

  const theme = useSelector(themeSelector);

  return (
    <View style={styles().container}>
      <TextInput
        style={styles(theme).input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.SILVER_CHALICE}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        value={value}
      />
    </View>
  );
};
