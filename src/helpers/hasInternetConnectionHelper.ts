import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {errorAlert} from '@root/helpers/alertHelper';
import {t} from 'i18next';

const hasInternetConnection = (connectionStatus: NetInfoState) => {
  const isInternetReachable = !!connectionStatus.isInternetReachable;
  const isConnected = !!connectionStatus.isConnected;

  return isInternetReachable || isConnected;
};

export const checkInternetConnectionHelper = async () => {
  try {
    const connectionStatus: NetInfoState = await NetInfo.fetch();

    if (!hasInternetConnection(connectionStatus)) {
      errorAlert(t('common.NoInternetConnection'));

      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};
