import React, { useState } from 'react';
import { calculations } from '../data/calculations';
import { useCalculationStore } from '../stores/calculationStore';

export type Calculation = {
  id: number;
  value: number;
  purpose: string;
  input: number;
  timestamp: number;
};

function Calculator() {
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [inputValue, setInputValue] = useState('');
  const addCalculation = useCalculationStore((state) => state.addCalculation);

  const calculate = () => {
    if (!selectedPurpose || !inputValue) return;

    const calculation = calculations.find(c => c.purpose === selectedPurpose);
    if (!calculation) return;

    const input = parseFloat(inputValue);
    const result = eval(calculation.equation.replace(/[CH]\d+/, input.toString()));

    const newCalculation: Calculation = {
      id: Date.now(),
      value: result,
      purpose: selectedPurpose,
      input: input,
      timestamp: Date.now(),
    };

    addCalculation(newCalculation);
    setInputValue('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-400">Conversion Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Purpose
          </label>
          <select
            value={selectedPurpose}
            onChange={(e) => setSelectedPurpose(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">Select a conversion...</option>
            {calculations.map((calc) => (
              <option key={calc.purpose} value={calc.purpose}>
                {calc.purpose}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter Value
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="Enter value to convert..."
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}

export default Calculator;