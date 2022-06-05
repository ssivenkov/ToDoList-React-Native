import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {useStyles} from '@root/hooks/useStyles';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, View, Text} from 'react-native';
import {styles} from './styles';
import {ModalTextPropsType} from './types';

export const ModalText = (props: ModalTextPropsType) => {
  const {
    children,
    description,
    buttonTitle,
    buttonContainerStyle,
    okHandler,
    disable,
  } = props;

  const style = useStyles(styles);
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  const onModalButtonPress = (): void => {
    setModalVisible(true);
  };

  const onOkButtonPress = (): void => {
    okHandler && okHandler();
    setModalVisible(false);
  };

  const onRequestClose = (): void => {
    setModalVisible(!modalVisible);
  };

  const onClosePress = (): void => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal transparent visible={modalVisible} onRequestClose={onRequestClose}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            {description && <Text style={style.text}>{description}</Text>}
            {children && <View>{children}</View>}
            <View style={style.buttonsContainer}>
              {okHandler && (
                <CustomTextButton
                  onPress={onOkButtonPress}
                  title={t('common.Ok')}
                />
              )}
              <CustomTextButton
                onPress={onClosePress}
                title={t('common.Close')}
              />
            </View>
          </View>
        </View>
      </Modal>
      <CustomTextButton
        containerStyle={buttonContainerStyle && buttonContainerStyle}
        onPress={onModalButtonPress}
        title={buttonTitle}
        disable={disable}
      />
    </View>
  );
};
