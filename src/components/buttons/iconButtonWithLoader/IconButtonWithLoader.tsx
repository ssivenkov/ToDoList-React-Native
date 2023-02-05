import React, { useState } from 'react';

import { IconButton } from '@components/buttons/iconButton/IconButton';
import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import { Modal, View } from 'react-native';

import { IconButtonWithLoaderPropsType } from './types';

export const IconButtonWithLoader = (props: IconButtonWithLoaderPropsType) => {
  const { icon, disabled = false, okHandler } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onButtonPress = () => {
    okHandler(setIsLoading);
  };

  return (
    <View>
      {isLoading && (
        <Modal transparent={true}>
          <PurpleLoader />
        </Modal>
      )}
      <IconButton disabled={disabled} icon={icon} onPress={onButtonPress} />
    </View>
  );
};
