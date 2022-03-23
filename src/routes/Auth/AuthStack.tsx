import { EAuthScreen } from './enums';
import React from 'react';
import SetupScreen from '@/screens/SetupScreen';
import { TAuthStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<TAuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EAuthScreen.Setup}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={EAuthScreen.Setup} component={SetupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
