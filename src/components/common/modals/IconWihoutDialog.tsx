import React, { useState } from 'react';

import { IconButton } from '@components/common/buttons/iconButton/IconButton';
import { Loader } from '@components/common/loader/Loader';
import { Modal, View } from 'react-native';

import { ModalIconWithoutDialogPropsType } from './types';

export const IconWithoutDialog = (props: ModalIconWithoutDialogPropsType) => {
  const {
    buttonIcon,
    buttonIconDisabled = false,
    okHandler,
    modalVisibleFromProps,
    setModalVisibleFromProps,
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modalByPropsControlCondition =
    typeof modalVisibleFromProps === 'boolean' && !!setModalVisibleFromProps;

  const onButtonPress = (): void => {
    if (modalByPropsControlCondition && !modalVisibleFromProps) {
      setModalVisibleFromProps(true);
    }

    okHandler(setIsLoading);
  };

  return (
    <View>
      {isLoading && (
        <Modal transparent={true}>
          <Loader />
        </Modal>
      )}
      <IconButton
        disable={buttonIconDisabled}
        icon={buttonIcon}
        onPress={onButtonPress}
      />
    </View>
  );
};
