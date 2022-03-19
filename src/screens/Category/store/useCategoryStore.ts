import { ICategory, ICategoryStore } from '../interfaces/category';

import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCategoryStore = create<ICategoryStore>(
  persist(
    (set, get) => ({
      counter: 1,
      categories: [],
      getCategory: (id: number) => {
        return get().categories.find(entry => Number(entry.id) === Number(id));
      },
      addCategory: (category: Omit<ICategory, 'id'>): void => {
        set(() => ({
          categories: [...get().categories, { ...category, id: get().counter }],
          counter: get().counter + 1
        }));
      },
      updateCategory: (id: number, category: Omit<ICategory, 'id'>): void => {
        set(() => {
          const categories = [...get().categories];
          const categoryIdx = categories.findIndex(
            cat => Number(cat.id) === Number(id)
          );
          categories[categoryIdx] = { ...categories[categoryIdx], ...category };

          return { categories };
        });
      },
      deleteCategory: (id: number): void => {
        set(() => ({
          categories: get().categories.filter(cat => Number(cat.id) !== id)
        }));
      }
    }),
    {
      name: 'category-store',
      getStorage: () => AsyncStorage
    }
  )
);
