import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';

import { Button } from 'react-native-paper';
import FormDialog from 'components/FormDialog';
import { IFormCoreProps } from 'interfaces/form';
import { IRandomResponseFormFields } from './interfaces/formFields';
import RandomResponseForm from './RandomResponseForm';
import { StyleSheet } from 'react-native';
import { randomResponseSchema } from './schemas/randomResponse';
import { useRandomResponseStore } from './store/useRandomResponseStore';
import { yupResolver } from '@hookform/resolvers/yup';

interface IRandomResponseFormDialogProps extends IFormCoreProps {
  randomResponseId?: number;
}

const RandomResponseFormDialog = (props: IRandomResponseFormDialogProps) => {
  const { isOpen, onClose, randomResponseId } = props;

  const { addRandomResponse, getRandomResponse, updateRandomResponse } =
    useRandomResponseStore(state => state);

  const isEdit = !!randomResponseId;
  const randomResponse = getRandomResponse(randomResponseId!);

  const methods = useForm<IRandomResponseFormFields>({
    resolver: yupResolver(randomResponseSchema)
  });

  const { handleSubmit, reset } = methods;

  const handleSuccess = (): void => {
    reset();
    onClose();
  };

  const handleAdd = (data: IRandomResponseFormFields): void => {
    addRandomResponse(data.message);
    handleSuccess();
  };

  const handleUpdate = (data: IRandomResponseFormFields): void => {
    if (randomResponseId) {
      updateRandomResponse(randomResponseId, data.message);
      handleSuccess();
    }
  };

  // Pre-fill the form
  useEffect(() => {
    if (randomResponse) {
      reset({ message: randomResponse.message });
    }
  }, [randomResponse]);

  const title = isEdit ? 'Edit' : 'New';
  const actionTitle = isEdit ? 'Update' : 'Add';
  const action = isEdit ? handleUpdate : handleAdd;

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={`${title} Random Response`}
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
        <RandomResponseForm />
      </FormProvider>
    </FormDialog>
  );
};

const styles = StyleSheet.create({
  formButton: {
    width: '47%'
  }
});

export default RandomResponseFormDialog;
