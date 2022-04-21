import {CustomIconButton} from '@components/common/buttons/CustomIconButton';
import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {Loader} from '@components/common/loader/loader';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, View, Text} from 'react-native';
import {styles} from './styles';
import {ModalIconPropsType} from './types';

export const ModalIcon = (props: ModalIconPropsType) => {
  const {
    children,
    description,
    buttonIcon,
    okHandler,
    okDisable,
    closeHandler,
  } = props;
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onButtonPress = (): void => {
    !modalVisible && setModalVisible(true);
  };

  const onCancelButtonPress = (): void => {
    closeHandler && closeHandler();
    setModalVisible(false);
  };

  const onOkButtonPress = (): void => {
    okHandler(setIsLoading, setModalVisible);
  };

  return (
    <View>
      <Modal transparent visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={[
                styles.centerContainer,
                isLoading && styles.visibilityContainer,
              ]}>
              {description && <Text style={styles.text}>{description}</Text>}
              {children && <View>{children}</View>}
              <View style={styles.buttonsContainer}>
                <CustomTextButton
                  onPress={onOkButtonPress}
                  title={`${t('common.Ok')}`}
                  disable={okDisable}
                />
                <CustomTextButton
                  onPress={onCancelButtonPress}
                  title={`${t('common.Close')}`}
                />
              </View>
            </View>
            {isLoading && <Loader />}
          </View>
        </View>
      </Modal>
      <CustomIconButton onPress={onButtonPress} icon={buttonIcon} />
    </View>
  );
};
