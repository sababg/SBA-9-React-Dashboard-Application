export type TaskStatus = "pending" | "in-progress" | "completed";
export type PriorityStatus = "low" | "medium" | "high";

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

export interface FilterState {
  status: TaskStatus | "all";
  priority: PriorityStatus | "all";
  search: string;
  sortBy: "createdAt" | "dueDate" | "priority";
  sortOrder: "asc" | "desc";
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
