import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';

import { Button } from 'react-native-paper';
import FormDialog from 'components/FormDialog';
import { IFormCoreProps } from 'interfaces/form';
import { IRandomResponse } from './interfaces/randomResponse';
import { IRandomResponseFormFields } from './interfaces/formFields';
import RandomResponseForm from './RandomResponseForm';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { randomResponseSchema } from './schemas/randomResponse';
import useAuthContext from 'hooks/useAuthContext';
import { yupResolver } from '@hookform/resolvers/yup';

interface IRandomResponseFormDialogProps extends IFormCoreProps {
  // TODO: ANY
  randomResponse?: IRandomResponse;
}

const RandomResponseFormDialog = (props: IRandomResponseFormDialogProps) => {
  const { isOpen, onClose, randomResponse } = props;
  const randResponseRef = firestore().collection('randomResponses');
  const { authData } = useAuthContext();

  const isEdit = !!randomResponse;

  const methods = useForm<IRandomResponseFormFields>({
    resolver: yupResolver(randomResponseSchema)
  });

  const { handleSubmit, reset } = methods;

  const handleSuccess = (): void => {
    reset();
    onClose();
  };

  const handleAdd = (data: IRandomResponseFormFields): void => {
    // addRandomResponse(data.message);
    // TODO: Refactor and remove console
    randResponseRef
      .add({
        message: data.message,
        userId: authData.uniqueId,
        createdAt: new Date()
      })
      .then(() => {});
    handleSuccess();
  };

  const handleUpdate = (data: IRandomResponseFormFields): void => {
    if (randomResponse) {
      // TODO: Refactor any
      // updateRandomResponse(randomResponse.id as any, data.message);
      randResponseRef
        .doc(randomResponse.id)
        .update({
          message: data.message
        })
        .then(() => {});
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
