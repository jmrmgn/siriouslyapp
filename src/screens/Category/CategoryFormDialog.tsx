import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';

import { Button } from 'react-native-paper';
import CategoryForm from './CategoryForm';
import FormDialog from 'components/FormDialog';
import { ICategory } from './interfaces/category';
import { ICategoryFormFields } from './interfaces/formFields';
import { IFormCoreProps } from 'interfaces/form';
import { StyleSheet } from 'react-native';
import { categorySchema } from './schemas/category';
import firestore from '@react-native-firebase/firestore';
import useAuthContext from 'hooks/useAuthContext';
import { useCategoryStore } from './store/useCategoryStore';
import { yupResolver } from '@hookform/resolvers/yup';

interface ICategoryFormDialogProps extends IFormCoreProps {
  categoryId?: number;
  category?: any; // TODO: any
}

const CategoryFormDialog = (props: ICategoryFormDialogProps) => {
  const { isOpen, onClose, category } = props;
  const { authData } = useAuthContext();
  const categoriesRef = firestore().collection('categories');

  const isEdit = !!category;

  const methods = useForm<ICategoryFormFields>({
    resolver: yupResolver(categorySchema())
  });
  const { handleSubmit, reset } = methods;

  const handleSuccess = (): void => {
    reset();
    onClose();
  };

  const handleAdd = (data: ICategoryFormFields) => {
    categoriesRef.add({
      name: data.name,
      userId: authData.uniqueId,
      createdAt: new Date()
    });
    handleSuccess();
  };

  const handleUpdate = (data: ICategoryFormFields) => {
    if (category) {
      categoriesRef.doc(category.id).update({ name: data.name });
      handleSuccess();
    }
  };

  // Pre-fill the form
  useEffect(() => {
    if (category) {
      reset({
        name: category.name
      });
    }
  }, [category]);

  const title = isEdit ? 'Edit' : 'New';
  const actionTitle = isEdit ? 'Update' : 'Add';
  const action = isEdit ? handleUpdate : handleAdd;

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={`${title} Category`}
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
        <CategoryForm />
      </FormProvider>
    </FormDialog>
  );
};

const styles = StyleSheet.create({
  formButton: {
    width: '47%'
  }
});

export default CategoryFormDialog;
