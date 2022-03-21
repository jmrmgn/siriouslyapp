import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

// Route Stacks
import AppStack from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';

export const Router = () => {
  const [authData, setAuthData] = useState();
  const [loading, setLoading] = useState(true);

  const loadStorage = async () => {
    try {
      // Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('auth-store');
      const data = JSON.parse(authDataSerialized ?? '').state.name;

      setAuthData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStorage();
  }, []);

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
