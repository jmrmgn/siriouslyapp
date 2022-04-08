import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ICategory } from 'screens/Category/interfaces/category';
import { IRandomResponse } from 'screens/RandomResponse/interfaces/randomResponse';
import { IconButton } from 'react-native-paper';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import useAuthContext from 'hooks/useAuthContext';
import { useCategoryStore } from 'screens/Category/store/useCategoryStore';
import { useRandomResponseStore } from 'screens/RandomResponse/store/useRandomResponseStore';

// TODO: Move from the other
const findPhrase = (
  sentence: string,
  categories: ICategory[],
  noResultPhrases: IRandomResponse[]
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
  const matchedWords: ICategory[] = [];

  categories.forEach(category => {
    category.keywords.map(cat => {
      if (sentence.toLowerCase().indexOf(cat.toLowerCase()) !== -1) {
        matchedWords.push(category);
      }
    });
  });

  // Has matchedWords
  if (matchedWords.length > 0) {
    phrase = matchedWords[0].responses[0];
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
  const { signOut } = useAuthContext();

  const { getCategories } = useCategoryStore(state => state);
  const { getRandomResponses } = useRandomResponseStore(state => state);

  const handleStop = useCallback(
    (_command: string) => {
      if (_command !== '') {
        const categories = getCategories();
        const randomResponses = getRandomResponses();
        const response = findPhrase(_command, categories, randomResponses);
        setTimeout(() => {
          Tts.speak(response);
        }, 500);
      }

      setIsRecord(false);
    },
    [getCategories]
  );

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
      <Text>{text}</Text>
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
