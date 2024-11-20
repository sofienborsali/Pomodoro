import React from 'react';
import { Clock, CheckCircle2, Edit, Trash2, Timer } from 'lucide-react';
import { Task } from '../types';
import useStore from '../store/useStore';

export default function TaskList() {
  const { tasks, updateTask, deleteTask, setActiveTaskId } = useStore();

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.createdAt - a.createdAt;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg shadow-md transition-all ${
            task.completed
              ? 'bg-gray-100 dark:bg-gray-800'
              : 'bg-white dark:bg-gray-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  updateTask(task.id, { completed: !task.completed })
                }
                className="text-gray-500 hover:text-green-500 dark:text-gray-400"
              >
                <CheckCircle2
                  className={task.completed ? 'text-green-500' : ''}
                  size={20}
                />
              </button>
              <div>
                <h3
                  className={`font-medium ${
                    task.completed
                      ? 'text-gray-500 line-through'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {task.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}
              >
                {task.priority}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Clock size={16} className="mr-1" />
                {task.pomodorosCompleted}
              </span>
              <button
                onClick={() => setActiveTaskId(task.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
              >
                <Timer size={18} className="text-blue-500" />
              </button>
              <button
                onClick={() => {
                  const newTitle = prompt('Edit task title:', task.title);
                  if (newTitle) updateTask(task.id, { title: newTitle });
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
              >
                <Edit size={18} className="text-gray-500" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}