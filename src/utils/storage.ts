import type { Task } from "../types";

const STORAGE_KEY = "task-dashboard-data";

export const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadTasksFromStorage = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Task[];
  } catch {
    return [];
  }
};
