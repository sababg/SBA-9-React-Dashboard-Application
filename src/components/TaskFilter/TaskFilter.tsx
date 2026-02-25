import type { PriorityStatus, TaskFilterProps, TaskStatus } from "../../types";

const TaskFilter = ({ onFilterChange }: TaskFilterProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    data: string,
  ) => {
    if (data === "status")
      onFilterChange({ status: e.target.value as TaskStatus });
    else {
      onFilterChange({ priority: e.target.value as PriorityStatus });
    }
  };

  return (
    <>
      <div className="flex gap-4 p-4 w-[80%] justify-start">
        <div>
          <label
            htmlFor="status-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status-filter"
            onChange={(e) => handleChange(e, "status")}
            className="bg-Green50 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none "
          >
            {statusOption.map((element) => (
              <option
                key={element.value}
                value={element.value}
                className="bg-Green300 text-black hover:bg-slate-600 cursor-pointer"
              >
                {element.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="priority-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Priority
          </label>
          <select
            id="priority-filter"
            onChange={(e) => handleChange(e, "priority")}
            className="bg-Green50 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:outline-none focus:ring-white"
          >
            {priorityOption.map((element) => (
              <option
                key={element.value}
                value={element.value}
                className="bg-Green300 text-black"
              >
                {element.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default TaskFilter;

const statusOption = [
  {
    name: "All Status",
    value: "",
  },
  {
    name: "pending",
    value: "pending",
  },
  {
    name: "In progress",
    value: "in-progress",
  },
  {
    name: "completed",
    value: "completed",
  },
];
const priorityOption = [
  {
    name: "All Priority",
    value: "",
  },
  {
    name: "low",
    value: "low",
  },
  {
    name: "medium",
    value: "medium",
  },
  {
    name: "high",
    value: "high",
  },
];
