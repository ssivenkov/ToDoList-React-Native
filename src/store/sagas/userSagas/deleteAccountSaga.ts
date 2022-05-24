import {USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {DeleteAccountSagaActionReturnType} from '@store/actions/userSagaActions/deleteAccountAction';
import {signOutAction} from '@store/actions/userSagaActions/signOutAction';
import {UserIDType} from '@store/reducers/userReducer/types';
import {userIDSelector} from '@store/selectors/userSelectors';
import {call, putResolve, select} from 'redux-saga/effects';

export function* deleteAccountSaga(action: DeleteAccountSagaActionReturnType) {
  const setWaitingProcess = action.payload.setWaitingProcess;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    const userID: UserIDType = yield select(userIDSelector);
    const deleteAccountInFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).remove();
    };

    yield putResolve(signOutAction({setWaitingProcess}));
    yield call(deleteAccountInFirebase);
  } catch (error) {
    errorAlert(error);
  }
}
