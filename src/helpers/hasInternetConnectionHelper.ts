import {NetInfoState} from '@react-native-community/netinfo';

export const hasInternetConnectionHelper = (connectionStatus: NetInfoState) => {
  const isInternetReachable = !!connectionStatus.isInternetReachable;
  const isConnected = !!connectionStatus.isConnected;

  return isInternetReachable || isConnected;
};
