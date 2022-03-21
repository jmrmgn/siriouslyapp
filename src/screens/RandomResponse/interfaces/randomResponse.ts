export interface IRandomResponse {
  id: number;
  message: string;
}

export interface IRandomResponseStore {
  counter: number;
  randomResponses: IRandomResponse[];
  getRandomResponses: () => IRandomResponse[];
  getRandomResponse: (id: number) => IRandomResponse | undefined;
  addRandomResponse: (message: string) => void;
  updateRandomResponse: (id: number, message: string) => void;
  deleteRandomResponse: (id: number) => void;
}
