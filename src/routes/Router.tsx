import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

// Route Stacks
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
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
