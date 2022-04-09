import { Button, Text, TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Tts from 'react-native-tts';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';
import useAuthContext from 'hooks/useAuthContext';

const SetupScreen = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const usersRef = firestore().collection('users');
  const categoriesRef = firestore().collection('categories');
  const keywordsRef = firestore().collection('keywords');
  const randomResponsesRef = firestore().collection('randomResponses');

  const auth = useAuthContext();

  // useEffect(() => {
  //   init();
  // }, []);

  // const init = () => {
  //   Tts.speak('What is your name?');
  // };

  const initNewUser = async () => {
    const userId = getUniqueId();
    const defaultRandRes = [
      {
        message: "Please repeat your statement. I can't even understand",
        userId
      },
      { message: 'Is it time for your medication or mine?', userId },
      { message: 'Nice perfume. How long did you marinate in it?', userId }
    ];
    const defaultCategory = { name: 'Joke', userId };
    const defaultKeywords = [
      { name: 'beer', response: 'Are you kidding me? really?' },
      { name: 'basketball', response: 'Get your medicines first!' },
      { name: 'football', response: 'Get ready to break some ankles mate!' }
    ];

    // Check if the uniqueId exist
    const isUserExist = await usersRef
      .doc(userId)
      .get()
      .then(qs => qs.exists);
    // if exist return
    if (isUserExist) return;
    // else
    // insert 3 random responses
    const dbBatch = firestore().batch();
    defaultRandRes.forEach(doc => {
      dbBatch.set(randomResponsesRef.doc(), {
        ...doc,
        createdAt: new Date()
      });
    });
    dbBatch.commit().then(() => console.log('# added batch'));

    // insert 1 category
    categoriesRef
      .add({ ...defaultCategory, createdAt: new Date() })
      .then(catCreatedRef => {
        const catId = catCreatedRef.id;
        // insert the user
        const data = {
          name,
          uniqueId: userId,
          responseMode: catId,
          responseModeTxt: defaultCategory.name,
          createdAt: new Date()
        };
        usersRef.add(data);

        // Insert keywords
        defaultKeywords.forEach(doc => {
          keywordsRef.add({
            ...doc,
            categoryId: catCreatedRef.id,
            createdAt: new Date()
          });
        });
      });
  };

  const handleSave = async () => {
    try {
      if (!name || name === '') {
        setErrorMessage('Name is required');
        return;
      }

      // // TODO: Add validation if the uniqueId exist
      // const data = { name, uniqueId: getUniqueId(), createdAt: new Date() };
      // usersRef.add(data);
      initNewUser();
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
