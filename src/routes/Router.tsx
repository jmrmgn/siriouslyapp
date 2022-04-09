import { Text, View } from 'react-native';

// Route Stacks
import AppStack from './App/AppStack';
import AuthStack from './Auth/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';
import { useEffect } from 'react';
import { useState } from 'react';

export const Router = () => {
  // const { authData, loading } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const usersRef = firestore().collection('users');

  useEffect(() => {
    return usersRef
      .where('uniqueId', '==', getUniqueId())
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          const data = querySnapshot.docs[0].data();
          setUser({ ...data });
        }
        setLoading(false);
      });
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
      {!!user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
