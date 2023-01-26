import React, { useState } from 'react';

import { longButtonDarkGradient, longButtonLightGradient } from '@colors/gradients';
import { LongButton } from '@components/buttons/longButton/LongButton';
import { Loader } from '@components/loader/Loader';
import { ModalLongButton } from '@components/modals/ModalLongButton';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useStyles } from '@hooks/useStyles';
import { useNavigation } from '@react-navigation/native';
import { ChangeLanguageButton } from '@screens/accountScreen/buttons/changeLanguageButton/ChangeLanguageButton';
import { DarkModeButton } from '@screens/accountScreen/buttons/darkModeButton/DarkModeButton';
import { SelectAccentColorButton } from '@screens/accountScreen/buttons/selectAccentColorButton/SelectAccentColorButton';
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

import { accountScreenStyles } from './styles';

export const AccountScreen = () => {
  const dispatch = useDispatch();

  const styles = useStyles(accountScreenStyles);

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

  const signOutHandler = () => {
    dispatch(signOutAction({ setWaitingProcess }));
  };

  const deleteAccountHandler = () => {
    dispatch(deleteAccountAction({ setWaitingProcess }));
  };

  if (userData && !waitingProcess) {
    return (
      <ScrollView>
        <View style={styles.screenContainer}>
          <View style={styles.userInfoContainer}>
            {userAvatar && <Image source={{ uri: userAvatar }} style={styles.avatar} />}
            {userData.displayName && (
              <Text style={styles.name}>{userData.displayName}</Text>
            )}
            {userData.email && <Text style={styles.text}>{userData.email}</Text>}
            {userData.phoneNumber && (
              <Text style={styles.text}>{userData.phoneNumber}</Text>
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
                buttonTitle={t('accountScreen.SignOutButtonTitle')}
                description={t('accountScreen.SignOutModalTitle')}
                disabled={waitingProcess}
                okHandler={signOutHandler}
              />
            </LinearGradient>
            <LinearGradient colors={longButtonGradient}>
              <ModalLongButton
                buttonIcon={faTrash}
                buttonTitle={t('accountScreen.DeleteAccountButtonTitle')}
                description={t('accountScreen.DeleteAccountModalTitle')}
                disabled={waitingProcess}
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
