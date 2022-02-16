import { Text, View } from 'react-native';

// Route Stacks
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import useAuth from '@/hooks/useAuth';

export const Router = () => {
  const { authData, loading } = useAuth();

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
