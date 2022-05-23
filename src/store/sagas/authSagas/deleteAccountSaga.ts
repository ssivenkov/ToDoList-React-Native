import {USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {hasInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {DeleteAccountSagaActionReturnType} from '@store/actions/authSagaActions/deleteAccountAction';
import {signOutAction} from '@store/actions/authSagaActions/signOutAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, putResolve, select} from 'redux-saga/effects';

export function* deleteAccountSaga(action: DeleteAccountSagaActionReturnType) {
  const setWaitingProcess = action.payload.setWaitingProcess;
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();

    if (!hasInternetConnectionHelper(connectionStatus)) {
      errorAlert(t('common.NoInternetConnection'));

      return;
    }

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
