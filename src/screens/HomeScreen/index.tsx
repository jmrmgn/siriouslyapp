import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCategories, { Category as ICategory } from 'hooks/useCategories';

import { IconButton } from 'react-native-paper';
import Tts from 'react-native-tts';
import useVoiceRecognition from 'hooks/useVoiceRecognition';

const noResultPhrases = [
  "Please repeat your statement, I can't even understand",
  'Hey, what is it again?!',
  'Go get someone to talk to',
];

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
  const words = sentence.split(' ');
  const matchedWords: ICategory[] = [];

  words.forEach(word => {
    categories.forEach(category => {
      if (word.toLowerCase() === category.keyword.toLowerCase()) {
        matchedWords.push(category);
      }
    });
  });

  let phrase;
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

const HomeScreen = () => {
  const { categories } = useCategories();
  const { results, onStartRecognizing, onStopRecognizing } =
    useVoiceRecognition();
  const [isRecord, setIsRecord] = useState(false);

  const handleStart = () => {
    onStartRecognizing();
    setIsRecord(true);
  };

  const handleStop = () => {
    onStopRecognizing();
    setIsRecord(false);
    const response = findPhrase(results, categories);
    console.log('# response', response);
    console.log('# categories', categories);
    setTimeout(() => {
      Tts.speak(response);
    }, 1000);
  };

  const icon = isRecord ? 'stop-circle' : 'microphone';
  const iconColor = isRecord ? 'red' : 'gray';
  const text = isRecord ? 'Listening...' : 'Tap to speak';

  return (
    <View style={style.container}>
      <Text>{results}</Text>
      <IconButton
        style={style.micButton}
        icon={icon}
        onPress={isRecord ? handleStop : handleStart}
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
});

export default HomeScreen;
