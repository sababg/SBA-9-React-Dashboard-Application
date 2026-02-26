import * as React from "react";
import type { FormErrors, Task, TaskFormProps } from "../../types";
import { validateTask } from "../../utils/taskUtils";

const TaskForm: React.FC<TaskFormProps> = ({
  // form for adding task
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
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleChange = (
    // change inputs data
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    setErrors(validateTask(updatedFormData));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // check if it has no error add new task
    event.preventDefault();

    setErrors(validateTask(formData));

    if (!Object.keys(validateTask(formData)).length) {
      onAddNewTask(formData);
      onAddNewTaskClick();
    }
  };

  const handleInvalid = (
    // check inputs error
    e: React.InvalidEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.preventDefault();

    const nextErrors = validateTask(formData);
    setErrors(nextErrors);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-start sm:w-[50%] w-[90%] bg-white px-9 py-12 rounded-2xl shadow-2xl gap-5"
      >
        <div className="flex flex-col items-start justify-start gap-1 w-full">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onInvalid={handleInvalid}
            placeholder="Title"
            required
            className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
          />
          {errors.title && (
            <p className="text-Red400 text-sm">{errors.title}</p>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-1 w-full">
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            onInvalid={handleInvalid}
            required
            className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
          ></textarea>
          {errors.description && (
            <p className="text-Red400 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-1 w-full">
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            onInvalid={handleInvalid}
            required
            className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
          />
          {errors.dueDate && (
            <p className="text-Red400 text-sm">{errors.dueDate}</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3.5 w-full">
          <div className="flex flex-col items-start justify-start gap-1 w-full">
            <select
              required
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              onInvalid={handleInvalid}
              className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="text-Red400 text-sm">{errors.priority}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-start gap-1 w-full">
            <select
              required
              value={formData.status}
              name="status"
              onChange={handleChange}
              onInvalid={handleInvalid}
              className="w-full focus:outline-none border border-solid rounded-xl border-Green400 px-2 py-3"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-Red400 text-sm">{errors.status}</p>
            )}
          </div>
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
