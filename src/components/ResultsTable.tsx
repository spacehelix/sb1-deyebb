import React from 'react';
import { useCalculationStore } from '../stores/calculationStore';
import { Download, Trash2 } from 'lucide-react';

function ResultsTable() {
  const { calculations, removeCalculation } = useCalculationStore();

  const downloadCSV = () => {
    if (calculations.length === 0) return;

    const headers = ['Time', 'Purpose', 'Input', 'Result'];
    const csvContent = [
      headers.join(','),
      ...calculations.map(calc => [
        new Date(calc.timestamp).toLocaleString(),
        `"${calc.purpose}"`,
        calc.input,
        calc.value.toFixed(4)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `calculations-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (calculations.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-400">Results History</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No calculations yet. Start by making a conversion above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400">Results History</h2>
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Time</th>
            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Purpose</th>
            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Input</th>
            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Result</th>
            <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {calculations.map((calc) => (
            <tr key={calc.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                {new Date(calc.timestamp).toLocaleTimeString()}
              </td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{calc.purpose}</td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{calc.input}</td>
              <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{calc.value.toFixed(4)}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => removeCalculation(calc.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;