import AsyncStorage from '@react-native-async-storage/async-storage';
import { IRandomResponseStore } from '../interfaces/randomResponse';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useRandomResponseStore = create<IRandomResponseStore>(
  persist(
    (set, get) => ({
      counter: 4,
      randomResponses: [
        {
          id: 1,
          message: "Please repeat your statement, I can't even understand"
        },
        { id: 2, message: 'Hey, what is it again?!' },
        { id: 3, message: 'Go get someone to talk to' }
      ],
      getRandomResponses: () => get().randomResponses,
      getRandomResponse: (id: number) =>
        get().randomResponses.find(entry => Number(entry.id) === Number(id)),
      addRandomResponse: (message: string): void => {
        set(() => ({
          randomResponses: [
            ...get().randomResponses,
            { id: get().counter, message }
          ],
          counter: get().counter + 1
        }));
      },
      updateRandomResponse: (id: number, randomResponse: string): void => {
        set(() => {
          const randomResponses = [...get().randomResponses];
          const idx = randomResponses.findIndex(
            randRes => Number(randRes.id) === Number(id)
          );
          randomResponses[idx] = {
            ...randomResponses[idx],
            message: randomResponse
          };

          return { randomResponses };
        });
      },
      deleteRandomResponse: (id: number): void => {
        set(() => ({
          randomResponses: get().randomResponses.filter(
            randRes => Number(randRes.id) !== Number(id)
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
