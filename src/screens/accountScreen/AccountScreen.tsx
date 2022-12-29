import React, { useState } from 'react';

import { longButtonDarkGradient, longButtonLightGradient } from '@colors/gradients';
import { ChangeLanguageButton } from '@components/buttons/changeLanguageButton/ChangeLanguageButton';
import { DarkModeButton } from '@components/buttons/darkModeButton/DarkModeButton';
import { SelectAccentColorButton } from '@components/buttons/selectAccentColorButton/SelectAccentColorButton';
import { LongButton } from '@components/common/buttons/longButton/LongButton';
import { Loader } from '@components/common/loader/Loader';
import { ModalLongButton } from '@components/common/modals/ModalLongButton';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { faArrowRight, faAt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from '@root/hooks/useStyles';
import { styles } from '@root/screens/accountScreen/styles';
import { deleteAccountAction } from '@store/actions/userSagaActions/deleteAccountAction';
import { signOutAction } from '@store/actions/userSagaActions/signOutAction';
import {
  themeSelector,
  userAvatarSelector,
  userDataSelector,
} from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();

  const style = useStyles(styles);

  const { t } = useTranslation();

  const theme = useSelector(themeSelector);

  const navigation = useNavigation();

  const userData = useSelector(userDataSelector);
  const userAvatar = useSelector(userAvatarSelector);
  const [waitingProcess, setWaitingProcess] = useState<boolean>(false);

  const longButtonGradient = theme.darkMode
    ? longButtonDarkGradient
    : longButtonLightGradient;

  const navigateToAuthorCommunicationScreen = () => {
    navigation.navigate(ROOT_NAVIGATOR_ROUTE.CONTACT_THE_AUTHOR_SCREEN);
  };

  const signOutHandler = (): void => {
    dispatch(signOutAction({ setWaitingProcess }));
  };

  const deleteAccountHandler = (): void => {
    dispatch(deleteAccountAction({ setWaitingProcess }));
  };

  if (userData && !waitingProcess) {
    return (
      <ScrollView>
        <View style={style.screenContainer}>
          <View style={style.userInfoContainer}>
            {userAvatar && <Image source={{ uri: userAvatar }} style={style.avatar} />}
            {userData.displayName && (
              <Text style={style.name}>{userData.displayName}</Text>
            )}
            {userData.email && <Text style={style.text}>{userData.email}</Text>}
            {userData.phoneNumber && (
              <Text style={style.text}>{userData.phoneNumber}</Text>
            )}
          </View>
          <View>
            <LinearGradient colors={longButtonGradient}>
              <ChangeLanguageButton setIsLoading={setWaitingProcess} />
            </LinearGradient>
            <LinearGradient colors={longButtonGradient}>
              <DarkModeButton setIsLoading={setWaitingProcess} />
            </LinearGradient>
            <LinearGradient colors={longButtonGradient}>
              <SelectAccentColorButton setIsLoading={setWaitingProcess} />
            </LinearGradient>
            <LinearGradient colors={longButtonGradient}>
              <LongButton
                icon={faAt}
                onPress={() => navigateToAuthorCommunicationScreen()}
                title={t('accountScreen.ContactTheAuthorButtonTitle')}
              />
            </LinearGradient>
            <LinearGradient colors={longButtonGradient}>
              <ModalLongButton
                buttonIcon={faArrowRight}
                buttonTitle={t('accountScreen.SignOut')}
                description={t('accountScreen.SignOutWarning')}
                disable={waitingProcess}
                okHandler={signOutHandler}
              />
            </LinearGradient>
            <LinearGradient colors={longButtonGradient}>
              <ModalLongButton
                buttonIcon={faTrash}
                buttonTitle={t('accountScreen.DeleteAccount')}
                description={t('accountScreen.DeleteAccountWarning')}
                disable={waitingProcess}
                okHandler={deleteAccountHandler}
              />
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    );
  }

  return <Loader />;
};
