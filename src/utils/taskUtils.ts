import type { FormErrors, SortOrder, Task, TaskFilters } from "../types";

export const filterTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  // filter task
  return tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;

    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matches =
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search);

      if (!matches) return false;
    }

    return true;
  });
};

export const sortTasks = (tasks: Task[], order: SortOrder = "asc"): Task[] => {
  //sort task
  const sorted = [...tasks].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return order === "desc" ? sorted.reverse() : sorted;
};

export const validateTask = (values: Omit<Task, "id">): FormErrors => {
  // form validation
  const errors: FormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  }

  if (!values.dueDate) {
    errors.dueDate = "Due date is required";
  } else if (new Date(values.dueDate) < new Date()) {
    errors.dueDate = "Due date cannot be in the past";
  }

  if (!values.priority) {
    errors.priority = "Priority is required!";
  }

  if (!values.status) {
    errors.status = "Status is required!";
  }

  return errors;
};
