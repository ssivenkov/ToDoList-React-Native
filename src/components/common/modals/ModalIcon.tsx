import {CustomIconButton} from '@components/common/buttons/CustomIconButton';
import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {Loader} from '@components/common/loader/Loader';
import {useStyles} from '@root/hooks/useStyles';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Text, View} from 'react-native';
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

  const style = useStyles(styles);
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
      <View>
        <Modal transparent visible={modalVisible}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              {description && <Text style={style.text}>{description}</Text>}
              {children && <View>{children}</View>}
              <View style={style.buttonsContainer}>
                <CustomTextButton
                  onPress={onOkButtonPress}
                  title={t('common.Ok')}
                  disable={okDisable}
                />
                <CustomTextButton
                  onPress={onCancelButtonPress}
                  title={t('common.Close')}
                />
              </View>
            </View>
          </View>
          {isLoading && <Loader />}
        </Modal>
      </View>
      <CustomIconButton onPress={onButtonPress} icon={buttonIcon} />
    </View>
  );
};
