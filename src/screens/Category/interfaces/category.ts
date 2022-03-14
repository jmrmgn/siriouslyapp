interface IKeyword {
  name: string;
}

interface IResponse {
  phrase: string;
}

export interface ICategory {
  id: number;
  name: string;
  keywords: IKeyword[];
  responses: IResponse[];
}

export interface ICategoryStore {
  categories: ICategory[];
  addCategory: (category: ICategory) => void;
  editCategory: (id: number, category: ICategory) => void;
  deleteCategory: (id: number) => void;
}
