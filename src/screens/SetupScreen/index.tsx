import { Button, Text, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Tts from 'react-native-tts';
import { useAuthStore } from './store/useAuthStore';

Tts.setDefaultLanguage('en-US');

const SetupScreen = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const signIn = useAuthStore(state => state.signIn);
  const _name = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    Tts.speak('What is your name?');
  };

  const handleSave = () => {
    try {
      if (!name || name === '') {
        setErrorMessage('Name is required');
        return;
      }

      signIn(name);
    } catch (error) {}
  };

  return (
    <View style={style.container}>
      <Text>What is your name?</Text>
      <TextInput
        autoFocus
        value={name}
        onChangeText={text => setName(text)}
        dense
        placeholder="Tell me your name"
      />
      {errorMessage && <Text style={style.errorMessage}>{errorMessage}</Text>}
      <Button
        style={style.saveBtn}
        icon="check-bold"
        mode="contained"
        onPress={handleSave}
        dark
      >
        Save
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  saveBtn: {
    marginVertical: 10
  },
  errorMessage: {
    fontSize: 12,
    color: '#d9534f'
  }
});

export default SetupScreen;
