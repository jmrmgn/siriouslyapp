import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCategories, { Category as ICategory } from '@/hooks/useCategories';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';

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
    phrase = "Please repeat your statement, I can't even understand";
  }

  return phrase;
};

const HomeScreen = () => {
  const { categories } = useCategories();
  useEffect(() => {
    removeName();
  }, []);

  const removeName = async () => {
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    <View style={style.container}>
      <IconButton
        style={style.micButton}
        icon="microphone"
        onPress={() => findPhrase('Something', categories)}
        size={70}
      />
      <Text>Tap to Speak</Text>
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
