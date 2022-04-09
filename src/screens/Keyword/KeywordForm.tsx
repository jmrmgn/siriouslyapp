import { Controller, useFormContext } from 'react-hook-form';

import { HelperText } from 'react-native-paper';
import InputGroup from 'components/InputGroup';
import React from 'react';
import { TKeywordFormFields } from './interfaces/keyword';

const KeywordForm = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<TKeywordFormFields>();

  return (
    <>
      <Controller
        render={({ field }) => (
          <>
            <InputGroup
              label="Name"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Type name"
            />
            {errors?.name && (
              <HelperText type="error" visible={!!errors.name}>
                {errors.name?.message}
              </HelperText>
            )}
          </>
        )}
        name="name"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <>
            <InputGroup
              label="Response"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Type response"
              multiline
              numberOfLines={3}
            />
            {errors?.response && (
              <HelperText type="error" visible={!!errors.response}>
                {errors.response?.message}
              </HelperText>
            )}
          </>
        )}
        name="response"
        control={control}
      />
    </>
  );
};

export default KeywordForm;
