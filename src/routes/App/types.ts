import { EAppScreen } from './enums';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// List of Screen
export type TAppStackParamList = {
  [EAppScreen.Home]: { isMain: boolean; headerTitle: string };
  [EAppScreen.Settings]: undefined;
  [EAppScreen.Categories]: undefined;
  [EAppScreen.Keywords]: { headerTitle: string; categoryId: string };
  [EAppScreen.RandomResponses]: undefined;
};

// For useNavigation()
export type TAppNavProps = StackNavigationProp<TAppStackParamList>;

// For useRoute()
export type TAppRouteProps<RouteName extends keyof TAppStackParamList> =
  RouteProp<TAppStackParamList, RouteName>;
