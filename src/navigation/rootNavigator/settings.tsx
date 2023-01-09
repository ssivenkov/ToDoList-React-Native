import { NativeStackExtraScreenSettingsType } from '@navigation/rootNavigator/types';

export const nativeStackExtraScreenSettings: NativeStackExtraScreenSettingsType = (
  props,
) => {
  const { accentColor } = props;

  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: accentColor },
  };
};
