import * as React from "react";
import { useMemo, useState } from "react";
import type { PriorityStatus, Task, TaskStatus } from "../../types";
import { loadTasksFromStorage, saveTasksToStorage } from "../../utils/storage";
import { filterTasks } from "../../utils/taskUtils";
import FilterStatus from "../TaskFilter/FilterStatus";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";
import Searchbar from "../TaskList/Searchbar";
import { TaskList } from "../TaskList/TaskList";
import { TaskStats } from "../TaskStats/TaskStats";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasksFromStorage();
    return stored.length ? stored : taskList;
  });
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: PriorityStatus;
  }>({});

  React.useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

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
    return filterTasks(tasks, {
      ...filters,
      search,
    });
  }, [tasks, filters, search]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;

    return { total, completed, pending, inProgress };
  }, [tasks]);

  return (
    <div className="w-full flex items-center justify-center h-full flex-col">
      <header className="w-[90%] sm:w-full">
        <button
          onClick={() => onAddNewTaskClick()}
          className="bg-white text-black px-3 py-5 sm:mx-4 mx-0 my-5 cursor-pointer rounded-2xl"
        >
          {isAddNewTask ? "Show Tasks" : "Add New Task"}
        </button>
      </header>
      <main className="w-full h-[80%] overflow-hidden flex items-center justify-center flex-col">
        {isAddNewTask ? (
          <TaskForm
            onAddNewTask={handleAddNewTask}
            onAddNewTaskClick={onAddNewTaskClick}
          />
        ) : (
          <div className="w-full flex items-center justify-center h-full flex-col">
            <div className="flex sm:items-center items-start justify-start sm:justify-between sm:w-[80%] w-[90%] sm:flex-row flex-col gap-4">
              <TaskFilter onFilterChange={setFilters} />
              <Searchbar value={search} onSearch={setSearch} />
            </div>
            <FilterStatus filters={filters} search={search} />
            {filteredTasks.length === 0 ? (
              <p className="text-Red400 font-bold sm:text-5xl text-2xl mb-3.5">
                No tasks found.
              </p>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            )}
            <TaskStats {...stats} />
          </div>
        )}
      </main>
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
    title: "saba",
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
    description: "saba",
    dueDate: "2026-06-05",
    id: "3",
    priority: "medium",
    status: "pending",
    title: "lorem ipsum",
  },
];
