import React, { createContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
  authData: any; // name
  loading: boolean;
  signIn(name: string): Promise<void>; // could be signIn(username, password, ...)
  signOut(): Promise<void>;
};

type AuthData = {
  name: string;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const Provider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorage();
  }, []);

  const loadStorage = async () => {
    try {
      // Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
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

  const signIn = async (name: string) => {
    // Must be like authService.signIn() and must return the payload
    // Setup name will suffice this signIn

    // Payload to be set in the authData
    const payload = { name };
    setAuthData(payload);

    await AsyncStorage.setItem('@AuthData', JSON.stringify(payload));
  };

  const signOut = async () => {
    setAuthData(undefined);

    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { Provider, AuthContext };
