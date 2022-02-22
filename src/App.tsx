import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  StatusBar,
} from 'react-native';

// Context
import { Provider as AuthProvider } from '@/contexts/Auth';
import React, { useEffect } from 'react';
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
