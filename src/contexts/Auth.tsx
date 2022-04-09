import React, { createContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';

type AuthContextData = {
  authData: any; // name
  loading: boolean;
  signIn: (data: any) => Promise<void>; // could be signIn(username, password, ...)
  signOut(): Promise<void>;
};

type AuthData = {
  name: string;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const Provider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const usersRef = firestore().collection('users');

  useEffect(() => {
    loadStorage();
  }, []);

  const getUserData = async () =>
    usersRef
      .where('uniqueId', '==', getUniqueId())
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          const data = querySnapshot.docs[0].data();
          setUserData({ ...data });
        }
      });

  const loadStorage = async () => {
    try {
      // Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      getUserData();
      if (authDataSerialized) {
        // If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: any) => {
    // Must be like authService.signIn() and must return the payload
    // Setup name will suffice this signIn

    // Payload to be set in the authData
    setAuthData(data);

    await AsyncStorage.setItem('@AuthData', JSON.stringify(data));
  };

  const signOut = async () => {
    setAuthData(undefined);

    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <AuthContext.Provider
      value={{
        authData: { ...authData, ...userData },
        loading,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Provider, AuthContext };
