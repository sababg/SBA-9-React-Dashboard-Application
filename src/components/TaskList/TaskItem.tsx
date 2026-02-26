import {
  TaskStatusEnum,
  type TaskItemProps,
  type TaskStatus,
} from "../../types";

const priorityColor = {
  low: "text-green-600",
  medium: "text-yellow-700",
  high: "text-Red400",
};

const statusColor = {
  pending: "text-yellow-600",
  "in-progress": "text-blue-800",
  completed: "text-green-800",
};

export const TaskItem: React.FC<TaskItemProps> = ({
  // show each task
  task,
  onStatusChange,
  onDelete,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, event.target.value as TaskStatus);
  };

  return (
    <>
      <div
        className={`sm:p-4 p-2 border rounded-lg shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 active:translate-0 active:shadow-olive-500 ${task.status === TaskStatusEnum.Completed ? "opacity-60" : "opacity-100"} ${task.status === TaskStatusEnum.Pending ? "border-l-8 border-yellow-600" : task.status === TaskStatusEnum.InProgress ? "border-l-8 border-blue-800" : "border-l-8 border-green-800"}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-Black100"> {task.description}</p>
          </div>

          <div className="flex sm:gap-2 gap-0.5">
            <select
              value={task.status}
              onChange={handleChange}
              className={`px-2 focus:outline-none cursor-pointer py-1 rounded bg-Green50 sm:text-xl text-xs mx-2 ${statusColor[task.status]}`}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              className="text-Red400 hover:text-red-700 cursor-pointer py-2 px-3 sm:text-xl text-xs"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-2 flex gap-4 text-sm">
          <span className={`${priorityColor[task.priority]} font-semibold`}>
            Priority: {task.priority}
          </span>
          <span className="text-Black100">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </>
  );
};
