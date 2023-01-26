import React, { useState } from 'react';

import { IconButton } from '@components/buttons/iconButton/IconButton';
import { ModalMenuButton } from '@components/buttons/modalMenuButton/ModalMenuButton';
import { Separator } from '@components/buttons/modalMenuButton/Separator';
import { Loader } from '@components/loader/Loader';
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
    okHandler(setIsLoading, setModalVisible);
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
                    <Text style={styles.text}>{description}</Text>
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
                    disabled={okDisabled}
                    leftRounding={true}
                    onPress={onOkButtonPress}
                    rightRounding={false}
                    title={okText}
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
          </TouchableWithoutFeedback>
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
