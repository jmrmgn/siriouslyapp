export interface IRandomResponse {
  id: number;
  message: string;
}

export interface IRandomResponseStore {
  randomResponses: IRandomResponse[];
  addRandomResponse: (message: string) => void;
  editRandomResponse: (id: number, randomResponse: IRandomResponse) => void;
  deleteRandomResponse: (id: number) => void;
}
