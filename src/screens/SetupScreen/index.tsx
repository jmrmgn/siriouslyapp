import { Button, Text, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Tts from 'react-native-tts';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';
import useAuthContext from 'hooks/useAuthContext';

interface Props {}

const SetupScreen: React.FC<Props> = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const usersRef = firestore().collection('users');

  const auth = useAuthContext();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    Tts.speak('What is your name?');
  };

  const handleSave = async () => {
    try {
      if (!name || name === '') {
        setErrorMessage('Name is required');
        return;
      }

      // TODO: Add validation if the uniqueId exist
      const data = { name, uniqueId: getUniqueId(), createdAt: new Date() };
      await auth.signIn(data);
      usersRef.add(data);
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
