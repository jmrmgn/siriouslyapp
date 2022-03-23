import { Text, View } from 'react-native';

// Route Stacks
import AppStack from './App/AppStack';
import AuthStack from './Auth/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import useAuthContext from 'hooks/useAuthContext';

export const Router = () => {
  const { authData, loading } = useAuthContext();

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
