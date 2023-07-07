import React, { useState } from 'react';

import { IconButton } from '@components/buttons/iconButton/IconButton';
import { ModalMenuButton } from '@components/buttons/modalMenuButton/ModalMenuButton';
import { Separator } from '@components/buttons/modalMenuButton/Separator';
import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import {
  defaultModalIndentBottom,
  defaultModalPaddingHorizontal,
} from '@constants/constants';
import { useStyles } from '@hooks/useStyles';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { modalStyles } from './modalStyles';
import { ModalIconPropsType } from './types';

export const ModalIcon = (props: ModalIconPropsType) => {
  const { t } = useTranslation();

  const defaultOkText = t('common.Ok');

  const {
    children,
    contentPaddingHorizontal = defaultModalPaddingHorizontal,
    description,
    buttonIcon,
    buttonIconDisabled = false,
    okHandler,
    okText = defaultOkText,
    closeHandler,
    modalVisibleFromProps,
    setModalVisibleFromProps,
    okDisabled,
    inputFocus,
    hasContentPaddingBottom = true,
    descriptionTextStyle,
    okTextStyle,
  } = props;

  const styles = useStyles(modalStyles);

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
    if (okHandler) okHandler(setIsLoading, setModalVisible);
  };

  const keyboardDismiss = () => {
    Keyboard.dismiss();
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
          <TouchableWithoutFeedback onPress={keyboardDismiss}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {description && (
                  <View style={styles.descriptionContainer}>
                    <Text
                      style={descriptionTextStyle ? descriptionTextStyle : styles.text}
                    >
                      {description}
                    </Text>
                  </View>
                )}
                {children && (
                  <ScrollView
                    contentContainerStyle={[
                      styles.childrenContainer,
                      {
                        paddingBottom: hasContentPaddingBottom
                          ? defaultModalIndentBottom
                          : 0,
                      },
                    ]}
                    style={{ paddingHorizontal: contentPaddingHorizontal }}
                  >
                    {/* children wrapper for sensitivity to start of a touch. Need because ScrollView is inside TouchableWithoutFeedback */}
                    <View onStartShouldSetResponder={() => true}>{children}</View>
                  </ScrollView>
                )}
                <View style={styles.buttonsContainer}>
                  <ModalMenuButton
                    onPress={onCancelButtonPress}
                    title={t('common.Close')}
                  />
                  <Separator />
                  {okHandler && (
                    <ModalMenuButton
                      disabled={okDisabled}
                      okTextStyle={okTextStyle}
                      onPress={onOkButtonPress}
                      title={okText}
                    />
                  )}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {isLoading && <PurpleLoader />}
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
