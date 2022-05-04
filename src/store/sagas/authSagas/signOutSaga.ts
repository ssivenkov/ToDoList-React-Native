import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alertHelper';
import {setAuthStateAction} from '@store/actions/authReducerActions/setAuthStateAction';
import {setTaskListsAction} from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import {initialAuthState} from '@store/reducers/authReducer/authReducer';
import {UserDataType} from '@store/reducers/authReducer/types';
import {getUserData} from '@store/selectors/authSelectors';
import {call, delay, put, select} from 'redux-saga/effects';

export function* signOutSaga() {
  try {
    const signOut = () => {
      return auth().signOut();
    };
    const userData: UserDataType = yield select(getUserData);
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
