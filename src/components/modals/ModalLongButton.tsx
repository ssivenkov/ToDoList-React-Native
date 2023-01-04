import React, { useState } from 'react';

import { LongButton } from '@components/buttons/longButton/LongButton';
import { ModalMenuButton } from '@components/buttons/modalMenuButton/ModalMenuButton';
import { Separator } from '@components/buttons/modalMenuButton/Separator';
import { useStyles } from '@hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { Modal, Text, View } from 'react-native';

import { modalStyles } from './modalStyles';
import { ModalLongButtonPropsType } from './types';

export const ModalLongButton = (props: ModalLongButtonPropsType) => {
  const {
    children,
    description,
    buttonIcon,
    buttonTitle,
    okHandler,
    closeHandler,
    rightComponent,
    disabled,
    hasContentBottomPadding = true,
  } = props;

  const styles = useStyles(modalStyles);

  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  const onModalButtonPress = () => {
    setModalVisible(true);
  };

  const onOkButtonPress = () => {
    if (okHandler) okHandler();
  };

  const onClosePress = () => {
    if (closeHandler) closeHandler();

    setModalVisible(false);
  };

  return (
    <View>
      <Modal onRequestClose={onClosePress} transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={
                hasContentBottomPadding
                  ? styles.contentWithBottomPadding
                  : styles.contentWithoutBottomPadding
              }
            >
              {description && <Text style={styles.text}>{description}</Text>}
              {children && <View>{children}</View>}
            </View>
            <View style={styles.buttonsContainer}>
              {okHandler && (
                <>
                  <ModalMenuButton
                    leftRounding={true}
                    onPress={onOkButtonPress}
                    rightRounding={false}
                    title={t('common.Ok')}
                  />
                  <Separator />
                </>
              )}
              <ModalMenuButton
                leftRounding={!okHandler}
                onPress={onClosePress}
                rightRounding={true}
                title={t('common.Close')}
              />
            </View>
          </View>
        </View>
      </Modal>
      <LongButton
        disabled={disabled}
        icon={buttonIcon}
        onPress={onModalButtonPress}
        rightComponent={rightComponent}
        title={buttonTitle}
      />
    </View>
  );
};
