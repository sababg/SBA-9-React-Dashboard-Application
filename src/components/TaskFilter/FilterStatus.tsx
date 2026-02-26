import * as React from "react";
import type { FilterStatusProps } from "../../types";

const priorityColor = {
  low: "text-green-600 bg-Green50",
  medium: "text-yellow-700 bg-Yellow50",
  high: "text-Red400 bg-Red50",
};

const statusColor = {
  pending: "text-yellow-600 bg-yellow-100",
  "in-progress": "text-blue-800 bg-blue-100",
  completed: "text-green-800 bg-green-100",
};

const FilterStatus: React.FC<FilterStatusProps> = ({ filters, search }) => {
  return (
    <div className="flex gap-2 my-3 items-center justify-start sm:w-[80%] w-[90%]">
      {filters.status && (
        <span
          className={`px-7 py-3 ${statusColor[filters.status]} rounded-2xl sm:text-sm text-xs font-semibold `}
        >
          Status: {filters.status}
        </span>
      )}

      {filters.priority && (
        <span
          className={`px-7 py-3 ${priorityColor[filters.priority]} rounded-2xl sm:text-sm text-xs font-semibold`}
        >
          Priority: {filters.priority}
        </span>
      )}

      {search && (
        <span className="px-7 py-3 bg-green-100 text-green-700 rounded-2xl sm:text-sm text-xs font-semibold">
          Search: "{search}"
        </span>
      )}
    </div>
  );
};

export default FilterStatus;
