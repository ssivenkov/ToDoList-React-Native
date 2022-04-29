import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alertHelper';
import {delayHelper} from '@root/helpers/delayHelper';
import {setAuthStateAction} from '@store/actions/authReducerActions/setAuthStateAction';
import {setTaskListsAction} from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import {initialAuthState} from '@store/reducers/authReducer/authReducer';
import {UserDataType} from '@store/reducers/authReducer/types';
import {getUserData} from '@store/selectors/authSelectors';
import {call, put, select} from 'redux-saga/effects';

export function* signOutSaga() {
  try {
    const signOut = () => {
      return auth().signOut();
    };
    const userData: UserDataType = yield select(getUserData);
    const providerId = userData?.providerData[0]?.providerId;
    yield call(delayHelper, 10);

    yield call(signOut);

    if (providerId === 'google.com') {
      yield call(GoogleSignin.signOut);
    }
    yield put(setAuthStateAction({authState: initialAuthState}));
    yield put(setTaskListsAction({taskLists: []}));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
