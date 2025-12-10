// For existing fruits from API (with id)
export type FruitsDataType = {
  id: number;
  name: string;
  type: string;
  stock: number;
  price: number;
};

export type FormInputType = {
  name: string;
  type: string;
  stock: string;
  price: string;
};
