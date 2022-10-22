import React, { useState } from 'react';

import { ChangeLanguageButton } from '@components/buttons/changeLanguageButton/ChangeLanguageButton';
import { DarkModeButton } from '@components/buttons/darkModeButton/DarkModeButton';
import { SelectAccentColorButton } from '@components/buttons/selectAccentColorButton/SelectAccentColorButton';
import { GradientWrapper } from '@components/common/gradientWrapper/GradientWrapper';
import { Loader } from '@components/common/loader/Loader';
import { ModalLongButton } from '@components/common/modals/ModalLongButton';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useStyles } from '@root/hooks/useStyles';
import { styles } from '@root/screens/accountScreen/styles';
import { deleteAccountAction } from '@store/actions/userSagaActions/deleteAccountAction';
import { signOutAction } from '@store/actions/userSagaActions/signOutAction';
import { userAvatarSelector, userDataSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();
  const style = useStyles(styles);
  const { t } = useTranslation();

  const userData = useSelector(userDataSelector);
  const userAvatar = useSelector(userAvatarSelector);
  const [waitingProcess, setWaitingProcess] = useState<boolean>(false);

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
            <GradientWrapper>
              <ChangeLanguageButton setIsLoading={setWaitingProcess} />
            </GradientWrapper>
            <GradientWrapper>
              <DarkModeButton setIsLoading={setWaitingProcess} />
            </GradientWrapper>
            <GradientWrapper>
              <SelectAccentColorButton setIsLoading={setWaitingProcess} />
            </GradientWrapper>
            <GradientWrapper>
              <ModalLongButton
                buttonIcon={faArrowRight}
                buttonTitle={t('accountScreen.SignOut')}
                description={t('accountScreen.SignOutWarning')}
                disable={waitingProcess}
                okHandler={signOutHandler}
              />
            </GradientWrapper>
            <GradientWrapper>
              <ModalLongButton
                buttonIcon={faTrash}
                buttonTitle={t('accountScreen.DeleteAccount')}
                description={t('accountScreen.DeleteAccountWarning')}
                disable={waitingProcess}
                okHandler={deleteAccountHandler}
              />
            </GradientWrapper>
          </View>
        </View>
      </ScrollView>
    );
  }

  return <Loader />;
};
