import { create } from 'zustand';
import type { Calculation } from '../components/Calculator';

type CalculationStore = {
  calculations: Calculation[];
  addCalculation: (calc: Calculation) => void;
  removeCalculation: (id: number) => void;
};

export const useCalculationStore = create<CalculationStore>((set) => ({
  calculations: [],
  addCalculation: (calc) =>
    set((state) => ({ calculations: [calc, ...state.calculations] })),
  removeCalculation: (id) =>
    set((state) => ({
      calculations: state.calculations.filter((calc) => calc.id !== id),
    })),
}));