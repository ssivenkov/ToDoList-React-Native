import {ChangeLanguageButton} from '@components/buttons/changeLanguageButton/ChangeLanguageButton';
import {DarkModeButton} from '@components/buttons/darkModeButton/DarkModeButton';
import {SelectAccentColorButton} from '@components/buttons/selectAccentColorButton/SelectAccentColorButton';
import {Loader} from '@components/common/loader/Loader';
import {ModalLongButton} from '@components/common/modals/ModalLongButton';
import {faArrowRight, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useStyles} from '@root/hooks/useStyles';
import {styles} from '@root/screens/accountScreen/styles';
import {deleteAccountAction} from '@store/actions/userSagaActions/deleteAccountAction';
import {signOutAction} from '@store/actions/userSagaActions/signOutAction';
import {
  userAvatarSelector,
  userDataSelector,
} from '@store/selectors/userSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();
  const style = useStyles(styles);
  const {t} = useTranslation();

  const userData = useSelector(userDataSelector);
  const userAvatar = useSelector(userAvatarSelector);
  const [waitingProcess, setWaitingProcess] = useState<boolean>(false);

  const signOutHandler = (): void => {
    dispatch(signOutAction({setWaitingProcess}));
  };

  const deleteAccountHandler = (): void => {
    dispatch(deleteAccountAction({setWaitingProcess}));
  };

  if (userData && !waitingProcess) {
    return (
      <ScrollView>
        <View style={style.screenContainer}>
          <View style={style.userInfoContainer}>
            {userAvatar && (
              <Image source={{uri: userAvatar}} style={style.avatar} />
            )}
            {userData.displayName && (
              <Text style={style.name}>{userData.displayName}</Text>
            )}
            {userData.email && <Text style={style.text}>{userData.email}</Text>}
            {userData.phoneNumber && (
              <Text style={style.text}>{userData.phoneNumber}</Text>
            )}
          </View>
          <View>
            <ChangeLanguageButton setIsLoading={setWaitingProcess} />
            <DarkModeButton setIsLoading={setWaitingProcess} />
            <SelectAccentColorButton setIsLoading={setWaitingProcess} />
            <ModalLongButton
              buttonIcon={faArrowRight}
              okHandler={signOutHandler}
              description={t('accountScreen.SignOutWarning')}
              buttonTitle={t('accountScreen.SignOut')}
              disable={waitingProcess}
            />
            <ModalLongButton
              buttonIcon={faTrash}
              okHandler={deleteAccountHandler}
              description={t('accountScreen.DeleteAccountWarning')}
              buttonTitle={t('accountScreen.DeleteAccount')}
              disable={waitingProcess}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return <Loader />;
};
