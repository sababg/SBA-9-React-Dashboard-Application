import { useMemo, useState } from "react";
import type { TaskListProps } from "../../types";
import { sortTasks } from "../../utils/taskUtils";
import { TaskItem } from "./TaskItem";

export const TaskList = ({
  // Show list of tasks
  onDelete,
  onStatusChange,
  tasks,
}: TaskListProps) => {
  const [sortAscending, setSortAscending] = useState(true);

  const sortedTasks = useMemo(() => {
    // sort data
    return sortTasks(tasks, sortAscending ? "asc" : "desc");
  }, [tasks, sortAscending]);

  return (
    <div className="flex flex-col items-start justify-start sm:w-[80%] w-[90%] gap-4 overflow-hidden pt-2.5 mb-3.5">
      <div className="h-[94%] w-full overflow-y-auto gap-4 flex flex-col items-start justify-start pt-2">
        {sortedTasks.map((element) => (
          <div key={element.id} className="w-full">
            <TaskItem
              onDelete={onDelete}
              task={element}
              onStatusChange={onStatusChange}
            />
          </div>
        ))}
      </div>
      <button // filter by due date
        onClick={() => setSortAscending((prev) => !prev)}
        className="cursor-pointer text-blue-500 hover:text-blue-700 z-40"
      >
        Sort by Due Date {sortAscending ? "Ascending" : "Descending"}
      </button>
    </div>
  );
};
