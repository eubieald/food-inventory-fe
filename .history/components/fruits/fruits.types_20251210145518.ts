// export type FruitsListResponseType = {
//   data: FruitsDataType[];
// };

// export type FruitsListDataType = {
//   fruits: FruitsDataType[];
// };

export type FruitsDataType = {
  name: string;
  type: string;
  stock: string;
  price: string;
};

export type AddFruitsDataType = {
  id: string;
  name: string;
  type: string;
  stock: string;
  price: string;
};
