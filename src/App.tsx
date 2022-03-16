import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  StatusBar
} from 'react-native';
import React, { useEffect } from 'react';

// Context
import { Provider as AuthProvider } from '@/contexts/Auth';
// Router
import { Router } from '@/routes/Router';

// TODO: Get the theme settings in .env
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E4771F',
    accent: '#E4771F'
  }
};

// To remove tts warning
const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
ee.addListener('tts-start', () => {});
ee.addListener('tts-finish', () => {});
ee.addListener('tts-cancel', () => {});

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#E4771F');
    }
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </PaperProvider>
  );
}
