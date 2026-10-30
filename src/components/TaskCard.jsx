
const priorityStyles = {
  High: "border border-rose-400/20 bg-rose-500/10 text-rose-400",
  Medium: "border border-amber-400/20 bg-amber-500/10 text-amber-300",
  Low: "border border-emerald-400/20 bg-emerald-500/10 text-emerald-400",
};

const TaskCard = ({ task, onClick }) => {
  const completed = task.status === "Completed";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(task)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.(task);
        }
      }}
      className={`group flex cursor-pointer flex-col gap-3 rounded-lg border border-[#26364a]/70 p-3 transition-all duration-200 hover:border-indigo-400/40 hover:bg-[#26364a] ${completed ? "bg-[#102034]/60" : "bg-[#102034]"
        }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {completed && (
            <span className="material-symbols-outlined text-lg text-emerald-400">
              check_circle
            </span>
          )}
          <span
            className={`font-mono text-xs ${completed
              ? "text-[#918fa1] line-through"
              : "text-[#918fa1] group-hover:text-[#c3c0ff]"
              }`}
          >
            {task._id}
          </span>
        </div>

        {completed ? (
          <span className="shrink-0 font-mono text-[10px] text-emerald-400">
            {task.badge || "Verified"}
          </span>
        ) : (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold ${priorityStyles[task.priority] || priorityStyles.Medium
              }`}
          >
            {task.priority === "High" && (
              <span className="material-symbols-outlined text-xs">
                priority_high
              </span>
            )}
            {task.priority === "High"
              ? "High Priority"
              : task.priority}
          </span>
        )}
      </div>

      <h3
        className={`line-clamp-2 text-sm font-medium leading-5 ${completed
          ? "text-[#c7c4d8] line-through"
          : "text-[#d3e4fe]"
          }`}
      >
        {task.title}
      </h3>

      <p
        className={`line-clamp-2 text-xs leading-[18px] ${completed ? "text-[#918fa1]" : "text-[#c7c4d8]"
          }`}
      >
        {task.description}
      </p>

      {task.tags?.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {task.tags.map((tag, index) => (
            <span
              key={tag}
              className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${index % 2 === 0
                ? "bg-[#000f21] text-sky-300"
                : "bg-[#000f21] text-[#c3c0ff]"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-2 border-t border-[#26364a]/40 pt-2">
        <div
          className={`flex items-center gap-1 text-xs ${completed ? "text-[#918fa1]" : "text-[#918fa1]"
            }`}
        >
          <span className="material-symbols-outlined text-base">
            {completed ? "done_all" : "calendar_today"}
          </span>
          <span>

            {completed
              ? `Completed ${task.completedDate}`
              : task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-IN")
                : "No due date"}


          </span>
        </div>

        <div className="flex items-center gap-2">
          {task.checklist && (
            <span className="flex items-center gap-1 font-mono text-[10px] text-[#918fa1]">
              <span className="material-symbols-outlined text-sm">
                checklist
              </span>
              {task.checklist}
            </span>
          )}

          {task.comments > 0 && (
            <span className="flex items-center gap-1 font-mono text-[10px] text-[#918fa1]">
              <span className="material-symbols-outlined text-sm">
                comment
              </span>
              {task.comments}
            </span>
          )}

          {task.assignees?.map((assignee, index) => (
            <span
              key={`${assignee}-${index}`}
              title={assignee}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold shadow ${index % 2 === 0
                ? "bg-[#c3c0ff] text-[#1d00a5]"
                : "bg-[#006e4b] text-[#a7f3d0]"
                }`}
            >
              {assignee}
            </span>
          ))}

          {completed && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#26364a]">
              <span className="material-symbols-outlined text-sm text-emerald-400">
                task_alt
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
