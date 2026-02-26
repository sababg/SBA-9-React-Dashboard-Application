export type TaskStatus = "pending" | "in-progress" | "completed";
export type PriorityStatus = "low" | "medium" | "high";
export type FormErrors = Partial<Record<keyof Omit<Task, "id">, string>>;
export type ValidateFn = (values: Omit<Task, "id">) => FormErrors;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: PriorityStatus;
  dueDate: string;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: PriorityStatus;
  }) => void;
}

export interface TaskFormProps {
  onAddNewTask: (task: Omit<Task, "id">) => void;
  onAddNewTaskClick: () => void;
}

export interface TaskFormErrors {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
}

export const TaskStatusEnum = {
  Pending: "pending",
  InProgress: "in-progress",
  Completed: "completed",
} as const;

export interface SearchbarProps {
  onSearch: (value: string) => void;
  value: string;
}

export interface FilterStatusProps {
  filters: {
    status?: TaskStatus;
    priority?: PriorityStatus;
  };
  search?: string;
}

export interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: PriorityStatus;
  search?: string;
}

export type SortBy = "dueDate" | "priority" | "title";
export type SortOrder = "asc" | "desc";
