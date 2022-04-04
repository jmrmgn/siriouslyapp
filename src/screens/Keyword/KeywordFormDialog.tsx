import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';

import { Button } from 'react-native-paper';
import FormDialog from 'components/FormDialog';
import { IFormCoreProps } from 'interfaces/form';
import KeywordForm from './KeywordForm';
import { StyleSheet } from 'react-native';
import { TKeywordFormFields } from './interfaces/keyword';
import { keywordSchema } from './schemas/keyword';
import { yupResolver } from '@hookform/resolvers/yup';

interface IKeywordFormDialogProps extends IFormCoreProps {
  keywordId?: number;
}

const KeywordFormDialog = (props: IKeywordFormDialogProps) => {
  const { isOpen, onClose, keywordId } = props;

  const isEdit = !!keywordId;
  const randomResponse = {};

  const methods = useForm<TKeywordFormFields>({
    resolver: yupResolver(keywordSchema())
  });

  const { handleSubmit, reset } = methods;

  const handleSuccess = (): void => {
    reset();
    onClose();
  };

  const handleAdd = (data: TKeywordFormFields): void => {
    // TODO: Add
  };

  const handleUpdate = (data: TKeywordFormFields): void => {
    if (keywordId) {
      // TODO: Update
    }
  };

  const title = isEdit ? 'Edit' : 'New';
  const actionTitle = isEdit ? 'Update' : 'Add';
  const action = isEdit ? handleUpdate : handleAdd;

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={`${title} keyword`}
      actions={
        <>
          <Button style={styles.formButton} mode="outlined" onPress={onClose}>
            Cancel
          </Button>
          <Button
            style={styles.formButton}
            mode="contained"
            onPress={handleSubmit(action)}
            dark
          >
            {actionTitle}
          </Button>
        </>
      }
    >
      <FormProvider {...methods}>
        <KeywordForm />
      </FormProvider>
    </FormDialog>
  );
};

const styles = StyleSheet.create({
  formButton: {
    width: '47%'
  }
});

export default KeywordFormDialog;
