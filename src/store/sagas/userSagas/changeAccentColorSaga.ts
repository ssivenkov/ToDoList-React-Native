import {START_ANIMATION_DELAY, USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setAccentColorAction} from '@store/actions/userReducerActions/setAccentColorAction';
import {ChangeAccentColorSagaActionReturnType} from '@store/actions/userSagaActions/changeAccentColorAction';
import {UserIDType} from '@store/reducers/userReducer/types';
import {userIDSelector} from '@store/selectors/userSelectors';
import {call, delay, put, select} from 'redux-saga/effects';

export function* changeAccentColorSaga(
  action: ChangeAccentColorSagaActionReturnType,
) {
  const {accentColor, setIsLoading} = action.payload;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const sendAccentColorToFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).update({
        accentColor: accentColor,
      });
    };

    yield call(sendAccentColorToFirebase);
    yield put(
      setAccentColorAction({
        accentColor,
      }),
    );
    yield call(setIsLoading, false);
  } catch (error) {
    yield call(setIsLoading, false);
    errorAlert(error);
  }
}
