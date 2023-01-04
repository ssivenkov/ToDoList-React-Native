import { COLORS } from '@colors/colors';
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
import { providerIDSelector } from '@store/selectors/userSelectors';
import { LoginManager } from 'react-native-fbsdk-next';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

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

    yield put(
      setAuthStateAction({
        userData: null,
        providerID: null,
        isUserDataSynchronized: false,
        selectedColor: COLORS.ELECTRIC_VIOLET2,
        accentColor: COLORS.ELECTRIC_VIOLET2,
      }),
    );

    yield put(setTaskListsAction({ taskLists: [] }));
    yield put(setNotepadTextAction({ notepadText: '' }));
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
