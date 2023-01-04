import React, { useState } from 'react';

import { IconButton } from '@components/buttons/iconButton/IconButton';
import { ModalMenuButton } from '@components/buttons/modalMenuButton/ModalMenuButton';
import { Separator } from '@components/buttons/modalMenuButton/Separator';
import { Loader } from '@components/loader/Loader';
import { useStyles } from '@hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { Modal, Text, View } from 'react-native';

import { modalStyles } from './modalStyles';
import { ModalIconPropsType } from './types';

export const ModalIcon = (props: ModalIconPropsType) => {
  const {
    children,
    description,
    buttonIcon,
    buttonIconDisabled = false,
    okHandler,
    closeHandler,
    modalVisibleFromProps,
    setModalVisibleFromProps,
    okDisabled,
    inputFocus,
  } = props;

  const styles = useStyles(modalStyles);

  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modalByPropsControlCondition =
    typeof modalVisibleFromProps === 'boolean' && !!setModalVisibleFromProps;

  const onButtonPress = () => {
    if (modalByPropsControlCondition && !modalVisibleFromProps) {
      setModalVisibleFromProps(true);
    }

    if (!modalVisible) setModalVisible(true);
  };

  const onCancelButtonPress = () => {
    if (closeHandler) closeHandler();

    if (modalByPropsControlCondition) {
      setModalVisibleFromProps(false);
    } else setModalVisible(false);
  };

  const onOkButtonPress = () => {
    okHandler(setIsLoading, setModalVisible);
  };

  return (
    <View>
      <View>
        <Modal
          onShow={() => {
            if (inputFocus) {
              inputFocus();
            }
          }}
          transparent={true}
          visible={modalVisibleFromProps ?? modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.contentWithBottomPadding}>
                {description && <Text style={styles.text}>{description}</Text>}
                {children && <View style={styles.contentContainer}>{children}</View>}
              </View>
              <View style={styles.buttonsContainer}>
                <ModalMenuButton
                  disabled={okDisabled}
                  leftRounding={true}
                  onPress={onOkButtonPress}
                  rightRounding={false}
                  title={t('common.Ok')}
                />
                <Separator />
                <ModalMenuButton
                  leftRounding={false}
                  onPress={onCancelButtonPress}
                  rightRounding={true}
                  title={t('common.Close')}
                />
              </View>
            </View>
          </View>
          {isLoading && <Loader />}
        </Modal>
      </View>
      <IconButton
        disabled={buttonIconDisabled}
        icon={buttonIcon}
        onPress={onButtonPress}
      />
    </View>
  );
};
