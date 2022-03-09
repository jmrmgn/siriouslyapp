// Route Stacks
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuthStore } from 'screens/SetupScreen/store/useAuthStore';

export const Router = () => {
  const name = useAuthStore(state => state.name);

  return (
    <NavigationContainer>
      {name ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
