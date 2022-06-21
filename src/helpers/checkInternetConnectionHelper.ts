import { ONLINE } from '@constants/constants';
import { fetch as netInfoFetch, NetInfoState } from '@react-native-community/netinfo';
import { t } from 'i18next';

const hasInternetConnection = (connectionStatus: NetInfoState) => {
  const isInternetReachable = !!connectionStatus.isInternetReachable;
  const isConnected = !!connectionStatus.isConnected;

  return isInternetReachable || isConnected;
};

export const checkInternetConnectionHelper = async () => {
  try {
    const connectionStatus: NetInfoState = await netInfoFetch();

    if (!hasInternetConnection(connectionStatus)) {
      return t('common.NoInternetConnection');
    } else {
      return ONLINE;
    }
  } catch (error) {
    return false;
  }
};
