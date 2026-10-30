
const DeleteConfirmModal = ({
  task,
  onCancel,
  onConfirm,
}) => {
  if (!task) return null;

  const priorityStyles = {
    High: "bg-rose-500/10 text-rose-400",
    Medium: "bg-amber-500/10 text-amber-300",
    Med: "bg-amber-500/10 text-amber-300",
    Low: "bg-emerald-500/10 text-emerald-400",
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[#000711]/80 p-4 backdrop-blur-md"
      onClick={onCancel}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-task-title"
        aria-describedby="delete-task-description"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[480px] rounded-xl border border-[#34445a] bg-[#102034] p-5 shadow-2xl sm:p-6"
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rose-400/20 bg-rose-500/10 text-rose-400">
            <span className="material-symbols-outlined text-[26px]">
              delete_forever
            </span>
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-rose-400">
              Permanent Action
            </p>

            <h2
              id="delete-task-title"
              className="text-xl font-bold text-[#d3e4fe]"
            >
              Delete Task?
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close confirmation"
            className="cursor-pointer rounded-lg p-1 text-[#918fa1] transition hover:bg-[#26364a] hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Warning */}
        <p
          id="delete-task-description"
          className="mt-5 text-sm leading-6 text-[#c7c4d8]"
        >
          Are you sure you want to delete{" "}
          <strong className="break-words font-semibold text-[#d3e4fe]">
            &ldquo;{task.title}&rdquo;
          </strong>
          ? This action cannot be undone in the current session.
        </p>

        {/* Task preview */}
        <div className="mt-5 flex flex-col gap-3 rounded-lg border border-[#26364a] bg-[#0b1c30] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded bg-[#26364a] px-2 py-1 font-mono text-xs font-semibold text-[#d3e4fe]">
              {task.id}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-semibold ${
                priorityStyles[task.priority] ||
                priorityStyles.Medium
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {task.priority === "High"
                ? "High Priority"
                : `${task.priority || "Medium"} Priority`}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <p className="min-w-0 break-words text-sm font-medium text-[#d3e4fe]">
              {task.title}
            </p>

            <span className="shrink-0 rounded bg-[#26364a] px-2 py-1 text-[10px] font-medium text-[#c7c4d8]">
              {task.status}
            </span>
          </div>

          {task.description && (
            <p className="line-clamp-2 text-xs leading-5 text-[#918fa1]">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-1 border-t border-[#26364a] pt-3 text-xs text-[#918fa1]">
            <span className="material-symbols-outlined text-sm">
              database
            </span>
            <span>Static project data</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 cursor-pointer rounded-lg border border-[#34445a] bg-[#1b2b3f] px-5 text-sm font-semibold text-[#d3e4fe] transition hover:bg-[#26364a]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              console.log("Deleting task:", task);
              onConfirm?.(task);
            }}
            className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-5 text-sm font-semibold text-white shadow-md transition hover:bg-rose-500 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg">
              delete
            </span>
            Delete Task
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeleteConfirmModal;
