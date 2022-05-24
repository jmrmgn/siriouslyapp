import { Alert, StyleSheet } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';

import { Button } from 'react-native-paper';
import { EAppScreen } from 'routes/App/enums';
import FormDialog from 'components/FormDialog';
import { IFormCoreProps } from 'interfaces/form';
import KeywordForm from './KeywordForm';
import { TAppRouteProps } from 'routes/App/types';
import { TKeywordFormFields } from './interfaces/keyword';
import firestore from '@react-native-firebase/firestore';
import { keywordSchema } from './schemas/keyword';
import { useRoute } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';

interface IKeywordFormDialogProps extends IFormCoreProps {
  keywordId?: number;
  keyword?: any;
}

const KeywordFormDialog = (props: IKeywordFormDialogProps) => {
  const { isOpen, onClose, keyword } = props;
  const keywordsRef = firestore().collection('keywords');
  const route = useRoute<TAppRouteProps<EAppScreen.Keywords>>();
  const categoryId = route.params.categoryId;

  const isEdit = !!keyword;

  const methods = useForm<TKeywordFormFields>({
    resolver: yupResolver(keywordSchema())
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty }
  } = methods;

  const handleSuccess = (): void => {
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handlePreClose = () => {
    if (isDirty) {
      Alert.alert(
        'Discard changes',
        'Are you sure you want to discard all changes?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel'
          },
          {
            text: 'Discard',
            onPress: handleClose
          }
        ]
      );
      return;
    }

    handleClose();
  };

  const handleAdd = (data: TKeywordFormFields): void => {
    keywordsRef
      .add({
        name: data.name,
        response: data.response,
        categoryId,
        createdAt: new Date()
      })
      .then(() => {});
    handleSuccess();
  };

  const handleUpdate = (data: TKeywordFormFields): void => {
    if (keyword) {
      keywordsRef
        .doc(keyword.id)
        .update({
          name: data.name,
          response: data.response
        })
        .then(() => {});
      handleSuccess();
    }
  };

  // Pre-fill the form
  useEffect(() => {
    if (keyword) {
      reset({ ...keyword });
    }
  }, [keyword]);

  const title = isEdit ? 'Edit' : 'New';
  const actionTitle = isEdit ? 'Update' : 'Add';
  const action = isEdit ? handleUpdate : handleAdd;

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={handlePreClose}
      title={`${title} Keywords and Responses`}
      actions={
        <>
          <Button
            style={styles.formButton}
            mode="outlined"
            onPress={handlePreClose}
          >
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
