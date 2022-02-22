import { useCallback, useEffect, useState } from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export type Category = {
  id?: number | string;
  keyword: string;
  phrase: string;
};

const CATEGORY_KEY = '@Categories';

const useCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [categories, setCategories] = useState<Category[]>([]);
  const { getItem, setItem, removeItem } = useAsyncStorage(CATEGORY_KEY);

  const generateCategoryId = (digits: number = 5): string => {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join('');
  };

  const loadCategories = useCallback(async (): Promise<void> => {
    try {
      const categoriesData = await getItem();
      if (categoriesData) {
        // If there are data, it's converted to an Object and the state is updated.
        const _categories = JSON.parse(categoriesData);
        setCategories(_categories);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [getItem]);

  const addCategory = async (entry: Category): Promise<void> => {
    // Get entry
    // Insert in Local Storage
    const newCategories = [
      ...categories,
      { ...entry, id: generateCategoryId() },
    ];
    await setItem(JSON.stringify(newCategories));
    // Update the state
    setCategories(newCategories);
  };

  const deleteCategory = async (categoryId: number): Promise<void> => {
    // Get categoryId
    // Remove in the categories by categoryId
    const newCategories = categories.filter(
      category => category.id !== categoryId,
    );
    await setItem(JSON.stringify(newCategories));
    // Update the state
    setCategories(newCategories);
  };

  const updateCategory = async (
    categoryId: number,
    entry: Category,
  ): Promise<void> => {
    // Get the index of category by categoryId
    const categoryIndex = categories.findIndex(
      category => category.id === categoryId,
    );
    const newCategories = categories;
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      ...entry,
    };
    // Update the selected category
    await setItem(JSON.stringify(newCategories));
    // Update the state
    setCategories(newCategories);
  };

  const clearCategories = async (): Promise<void> => {
    await removeItem();
    setCategories([]);
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    addCategory,
    deleteCategory,
    updateCategory,
    clearCategories,
    loading,
    error,
  };
};

export default useCategories;
