import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Category as ICategory } from 'hooks/useCategories';

import { IconButton } from 'react-native-paper';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

// TODO: Move from the other
const findPhrase = (sentence: string, categories: ICategory[]): string => {
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
    if (sentence.toLowerCase().indexOf(category.keyword.toLowerCase()) !== -1) {
      matchedWords.push(category);
    }
  });

  // Has matchedWords
  if (matchedWords.length > 0) {
    phrase = matchedWords[0].phrase;
  } else {
    // TODO: Need to setup
    const randNum = Math.floor(Math.random() * noResultPhrases.length);
    phrase = noResultPhrases[randNum];
  }

  return phrase;
};

const noResultPhrases = [
  "Please repeat your statement, I can't even understand",
  'Hey, what is it again?!',
  'Go get someone to talk to',
];

const HomeScreen = () => {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [isRecord, setIsRecord] = useState(false);

  const { getItem } = useAsyncStorage('@Categories');

  const handleStop = useCallback(
    async (_command: string) => {
      if (_command !== '') {
        const categoriesData = await getItem();
        let categories;
        if (categoriesData) {
          // If there are data, it's converted to an Object and the state is updated.
          categories = JSON.parse(categoriesData);
        }
        const _response = findPhrase(_command, categories);
        setResponse(_response);
        setTimeout(() => {
          Tts.speak(_response);
        }, 500);
      }

      setIsRecord(false);
    },
    [getItem],
  );

  useEffect(() => {
    const onSpeechStart = () => {
      // console.log('# started');
    };

    const onSpeechResults = (e: any) => {
      const _command = e.value[0];
      setCommand(_command);
      handleStop(_command);
    };

    const onSpeechEnd = () => {
      Voice.stop();
      setIsRecord(false);
      // console.log('# ended');
    };

    const onSpeechError = (e: any) => {
      setIsRecord(false);
      // console.log(e);
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* <Text>Response: {response}</Text> */}
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
    paddingHorizontal: 20,
  },
  micButton: {
    backgroundColor: '#FFF',
  },
  commandTxt: {
    color: '#999999',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
