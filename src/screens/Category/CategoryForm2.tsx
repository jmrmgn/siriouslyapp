import { Controller, useFormContext } from 'react-hook-form';

import { HelperText } from 'react-native-paper';
import { ICategoryFormFields } from './interfaces/formFields';
import InputGroup from 'components/InputGroup';
import React from 'react';

const CategoryForm2 = () => {
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
    </>
  );
};

export default CategoryForm2;
