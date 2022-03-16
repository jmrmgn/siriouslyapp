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
    <View style={{ marginBottom: 20 }}>
      <Text>{label}</Text>
      <TextInput dense {...props} label={undefined} />
    </View>
  );
};

export default InputGroup;
