import React, { useState } from 'react';

import { LongButton } from '@components/buttons/longButton/LongButton';
import { ModalMenuButton } from '@components/buttons/modalMenuButton/ModalMenuButton';
import { Separator } from '@components/buttons/modalMenuButton/Separator';
import {
  defaultModalIndentBottom,
  defaultModalPaddingHorizontal,
} from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, Text, View } from 'react-native';

import { modalStyles } from './modalStyles';
import { ModalLongButtonPropsType } from './types';

export const ModalLongButton = (props: ModalLongButtonPropsType) => {
  const styles = useStyles(modalStyles);

  const { t } = useTranslation();

  const defaultDescriptionTextStyle = styles.text;
  const defaultOkText = t('common.Ok');

  const {
    children,
    contentPaddingHorizontal = defaultModalPaddingHorizontal,
    description,
    descriptionTextStyle = defaultDescriptionTextStyle,
    buttonIcon,
    buttonTitle,
    okHandler,
    okText = defaultOkText,
    okTextStyle,
    closeHandler,
    rightComponent,
    disabled,
    hasContentPaddingBottom = true,
  } = props;

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
            {description && (
              <View style={styles.descriptionContainer}>
                <Text style={descriptionTextStyle}>{description}</Text>
              </View>
            )}
            {children && (
              <ScrollView
                contentContainerStyle={[
                  styles.childrenContainer,
                  {
                    paddingBottom: hasContentPaddingBottom ? defaultModalIndentBottom : 0,
                  },
                ]}
                style={{ paddingHorizontal: contentPaddingHorizontal }}
              >
                {children}
              </ScrollView>
            )}
            <View style={styles.buttonsContainer}>
              <ModalMenuButton onPress={onClosePress} title={t('common.Close')} />
              {okHandler && (
                <>
                  <ModalMenuButton
                    okTextStyle={okTextStyle}
                    onPress={onOkButtonPress}
                    title={okText}
                  />
                  <Separator />
                </>
              )}
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
