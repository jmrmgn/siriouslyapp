import { EAuthScreen } from './enums';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// List of Screen
export type TAuthStackParamList = {
  [EAuthScreen.Setup]: undefined;
};
// For useNavigation()
export type TAuthNavProps = StackNavigationProp<TAuthStackParamList>;

// For useRoute()
export type TAuthRouteProps<RouteName extends keyof TAuthStackParamList> =
  RouteProp<TAuthStackParamList, RouteName>;
