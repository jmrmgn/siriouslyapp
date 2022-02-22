import { useEffect, useState } from 'react';

import Voice from '@react-native-voice/voice';

const useVoiceRecognition = () => {
  // const [recognized, setRecognized] = useState('');
  // const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  // const [end, setEnd] = useState('');
  // const [started, setStarted] = useState('');
  const [results, setResults] = useState('');
  // const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    // function onSpeechStart(_: any) {
    //   // console.log('onSpeechStart: ', e);
    //   setStarted('√');
    // }
    // function onSpeechEnd(_: any) {
    //   // console.log('onSpeechEnd: ', e);
    //   setEnd('√');
    // }

    // function onSpeechError(e: any) {
    //   // console.log('onSpeechError: ', e);
    //   setError(e.value);
    // }
    function onSpeechResults(e: any) {
      // console.log('onSpeechResults: ', e);
      setResults(e.value[0]);
    }
    // function onSpeechPartialResults(e: any) {
    //   // console.log('onSpeechPartialResults: ', e);
    //   console.log('# e', e.value);
    //   setResults(e.value);
    // }
    // function onSpeechVolumeChanged(e: any) {
    //   // console.log('onSpeechVolumeChanged: ', e);
    //   setPitch(e.value);
    // }

    // Voice.onSpeechStart = onSpeechStart;
    // Voice.onSpeechEnd = onSpeechEnd;
    // Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    // Voice.onSpeechPartialResults = onSpeechPartialResults;
    // Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onStartRecognizing = async () => {
    // setPitch('');
    // setError('');
    // setStarted('');
    // setResults('');
    // setPartialResults([]);
    // setEnd('');
    try {
      console.log('Started');
      await Voice.start('en-US');
    } catch (e) {
      // console.error(e);
    }
  };

  const onStopRecognizing = async (): Promise<string> => {
    //Stops listening for speech
    await Voice.stop();
    return results;
  };

  // const onCancelRecognizing = async () => {
  //   //Cancels the speech recognition
  //   try {
  //     await Voice.cancel();
  //   } catch (e) {
  //     // console.error(e);
  //   }
  // };

  // const onDestroyRecognizer = async () => {
  //   //Destroys the current SpeechRecognizer instance
  //   try {
  //     await Voice.destroy();
  //   } catch (e) {
  //     // console.error(e);
  //   }
  //   setPitch('');
  //   setError('');
  //   setStarted('');
  //   setResults('');
  //   setPartialResults([]);
  //   setEnd('');
  // };

  return {
    // recognized,
    // pitch,
    error,
    // end,
    // started,
    results,
    // partialResults,
    onStartRecognizing,
    onStopRecognizing,
    // onCancelRecognizing,
    // onDestroyRecognizer,
  };
};

export default useVoiceRecognition;
