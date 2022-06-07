import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {CustomLongButton} from '@components/common/buttons/customLongButton/CustomLongButton';
import {useStyles} from '@root/hooks/useStyles';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Text, View} from 'react-native';
import {styles} from './styles';
import {ModalLongButtonPropsType} from './types';

export const ModalLongButton = (props: ModalLongButtonPropsType) => {
  const {
    children,
    description,
    buttonIcon,
    buttonTitle,
    okHandler,
    rightComponent,
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
      <CustomLongButton
        icon={buttonIcon}
        onPress={onModalButtonPress}
        title={buttonTitle}
        disable={disable}
        rightComponent={rightComponent}
      />
    </View>
  );
};
