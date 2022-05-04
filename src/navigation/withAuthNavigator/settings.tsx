import {COLORS} from '@colors/colors';
import {styles} from '@navigation/withAuthNavigator/styles';

export const navigatorOptions = {
  headerShown: false,
  tabBarStyle: styles.tabBarContainer,
  tabBarActiveBackgroundColor: COLORS.FRESH_EGGPLANT,
  tabBarActiveTintColor: COLORS.WHITE,
  tabBarInactiveTintColor: COLORS.BLACK,
  tabBarIconStyle: styles.icon,
  tabBarLabelStyle: styles.title,
};
