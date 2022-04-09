import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from 'react-native-paper';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';
import { useRandomResponseStore } from 'screens/RandomResponse/store/useRandomResponseStore';

// TODO: Move from the other
const findPhrase = (
  sentence: string,
  keywords: any[],
  noResultPhrases: any[]
): string => {
  /*
    - Get the sentence
    - split them by word and set all to lowercase
    - check all words if match in the @Categories.keyword[]
      - const matchedWords = [];
      - if has/have matches:
        - push every match word to the matchedWords array
      - else:
        - get from the default phrases (need to setup)

      - get the first keyword from matchedWords array and return the phrase
  */
  let phrase;
  const matchedWords: any[] = [];

  keywords.forEach(keyword => {
    const key = keyword.name;
    const keyResponse = keyword.response;
    if (sentence.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      matchedWords.push(keyResponse);
    }
  });

  // Has matchedWords
  if (matchedWords.length > 0) {
    phrase = matchedWords[0];
  } else {
    // TODO: Need to setup
    const randNum = Math.floor(Math.random() * noResultPhrases.length);
    phrase = (noResultPhrases[randNum] ?? []).message;
  }

  return phrase;
};

const HomeScreen = () => {
  const [command, setCommand] = useState('');
  const [isRecord, setIsRecord] = useState(false);
  const [userData, setUserData] = useState<any>({});
  // const { signOut } = useAuthContext();
  const usersRef = firestore().collection('users');
  const keywordsRef = firestore().collection('keywords');
  const randomResponsesRef = firestore().collection('randomResponses');

  // const { getCategories } = useCategoryStore(state => state);
  const { getRandomResponses } = useRandomResponseStore(state => state);

  const handleStop = useCallback(async (_command: string) => {
    if (_command !== '') {
      const randRes = await randomResponsesRef
        .where('userId', '==', getUniqueId())
        .get()
        .then(querySnapshot => {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });

      const user = await usersRef
        .where('uniqueId', '==', getUniqueId())
        .get()
        .then(qs => {
          if (qs.size > 0) {
            const data = qs.docs[0].data();
            return data;
          }
        });

      const keywords = await keywordsRef
        .where('categoryId', '==', `${user?.responseMode}`)
        .orderBy('createdAt', 'asc')
        .get()
        .then(qs =>
          qs.docs.map(doc => {
            const { name, response } = doc.data();

            return {
              id: doc.id,
              name,
              response
            };
          })
        );

      const response = findPhrase(_command, keywords, randRes);
      setTimeout(() => {
        Tts.speak(response);
      }, 100);

      // usersRef
      //   .where('uniqueId', '==', getUniqueId())
      //   .get()
      //   .then(querySnapshot => {
      //     if (querySnapshot.size > 0) {
      //       const data = querySnapshot.docs[0].data();
      //       setUserData({ ...data });

      // keywordsRef
      //   .where('categoryId', '==', `${user?.responseMode}`)
      //   .orderBy('createdAt', 'asc')
      //   .onSnapshot(qs => {
      //     const entries: any[] = [];
      //     (qs ?? []).forEach(doc => {
      //       const { name, response } = doc.data();
      //       entries.push({
      //         id: doc.id,
      //         name,
      //         response
      //       });
      //     });
      //   });
      //   }
      // });
    }

    setIsRecord(false);
  }, []);

  useEffect(() => {
    // signOut();
    const onSpeechStart = () => {};

    const onSpeechResults = (e: any) => {
      const _command = e.value[0];
      setCommand(_command);
      handleStop(_command);
    };

    const onSpeechEnd = () => {
      Voice.stop();
      setIsRecord(false);
    };

    const onSpeechError = (e: any) => {
      setIsRecord(false);
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleStart = () => {
    setCommand('');
    Voice.start('en-US');
    setIsRecord(true);
  };

  const icon = isRecord ? 'stop-circle' : 'microphone';
  const iconColor = isRecord ? 'red' : 'gray';
  const text = isRecord ? 'Listening...' : 'Tap to speak';

  return (
    <View style={style.container}>
      {command ? <Text style={style.commandTxt}>{`"${command}"`}</Text> : null}
      <IconButton
        style={style.micButton}
        icon={icon}
        onPress={isRecord ? () => handleStop(command) : handleStart}
        size={70}
        color={iconColor}
      />
      <Text style={{ color: '#000' }}>{text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  micButton: {
    backgroundColor: '#FFF'
  },
  commandTxt: {
    color: '#999999',
    fontStyle: 'italic'
  }
});

export default HomeScreen;
