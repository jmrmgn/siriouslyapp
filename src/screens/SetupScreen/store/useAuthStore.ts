import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAuthStore } from '../interfaces/auth';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<IAuthStore>(
  persist(
    (set, _get) => ({
      name: null,
      signIn: (name: string) => {
        set(state => ({ ...state, name }));
      },
      signOut: () => {
        set(state => ({ ...state, name: null }));
      }
    }),
    {
      name: 'auth-store',
      getStorage: () => AsyncStorage
    }
  )
);
