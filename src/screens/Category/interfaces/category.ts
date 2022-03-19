export interface ICategory {
  id: number;
  name: string;
  keywords: string[];
  responses: string[];
}

export interface ICategoryStore {
  counter: number;
  categories: ICategory[];
  getCategories: () => ICategory[];
  getCategory: (id: number) => ICategory | undefined;
  addCategory: (category: Omit<ICategory, 'id'>) => void;
  updateCategory: (id: number, category: Omit<ICategory, 'id'>) => void;
  deleteCategory: (id: number) => void;
}
