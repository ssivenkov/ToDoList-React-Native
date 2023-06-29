import { ONLINE } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import auth from '@react-native-firebase/auth';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { DeleteAccountSagaActionReturnType } from '@store/actions/userSagaActions/deleteAccountAction';
import { signOutAction } from '@store/actions/userSagaActions/signOutAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { t } from 'i18next';
import { call, cancel, put, putResolve, select } from 'redux-saga/effects';

export function* deleteAccountSaga(action: DeleteAccountSagaActionReturnType) {
  const { setWaitingProcess } = action.payload;

  const { USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    const user = auth().currentUser;

    const userID: UserIDType = yield select(userIDSelector);

    const deleteUserDataInFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).remove();
    };

    const deleteUserInFirebase = () => {
      if (user) {
        return user.delete();
      }
    };

    yield call(deleteUserDataInFirebase);

    yield putResolve(signOutAction({ setWaitingProcess }));

    yield call(deleteUserInFirebase);

    yield put(
      setModalMessageAction({
        modalMessage: t('signInScreen.DeleteAccountSuccessfully'),
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
