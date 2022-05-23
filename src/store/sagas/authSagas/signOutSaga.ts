import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alertHelper';
import {hasInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setAuthStateAction} from '@store/actions/authReducerActions/setAuthStateAction';
import {SignOutSagaActionReturnType} from '@store/actions/authSagaActions/signOutAction';
import {setTaskListsAction} from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import {initialAuthState} from '@store/reducers/authReducer/authReducer';
import {UserDataType} from '@store/reducers/authReducer/types';
import {userDataSelector} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, delay, put, select} from 'redux-saga/effects';

export function* signOutSaga(action: SignOutSagaActionReturnType) {
  const setWaitingProcess = action.payload.setWaitingProcess;
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();

    if (!hasInternetConnectionHelper(connectionStatus)) {
      errorAlert(t('common.NoInternetConnection'));

      return;
    }

    yield call(setWaitingProcess, true);
    yield delay(10);

    const signOut = () => {
      return auth().signOut();
    };
    const userData: UserDataType = yield select(userDataSelector);
    const providerId = userData?.providerData[0]?.providerId;
    yield delay(10);

    yield call(signOut);

    if (providerId === 'google.com') {
      yield call(GoogleSignin.signOut);
    }
    yield put(setAuthStateAction({authState: initialAuthState}));
    yield put(setTaskListsAction({taskLists: []}));
  } catch (error) {
    errorAlert(error);
  }
}
