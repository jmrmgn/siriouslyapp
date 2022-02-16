import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Context
import { Provider as AuthProvider } from '@/contexts/Auth';
import React from 'react';
// Router
import { Router } from '@/routes/Router';

// TODO: Get the theme settings in .env
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E4771F',
    // text: '#717171',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </PaperProvider>
  );
}
