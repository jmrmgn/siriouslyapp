import {
  IRandomResponse,
  IRandomResponseStore
} from '../interfaces/randomResponse';

import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const defaultRandRes: IRandomResponse[] = [
  { id: 1, message: "Please repeat your statement, I can't even understand" },
  { id: 2, message: 'Hey, what is it again?!' },
  { id: 3, message: 'Go get someone to talk to' }
];

export const useRandomResponseStore = create<IRandomResponseStore>(
  persist(
    (set, get) => ({
      randomResponses: defaultRandRes,
      addRandomResponse: (message: string): void => {
        set(() => ({
          randomResponses: [
            ...get().randomResponses,
            { id: get().randomResponses.length + 1, message }
          ]
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
