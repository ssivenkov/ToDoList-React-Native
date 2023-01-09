import { ONLINE } from '@constants/constants';
import { CONTACT_THE_AUTHOR_ENDPOINT } from '@env';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { contactTheAuthorInstance } from '@root/api/instances';
import { SendMessageResponseDataType } from '@screens/contactTheAuthorScreen/types';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { ContactTheAuthorSagaSagaActionReturnType } from '@store/actions/userSagaActions/contactTheAuthorAction';
import { t } from 'i18next';
import { call, cancel, put, SagaReturnType } from 'redux-saga/effects';

export function* contactTheAuthorSaga(action: ContactTheAuthorSagaSagaActionReturnType) {
  const { values, navigate, setIsSubmitting } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      setIsSubmitting(false);

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
        setModalMessageAction({
          modalMessage: t('contactTheAuthorScreen.ContactTheAuthorSuccess'),
        }),
      );
    } else {
      yield put(
        setModalMessageAction({
          modalMessage: t('contactTheAuthorScreen.ContactTheAuthorError'),
        }),
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
