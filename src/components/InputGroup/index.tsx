import { Text, TextInput } from 'react-native-paper';

import React from 'react';
import { View } from 'react-native';

type InputGroupProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  autoFocus?: boolean;
};

const InputGroup = (props: InputGroupProps) => {
  const { label } = props;
  return (
    <View>
      <Text>{label}</Text>
      <TextInput dense autoCorrect={false} {...props} label={undefined} />
    </View>
  );
};

export default InputGroup;
