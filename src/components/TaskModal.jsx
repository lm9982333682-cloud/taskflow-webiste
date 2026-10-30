
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const statusOptions = ["Todo", "In Progress", "Completed"];
const priorityOptions = ["Low", "Medium", "High"];

const fieldClass = "w-full rounded-lg border border-[#34445a] bg-[#000f21] px-3 py-2.5 text-sm text-[#d3e4fe] outline-none placeholder:text-[#64748b] focus:border-[#817bff] focus:ring-1 focus:ring-[#817bff]";

const TaskModal = ({ task = null, onClose, onSave, onDelete, }) => {

  const isEditing = Boolean(task);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "Backlog",
      priority: "Med",
      dueDate: "",
    },
  });

  useEffect(() => {
    reset({
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "Backlog",
      priority: task?.priority ?? "Med",
      dueDate: task?.dueDate ?? "",
    });
  }, [task, reset]);

  const submitForm = (data) => {
    const updatedTask = {
      ...task,
      ...data,
      id: task?.id ?? `TSK-${Date.now()}`,
    };

    console.log(isEditing ? "Updated Task:" : "Created Task:", updatedTask);
    onSave?.(updatedTask);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000711]/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-[620px] flex-col overflow-hidden rounded-xl border border-[#34445a] bg-[#0b1c30] shadow-2xl"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#26364a] bg-[#102034] px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-[#a5a0ff]">
              <span className="material-symbols-outlined text-lg">
                edit_note
              </span>
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h2
                id="edit-task-title"
                className="text-lg font-semibold text-[#d3e4fe]"
              >
                {isEditing ? "Edit Task" : "Create Task"}
              </h2>

              {task?.id && (
                <span className="rounded bg-[#26364a] px-2 py-0.5 font-mono text-xs font-semibold text-[#c3c0ff]">
                  {task.id}
                </span>
              )}

              {task?.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/10 px-2 py-0.5 text-xs font-semibold text-sky-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  {task.status}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#918fa1] transition hover:bg-[#26364a] hover:text-white"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5 overflow-y-auto px-5 py-5 sm:px-6"
        >
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <label
                htmlFor="task-title"
                className="text-sm font-semibold text-[#d3e4fe]"
              >
                Task Title <span className="text-rose-400">*</span>
              </label>
              {errors.title && (
                <span className="text-xs text-rose-400">
                  Required
                </span>
              )}
            </div>

            <input
              id="task-title"
              {...register("title", {
                required: "Task title is required",
              })}
              placeholder="Enter task title"
              className={fieldClass}
            />

            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <label
                htmlFor="task-description"
                className="text-sm font-semibold text-[#d3e4fe]"
              >
                Description
              </label>
              <span className="text-xs text-[#918fa1]">
                Markdown supported
              </span>
            </div>

            <textarea
              id="task-description"
              rows={4}
              {...register("description")}
              placeholder="Add details about this task..."
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-status"
                className="mb-2 block text-sm font-semibold text-[#d3e4fe]"
              >
                Column / Status
              </label>

              <select
                id="task-status"
                {...register("status")}
                className={`${fieldClass} cursor-pointer`}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="mb-2 block text-sm font-semibold text-[#d3e4fe]"
              >
                Priority
              </label>

              <select
                id="task-priority"
                {...register("priority")}
                className={`${fieldClass} cursor-pointer`}
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="mb-2 block text-sm font-semibold text-[#d3e4fe]"
            >
              Due Date
            </label>

            <input
              id="task-due-date"
              type="date"
              {...register("dueDate")}
              className={`${fieldClass} cursor-pointer`}
            />
          </div>

          {/* Footer actions */}
          <div className="flex flex-col-reverse justify-between gap-3 border-t border-[#26364a] pt-4 sm:flex-row sm:items-center">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onDelete?.(task)}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/10"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                  Delete Task
                </button>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-10 cursor-pointer rounded-lg bg-[#26364a] px-4 text-sm font-medium text-[#d3e4fe] transition hover:bg-[#34445a]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#bdb7ff] px-4 text-sm font-semibold text-[#241b70] shadow-md transition hover:bg-[#d0ccff] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-lg">
                  check
                </span>
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default TaskModal;
