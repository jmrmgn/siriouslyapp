export interface IRandomResponse {
  id: number;
  message: string;
}

export interface IRandomResponseStore {
  randomResponses: IRandomResponse[];
  addRandomResponse: (randomResponse: IRandomResponse) => void;
  editRandomResponse: (id: number, randomResponse: IRandomResponse) => void;
  deleteRandomResponse: (id: number) => void;
}
