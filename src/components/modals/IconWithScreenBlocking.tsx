import React, { useState } from 'react';

import { IconButton } from '@components/buttons/iconButton/IconButton';
import { useStyles } from '@hooks/useStyles';
import { Modal, View } from 'react-native';

import { modalStyles } from './modalStyles';
import { IconWithScreenBlockingPropsType } from './types';

export const IconWithScreenBlocking = (props: IconWithScreenBlockingPropsType) => {
  const { buttonIcon, onPress } = props;

  const styles = useStyles(modalStyles);

  const [screenBlocking, setScreenBlocking] = useState<boolean>(false);

  const onButtonPress = () => {
    if (!screenBlocking) setScreenBlocking(true);

    onPress(setScreenBlocking);
  };

  return (
    <>
      <View>
        <Modal transparent={true} visible={screenBlocking}>
          <View style={styles.centeredTransparentView} />
        </Modal>
      </View>
      <IconButton icon={buttonIcon} onPress={onButtonPress} />
    </>
  );
};
