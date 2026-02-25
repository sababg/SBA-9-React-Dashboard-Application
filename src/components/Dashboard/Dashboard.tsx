import * as React from "react";
import { useMemo, useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";
import { TaskList } from "../TaskList/TaskList";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(taskList);
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);
  // const [filters, setFilters] = useState<FilterState>({
  //   status: "all",
  //   priority: "all",
  //   search: "",
  //   sortBy: "createdAt",
  //   sortOrder: "asc",
  // });

  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: TaskPriority;
  }>({});

  const onStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((element) =>
        element.id === taskId
          ? {
              ...element,
              status: newStatus,
            }
          : element,
      ),
    );
  };
  const handleAddNewTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...task,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const onDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((element) => taskId !== element.id));
  };

  const onAddNewTaskClick = () => {
    setIsAddNewTask((prev) => !prev);
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filters.status && task.status !== filters.status) return false;
        if (filters.priority && task.priority !== filters.priority)
          return false;
        return true;
      })
      .sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, filters]);

  return (
    <div className="w-full flex items-start justify-center h-full flex-col">
      <button
        onClick={() => onAddNewTaskClick()}
        className="bg-white text-black px-3 py-5 mx-4 my-5 cursor-pointer rounded-2xl"
      >
        Add New Task
      </button>
      <div className="w-full h-[80%] overflow-hidden flex items-center justify-center flex-col">
        {isAddNewTask ? (
          <TaskForm
            onAddNewTask={handleAddNewTask}
            onAddNewTaskClick={onAddNewTaskClick}
          />
        ) : (
          <div className="w-full flex items-center justify-center h-full flex-col">
            <TaskFilter onFilterChange={setFilters} />

            {filteredTasks.length === 0 ? (
              <p className="text-Red400 font-bold text-5xl">No tasks found.</p>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

const taskList: Task[] = [
  {
    description: "lorem ipsum",
    dueDate: "2026-03-01",
    id: "1",
    priority: "low",
    status: "completed",
    title: "lorem",
  },
  {
    description: "lorem ipsum",
    dueDate: "2026-04-01",
    id: "2",
    priority: "high",
    status: "in-progress",
    title: "ipsum",
  },
  {
    description: "lorem ipsum",
    dueDate: "2026-06-05",
    id: "3",
    priority: "medium",
    status: "pending",
    title: "lorem ipsum",
  },
];
