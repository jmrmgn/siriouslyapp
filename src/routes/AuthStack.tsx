import { EAuthScreen } from './enums';
import React from 'react';
import SetupScreen from '@/screens/SetupScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={EAuthScreen.Setup} component={SetupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
