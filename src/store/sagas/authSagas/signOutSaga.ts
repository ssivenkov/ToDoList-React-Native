import {START_ANIMATION_DELAY} from '@constants/constants';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setAuthStateAction} from '@store/actions/authReducerActions/setAuthStateAction';
import {SignOutSagaActionReturnType} from '@store/actions/authSagaActions/signOutAction';
import {setTaskListsAction} from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import {UserDataType} from '@store/reducers/authReducer/types';
import {userDataSelector} from '@store/selectors/authSelectors';
import {call, delay, put, select} from 'redux-saga/effects';

export function* signOutSaga(action: SignOutSagaActionReturnType) {
  const setWaitingProcess = action.payload.setWaitingProcess;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield call(setWaitingProcess, true);
    yield delay(START_ANIMATION_DELAY);

    const signOut = () => {
      return auth().signOut();
    };
    const userData: UserDataType = yield select(userDataSelector);
    const providerId = userData?.providerData[0]?.providerId;
    yield delay(START_ANIMATION_DELAY);

    yield call(signOut);

    if (providerId === 'google.com') {
      yield call(GoogleSignin.signOut);
    }
    yield put(setAuthStateAction({userData: null, channelID: ''}));
    yield put(setTaskListsAction({taskLists: []}));
  } catch (error) {
    errorAlert(error);
  }
}
