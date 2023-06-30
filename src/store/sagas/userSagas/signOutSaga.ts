import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_OTHER } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Sentry from '@sentry/react-native';
import { setNotepadTextAction } from '@store/actions/notepadReducerActions/setNotepadTextAction';
import { setTaskListsAction } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import { setAuthStateAction } from '@store/actions/userReducerActions/setAuthStateAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { SignOutSagaActionReturnType } from '@store/actions/userSagaActions/signOutAction';
import { ProviderIDType } from '@store/reducers/userReducer/types';
import { userReducerState } from '@store/reducers/userReducer/userReducer';
import { providerIDSelector } from '@store/selectors/userSelectors';
import { changeLanguage as i18nextChangeLanguage } from 'i18next';
import { LoginManager } from 'react-native-fbsdk-next';
import { call, cancel, delay, put, putResolve, select } from 'redux-saga/effects';

export function* signOutSaga(action: SignOutSagaActionReturnType) {
  const { setWaitingProcess } = action.payload;

  const { FACEBOOK_PROVIDER_ID, GOOGLE_PROVIDER_ID } = FIREBASE_OTHER;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setWaitingProcess, true);

    yield delay(START_ANIMATION_DELAY);

    const providerID: ProviderIDType = yield select(providerIDSelector);

    const signOut = () => {
      return auth().signOut();
    };

    yield delay(START_ANIMATION_DELAY);

    yield call(signOut);

    if (providerID === GOOGLE_PROVIDER_ID) {
      yield call(GoogleSignin.signOut);
    }

    if (providerID === FACEBOOK_PROVIDER_ID) {
      yield call(LoginManager.logOut);
    }

    yield putResolve(
      setAuthStateAction({
        accentColor: userReducerState.accentColor,
        emulatorStatusBarHeight: userReducerState.emulatorStatusBarHeight,
        isUserDataSynchronized: userReducerState.isUserDataSynchronized,
        isWaitingUserDataOnSignIn: userReducerState.isWaitingUserDataOnSignIn,
        language: userReducerState.language,
        lastRoute: userReducerState.lastRoute,
        providerID: userReducerState.providerID,
        selectedColor: userReducerState.selectedColor,
        theme: userReducerState.theme,
        userData: userReducerState.userData,
        userAvatar: userReducerState.userAvatar,
      }),
    );

    const setAppLanguage = () => {
      return i18nextChangeLanguage(userReducerState.language);
    };

    yield call(setAppLanguage);

    yield put(setTaskListsAction({ taskLists: [] }));
    yield put(setNotepadTextAction({ notepadText: '' }));
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
