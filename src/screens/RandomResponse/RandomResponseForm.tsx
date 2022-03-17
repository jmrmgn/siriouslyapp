import { Controller, useFormContext } from 'react-hook-form';

import { HelperText } from 'react-native-paper';
import { IRandomResponseFormFields } from './interfaces/formFields';
import InputGroup from 'components/InputGroup';
import React from 'react';

const RandomResponseForm = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<IRandomResponseFormFields>();

  return (
    <>
      <Controller
        render={({ field }) => {
          return (
            <>
              <InputGroup
                label="Response"
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Type random response"
                multiline
                numberOfLines={3}
              />
              <HelperText type="error" visible={!!errors.message}>
                {errors.message?.message}
              </HelperText>
            </>
          );
        }}
        name="message"
        control={control}
      />
    </>
  );
};

export default RandomResponseForm;
