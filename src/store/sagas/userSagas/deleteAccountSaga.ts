import {ONLINE, USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {checkInternetConnectionHelper} from '@root/helpers/checkInternetConnectionHelper';
import {setModalErrorMessageAction} from '@store/actions/userReducerActions/setModalErrorMessageAction';
import {DeleteAccountSagaActionReturnType} from '@store/actions/userSagaActions/deleteAccountAction';
import {signOutAction} from '@store/actions/userSagaActions/signOutAction';
import {UserIDType} from '@store/reducers/userReducer/types';
import {userIDSelector} from '@store/selectors/userSelectors';
import {call, put, putResolve, select} from 'redux-saga/effects';

export function* deleteAccountSaga(action: DeleteAccountSagaActionReturnType) {
  const setWaitingProcess = action.payload.setWaitingProcess;
  try {
    const internetConnectionStatus: string = yield call(
      checkInternetConnectionHelper,
    );

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
    }

    const userID: UserIDType = yield select(userIDSelector);
    const deleteAccountInFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).remove();
    };

    yield putResolve(signOutAction({setWaitingProcess}));
    yield call(deleteAccountInFirebase);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({errorModalMessage: error.message}));
    }
  }
}
