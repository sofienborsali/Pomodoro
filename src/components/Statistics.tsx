import React from 'react';
import { Clock, CheckCircle2, Timer } from 'lucide-react';
import useStore from '../store/useStore';

export default function Statistics() {
  const { statistics } = useStore();

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tasks Completed
            </p>
            <p className="text-2xl font-bold dark:text-white">
              {statistics.tasksCompleted}
            </p>
          </div>
          <CheckCircle2
            size={24}
            className="text-green-500 dark:text-green-400"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pomodoros Completed
            </p>
            <p className="text-2xl font-bold dark:text-white">
              {statistics.pomodorosCompleted}
            </p>
          </div>
          <Timer size={24} className="text-blue-500 dark:text-blue-400" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Focus Time
            </p>
            <p className="text-2xl font-bold dark:text-white">
              {Math.round(statistics.totalWorkMinutes / 60)}h{' '}
              {statistics.totalWorkMinutes % 60}m
            </p>
          </div>
          <Clock size={24} className="text-purple-500 dark:text-purple-400" />
        </div>
      </div>
    </div>
  );
}