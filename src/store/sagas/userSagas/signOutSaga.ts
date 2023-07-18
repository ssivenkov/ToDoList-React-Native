import { COLORS } from '@colors/colors';
import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { EN } from '@constants/languages';
import { FIREBASE_OTHER } from '@enums/firebaseEnum';
import { WITH_AUTH_NAVIGATOR_ROUTE } from '@enums/routesEnum';
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
import { lightTheme } from '@themes/themes';
import { changeLanguage as i18nextChangeLanguage } from 'i18next';
import { LoginManager } from 'react-native-fbsdk-next';
import { call, cancel, delay, put, putResolve, select } from 'redux-saga/effects';

const { FACEBOOK_PROVIDER_ID, GOOGLE_PROVIDER_ID } = FIREBASE_OTHER;

export function* signOutSaga(action: SignOutSagaActionReturnType) {
  const { setWaitingProcess } = action.payload;

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
        accentColor: COLORS.ELECTRIC_VIOLET2,
        emulatorStatusBarHeight: 0,
        isUserDataSynchronized: false,
        isWaitingUserDataOnSignIn: false,
        language: EN,
        lastRoute: WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR,
        providerID: null,
        selectedColor: COLORS.ELECTRIC_VIOLET2,
        theme: lightTheme,
        userAvatar: null,
        userData: null,
        modalButtonTextSize: 20,
        modalWindowTextSize: 18,
        taskListTitleSize: 21,
        taskTextSize: 18,
        notepadTextSize: 16,
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
