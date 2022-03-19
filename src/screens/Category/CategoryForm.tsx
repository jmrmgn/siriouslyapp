import { Controller, useFormContext } from 'react-hook-form';

import { HelperText } from 'react-native-paper';
import { ICategoryFormFields } from './interfaces/formFields';
import InputGroup from 'components/InputGroup';
import KeywordsInputField from './InputFields/KeywordsInputField';
import React from 'react';

const CategoryForm = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<ICategoryFormFields>();

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
      <KeywordsInputField />
      <Controller
        render={({ field }) => {
          return (
            <>
              <InputGroup
                label="Response"
                value={field.value as any}
                onChangeText={field.onChange}
                placeholder="Type response"
                multiline
                numberOfLines={3}
              />
              {errors?.responses && (
                <HelperText type="error" visible={!!errors.responses}>
                  {errors.responses?.message}
                </HelperText>
              )}
            </>
          );
        }}
        name="responses"
        control={control}
      />
    </>
  );
};

export default CategoryForm;
