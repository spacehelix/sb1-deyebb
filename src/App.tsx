import React from 'react';
import { Leaf, Moon, Sun } from 'lucide-react';
import Calculator from './components/Calculator';
import ResultsTable from './components/ResultsTable';
import Notes from './components/Notes';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} dark:bg-gray-900`}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <nav className="bg-emerald-700 dark:bg-emerald-900 text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6" />
              <h1 className="text-xl font-semibold">Herbalist Calculator</h1>
            </div>
            <button
              onClick={toggle}
              className="p-2 rounded-full hover:bg-emerald-600 dark:hover:bg-emerald-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <Calculator />
              <Notes />
            </div>
            <ResultsTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;