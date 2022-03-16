import {
  IRandomResponse,
  IRandomResponseStore
} from '../interfaces/randomResponse';

import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useRandomResponseStore = create<IRandomResponseStore>(
  persist(
    (set, get) => ({
      randomResponses: [],
      addRandomResponse: (randomResponse: IRandomResponse): void => {
        set(() => ({
          randomResponses: [...get().randomResponses, randomResponse]
        }));
      },
      editRandomResponse: (
        id: number,
        randomResponse: IRandomResponse
      ): void => {
        set(() => {
          const randomResponses = [...get().randomResponses];
          const idx = randomResponses.findIndex(
            randRes => Number(randRes.id) === Number(id)
          );
          randomResponses[idx] = randomResponse;

          return { randomResponses };
        });
      },
      deleteRandomResponse: (id: number): void => {
        set(() => ({
          randomResponses: get().randomResponses.filter(
            randRes => Number(randRes.id) !== id
          )
        }));
      }
    }),
    {
      name: 'random-response-store',
      getStorage: () => AsyncStorage
    }
  )
);
