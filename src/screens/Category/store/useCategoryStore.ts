import { ICategory, ICategoryStore } from '../interfaces/category';

import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCategoryStore = create<ICategoryStore>(
  persist(
    (set, get) => ({
      categories: [],
      addCategory: (category: ICategory): void => {
        set(() => ({
          categories: [...get().categories, category]
        }));
      },
      editCategory: (id: number, category: ICategory): void => {
        set(() => {
          const categories = [...get().categories];
          const categoryIdx = categories.findIndex(
            cat => Number(cat.id) === Number(id)
          );
          categories[categoryIdx] = category;

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
