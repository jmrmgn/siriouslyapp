import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';

import { Button } from 'react-native-paper';
import CategoryForm from './CategoryForm';
import FormDialog from 'components/FormDialog';
import { ICategoryFormFields } from './interfaces/formFields';
import { IFormCoreProps } from 'interfaces/form';
import { StyleSheet } from 'react-native';
import { categorySchema } from './schemas/category';
import { useCategoryStore } from './store/useCategoryStore';
import { yupResolver } from '@hookform/resolvers/yup';

interface ICategoryFormDialogProps extends IFormCoreProps {
  categoryId?: number;
}

const CategoryFormDialog = (props: ICategoryFormDialogProps) => {
  const { isOpen, onClose, categoryId } = props;

  const { addCategory, getCategory, updateCategory, categories } =
    useCategoryStore(state => state);

  const isEdit = !!categoryId;
  const category = getCategory(categoryId!);

  const categoryNames = categories
    .filter(cat => cat.id !== categoryId)
    .map(cat => cat.name.toLowerCase());
  const keywordLists = categories
    .filter(cat => cat.id !== categoryId)
    .flatMap(cat => cat.keywords);

  const methods = useForm<ICategoryFormFields>({
    resolver: yupResolver(categorySchema(categoryNames, keywordLists))
  });
  const { handleSubmit, reset } = methods;

  const handleSuccess = (): void => {
    reset();
    onClose();
  };

  const handleAdd = (data: ICategoryFormFields) => {
    addCategory({ ...data, responses: [data.responses] });
    handleSuccess();
  };

  const handleUpdate = (data: ICategoryFormFields) => {
    if (categoryId) {
      updateCategory(categoryId, {
        name: data.name,
        keywords: data.keywords,
        responses: [data.responses]
      });
      handleSuccess();
    }
  };

  // Pre-fill the form
  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        keywords: category.keywords,
        responses: category.responses[0]
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
