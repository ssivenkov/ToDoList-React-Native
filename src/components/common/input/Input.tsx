import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './Styles';

export const Input = () => {
  const [inputText, setInputText] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Enter task title...'}
        onChangeText={(text: string) => {
          setInputText(text);
        }}
        defaultValue={inputText}
      />
    </View>
  );
};
