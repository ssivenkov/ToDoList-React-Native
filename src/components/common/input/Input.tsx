import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './Styles';
import {InputPropsType} from './Types';

export const Input = ({value}: InputPropsType) => {
  const [inputText, setInputText] = useState(value ? value : '');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'...'}
        onChangeText={(text: string) => {
          setInputText(text);
        }}
        defaultValue={inputText}
      />
    </View>
  );
};
