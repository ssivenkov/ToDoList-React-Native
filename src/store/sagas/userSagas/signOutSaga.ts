import {
  FACEBOOK_PROVIDER_ID,
  GOOGLE_PROVIDER_ID,
  START_ANIMATION_DELAY,
} from '@constants/constants';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setTaskListsAction} from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import {setAuthStateAction} from '@store/actions/userReducerActions/setAuthStateAction';
import {SignOutSagaActionReturnType} from '@store/actions/userSagaActions/signOutAction';
import {ProviderIDType} from '@store/reducers/userReducer/types';
import {providerIDSelector} from '@store/selectors/userSelectors';
import {LoginManager} from 'react-native-fbsdk-next';
import {call, delay, put, select} from 'redux-saga/effects';

export function* signOutSaga(action: SignOutSagaActionReturnType) {
  const setWaitingProcess = action.payload.setWaitingProcess;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

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

    yield put(setAuthStateAction({userData: null, providerID: null}));

    yield put(setTaskListsAction({taskLists: []}));
  } catch (error) {
    errorAlert(error);
  }
}
