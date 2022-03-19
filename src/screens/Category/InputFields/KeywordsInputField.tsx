import { Chip, HelperText, TextInput } from 'react-native-paper';
import { Controller, FieldErrors, useFormContext } from 'react-hook-form';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ICategoryFormFields } from '../interfaces/formFields';
import InputGroup from 'components/InputGroup';

const KeywordsInputField = () => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useFormContext<ICategoryFormFields>();

  const [keyword, setKeyword] = useState<string>();

  const handleAddKeyword = (value: string) => {
    setValue('keywords', [...(getValues('keywords') ?? []), value]);
    setKeyword('');
  };

  const handleRemoveKeyword = (value: string) => {
    const newKeywords = [...getValues('keywords')].filter(
      entry => entry !== value
    );
    setValue('keywords', newKeywords);
  };

  const isKeywordExist =
    (getValues('keywords') ?? []).indexOf(keyword ?? '') !== -1;

  return (
    <>
      <Controller
        render={({ field }) => (
          <>
            <InputGroup
              label="Keywords"
              value={keyword}
              onChangeText={(text: string) => setKeyword(text)}
              placeholder="Type keyword(s)"
              right={
                <TextInput.Icon
                  name="plus"
                  onPress={() => handleAddKeyword(keyword!)}
                  disabled={!keyword || isKeywordExist}
                />
              }
            />
            {(field.value ?? []).length > 0 && (
              <View style={styles.chipContainer}>
                {(field.value ?? []).map((entry, index: number) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveKeyword(entry)}
                    style={styles.chip}
                  >
                    {entry}
                  </Chip>
                ))}
              </View>
            )}
            {errors?.keywords && (
              <HelperText type="error" visible={!!errors.keywords}>
                {(errors.keywords as FieldErrors)?.message}
              </HelperText>
            )}
          </>
        )}
        name="keywords"
        control={control}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingVertical: 5
  },
  chip: {
    marginRight: 5,
    marginTop: 2
  }
});

export default KeywordsInputField;
