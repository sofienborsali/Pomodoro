export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  createdAt: number;
  completedAt?: number;
  pomodorosCompleted: number;
}

export interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

export interface Statistics {
  tasksCompleted: number;
  pomodorosCompleted: number;
  totalWorkMinutes: number;
}