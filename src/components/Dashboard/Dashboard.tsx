import * as React from "react";
import { useMemo, useState } from "react";
import type { PriorityStatus, Task, TaskStatus } from "../../types";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";
import Searchbar from "../TaskList/Searchbar";
import { TaskList } from "../TaskList/TaskList";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(taskList);
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: PriorityStatus;
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

        if (
          search &&
          !task.title.toLowerCase().includes(search.toLowerCase()) &&
          !task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, filters, search]);

  return (
    <div className="w-full flex items-start justify-center h-full flex-col">
      <button
        onClick={() => onAddNewTaskClick()}
        className="bg-white text-black px-3 py-5 mx-4 my-5 cursor-pointer rounded-2xl"
      >
        {isAddNewTask ? "Show Tasks" : "Add New Task"}
      </button>
      <div className="w-full h-[80%] overflow-hidden flex items-center justify-center flex-col">
        {isAddNewTask ? (
          <TaskForm
            onAddNewTask={handleAddNewTask}
            onAddNewTaskClick={onAddNewTaskClick}
          />
        ) : (
          <div className="w-full flex items-center justify-center h-full flex-col">
            <div className="flex items-center justify-between w-[80%]">
              <TaskFilter onFilterChange={setFilters} />
              <Searchbar value={search} onSearch={setSearch} />
            </div>

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
