import React from 'react';
import { Sun, Moon } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import Statistics from './components/Statistics';
import useStore from './store/useStore';

function App() {
  const { theme, toggleTheme } = useStore();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Task Manager
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? (
                <Moon size={24} className="text-gray-700 dark:text-gray-200" />
              ) : (
                <Sun size={24} className="text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>

          <Statistics />
          <PomodoroTimer />
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;