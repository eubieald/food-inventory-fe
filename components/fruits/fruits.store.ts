import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FruitsDataType } from "./fruits.types";

type FruitsState = {
  fruits: FruitsDataType[];
  setFruits: (data: FruitsDataType[]) => void;
  addFruits: (data: FruitsDataType) => void;
  editingFruit: FruitsDataType | null; 
  setEditingFruit: (fruit: FruitsDataType | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useFruitsStore = create<FruitsState>()(
  persist(
    (set) => ({
      fruits: [],
      setFruits: (data) => set({ fruits: data }),
      addFruits: (data) =>
        set((state) => ({ fruits: [data, ...state.fruits] })),
      editingFruit: null,
      setEditingFruit: (fruit) => set({ editingFruit: fruit }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "fruits-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
