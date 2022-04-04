export interface IKeyword {
  id: number;
  name: string;
  response: string;
}

export type TKeywordFormFields = Omit<IKeyword, 'id'>;
