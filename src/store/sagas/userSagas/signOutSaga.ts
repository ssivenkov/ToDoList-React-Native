import { COLORS } from '@colors/colors';
import {
  FACEBOOK_PROVIDER_ID,
  GOOGLE_PROVIDER_ID,
  ONLINE,
  START_ANIMATION_DELAY,
} from '@constants/constants';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { setTaskListsAction } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import { setAuthStateAction } from '@store/actions/userReducerActions/setAuthStateAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { SignOutSagaActionReturnType } from '@store/actions/userSagaActions/signOutAction';
import { ProviderIDType } from '@store/reducers/userReducer/types';
import { providerIDSelector } from '@store/selectors/userSelectors';
import { LoginManager } from 'react-native-fbsdk-next';
import { call, delay, put, select } from 'redux-saga/effects';

export function* signOutSaga(action: SignOutSagaActionReturnType) {
  const setWaitingProcess = action.payload.setWaitingProcess;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
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
        selectedColor: COLORS.FLIRT,
        accentColor: COLORS.FLIRT,
      }),
    );

    yield put(setTaskListsAction({ taskLists: [] }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
