import { useMemo, useState } from "react";
import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";

export const TaskList = ({
  onDelete,
  onStatusChange,
  tasks,
}: TaskListProps) => {
  const [sortAscending, setSortAscending] = useState(true);

  const sortedTasks = useMemo(() => {
    return tasks.sort((a, b) => {
      const diff =
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return sortAscending ? diff : -diff;
    });
  }, [tasks, sortAscending]);

  return (
    <div className="flex flex-col items-start justify-start w-[80%] gap-4 overflow-auto">
      {sortedTasks.map((element) => (
        <div key={element.id} className="w-full">
          <TaskItem
            onDelete={onDelete}
            task={element}
            onStatusChange={onStatusChange}
          />
        </div>
      ))}
      <button
        onClick={() => setSortAscending((prev) => !prev)}
        className="cursor-pointer text-blue-500 hover:text-blue-700 fixed bottom-4 left-[10%] z-40"
      >
        Sort by Due Date {sortAscending ? "Ascending" : "Descending"}
      </button>
    </div>
  );
};
