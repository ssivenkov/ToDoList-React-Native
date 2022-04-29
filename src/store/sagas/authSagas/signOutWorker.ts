import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alert';
import {delay} from '@root/helpers/delay';
import {setAuthState} from '@store/actions/authReducerActions/setAuthState';
import {setTaskLists} from '@store/actions/tasksReducerActions/taskListsActions/setTaskLists';
import {initialAuthState} from '@store/reducers/authReducer/authReducer';
import {UserDataType} from '@store/reducers/authReducer/types';
import {getUserData} from '@store/selectors/authSelectors';
import {call, put, select} from 'redux-saga/effects';

export function* signOutWorker() {
  try {
    const signOut = () => {
      return auth().signOut();
    };
    const userData: UserDataType = yield select(getUserData);
    const providerId = userData?.providerData[0]?.providerId;
    yield call(delay, 10);

    yield call(signOut);

    if (providerId === 'google.com') {
      yield call(GoogleSignin.signOut);
    }
    yield put(setAuthState({authState: initialAuthState}));
    yield put(setTaskLists({taskLists: []}));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
