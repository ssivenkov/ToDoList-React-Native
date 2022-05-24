import {START_ANIMATION_DELAY} from '@constants/constants';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setTaskListsAction} from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import {setAuthStateAction} from '@store/actions/userReducerActions/setAuthStateAction';
import {SignOutSagaActionReturnType} from '@store/actions/userSagaActions/signOutAction';
import {UserDataType} from '@store/reducers/userReducer/types';
import {userDataSelector} from '@store/selectors/userSelectors';
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
