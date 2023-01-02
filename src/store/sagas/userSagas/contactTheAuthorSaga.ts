import { ONLINE } from '@constants/constants';
import { CONTACT_THE_AUTHOR_ENDPOINT } from '@env';
import { contactTheAuthorInstance } from '@root/api/instances';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { SendMessageResponseDataType } from '@root/screens/contactTheAuthorScreen/types';
import * as Sentry from '@sentry/react-native';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { ContactTheAuthorSagaSagaActionReturnType } from '@store/actions/userSagaActions/contactTheAuthorAction';
import { t } from 'i18next';
import { call, cancel, put, SagaReturnType } from 'redux-saga/effects';

export function* contactTheAuthorSaga(action: ContactTheAuthorSagaSagaActionReturnType) {
  try {
    const { values, navigate } = action.payload;

    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(
        setModalErrorMessageAction({ errorModalMessage: internetConnectionStatus }),
      );

      yield cancel();
    }

    const formData = Object.entries(values).reduce<FormData>((acc, [k, v]) => {
      acc.append(k, v);

      return acc;
    }, new FormData());

    const sendMessage = (formData: FormData) => {
      return contactTheAuthorInstance.post<SendMessageResponseDataType>(
        CONTACT_THE_AUTHOR_ENDPOINT,
        {
          formData,
        },
      );
    };

    const result: SagaReturnType<typeof sendMessage> = yield call(sendMessage, formData);

    if (result.data.ok) {
      yield call(navigate);
      yield put(
        setModalErrorMessageAction({
          errorModalMessage: t('contactTheAuthorScreen.ContactTheAuthorSuccess'),
        }),
      );
    } else {
      yield put(
        setModalErrorMessageAction({
          errorModalMessage: t('contactTheAuthorScreen.ContactTheAuthorError'),
        }),
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
