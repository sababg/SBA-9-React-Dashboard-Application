import type { TaskStatsProps } from "../../types";

export const TaskStats: React.FC<TaskStatsProps> = ({
  total,
  completed,
  pending,
  inProgress,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:w-[80%] w-[90%]">
      <StatCard label="Total" value={total} />
      <StatCard label="Completed" value={completed} />
      <StatCard label="Pending" value={pending} />
      <StatCard label="In Progress" value={inProgress} />
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-white shadow rounded-xl p-4 text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);
