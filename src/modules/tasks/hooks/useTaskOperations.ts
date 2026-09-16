import { useState, useMemo, useCallback } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types/task.types';

export type TaskFilter = 'all' | 'active' | 'completed';

/**
 * 1. Single Responsibility Principle (SRP)
 * Encapsulates all task-related business logic, filtering, and modal lifecycle.
 * The consuming UI component (TasksScreen) only handles rendering the layout.
 */
export function useTaskOperations() {
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const {
    tasks,
    activeTaskId,
    toggleTask,
    deleteTask,
    setActiveTask,
    addTask,
  } = useTaskStore();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      if (filter === 'active') return !task.isCompleted;
      if (filter === 'completed') return task.isCompleted;
      return true;
    });
  }, [tasks, filter]);

  const pendingCount = useMemo(() => {
    return tasks.filter((t: Task) => !t.isCompleted).length;
  }, [tasks]);

  const openModal = useCallback(() => {
    setModalKey((prev) => prev + 1);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleCreateTask = useCallback(
    (title: string, estimatedPomodoros: number) => {
      addTask(title, estimatedPomodoros);
      closeModal();
    },
    [addTask, closeModal]
  );

  return {
    tasks: filteredTasks,
    totalTasksCount: tasks.length,
    pendingCount,
    activeTaskId,
    filter,
    setFilter,
    modalVisible,
    modalKey,
    openModal,
    closeModal,
    toggleTask,
    deleteTask,
    setActiveTask,
    createTask: handleCreateTask,
  };
}
