import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@/services/storageService';
import { Task } from '../types/task.types';

interface TaskState {
  tasks: Task[];
  activeTaskId: string | null;
  addTask: (title: string, estimatedPomodoros: number) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;
  incrementTaskPomodoro: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      activeTaskId: null,

      addTask: (title, estimatedPomodoros) => {
        const newTask: Task = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
          title: title.trim(),
          estimatedPomodoros: Math.max(1, estimatedPomodoros),
          completedPomodoros: 0,
          isCompleted: false,
          createdAt: Date.now(),
        };

        set((state) => {
          const updated = [newTask, ...state.tasks];
          return {
            tasks: updated,
            activeTaskId: state.activeTaskId || newTask.id,
          };
        });
      },

      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          ),
          activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
        }));
      },

      setActiveTask: (id) => {
        set({ activeTaskId: id });
      },

      incrementTaskPomodoro: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
              : task
          ),
        }));
      },
    }),
    {
      name: 'pomodoro-tasks-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
