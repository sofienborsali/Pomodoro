import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TimerSettings, Statistics } from '../types';

interface State {
  tasks: Task[];
  activeTaskId: string | null;
  timerSettings: TimerSettings;
  statistics: Statistics;
  theme: 'light' | 'dark';
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'pomodorosCompleted'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setActiveTaskId: (id: string | null) => void;
  updateTimerSettings: (settings: Partial<TimerSettings>) => void;
  incrementPomodoro: (taskId: string) => void;
  toggleTheme: () => void;
}

const useStore = create<State>()(
  persist(
    (set) => ({
      tasks: [],
      activeTaskId: null,
      timerSettings: {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        longBreakInterval: 4,
      },
      statistics: {
        tasksCompleted: 0,
        pomodorosCompleted: 0,
        totalWorkMinutes: 0,
      },
      theme: 'light',

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
              pomodorosCompleted: 0,
            },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
          statistics:
            updates.completed && !state.tasks.find((t) => t.id === id)?.completed
              ? {
                  ...state.statistics,
                  tasksCompleted: state.statistics.tasksCompleted + 1,
                }
              : state.statistics,
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
        })),

      setActiveTaskId: (id) => set({ activeTaskId: id }),

      updateTimerSettings: (settings) =>
        set((state) => ({
          timerSettings: { ...state.timerSettings, ...settings },
        })),

      incrementPomodoro: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, pomodorosCompleted: task.pomodorosCompleted + 1 }
              : task
          ),
          statistics: {
            ...state.statistics,
            pomodorosCompleted: state.statistics.pomodorosCompleted + 1,
            totalWorkMinutes:
              state.statistics.totalWorkMinutes + state.timerSettings.workDuration,
          },
        })),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'task-management-storage',
    }
  )
);

export default useStore;