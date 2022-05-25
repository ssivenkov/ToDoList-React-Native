import {FACEBOOK_PROVIDER_ID} from '@constants/constants';
import {errorAlert} from '@root/helpers/alertHelper';
import {Nullable} from '@root/types/common/types';
import {setUserAvatarAction} from '@store/actions/userReducerActions/setUserAvatarAction';
import {setUserDataAction} from '@store/actions/userReducerActions/setUserDataAction';
import {GetUserDataSagaActionReturnType} from '@store/actions/userSagaActions/getUserDataAction';
import {ProviderIDType} from '@store/reducers/userReducer/types';
import {providerIDSelector} from '@store/selectors/userSelectors';
import {Profile} from 'react-native-fbsdk-next';
import FBProfile from 'react-native-fbsdk-next/src/FBProfile';
import {put, select} from 'redux-saga/effects';

export function* getUserDataSaga(action: GetUserDataSagaActionReturnType) {
  try {
    const {userData} = action.payload;
    const providerID: ProviderIDType = yield select(providerIDSelector);

    if (providerID === FACEBOOK_PROVIDER_ID) {
      const FacebookProfile: Nullable<FBProfile> =
        yield Profile.getCurrentProfile();
      const userAvatar = FacebookProfile?.imageURL ?? null;

      yield put(setUserAvatarAction({userAvatar}));
    } else {
      const userAvatar = action.payload.userData?.photoURL ?? null;

      yield put(setUserAvatarAction({userAvatar}));
    }

    yield put(setUserDataAction({userData}));
  } catch (error) {
    errorAlert(error);
  }
}
