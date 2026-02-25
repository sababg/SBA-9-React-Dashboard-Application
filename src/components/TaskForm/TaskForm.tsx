import * as React from "react";
import type { Task, TaskFormProps } from "../../types";

const TaskForm: React.FC<TaskFormProps> = ({
  onAddNewTask,
  onAddNewTaskClick,
}) => {
  const [formData, setFormData] = React.useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddNewTask(formData);
    onAddNewTaskClick();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-start w-[50%] bg-white px-9 py-12 rounded-2xl shadow-2xl gap-5"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
        ></textarea>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
        />
        <div className="flex items-center justify-between gap-3.5 w-full">
          <select
            required
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            required
            value={formData.status}
            name="status"
            onChange={handleChange}
            className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex items-center justify-between gap-3.5 w-full">
          <button
            type="submit"
            className="w-full mt-3.5 bg-Green300 text-black py-3 rounded-xl cursor-pointer hover:scale-90 font-semibold"
          >
            Add Task
          </button>
          <button
            onClick={() => onAddNewTaskClick()}
            type="button"
            className="w-full mt-3.5 bg-Red100 text-black py-3 rounded-xl cursor-pointer hover:scale-90 font-semibold"
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
